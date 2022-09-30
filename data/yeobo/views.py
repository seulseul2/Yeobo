from rest_framework.response import Response
import pandas as pd
import requests
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
def area_code(request, attraction_id):
    
    # # 1. attraction_id를 기준으로 area_code를 가져온다.
    # query_area_code = f"""
    # SELECT area_code
    # FROM attraction
    # WHERE attraction_id = {attraction_id}
    # """
    # # 2. query_mariaDB_category 함수를 통해 해당 area_code에 있는 목록을 가져온다.
    # return Response(query_mariaDB_category(f"""
    # SELECT *
    # FROM attraction
    # WHERE area_code = {query_mariaDB(query_area_code)['area_code'][0]} AND read_count >= 10000
    # ORDER BY rand()
    # LIMIT 30
    # """), status=status.HTTP_200_OK)
    
    # 3. 아래는 위의 2 항목을 합친 반환값
    return Response(query_mariaDB_category(f"""
    SELECT *
    FROM attraction
    WHERE area_code = (SELECT area_code
        FROM attraction
        WHERE attraction_id = {attraction_id})
    AND read_count >= 10000
    ORDER BY rand()
    LIMIT 30
    """), status=status.HTTP_200_OK)
    
@api_view(['GET'])
def pick_category(request, category):
    print('바보')
    
    return Response(query_mariaDB_category(f"""
    SELECT *
    FROM attraction
    WHERE category = {category} AND read_count >= 10000
    ORDER BY rand()
    LIMIT 30
    """), status=status.HTTP_200_OK)


@api_view(['GET'])
def main_recommend(request, user_id):
    query = """
    SELECT *
    FROM score
    """
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    data = []
    attraction_main_recommend = int(query_mariaDB(f"""
    SELECT attraction_id
    FROM score
    WHERE user_id = {user_id}
    ORDER BY score DESC, score_id DESC
    LIMIT 1
    """)['attraction_id'][0])
    print(query_mariaDB(query))
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    # print(attraction_sim)
    lst = attraction_sim[attraction_main_recommend].sort_values(ascending=False)[0:5]
    for i in range(1, 5):
        data.append(query_mariaDB(f"""
            SELECT *
            FROM attraction
            WHERE attraction_id = {lst.keys()[i]}
        """))
    return Response(data, status=status.HTTP_200_OK)