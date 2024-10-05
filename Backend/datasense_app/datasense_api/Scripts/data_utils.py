import pandas as pd
import google.generativeai as genai

def get_data_type_prompt(df):
    get_dtypes = dict(df.dtypes)
    store_prompt = []


    for column_name, data_type in get_dtypes.items():
        store_prompt.append(f"The column '{column_name}' has a data type of '{data_type}'.")

   
    data_type_prompt = "Data Type:\n" + "\n".join(store_prompt) + \
                   "\n\nOverview: If all data types are appropriate based on the column names, no changes are needed. " \
                   "Please provide an overview of the columns and their respective data types. " \
                   "If there are any mismatches, kindly suggest corrections or fixes based on the column names and expected data types."

    return data_type_prompt

 
def get_categorical_prompt(df):
    category_suggestions = []
    for column in df.columns:
        if df[column].dtype == 'object' or df[column].dtype.name == 'category':
            unique_values = df[column].unique()  
            num_unique_values = len(unique_values)

            if 1 <= num_unique_values <= 30:
                unique_string = ', '.join(map(str,unique_values))
                prompt = (f"The column '{column}' contains the following unique values: {unique_string}. ")

                category_suggestions.append(prompt)
        
    category_prompt = "Category:\n"+'\n'.join(category_suggestions) + "\nIf these unique values are correctly spelled and show no abnormalities, please skip this column. Otherwise, suggest corrections or improvements for any potential misspellings or abnormalities in the data."
       
    return category_prompt


def get_null_prompt(df):
    columns_with_nulls = df.columns[df.isnull().any()].tolist()
    null_counts = df.isnull().sum()

    if not columns_with_nulls:
        null_prompt = "No columns contain null values."
    
    null_prompt = "Null Values:\n"+"\n".join([f"{column}: {null_counts[column]} null values" for column in columns_with_nulls])  +  "\n1. Suggest filling null values with appropriate substitutes (mean, median, mode, etc.).\n" + \
                  "2. Tell the user if null values are insignificant, think about dropping those rows or columns.\n" + \
                  "3. Document any assumptions or decisions made regarding null values."
    
    return null_prompt

def get_outliers_prompt(df):
    numeric_columns = df.select_dtypes(include=['number']).columns
    outliers = {}
    outlier_data = []
    
    for column in numeric_columns:
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        lower_outliers = (df[column] < lower_bound).sum()
        upper_outliers = (df[column] > upper_bound).sum()
        outlier_count = ((df[column] < lower_bound) | (df[column] > upper_bound)).sum()
        if outlier_count > 0:
           outliers[column] = {
              "lower_outlier": lower_outliers,
              "upper_outlier": upper_outliers,
              "total": outlier_count
        }
           
    for index, values in outliers.items():
       outlier_data.append(
          f"{index} has a total of {values['total']} outliers: "
          f"{values['lower_outlier']} lower outliers and {values['upper_outlier']} upper outliers."
    )
       
    outlier_prompt = "Outliers:\n" +\
    "\n".join(outlier_data) + \
    "\nReview the total number of outliers in numerical columns. Tell user to check  data and add suggestions on how to address the outliers."
    
    return outlier_prompt






        
def generate_prompt(df):
    data_type_prompt = get_data_type_prompt(df)
    categorical_prompt = get_categorical_prompt(df)
    null_prompt = get_null_prompt(df)
    outlier_prompt = get_outliers_prompt(df)
    
    final_prompt = (
    data_type_prompt + "\n\n"+ 
    categorical_prompt + "\n\n" +  
    null_prompt + "\n\n" +    
    outlier_prompt
    )
    
    return final_prompt

def promp_to_ai(prompt):
    genai.configure(api_key="AIzaSyC_0ly0_pMr3DktnTSvEaHjrhMBaFTN0QQ")
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }
    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  )
    
    chat_session = model.start_chat(
    history=[
    ]
   )
    response = chat_session.send_message(
    f"Please assess the provided information and follow the prompt carefully. Generate a detailed Data Quality Summary Report. Here is the provided prompt: {prompt}. "
    "Additionally, do not generate tables; only provide text. For each column, include the column name along with the following checks: data type validation, unique value assessment, null value count, and outlier detection. "
    "If there are no issues for a column, explicitly state that there are no errors for transparency."
)


    result = response.text
    return result
   

def dataset_overview(file):
    
    if file.name.endswith('csv'):
        df = pd.read_csv(file, on_bad_lines='skip')
    
    elif file.name.endswith('xlsx'):
        df = pd.read_excel(file)
    
    else:
        raise ValueError("Unsupported file format. Only .csv and .xlsx files are allowed.")
    
    total_rows = df.shape[0]
    total_columns = df.shape[1]
    file_columns = []
    null_count = []
    nullvalue = dict(df.isna().sum())
    prompt = generate_prompt(df)
    result = promp_to_ai(prompt)
    
    
    

    for columns, null_value in nullvalue.items():
      file_columns.append(columns)
      null_count.append(null_value)
      
      
    
    
    return  total_rows, total_columns , file_columns, null_count, result

