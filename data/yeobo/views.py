from rest_framework.response import Response
import pandas as pd
import pymysql
import json
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

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

def query_mariaDB_category(query):
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
    query_result = json.loads(query_result.to_json(orient='records'))
    conn.close()

    return query_result

@api_view(['GET'])
def recommend(request, attraction_id):
    query = """
    SELECT *
    FROM score
    """
    data = []
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    lst = attraction_sim[attraction_id].sort_values(ascending=False)[0:5]
    for i in range(1, 5):
        data.append(query_mariaDB(f"""
            SELECT *
            FROM attraction
            WHERE attraction_id = {lst.keys()[i]}
        """))
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def pick_category(request, category):
    
    return Response(query_mariaDB_category(f"""
    SELECT *
    FROM attraction
    WHERE category = {category} AND read_count >= 10000
    ORDER BY rand()
    LIMIT 30
    """), status=status.HTTP_200_OK)


@api_view(['GET'])
def main_recommend(request, user_id):
    result_temp = query_mariaDB(f"""
    SELECT attraction_id
    FROM score
    WHERE user_id = {user_id}
    ORDER BY score DESC, score_id DESC
    LIMIT 1
    """)['attraction_id']
    print(result_temp)
    # result = recommend(None, result_temp)
    return Response(result_temp, status=status.HTTP_200_OK)
