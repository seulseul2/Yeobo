from urllib import response
import pandas as pd
import pymysql

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

query = """
    SELECT *
    FROM attraction
"""

def recommend(request, attraction_id):
    query_mariaDB(query)

    return response(data)

# DB Table -> DataFrame
# DF 상위 5개 보내주는 법
# response(data 형태로 보내줌)