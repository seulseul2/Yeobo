from django.urls import path
from . import views

app_name = ''
urlpatterns = [
    path('MakeBoddari/Recommend/<int:attraction_id>/', views.recommend),
    path('MakeBoddari/PickCategory/<int:category>/', views.pick_category),
    path('MainPage/recommend/<int:user_id>/', views.main_recommend),
]