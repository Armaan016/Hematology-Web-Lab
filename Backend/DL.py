import warnings
warnings.filterwarnings('ignore')
import sys
import json
import pickle
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

model=pickle.load(open("./Model","rb"))

# dir_path=r'Lymphocyte image.jpeg'
dir_path=sys.argv[1]

img=image.load_img(dir_path,target_size=(199,199,3))
# plt.imshow(img)
X=image.img_to_array(img)
X=np.expand_dims(X,axis=0)

predictions = model.predict(X, verbose=0)
predicted_class_index = np.argmax(predictions[0])
predicted_class = ['LYMPHOCYTE', 'MONOCYTE'][predicted_class_index]
precision_rate = predictions[0][predicted_class_index] * 97.82

answer = [predicted_class,precision_rate]
# print([predicted_class,precision_rate])
print(json.dumps(answer))