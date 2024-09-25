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
    
    return  total_rows, total_columns 


    