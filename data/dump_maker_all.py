from io import DEFAULT_BUFFER_SIZE
from urllib.parse import urlencode, unquote
import requests
import json
from pprint import pprint
import pandas as pd
# import math
# import numpy as np

"""
총 8개 계정의 API_AUTH_KEY를 통해 아이템의 최대 개수인 820을 max_item_num의 기준으로 API키를 바꿔가면서 실시할 예정
(API 일일 트래픽 제한 : 1000건, 
개요 조회마다 1건의 API를 사용하기에 일일 트래픽 제한을 넘긴 빅데이터의 경우 계정을 여러개로 두고 시행해야 함. 
or API 제공처에 트래픽 증가 요청을 해야한다.)

Yeobo 프로젝트의 관광지 수 : 5,699개(4,662개 관광지 + 1,037개 문화시설)

python list 자료형의 경우 최대 536,870,912개의 자료를 저장할 수 있어 관광지 수(5,669) * 속성 수(12)에 한참 미치지 않는다.
mariaDB, MySQL 또한 최대 레코드 수에 미치지 않아 사용가능하다.

"""

BASE_URL = "http://apis.data.go.kr/B551011/KorService"

API_AUTH_KEY_LIST = [
    "CpszSPbwDkKnYx0BvDqy%2BvMtHpZ9JMozRWNbGvfNZ7vVhx7keYRyLAuyldTzHZ4QWvH4xj4DnASOakTS7kAqLg==",   # 영훈형
    "wlWf/ScYRE2EgX56o0YFoqwUkO9oD82OUH1LnvlPE8w9cuI/6IYvSBuQaFi7t5+QXHcYo2tgZ/uIeiuGq67YLw==",     # nak3652 / nak3652@naver.com
    "7Zy0RLAtwkmNz5fgIDJdIV/QcSk8GhikA7PThgnjDRcQijSM6GNOiLuO40OpE+nSLslQhz8NWklurVTJdQeykA",       # junojam0622 / junojam0622@gmail.com
    "pn+PZBhNvRIOy6lvKKuVTJka19eNU08Yg/E4pgb0OT+zCKqbhBwHDhOfcIse6d/M2Pn3SUZWp7lTVtOmC2PRDw==",     # yeobo1 / yeobo103@gmail.com
    "yNNCPJRanMk5x96rL+DCEgPFqt1BmFmbYRpGSlDTva/1Z7D+IXzGSYEEhX0bieQbSlj5HpvF4QDSaVhy2ZdIdA==",     # yeobo2 / s3652@yonsei.ac.kr
    "WAlqT5QvzF6rGMxbDZoPmdmohvGhMecJFO4GjNt34DZ1j1uULWZfbQDVsDngctE8+EqlGlJHZ+g9QG6zkjj6wA==",     # yeobo3 / junojam0622@naver.com
    "l7J/tYKQyIDPhvILVJCAYeUtNLSV5A2icjrQjdv/tPKyS8INCxMas0yvW41mAwaPwZ3tSvYkpm4TUAeFFofIEA==",     # yeobo4 / owo202202202@gmail.com
    "SRextBKpZ7AuNG4vlu1mOyq2/3dCXmWmdyIXDEnn58jvfXomqhiRAVxSvGCHxpHBiYwXaGmhTVtx9QqbadvKnA==",     # yeobo5 / junojam3652@gmail.com
]

# 전체 카테고리 리스트
categories_all = [
    "A01010100",                                # 자연, 자연관광지, 국립공원, 42개
    "A01010200",                                # 자연, 자연관광지, 도립공원, 26개
    "A01010300",                                # 자연, 자연관광지, 군립공원, 16개
    "A01010700",                                # 자연, 자연관광지, 수목원, 176개
    "A02020700",                                # 인문, 휴양관광지, 공원, 543개

    "A01010400",                                # 자연, 자연관광지, 산, 589개
    "A01010600",                                # 자연, 자연관광지, 자연휴양림, 210개
    "A01010900",                                # 자연, 자연관광지, 계곡, 279개

    "A01011300",                                # 자연, 자연관광지, 섬, 266개
    "A01011200",                                # 자연, 자연관광지, 해수욕장, 411개
    "A01011100",                                # 자연, 자연관광지, 해안절경, 47개

    "A02020100",                                # 인문, 휴양관광지, 유원지, 501개
    "A02020200",                                # 인문, 휴양관광지, 관광단지, 408개

    "A02020300",                                # 인문, 휴양관광지, 온천/욕장/스파, 110개
    "A02020500",                                # 인문, 휴양관광지, 헬스투어, 36개

    "A02020600",                                # 인문, 휴양관광지, 테마공원, 311개
    "A02020800",                                # 인문, 휴양관광지, 유람선/잠수함관광, 68개

    "A02050600",                                # 인문, 휴양관광지, 유명건물, 197개
    "A02050300",                                # 인문, 휴양관광지, 분수, 14개
    "A02030600",                                # 인문, 휴양관광지, 이색거리, 820개

    "A02060300",                                # 인문, 휴양관광지, 전시관, 399개
    "A02060400",                                # 인문, 휴양관광지, 컨벤션센터, 20개
    "A02060500",                                # 인문, 휴양관광지, 미술관, 348개
    "A02060600",                                # 인문, 휴양관광지, 공연장, 270개
]

# 전체 카테고리 리스트를 우리가 원하는 숫자로 변환
categories_all_list = [
    1, 1, 1, 1, 1,                              # 공원, 수목원, 803개
    2, 2, 2,                                    # 산, 자연휴양림, 1078개
    3, 3, 3,                                    # 섬, 해수욕장, 해안절경, 724개
    4, 4,                                       # 유원지, 501개
    5, 5,                                       # 휴식, 146개
    6, 6,                                       # 이색 놀거리, 379개
    7, 7, 7,                                    # 관광명소, 1031개
    8, 8, 8, 8                                  # 문화시설, 1037개
    ]

# categories_nature_1 = categories_all[0:5]
# categories_nature_2 = categories_all[5:8]
# categories_nature_3 = categories_all[8:11]
# categories_culture_1 = categories_all[11:13]
# categories_culture_2 = categories_all[13:15]
# categories_culture_3 = categories_all[15:17]
# categories_culture_4 = categories_all[17:20]
# categories_culture_5 = categories_all[20:24]

path_area = "/areaBasedList"                    # areaBasedList, 카테고리로 지역 조회
path_overview = "/detailCommon"                 # detailCommon, 상세 정보 조회

category_idx = 0                                # 카테고리마다 다른 숫자를 넣기 위한 idx 변수
API_AUTH_temp = 0                               # max_num마다 API_AUTH_KEY를 변경하기 위한 임시 변수
API_AUTH_idx = 0                                # max_Num마다 API_AUTH_KEY를 변경하기 위한 idx 변수
max_item_num = 820                              # 인문, 체험관광지, 이색거리가 820개로 가장 많은 content가 담겨있다.

attraction_list = []

for category in categories_all:
    
    # max_item_num 단위마다 API_AUTH_KEY를 갱신하기 위함
    API_AUTH_idx = API_AUTH_temp // max_item_num
    
    # area 쿼리문
    queryString_area1 = "?" + urlencode(
        {
            "MobileOS" : "ETC",
            "MobileApp" : "Yeobo",
            "serviceKey": API_AUTH_KEY_LIST[API_AUTH_idx],
            "_type":"json",
            "numOfRows": max_item_num,
            "pageNo": "1",
            "cat3": category,
        }
    )
    queryURL_area = BASE_URL + path_area + queryString_area1
    response_area = requests.get(queryURL_area, verify=False)
    text_area = response_area.text
    data_area = json.loads(text_area)
    
    for item in data_area["response"]["body"]["items"]["item"]:
        
        # max_item_num 단위마다 API_AUTH_KEY를 갱신하기 위함
        API_AUTH_idx = API_AUTH_temp // max_item_num
        
        # overview 쿼리문
        queryString_overview1 = "?" + urlencode(
            {
                "MobileOS" : "ETC",
                "MobileApp" : "Yeobo",
                "serviceKey": API_AUTH_KEY_LIST[API_AUTH_idx],
                "_type":"json",
                "contentId" : item["contentid"],
                "overviewYN" : "Y",
            }
        )
        queryURL_overview = BASE_URL + path_overview + queryString_overview1
        response_overview = requests.get(queryURL_overview, verify=False)
        text_overview = response_overview.text
        data_overview = json.loads(text_overview)
        item_overview = data_overview["response"]["body"]["items"]["item"]
        
        if (not item["firstimage"]) or (not item_overview[0]["overview"]):
            continue
        
        # print(f"카테고리 : {categories_all_list[category_idx]}")
        # print("언급횟수 : " + str(item["readcount"]))
        # print("contentid : "+ item["contentid"])
        # print("제목 : " + item["title"])
        # print("주소 : " + item["addr1"], item["areacode"])
        # print("위도, 경도 : " + item["mapy"], item["mapx"])
        # print("이미지1 : " + item["firstimage"])
        # print("이미지2 : " + item["firstimage2"])
        # print("요약 : " + item_overview[0]["overview"])
        # print("-------------------------------------")
        
        category = int(categories_all_list[category_idx])
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
        
        attraction_list.append(tuple([category, attraction_id, name, description, address, areacode, image, image2, mapx, mapy, score, readcount]))
        
        # API_AUTH_KEY를 전체 개수의 max_item_num마다 변경하기 위하여 API_AUTH_temp에 값을 추가한 후, 이를 API_AUTH_idx 로 변환하여 적용한다.
        API_AUTH_temp += 1
        
    # categories_all_list의 카테고리(A01010100 ~ A02020200 등) -> 우리가 원하는 카테고리(1~8)로 값을 변경하기 위한 변수 
    category_idx += 1

df = pd.DataFrame(attraction_list, columns=['category', 'attraction_id', 'name', 'description', 'address', 'areacode', 'image', 'iamge2', 'mapx', 'mapy', 'score', 'readcount'])
df.to_csv("atteraction.csv")

import pymysql
def mysql_save(lst):
    conn = pymysql.connect(
        host = 'localhost', 
        port = 3307, 
        user = 'root', 
        password = 'yeobo', 
        db = 'yeobo', 
        charset = 'utf8'
        )
    cursor = conn.cursor()
    sql = "INSERT INTO ATTRACTION(category, attraction_id, name, description, address, areacode, image, image2, mapx, mapy, score, readcount) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(sql, lst)
    conn.commit()
    conn.close()
mysql_save(attraction_list)