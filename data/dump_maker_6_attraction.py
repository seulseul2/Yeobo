import pandas as pd

df = pd.read_csv("attraction.csv")
df = df.drop(columns=['index'])
df.to_csv("attraction_no_index.csv")

print(type(df))
print(df.info())
print(f'컬럼 : {df.columns}')
print(f'데이터 개수 : {df.shape[0]}')
