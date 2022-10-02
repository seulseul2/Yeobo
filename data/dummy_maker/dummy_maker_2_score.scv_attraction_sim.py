import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
# from sqlalchemy import create_engine

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
attraction_sim = pd.DataFrame(attraction_sim, index=user_attraction_score_matrix.columns, columns=user_attraction_score_matrix.columns)
print(attraction_sim)


# 특정 여행지를 선택했을 때
j = 125266
lst = attraction_sim[j].sort_values(ascending=False)

for i in range(1, 5):
    print(f'attraction_id = {lst.keys()[i]} / 유사도 = {lst.values[i]}')