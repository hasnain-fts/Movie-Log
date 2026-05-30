from django.urls import path
from . import views

urlpatterns = [
    path('favorites/', views.get_favorites),
    path('favorites/add/', views.add_favorite),
    path('favorites/remove/<int:movie_id>/', views.remove_favorite),
    path('signup/', views.signup),
]