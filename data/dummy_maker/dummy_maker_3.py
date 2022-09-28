import pandas as pd
import pymysql
from datetime import datetime

def query_mariaDB(query):
    # DB 연결
    conn = pymysql.connect(
        host = 'j7c103.p.ssafy.io',
        port = 3307,
        user = 'yeobo',
        password = 'seulseul1004',
        database = 'yeobo'
    )

    start_tm = datetime.now()

    global query_result

    query_result = pd.read_sql(query, conn)

    end_tm = datetime.now()

    print('STATE TIME :', str(start_tm))
    print('END TIME :', str(end_tm))
    print('ELAP time:', str(end_tm - start_tm))
    conn.close()

    return query_result

query = """
    SELECT *
    FROM user
"""

query_mariaDB(query)