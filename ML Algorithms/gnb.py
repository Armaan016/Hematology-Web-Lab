import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from joblib import dump

data = pd.read_csv('anemia data from Kaggle.csv')

X = data.drop("Result", axis=1)
y = data["Result"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

clf = GaussianNB()

clf.fit(X_train,y_train)

dump(clf, 'gnb_model.joblib')


# y_pred = clf.predict(X_test)
# print(f"Predictions\n{y_pred}")
# print(f"Actual\n{y_test}")