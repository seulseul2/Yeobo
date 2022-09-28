import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import create_engine

# engine = create_engine('mysql://yeobo:seulseul1004@j7c103.p.ssafy.io/yeobo')
# conn = engine.connect
# data = pd.read_sql_table('score', conn)
# data.head()
# print(data)

df = pd.read_csv('score.csv')
df = df.drop(columns=['Unnamed: 0'])

user_attraction_score_matrix = df.pivot_table('score', index='user_id', columns='attraction_id')
print(user_attraction_score_matrix)

user_attraction_score_matrix_T = user_attraction_score_matrix.transpose()
print(user_attraction_score_matrix_T)

attraction_sim = cosine_similarity(user_attraction_score_matrix_T, user_attraction_score_matrix_T)
attraction_sim = pd.DataFrame(attraction_sim)
print(attraction_sim)