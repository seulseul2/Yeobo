import pandas as pd
import pymysql

df = pd.read_csv("attraction.csv")
df = df.drop(columns=['Unnamed: 0'])
df = df.where(pd.notnull(df), None) # dataframe 형식을 list로 변환하기 위한 전처리, Nan을 None으로 바꿔준다.
attraction_list = df.values.tolist()

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