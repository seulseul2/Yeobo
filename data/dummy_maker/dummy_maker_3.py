import pandas as pd
import pymysql

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

print(query_mariaDB(query))