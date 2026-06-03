from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# LOAD MODEL
model = joblib.load("fraud_model.pkl")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = np.array([[
        data["amount"],
        data["failedAttempts"],
        data["isForeignTransaction"],
        data["isHighRiskCountry"],
        data["isWeekend"]
    ]])

    prediction = model.predict_proba(features)[0][1]

    return jsonify({
        "fraudProbability": float(prediction)
    })


if __name__ == "__main__":
    app.run(port=5001)