from django.urls import path
from . import views

app_name = 'yeobo'
urlpatterns = [
    path('/MakeBoddari/recommend/<int:attraction_id>/', views.recommend, name='recommend')
]