import pandas as pd
import requests
import time
import random

# 🔥 your deployed backend URL
URL = "https://sigma-squad.onrender.com/api/data"

# 📊 load dataset
df = pd.read_csv("processed_data.csv")

# shuffle dataset
df = df.sample(frac=1).reset_index(drop=True)

print("🚀 Starting realistic traffic simulation...\n")

for i, row in df.iterrows():
    data = row.to_dict()

    # remove label before sending
    label = data.pop("Label", "UNKNOWN")

    try:
        res = requests.post(URL, json=data)
        result = res.json()

        # 🎯 PRINT NICE LOGS
        if result.get("anomaly"):
            print(f"🚨 ATTACK DETECTED → {result.get('attackType')} | Source: {label}")
        else:
            print(f"🟢 Normal Traffic | Source: {label}")

    except Exception as e:
        print("❌ Error:", e)

    # 🧠 SMART DELAY (IMPORTANT)
    if label == "BENIGN":
        time.sleep(random.uniform(0.3, 0.8))  # fast normal traffic
    else:
        time.sleep(random.uniform(1, 2))      # slower attacks