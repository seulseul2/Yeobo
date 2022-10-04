from django.urls import path
from . import views

app_name = ''
urlpatterns = [
    path('MakeBoddari/Recommend/<int:attraction_id>/', views.make_boddari_recommend),
    path('MakeBoddari/AreaCode/<int:attraction_id>/', views.make_boddari_area_code),
    path('MakeBoddari/PickCategory/<int:category>/', views.make_boddari_pick_category),
    path('MergeBoddari/Recommend/<int:user_id_1>/<int:user_id_2>/', views.merge_boddari_recommend),
    path('MainPage/RecentHighScoreBasedRecommend/<int:user_id>/', views.main_page_recent_high_score_based_recommend),
    path('MainPage/AreaBasedRecommend/<int:user_id>/', views.main_page_area_based_recommend),
]