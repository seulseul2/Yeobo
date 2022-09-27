import pandas as pd
import pprint
import pymysql

df = pd.read_csv("attraction_temp.csv")

df = df.where(pd.notnull(df), None) # dataframe 형식을 list로 변환하기 위한 전처리, Nan을 None으로 바꿔준다.
df = df.drop([101, 960, 1016, 1483, 1649, 2178, 3242, 3344, 3628, 4050, 4069], axis=0) # mapx 또는 mapy가 0인 데이터를 index 기준 삭제
df = df.reset_index() # index를 reset한다.
df = df.drop(columns=['index'])
df = df.drop(columns=['level_0'])
# print(type(df))
# print(df.info())
print(f'컬럼 : {df.columns}')
print(f'데이터 개수 : {df.shape[0]}')

# pprint.pprint(attraction_list)

attraction_list = df.values.tolist()
df.to_csv("attraction.csv")

def mysql_save(lst):
    conn = pymysql.connect(
        host = 'localhost', 
        port = 3307, 
        user = 'root', 
        password = 'yeobo', 
        db = 'yeobo', 
        charset = 'utf8mb4'
        )
    cursor = conn.cursor()
    sql = "INSERT INTO ATTRACTION(attraction_id, category, name, description, address, areacode, image, image2, mapx, mapy, score, readcount) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(sql, lst)
    conn.commit()
    conn.close()
mysql_save(attraction_list)