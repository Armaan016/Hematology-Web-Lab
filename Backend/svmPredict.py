import pandas as pd
# from sklearn.neighbors import KNeighborsClassifier
from joblib import load
import json
import sys

model = load(r"C:\Users\raufu\OneDrive\Desktop\React\hematology\ML Models\svm_model.joblib")

input_data = json.loads(sys.argv[1])
# input_data = { 'Gender': 0, 'Hemoglobin': '24', 'MCH': '35', 'MCHC': '77', 'MCV': '46' }

new_point = pd.DataFrame({
    'Gender': [input_data['Gender']],
    'Hemoglobin': [float(input_data['Hemoglobin'])],
    'MCH': [float(input_data['MCH'])],
    'MCHC': [float(input_data['MCHC'])],
    'MCV': [float(input_data['MCV'])]
})

new_pred = model.predict(new_point)

# prediction_result = "Anemic" if new_pred[0] == 1 else "Non-Anemic"
prediction_result = 1 if new_pred[0] == 1 else 0

# print(json.dumps({"prediction": prediction_result}))
print(prediction_result)