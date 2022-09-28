from django.urls import path
from . import views

urlpatterns = [
    path('<int:attraction_id>/', views.recommend, name='recommend')
]