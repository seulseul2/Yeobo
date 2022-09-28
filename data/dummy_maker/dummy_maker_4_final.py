import pandas as pd
import pymysql
from sklearn.metrics.pairwise import cosine_similarity

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

query = """
    SELECT *
    FROM score
"""

user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')

attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix))

print(attraction_sim)

j = 125266
lst = attraction_sim[j].sort_values(ascending=False)

for i in range(1, 5):
    print(f'attraction_id = {lst.keys()[i]} / 유사도 = {lst.values[i]}')