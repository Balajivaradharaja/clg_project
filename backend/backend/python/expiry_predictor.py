import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta  
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import os

print(os.getcwd())

medicine_names = [
    'Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Cetirizine', 'Azithromycin',
    'Metformin', 'Omeprazole', 'Aspirin', 'Levocetirizine', 'Ciprofloxacin',
    'Pantoprazole', 'Dolo 650', 'Augmentin', 'Crocin', 'Combiflam',
    'Disprin', 'Allegra', 'Erythromycin', 'Ranitidine', 'Zincovit'
]

categories = ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Ointment']
brands = ['PharmaOne', 'MediLife', 'CureFast', 'HealthPlus', 'WellnessInc']

# Generate fake data
fake_data = []
for i in range(1000):
    name = random.choice(medicine_names)
    expiry_days = random.randint(10, 720)
    expiry_date = (datetime.today() + timedelta(days=expiry_days)).strftime('%Y-%m-%d') 
    price = round(random.uniform(10.0, 500.0), 2)
    quantity = random.randint(1, 100)
    category = random.choice(categories)
    brand = random.choice(brands)

    fake_data.append({
        "name": name,
        "expiryDate": expiry_date,
        "price": price,
        "quantity": quantity,
        "category": category,
        "brand": brand
    })

df = pd.DataFrame(fake_data)

df['expiryDate'] = pd.to_datetime(df['expiryDate'])
today = datetime.today()
df['days_until_expiry'] = (df['expiryDate'] - today).dt.days
df['expiring_soon'] = df['days_until_expiry'] <= 180

le_cat = LabelEncoder()
df['category_encoded'] = le_cat.fit_transform(df['category'])

le_brand = LabelEncoder()
df['brand_encoded'] = le_brand.fit_transform(df['brand'])

features = ['price', 'quantity', 'category_encoded', 'brand_encoded']
X = df[features]
y = df['expiring_soon']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

df['days_until_expiry'] = (df['expiryDate'] - today).dt.days
expiring_soon = df[df['days_until_expiry'] <= 180]

for name in expiring_soon['name']:
    print(f'Product "{name}" is going to expire soon.')

plt.figure(figsize=(10, 5))
sns.histplot(df['days_until_expiry'], bins=30, kde=True)
plt.axvline(180, color='red', linestyle='--', label='180 days threshold')
plt.title("Distribution of Days Until Expiry")
plt.xlabel("Days Until Expiry")
plt.ylabel("Number of Products")
plt.legend()
plt.show()

