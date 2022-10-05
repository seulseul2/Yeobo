
from rest_framework.response import Response
import pandas as pd
import pymysql
import json
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from rest_framework import status

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


def query_mariaDB_transpose(query):
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


def make_attraction_sim():
    user_attraction_score_matrix = query_mariaDB("""
        SELECT *
            FROM score
        """).pivot_table('score', index='attraction_id', columns='user_id')
    user_attraction_score_matrix = user_attraction_score_matrix.fillna(0)
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)

    return attraction_sim


def bag_to_attraction(bag_id):
    
    attraction_id = query_mariaDB_transpose(f"""
        SELECT attraction_id
            FROM bag_attraction
            WHERE bag_id = {bag_id}
            ORDER BY bag_attraction_id
            LIMIT 1
        """)[0]['attraction_id']
    
    return attraction_id


@api_view(['GET'])
def make_boddari_pick_category(request, category_id):
    result = query_mariaDB_transpose(f"""
        SELECT attraction_id, name, image
            FROM attraction
            WHERE category = {category_id} AND read_count >= 10000
            ORDER BY rand()
            LIMIT 30
        """)
    print(result)
    return Response(result, status=status.HTTP_200_OK)
    
    
@api_view(['GET'])
def make_boddari_area_code(request, attraction_id):
    
    result = query_mariaDB_transpose(f"""
        SELECT attraction_id, name, image
            FROM attraction
            WHERE area_code = (
                SELECT area_code
                    FROM attraction
                    WHERE attraction_id = {attraction_id}
                )
            AND read_count >= 10000
            ORDER BY rand()
            LIMIT 30
        """)

    return Response(result, status=status.HTTP_200_OK)
    
    
@api_view(['GET'])
def make_boddari_recommend(request, attraction_id):
    attraction_sim = make_attraction_sim()
    lst = attraction_sim[attraction_id].sort_values(ascending=False)[0:5].reset_index()
    
    result = []
    for i in lst['attraction_id']:
        result.append(query_mariaDB_transpose(f"""
            SELECT attraction_id, name, image
                FROM attraction
                WHERE attraction_id = {i}
            """)[0])
        
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def merge_boddari_recommend(request, bag_id_1, bag_id_2):

    attraction_id_1 = bag_to_attraction(bag_id_1)
    attraction_id_2 = bag_to_attraction(bag_id_2)
    attraction_sim = make_attraction_sim()
    lst = attraction_sim[attraction_id_1].add(attraction_sim[attraction_id_2])
    lst = lst.drop([attraction_id_1, attraction_id_2]).sort_values(ascending=False)[0:10].reset_index()
    result = []
    for i in lst['attraction_id']:
        result.append(query_mariaDB_transpose(f"""
            SELECT attraction_id, name, image
                FROM attraction
                WHERE attraction_id = {i}
            """)[0])
    print(result)
    
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def main_page_recent_high_score_based_recommend(request, user_id):
    
    attraction_sim = make_attraction_sim()
    user_score_none_query = f"""
        SELECT attraction_id
            FROM score
            WHERE user_id = {user_id}
        """
    if not query_mariaDB(user_score_none_query)['attraction_id'].empty:
        attraction_id_query = f"""
            SELECT attraction_id
                FROM score
                WHERE user_id = {user_id}
                ORDER BY score DESC, score_id DESC
                LIMIT 1
            """
        attraction_id = query_mariaDB_transpose(attraction_id_query)[0]['attraction_id']
    else:
        attraction_rand_query = f"""
        SELECT attraction_id
            FROM attraction
            ORDER BY rand()
            LIMIT 1
        """
        attraction_id = query_mariaDB_transpose(attraction_rand_query)[0]['attraction_id']
    lst = attraction_sim[attraction_id].sort_values(ascending=False)[1:7].reset_index()
    result = []
    for i in lst['attraction_id']:
        result.append(query_mariaDB_transpose(f"""
            SELECT attraction_id, name, image
                FROM attraction
                WHERE attraction_id = {i}
            """)[0])
    
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def main_page_area_based_recommend(request, user_id):
    user_score_none_query = f"""
        SELECT attraction_id
            FROM score
            WHERE user_id = {user_id}
        """
    if not query_mariaDB(user_score_none_query)['attraction_id'].empty:
        result = query_mariaDB_transpose(f"""
            SELECT attraction_id, name, image
                FROM attraction
                WHERE area_code = (
                    SELECT area_code
                        FROM attraction a LEFT JOIN score s
                        ON a.attraction_id = s.attraction_id
                        WHERE user_id = {user_id}
                        GROUP BY area_code
                        ORDER BY COUNT(area_code) DESC
                        LIMIT 1
                    ) AND read_count >= 80000
                ORDER BY rand()
                LIMIT 6
            """)
    else:
        result = query_mariaDB_transpose(f"""
            SELECT attraction_id, name, image
                FROM attraction
                WHERE area_code = (
                    SELECT area_code
                        FROM attraction a LEFT JOIN score s
                        ON a.attraction_id = s.attraction_id
                        GROUP BY area_code
                        ORDER BY COUNT(area_code) DESC
                        LIMIT 1
                    ) AND read_count >= 80000
                ORDER BY rand()
                LIMIT 6
            """)
    
    return Response(result, status=status.HTTP_200_OK)