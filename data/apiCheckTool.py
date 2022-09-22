from urllib.parse import urlencode, unquote
import requests

BASE_URL = "http://apis.data.go.kr/B551011/KorService/areaBasedList"
API_AUTH_KEY_LIST = [
    "CpszSPbwDkKnYx0BvDqy%2BvMtHpZ9JMozRWNbGvfNZ7vVhx7keYRyLAuyldTzHZ4QWvH4xj4DnASOakTS7kAqLg==",   # 영훈형
    "wlWf/ScYRE2EgX56o0YFoqwUkO9oD82OUH1LnvlPE8w9cuI/6IYvSBuQaFi7t5+QXHcYo2tgZ/uIeiuGq67YLw==",     # nak3652 / nak3652@naver.com
    "7Zy0RLAtwkmNz5fgIDJdIV/QcSk8GhikA7PThgnjDRcQijSM6GNOiLuO40OpE+nSLslQhz8NWklurVTJdQeykA==",     # junojam0622 / junojam0622@gmail.com
    "pn+PZBhNvRIOy6lvKKuVTJka19eNU08Yg/E4pgb0OT+zCKqbhBwHDhOfcIse6d/M2Pn3SUZWp7lTVtOmC2PRDw==",     # yeobo1 / yeobo103@gmail.com
    "yNNCPJRanMk5x96rL+DCEgPFqt1BmFmbYRpGSlDTva/1Z7D+IXzGSYEEhX0bieQbSlj5HpvF4QDSaVhy2ZdIdA==",     # yeobo2 / s3652@yonsei.ac.kr
    "WAlqT5QvzF6rGMxbDZoPmdmohvGhMecJFO4GjNt34DZ1j1uULWZfbQDVsDngctE8+EqlGlJHZ+g9QG6zkjj6wA==",     # yeobo3 / junojam0622@naver.com
    "l7J/tYKQyIDPhvILVJCAYeUtNLSV5A2icjrQjdv/tPKyS8INCxMas0yvW41mAwaPwZ3tSvYkpm4TUAeFFofIEA==",     # yeobo4 / owo202202202@gmail.com
    "SRextBKpZ7AuNG4vlu1mOyq2/3dCXmWmdyIXDEnn58jvfXomqhiRAVxSvGCHxpHBiYwXaGmhTVtx9QqbadvKnA==",     # yeobo5 / junojam3652@gmail.com
]

print("API_AUTH_KEY 사용 가능 / 불가능 여부")
print("-----------------------------------------------------------------------------------------------------------")

for i in range(8):
    try: 
        API_AUTH_KEY = unquote(API_AUTH_KEY_LIST[i])
        queryString_area = "?" + urlencode(
            {
                "MobileOS" : "ETC",
                "MobileApp" : "Yeobo",
                "serviceKey": API_AUTH_KEY,
                "cat3": "A01010100"
            }
        )
        response_area = requests.get(BASE_URL + queryString_area, verify=False)

        print(f'{i} : 사용 가능 ({API_AUTH_KEY_LIST[i]})')
    except:
        print(f'{i} : 사용 불가능')

print("-----------------------------------------------------------------------------------------------------------")