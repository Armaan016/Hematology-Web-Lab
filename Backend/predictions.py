import pandas as pd
from joblib import load
import json
import sys

knn_model = load("../ML Models/knn_model.joblib")
knn_model2 = load("../ML Models/knn_model2.joblib")
gnb_model = load("../ML Models/gnb_model.joblib")
gnb_model2 = load("../ML Models/gnb_model2.joblib")
logReg_model = load("../ML Models/logisticReg_model.joblib")
logReg_model2 = load("../ML Models/logisticReg_model2.joblib")
dt_model = load("../ML Models/dt_model.joblib")
dt_model2 = load("../ML Models/dt_model2.joblib")
rf_model = load("../ML Models/rf_model.joblib")
rf_model2 = load("../ML Models/rf_model2.joblib")
svm_model = model = load("../ML Models/svm_model.joblib")
svm_model2 = model = load("../ML Models/svm_model2.joblib")

def predict_knn(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = knn_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_knn2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = knn_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_gnb(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = gnb_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_gnb2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = gnb_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_logReg(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = logReg_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_logReg2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = logReg_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_dt(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = dt_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_dt2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = dt_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_rf(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = rf_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_rf2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = rf_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_svm(input_data):
    new_point = pd.DataFrame({
        'Gender': [input_data['Gender']],
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCHC': [float(input_data['MCHC'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = svm_model.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def predict_svm2(input_data):
    new_point = pd.DataFrame({
        'Hemoglobin': [float(input_data['Hemoglobin'])],
        'MCH': [float(input_data['MCH'])],
        'MCV': [float(input_data['MCV'])]
    })
    new_pred = svm_model2.predict(new_point)
    prediction_result = 1 if new_pred[0] == 1 else 0
    return prediction_result

def main():
    # print(sys.argv[1])
    input_data = json.loads(sys.argv[1])
#     input_data = {
#   "Gender": "1",
#   "Hemoglobin": "20",
#   "MCH": "20",
#   "MCHC": "20",
#   "MCV": "10",
#   "Model": "KNN"
# }
    # print(input_data)
    predictions = {}    
    predictions["KNN"] = [predict_knn(input_data),predict_knn2(input_data)]
    # predictions["KNN2"] = predict_knn2(input_data)
    predictions["GNB"] = [predict_gnb(input_data),predict_gnb2(input_data)]
    # predictions["GNB2"] = predict_gnb2(input_data)
    predictions["logisticRegression"] = [predict_logReg(input_data),predict_logReg2(input_data)]
    # predictions["logisticRegression2"] = predict_logReg2(input_data)
    predictions["decisionTree"] = [predict_dt(input_data),predict_dt2(input_data)]
    # predictions["decisionTree2"] = predict_dt2(input_data)
    predictions["randomForest"] = [predict_rf(input_data),predict_rf2(input_data)]
    # predictions["randomForest2"] = predict_rf2(input_data)
    predictions["SVM"] = [predict_svm(input_data),predict_svm2(input_data)]
    # predictions["SVM2"] = predict_svm2(input_data)
    # print(predictions)
    print(json.dumps(predictions))


if __name__ == "__main__":
    main()
