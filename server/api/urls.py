
from django.db import router
from django.urls import path, include
from .views import  ArticleAPIView, ArticleDetails, ArticleViewSet, Login, Register
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('article', ArticleViewSet, basename='article')

urlpatterns = [
    path('viewset/', include(router.urls)),
    path('viewset/<str:pk>/', include(router.urls)),
    path('article/', ArticleAPIView.as_view()),
    path('detail/<str:id>', ArticleDetails.as_view()),
    path('register/', Register.as_view()),
    path('login/', Login.as_view())
]
