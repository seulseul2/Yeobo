import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('score.csv')
df = df.drop(columns=['Unnamed: 0'])

user_attraction_score_matrix = df.pivot_table('score', index='user_id', columns='attraction_id')
print(user_attraction_score_matrix)

user_attraction_score_matrix_T = user_attraction_score_matrix.transpose()
print(user_attraction_score_matrix_T)

attraction_sim = cosine_similarity(user_attraction_score_matrix_T, user_attraction_score_matrix_T)
attraction_sim = pd.DataFrame(attraction_sim)
print(attraction_sim)