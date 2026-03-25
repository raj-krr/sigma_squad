# =========================================
# FASTAPI ML SERVICE
# =========================================

from fastapi import FastAPI
import numpy as np
import joblib
import tensorflow as tf

# =========================================
# LOAD MODELS
# =========================================

model_bin = tf.keras.models.load_model("dl_binary_model.h5")
model_multi = tf.keras.models.load_model("dl_multi_model.h5")

scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# =========================================
# INIT APP
# =========================================

app = FastAPI()

# =========================================
# PREPROCESS FUNCTION
# =========================================

def preprocess(data: list):
    X = np.array(data).reshape(1, -1)
    X_scaled = scaler.transform(X)
    return X_scaled

# =========================================
# HEALTH CHECK
# =========================================

@app.get("/")
def home():
    return {"message": "ML API Running 🚀"}

# =========================================
# PREDICT ROUTE
# =========================================

@app.post("/predict")
def predict(data: dict):
    """
    Expected input:
    {
        "features": [f1, f2, f3, ...]
    }
    """

    X = preprocess(data["features"])

    # ---- Binary Prediction ----
    anomaly_prob = model_bin.predict(X)[0][0]
    is_anomaly = int(anomaly_prob > 0.5)

    result = {
        "anomaly": bool(is_anomaly),
        "confidence": float(anomaly_prob)
    }

    # ---- Multi-class Prediction ----
    if is_anomaly:
        attack_probs = model_multi.predict(X)
        attack_class = np.argmax(attack_probs)
        attack_label = label_encoder.inverse_transform([attack_class])[0]

        result["attack_type"] = attack_label

    return result
