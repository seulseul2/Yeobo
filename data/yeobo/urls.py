from django.urls import path
from . import views

app_name = ''
urlpatterns = [
    # category -> 해당 카테고리의 여행지 30곳을 랜덤으로 반환(언급 횟수 >= 10,000)
    path('MakeBoddari/PickCategory/<int:category>/', views.make_boddari_pick_category),
    
    # attraction_id -> 동일 지역의 여행지 30곳을 랜덤으로 반환(언급 횟수 >= 10,000)
    path('MakeBoddari/AreaCode/<int:attraction_id>/', views.make_boddari_area_code),
    
    # 추천 여행지
    # attraction_id -> 유사도 기반 여행지 상위 4곳을 반환(언급 횟수 >= 10,000)
    path('MakeBoddari/Recommend/<int:attraction_id>/', views.make_boddari_recommend),
    
    # 보따리 합치기
    # bag_id_1, bag_id_2 -> 유사도 계산 값을 평균내어 여행지 상위 10곳 반환 
    path('MergeBoddari/Recommend/<int:bag_id_1>/<int:bag_id_2>/', views.merge_boddari_recommend),
    
    # user_id -> 가장 높은 평점을 준 여행지 중 최근에 평점을 부여한 여행지의 유사도 기반 여행지 6곳 반환
    path('MainPage/RecentHighScoreBasedRecommend/<int:user_id>/', views.main_page_recent_high_score_based_recommend),
    
    # user_id -> 가장 많이 다녀온 여행지 지역을 기준으로 여행지 6곳 반환(언급 횟수 >= 80,000)
    path('MainPage/AreaBasedRecommend/<int:user_id>/', views.main_page_area_based_recommend),
]