import pandas as pd
import pymysql

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
    # sql = "INSERT INTO ATTRACTION(attraction_id, score, cnt) values(%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s, %s)"
    sql = "INSERT INTO attraction_2(attraction_id, score, cnt) values(%s, %s, %s)"
    cursor.executemany(sql, lst)
    conn.commit()
    conn.close()
    
# df = pd.read_csv("attraction_score_4.csv")
# df = df.drop(columns=['Unnamed: 0', 'category', 'name', 'description', 'address', 'areacode', 'image', 'image2', 'mapx', 'mapy', 'readcount'])
# df.to_csv('attraction_score_cnt.csv')

df = pd.read_csv('attraction_score_cnt.csv')
df = df.drop(columns=['Unnamed: 0'])

attraction_list = df.values.tolist()
mysql_save(attraction_list)