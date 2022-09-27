import pandas as pd

df = pd.read_csv("attraction.csv")
print(df.info())
print(f'컬럼 : {df.columns}')
print(f'데이터 개수 : {df.shape[0]}')
