from io import DEFAULT_BUFFER_SIZE
from urllib.parse import urlencode, unquote
import requests
import json
from pprint import pprint
import pymysql
# import pandas as pd
# import math
# import numpy as np

BASE_URL = "http://apis.data.go.kr/B551011/KorService"
API_AUTH_KEY = "CpszSPbwDkKnYx0BvDqy%2BvMtHpZ9JMozRWNbGvfNZ7vVhx7keYRyLAuyldTzHZ4QWvH4xj4DnASOakTS7kAqLg%3D%3D"
API_AUTH_KEY = unquote(API_AUTH_KEY)

# ----------------------------------------------------

# # DEFAULT_QUERY_STRING으로 default 쿼리를 기록해서 dict + dict 연산 하려했는데 잘 안돼서 일단 스톱
# DEFAULT_QUERY_STRING = {
#     "MobileOS" : "ETC",
#     "MobileApp" : "Yeobo",
#     "serviceKey": API_AUTH_KEY,
#     "_type":"json",
# }

# ----------------------------------------------------

# 인문, 체험관광지, 이색거리가 820개로 가장 많은 content가 담겨있다.
max_item_num = 820

# 전체 카테고리 리스트
categories_all = [
    "A01010100", # 자연, 자연관광지, 국립공원
    "A01010200", # 자연, 자연관광지, 도립공원
    "A01010300", # 자연, 자연관광지, 군립공원
    "A01010700", # 자연, 자연관광지, 수목원
    "A02020700", # 인문, 휴양관광지, 공원
    
    "A01010400", # 자연, 자연관광지, 산
    "A01010600", # 자연, 자연관광지, 자연휴양림
    "A01010900", # 자연, 자연관광지, 계곡
    
    "A01011300", # 자연, 자연관광지, 섬
    "A01011200", # 자연, 자연관광지, 해수욕장
    "A01011100", # 자연, 자연관광지, 해안절경
    
    "A02020100", # 인문, 휴양관광지, 유원지
    "A02020200", # 인문, 휴양관광지, 관광단지

    "A02020300", # 인문, 휴양관광지, 온천/욕장/스파
    "A02020500", # 인문, 휴양관광지, 헬스투어
    
    "A02020600", # 인문, 휴양관광지, 테마공원
    "A02020800", # 인문, 휴양관광지, 유람선/잠수함관광
    
    "A02050600", # 인문, 휴양관광지, 유명건물
    "A02050300", # 인문, 휴양관광지, 분수
    "A02030600", # 인문, 휴양관광지, 이색거리
    
    "A02060300", # 인문, 휴양관광지, 전시관
    "A02060400", # 인문, 휴양관광지, 컨벤션센터
    "A02060500", # 인문, 휴양관광지, 미술관
    "A02060600", # 인문, 휴양관광지, 공연장
]

# ----------------------------------------------------

# 전체 카테고리 dictionary
categories_all_dict = {
    "국립공원" : "A01010100", # 자연, 자연관광지, 국립공원
    "도립공원" : "A01010200", # 자연, 자연관광지, 도립공원
    "군립공원" : "A01010300", # 자연, 자연관광지, 군립공원
    "수목원" : "A01010700", # 자연, 자연관광지, 수목원
    "공원" : "A02020700", # 인문, 휴양관광지, 공원
    
    "산" : "A01010400", # 자연, 자연관광지, 산
    "자연휴양림" : "A01010600", # 자연, 자연관광지, 자연휴양림
    "계곡" : "A01010900", # 자연, 자연관광지, 계곡
    
    "섬" : "A01011300", # 자연, 자연관광지, 섬
    "해수욕장" : "A01011200", # 자연, 자연관광지, 해수욕장
    "해안절경" : "A01011100", # 자연, 자연관광지, 해안절경
    
    "유원지" : "A02020100", # 인문, 휴양관광지, 유원지
    "관광단지" : "A02020200", # 인문, 휴양관광지, 관광단지
    
    "온천/욕장/스파" : "A02020300", # 인문, 휴양관광지, 온천/욕장/스파
    "헬스투어" : "A02020500", # 인문, 휴양관광지, 헬스투어
    
    "테마공원" : "A02020600", # 인문, 휴양관광지, 테마공원
    "유람선/잠수함관광" : "A02020800", # 인문, 휴양관광지, 유람선/잠수함관광
    
    "유명건물" : "A02050600", # 인문, 휴양관광지, 유명건물
    "분수" : "A02050300", # 인문, 휴양관광지, 분수
    "이색거리" : "A02030600", # 인문, 휴양관광지, 이색거리
    
    "전시관" : "A02060300", # 인문, 휴양관광지, 전시관
    "컨벤션센터" : "A02060400", # 인문, 휴양관광지, 컨벤션센터
    "미술관" : "A02060500", # 인문, 휴양관광지, 미술관
    "공연장" : "A02060600", # 인문, 휴양관광지, 공연장
}
# print(type(categories_all_dict))

# for key, value in categories_all_dict.items():
#     print(key, value)

# ----------------------------------------------------

# 우리가 정한 항목 카테고리 리스트
# 분할해서 덮어씌우는 등 작업할 때 처리 방법
categories_nature_1 = categories_all[0:5]
categories_nature_2 = categories_all[5:8]
categories_nature_3 = categories_all[8:11]
categories_culture_1 = categories_all[11:13]
categories_culture_2 = categories_all[13:15]
categories_culture_3 = categories_all[15:17]
categories_culture_4 = categories_all[17:20]
categories_culture_5 = categories_all[20:24]

path_area = "/areaBasedList"    # areaBasedList, 카테고리로 지역 조회
path_overview = "/detailCommon" # detailCommon, 상세 정보 조회

i = 0
for category in categories_all:
    # area 쿼리문
    queryString_area1 = "?" + urlencode(
        {
            "MobileOS" : "ETC",
            "MobileApp" : "Yeobo",
            "serviceKey": API_AUTH_KEY,
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
    i += 1
    j = 0
    for item in data_area["response"]["body"]["items"]["item"]:
        # overview 쿼리문
        queryString_overview1 = "?" + urlencode(
            {
                "MobileOS" : "ETC",
                "MobileApp" : "Yeobo",
                "serviceKey": API_AUTH_KEY,
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
        
        j += 1
        
        print(f"{i}번째 카테고리 : {category}, {j}번째 항목")
        print("언급횟수 : " + str(item["readcount"]))
        print("contentid : "+ item["contentid"])
        print("제목 : " + item["title"])
        print("주소 : " + item["addr1"], item["areacode"])
        print("위도, 경도 : " + item["mapy"], item["mapx"])
        print("이미지1 : " + item["firstimage"])
        print("이미지2 : " + item["firstimage2"])
        print("요약 : " + item_overview[0]["overview"])
        print("-------------------------------------")
        if i==1: break
