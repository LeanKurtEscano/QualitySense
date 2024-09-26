import pandas as pd

def dataset_overview(file):
    
    if file.name.endswith('csv'):
        df = pd.read_csv(file)
    
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



def get_null_data(file):
    if file.name.endswith('csv'):
        df = pd.read_csv(file)
    elif file.name.endswith('xlsx'):
        df = pd.read_excel(file)
        
        return f"Success"
            