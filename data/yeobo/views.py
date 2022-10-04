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
    # query_result = json.loads(query_result.to_json(orient='records'))
    conn.close()

    return query_result

@api_view(['GET'])
def make_boddari_recommend(request, attraction_id):
    query = """
    SELECT *
    FROM score
    """
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    user_attraction_score_matrix = user_attraction_score_matrix.fillna(0)
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    lst = attraction_sim[attraction_id].sort_values(ascending=False)[0:5].reset_index()['attraction_id']
    
    return Response(lst, status=status.HTTP_200_OK)

@api_view(['GET'])
def make_boddari_area_code(request, attraction_id):

    return Response(query_mariaDB(f"""
    SELECT attraction_id
    FROM attraction
    WHERE area_code = (SELECT area_code
        FROM attraction
        WHERE attraction_id = {attraction_id})
    AND read_count >= 10000
    ORDER BY rand()
    LIMIT 30
    """)['attraction_id'], status=status.HTTP_200_OK)
    
@api_view(['GET'])
def make_boddari_pick_category(request, category):
        
    return Response(query_mariaDB(f"""
    SELECT attraction_id
    FROM attraction
    WHERE category = {category} AND read_count >= 10000
    ORDER BY rand()
    LIMIT 30
    """)['attraction_id'], status=status.HTTP_200_OK)

@api_view(['GET'])
def merge_boddari_recommend(request, user_id_1, user_id_2):

    query = """
    SELECT *
    FROM score
    """
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    user_attraction_score_matrix = user_attraction_score_matrix.fillna(0)
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    result = attraction_sim[user_id_1].add(attraction_sim[user_id_2]) / 2
    result = result.drop([user_id_1, user_id_2]).sort_values(ascending=False)[0:10].reset_index()['attraction_id']
    
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def main_page_recent_high_score_based_recommend(request, user_id):
    
    user_attraction_score_matrix = query_mariaDB("""
    SELECT *
    FROM score
    """).pivot_table('score', index='attraction_id', columns='user_id').fillna(0)
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    lst = attraction_sim[int(query_mariaDB(f"""
    SELECT attraction_id
    FROM score
    WHERE user_id = {user_id}
    ORDER BY score DESC, score_id DESC
    LIMIT 1
    """)['attraction_id'])].sort_values(ascending=False)[1:6].reset_index()['attraction_id']
    
    return Response(lst, status=status.HTTP_200_OK)

@api_view(['GET'])
def main_page_area_based_recommend(request, user_id):
    
    return Response(query_mariaDB(f"""
    SELECT attraction_id
        FROM attraction
        WHERE area_code = (SELECT area_code
            FROM attraction a LEFT JOIN score s
            ON a.attraction_id = s.attraction_id
            WHERE user_id = 1
            GROUP BY area_code
            ORDER BY COUNT(area_code) DESC
            LIMIT 1) AND read_count >= 10000
        ORDER BY rand()
        LIMIT 30
    """)['attraction_id'], status=status.HTTP_200_OK)
    