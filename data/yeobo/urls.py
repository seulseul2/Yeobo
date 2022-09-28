from django.urls import path
from . import views

app_name = ''
urlpatterns = [
    path('makeBoddari/recommend/<int:attraction_id>/', views.recommend, name='recommend'),
    path('makeBoddari/select/<int:category>', views.select, name='select'),
]