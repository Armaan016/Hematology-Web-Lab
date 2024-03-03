import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from joblib import dump

# Load your data
data = pd.read_csv('anemia data from Kaggle.csv')

X = data.drop(['Gender','MCHC','Result'], axis=1)
y = data["Result"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

clf = SVC()

clf.fit(X_train, y_train)

dump(clf, 'svm_model2.joblib')

# y_pred = clf.predict(X_test)
# print(f"Predictions:\n{y_pred}")
# print(f"Actual values:\n{y_test}")
