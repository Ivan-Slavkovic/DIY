from datetime import datetime
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.objectid import ObjectId
from ..database import parse_json

cluster = MongoClient("mongodb+srv://wreckeRRR:52466nagini@cluster0.p5frv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster['test']
collection = db["user"]

def CreateUser(data):
    return collection.insert_one(data)

def FindUser(email):
    temp = 0
    x = collection.find({"email": email})
    for result in x:
        temp = parse_json(result)
    return temp
