import pandas as pd
import pprint
import pymysql

df = pd.read_csv("score.csv")
df = df.drop(columns=['Unnamed: 0'])

df = df.where(pd.notnull(df), None) # dataframe 형식을 list로 변환하기 위한 전처리, Nan을 None으로 바꿔준다.
df = df.drop(columns=['index'])


score_list = df.values.tolist()

def mysql_save(lst):
    conn = pymysql.connect(
        host = 'j7c103.p.ssafy.io', 
        port = 3307, 
        user = 'yeobo', 
        password = 'seulseul1004', 
        db = 'yeobo', 
        charset = 'utf8mb4'
        )
    cursor = conn.cursor()
    sql = "INSERT INTO score(score_id, score, attraction_id, user_id) values(%s, %s, %s, %s)"
    cursor.executemany(sql, lst)
    conn.commit()
    conn.close()
mysql_save(score_list)