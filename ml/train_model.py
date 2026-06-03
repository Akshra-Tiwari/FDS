import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

import joblib


# LOAD DATASET
data = pd.read_csv("transactions.csv")


# FEATURES
X = data.drop("fraud", axis=1)

# TARGET
y = data["fraud"]


# SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# MODEL
model = RandomForestClassifier()

model.fit(X_train, y_train)


# SAVE MODEL
joblib.dump(model, "fraud_model.pkl")


print("Model trained successfully")