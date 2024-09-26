import pandas as pd


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

    for columns, null_value in nullvalue.items():
      file_columns.append(columns)
      null_count.append(null_value)
      print(file_columns)
      print(null_count)
      
    
    
    return  total_rows, total_columns , file_columns, null_count

def get_categorical_prompt(df):
    category_suggestions = []
    for column in df.columns:
        if df[column].dtype == 'object':
            unique_values = df[column].unique()  
            num_unique_values = len(unique_values)

            if 1 <= num_unique_values <= 30:
                unique_string = ', '.join(unique_values)
                prompt = (f"The column '{column}' contains the following unique values: {unique_string}. "
                          "If these unique values are correctly spelled and show no abnormalities, please skip this column. "
                          "Otherwise, suggest corrections or improvements for any potential misspellings or abnormalities in the data.")

                category_suggestions.append(prompt)

    return category_suggestions
