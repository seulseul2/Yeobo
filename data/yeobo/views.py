from rest_framework.response import Response
import pandas as pd
import pymysql
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

@api_view(['GET'])
def recommend(request, attraction_id):
    query = """
    SELECT *
    FROM score
    """
    user_attraction_score_matrix = query_mariaDB(query).pivot_table('score', index='attraction_id', columns='user_id')
    attraction_sim = pd.DataFrame(cosine_similarity(user_attraction_score_matrix, user_attraction_score_matrix), index=user_attraction_score_matrix.index, columns=user_attraction_score_matrix.index)
    lst = attraction_sim[attraction_id].sort_values(ascending=False)

    data = []

    # for i in range(1, 5):
    #     data.append((f'attraction_id = {lst.keys()[i]} / 유사도 = {lst.values[i]}'))

    for i in range(1, 5):
        data.append(lst.keys()[i])
    return Response(data, status=status.HTTP_200_OK)

# DB Table -> DataFrame
# DF 상위 5개 보내주는 법
# response(data 형태로 보내줌)