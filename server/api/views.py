from django import db
from django.http.request import HttpRequest
from django.shortcuts import render
from django.http import HttpResponse
from .db.user import CreateUser, FindUser
from .models import Article
from .serializers import ArticleSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .database import CreateOneProduct, FindAllProducts, FindAndDelete, findOneProduct , FindAndUpdate
from bson.objectid import ObjectId
import re 

# Create your views here.

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

class GenericAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, 
                     mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    lookup_field = 'id'
    # authentication_classes =  [SessionAuthentication, BasicAuthentication]
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    
    def get(self, request, id =None):
        if id: 
            return self.retrieve(request)
        else:
            return self.list(request)
        
    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.update(request,id)
    
    def delete(self, request, id):
        return self.destroy(request, id)

class ArticleAPIView(APIView):
    #Get all article lists 
    def get(self, request):
        article = FindAllProducts()
        return Response(article)
    
    #Post one article to database
    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        
        if serializer.is_valid():
            # serializer.save()
            CreateOneProduct(request.data)#request.data creates everyting in mongodb 
            #with date without date use serializer.data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ArticleDetails(APIView): 
    def get(self, request, id):
        oneProduct = findOneProduct(id)
        return Response(oneProduct)
    
    def put(self, request, id):
        nesto = FindAndUpdate(id,request.data)
        if nesto :
            return HttpResponse(status=status.HTTP_200_OK)
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        nesto = FindAndDelete(id)
        if nesto :
            return HttpResponse(status=status.HTTP_200_OK)
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

class Register(APIView):
    def post(self, request):
        newEmail = request.data["email"]
        newPass = request.data["pass"]
        regexMail = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        regexPass = r'[A-Za-z0-9@#$%^&+=]{8,}'
        if (re.fullmatch(regexMail,newEmail) and  re.fullmatch(regexPass, newPass)):
            CreateUser(request.data)
            return HttpResponse(status=status.HTTP_201_CREATED)
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)
    
class Login(APIView):
    # permission_classes = (permissions.AllowAny,)
    def post(self, request):
        newEmail = request.data["email"]
        newPass = request.data["pass"]
        dbUser = FindUser(newEmail)
        if newEmail == dbUser["email"] and newPass == dbUser["pass"]:
            return HttpResponse(status=status.HTTP_200_OK)
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    