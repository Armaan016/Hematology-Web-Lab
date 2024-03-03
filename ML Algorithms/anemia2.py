from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
# from sklearn.metrics import accuracy_score
import pandas as pd
from joblib import dump

data = pd.read_csv('anemia data from Kaggle.csv')
# print(data.head())

# data = data.drop('Gender','MCHC','Result')

# print(data)

X = data.drop(['Gender','MCHC','Result'], axis=1)
# print(X)
y = data["Result"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

knn_classifier = KNeighborsClassifier(n_neighbors=5)

knn_classifier.fit(X_train, y_train)

dump(knn_classifier, 'knn_model2.joblib')


# new_point = [[1,22,35,40,77]]
# new_pred = knn_classifier.predict(new_point)
# print(new_pred[0])

# print(X_test) 