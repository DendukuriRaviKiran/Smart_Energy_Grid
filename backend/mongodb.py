from flask import Flask, jsonify, make_response, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://GreenCloud:Yq3Ut0mzDnblmq89@cluster0.hbsioov.mongodb.net/?retryWrites=true&w=majority")
db = client["smartgrid"]
batteries_collection = db["batteries"]
solar_collection = db["solar"]
admin_credentials_collection = db["admin_credentials"]

@app.route("/batteries/Option1", methods=["GET"])
def get_batteries():
    batteries = list(batteries_collection.find({}))
    for battery in batteries:
        battery["_id"] = str(battery["_id"])
    return make_response(jsonify(batteries))

@app.route("/solar/Option1", methods=["GET"])
def get_solar():
    batteries = list(solar_collection.find({}))
    for battery in batteries:
        battery["_id"] = str(battery["id"])
    return make_response(jsonify(batteries))

@app.route("/battery/Option1/<battery_id>", methods=["DELETE"])
def delete_battery(battery_id):
    batteries = list(batteries_collection.find({}))
    for battery in batteries:
        print(battery["id"],str(battery_id))
        if str(battery["id"]) == str(battery_id):
            batteries_collection.delete_one({"id": battery["id"]})
            return make_response(f"Battery with id {battery_id} deleted", 200)
    return make_response(f"Battery with id {battery_id} not found", 404)

@app.route("/solar/Option1/<solar_id>", methods=["DELETE"])
def delete_solar(solar_id):
    solar_entries = list(solar_collection.find({}))
    for solar in solar_entries:
        print(str(solar["id"]),str(solar_id))
        if str(solar["id"]) == str(solar_id):
            solar_collection.delete_one({"id": solar["id"]})
            return make_response(f"Solar entry with ID {solar_id} deleted", 200)
    return make_response(f"Solar entry with ID {solar_id} not found", 404)

@app.route("/Option1/batterycreate", methods=["POST"])
def create_battery():
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")

    if not name or not id or not value:
        return make_response("Missing required fields", 400)

    battery = {"name": name, "id": id, "value": value}
    result = batteries_collection.insert_one(battery)

    return make_response(f"Battery created with ID {result.inserted_id}", 201)

@app.route("//Option1/solarcreate", methods=["POST"])
def create_solar():
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")

    if not name or not id or not value:
        return make_response("Missing required fields", 400)

    battery = {"name": name, "id": id, "value": value}
    result = solar_collection.insert_one(battery)

    return make_response(f"Solar created with ID {result.inserted_id}", 201)

@app.route("/admin_credentials", methods=["GET"])
def get_admin_credentials():
    admin_credentials = list(admin_credentials_collection.find({}))
    for credential in admin_credentials:
        credential["_id"] = str(credential["_id"])
        return make_response(str(credential["email"]))


if __name__ == "__main__":
    app.run(debug=True)
