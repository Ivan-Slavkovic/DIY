from datetime import datetime
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.objectid import ObjectId

cluster = MongoClient("mongodb+srv://wreckeRRR:52466nagini@cluster0.p5frv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster['test']
collection = db["test"]

def CreateOneProduct(product):
    return collection.insert_one(product)
    
def FindAllProducts():
    arrayOfProducts = []
    for x in collection.find():
        arrayOfProducts.append(parse_json(x))
    return arrayOfProducts

def parse_json(data):
    return json.loads(json_util.dumps(data))

def findOneProduct(id):
    temp = 1
    theObject = ObjectId(id)
    x = collection.find({"_id": theObject})
    for result in x:
        temp = parse_json(result)
    return temp

def FindAndUpdate(id, data):
    theObject = ObjectId(id)
    y = findOneProduct(id)
    if y == 1:
        return False
    productId = y['_id']["$oid"]
    if productId == id:
        x = collection.update_one({"_id": theObject}, {"$set": data})
        return True
    return False    

def FindAndDelete(id):
    theObject = ObjectId(id)
    y = findOneProduct(id)
    if y == 1:
        return False
    productId = y['_id']["$oid"]
    if productId == id:
        x = collection.delete_one({"_id": theObject})
        return True
    return False 
    