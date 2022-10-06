import pandas as pd
import pprint
import pymysql

df = pd.read_csv("data/dump_maker/attraction_temp.csv")

df = df.where(pd.notnull(df), None) # dataframe 형식을 list로 변환하기 위한 전처리, Nan을 None으로 바꿔준다.
df = df.drop([101, 960, 1016, 1483, 1649, 2178, 3242, 3344, 3628, 4050, 4069], axis=0) # mapx 또는 mapy가 0인 데이터를 index 기준 삭제
df = df.reset_index() # index를 reset한다.
df = df.drop(columns=['index'])
df = df.drop(columns=['level_0'])
df['cnt'] = 0
# print(type(df))
# print(df.info())
# print(f'컬럼 : {df.columns}')
# print(f'데이터 개수 : {df.shape[0]}')

def query_mariaDB(query):
    # DB 연결
    conn = pymysql.connect(
        host = 'j7c103.p.ssafy.io',
        port = 3307,
        user = 'yeobo',
        password = 'seulseul1004',
        database = 'yeobo'
    )
    global query_result
    query_result = pd.read_sql(query, conn)
    conn.close()

    return query_result

user_attraction_score_table = query_mariaDB("""
SELECT *
    FROM score
"""
)

for i in range(4286):
    score_temp = 0
    score_cnt = 0
    for j in range(42860):
        if user_attraction_score_table['attraction_id'][j] == df['attraction_id'][i]:
            score_temp += user_attraction_score_table['score'][j]
            score_cnt += 1
    df['cnt'][i] = score_cnt
    score_temp = round(score_temp / score_cnt, 1)
    df['score'][i] = score_temp
    print(f'어트멍 : {i}/4286')
    print('attraction_id는', i)
    print('score는', score_temp)
    print('score_cnt는', score_cnt)
    print('넘어가기')

print(df)

df.to_csv("attraction_score_4.csv")