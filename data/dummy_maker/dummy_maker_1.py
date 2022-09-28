import pandas as pd
import random

dummy_data_set = []

attraction_id_csv = pd.read_csv('attraction.csv')
attraction_id_csv = attraction_id_csv.drop(columns=['Unnamed: 0'])

score_id = 0
for user_id in range(1, 11):
    for attraction_idx in range(0, 4286):
        score_id += 1
        dummy_data_set.append(tuple([score_id, random.randrange(1, 11)*0.5, attraction_id_csv['attraction_id'][attraction_idx], user_id]))

df = pd.DataFrame(dummy_data_set, columns=['score_id', 'score', 'attraction_id', 'user_id'])

df.to_csv('score.csv')