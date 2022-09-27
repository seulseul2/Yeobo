from urllib.parse import urlencode, unquote
import requests
import json
import pandas as pd

BASE_URL = "http://apis.data.go.kr/B551011/KorService"
API_AUTH_KEY = "wlWf/ScYRE2EgX56o0YFoqwUkO9oD82OUH1LnvlPE8w9cuI/6IYvSBuQaFi7t5+QXHcYo2tgZ/uIeiuGq67YLw=="
API_AUTH_KEY = unquote(API_AUTH_KEY)

# areaBasedList, 카테고리로 지역 조회
path_area = "/areaBasedList"

queryString_area = "?" + urlencode(
    {
        "MobileOS" : "ETC",
        "MobileApp" : "Yeobo",
        "serviceKey": API_AUTH_KEY,
        "numOfRows": 10,
        "pageNo": "1",
        "_type":"json",
        "cat3": "A01010100"
    }
)
queryURL_area = BASE_URL + path_area + queryString_area
response_area = requests.get(queryURL_area, verify=False)
text_area = response_area.text
data_area = json.loads(text_area)

# detailCommon, 상세 정보 조회
path_overview = "/detailCommon"

attraction_list = []

i = 0

for item in data_area["response"]["body"]["items"]["item"]:
    queryString_overview = "?" + urlencode(
        {
            "MobileOS" : "ETC",
            "MobileApp" : "Yeobo",
            "serviceKey": API_AUTH_KEY,
            "_type":"json",
            "contentId" : item["contentid"],
            "overviewYN" : "Y",
        }
    )
    queryURL_overview = BASE_URL + path_overview + queryString_overview
    response_overview = requests.get(queryURL_overview, verify=False).text
    data_overview = json.loads(response_overview)
    item_overview = data_overview["response"]["body"]["items"]["item"]
    
    if not item["firstimage"]:
        continue
    
    i += 1
    print("contentid : "+ item["contentid"])
    print("제목 : " + item["title"])
    print("주소 : " + item["addr1"], item["areacode"])
    print("위도, 경도 : " + item["mapy"], item["mapx"])
    print("이미지1 : " + item["firstimage"])
    print("이미지2 : " + item["firstimage2"])
    print("언급횟수 : " + str(item["readcount"]))
    print("요약 : " + item_overview[0]["overview"])
    print('-------------------------------------')
    
    attraction_id = int(item["contentid"])
    name = item["title"]
    description = item_overview[0]["overview"]
    address = item["addr1"]
    areacode = int(item["areacode"])
    image = item["firstimage"]
    image2 = item["firstimage2"]
    mapx = float(item["mapx"])
    mapy = float(item["mapy"])
    readcount = item["readcount"]
    score = 0.0
    attraction_list.append(tuple([attraction_id, name, description, address, areacode, image, image2, mapx, mapy, score, readcount]))
    # for x in attraction_list:
    #     for y in x:
    #         print(type(y))
    if i == 5:
        break
    
# print('최종 리스트')
# print('-----------------------------------------------')
# pprint(attraction_list)


df = pd.DataFrame(attraction_list, columns=['attraction_id', 'name', 'description', 'address', 'areacode', 'image', 'iamge2', 'mapx', 'mapy', 'score', 'readcount'])
df.to_csv("atteraction.csv")

import pymysql
def mysql_save(lst):
    conn=pymysql.connect(
        host='localhost', 
        port=3307, 
        user='root', 
        password='yeobo', 
        db='yeobo', 
        charset='utf8'
        )
    cursor=conn.cursor()
    sql="INSERT INTO ATTRACTION(attraction_id,name,description,address,areacode,image,image2,mapx,mapy, score, readcount) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.executemany(sql,lst)
    conn.commit()
    conn.close()
mysql_save(attraction_list)