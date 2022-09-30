import pandas as pd

new_data = None

for i in range(1, 9):

    if i == 1:
        pls = 0
    else:
        pls = new_data.shape[0]
    
    data = pd.read_csv(f"attraction_{i}.csv")

    data["Unnamed: 0"] = data["Unnamed: 0"] + pls

    data.rename(columns = {'Unnamed: 0' : 'index'}, inplace=True)
    data.rename(columns = {'iamge2' : 'image2'}, inplace=True)
    data = data.loc[:, ['index', 'attraction_id', 'category', 'name', 'description', 'address', 'areacode', 'image', 'image2', 'mapx', 'mapy', 'score', 'readcount']]

    if i == 1:
        new_data = data
    else:
        new_data = new_data.append(data, ignore_index=True)
        
new_data = pd.DataFrame(new_data)
        
new_data.to_csv('attracion_temp.csv', index=False)

print(new_data)