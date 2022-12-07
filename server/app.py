from flask import *
from utils import *
from flask_cors import CORS
import numpy
import cv2

app = Flask(__name__)
# Enable Cors
CORS(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    return "simple text"


@app.post("/upload")
def getImageBase46Encoding():
    #read image file string data
    file = request.files["image"]
    #convert string data to numpy array
    fileBytes = numpy.fromfile(file, numpy.uint8)
    # convert numpy array to image
    img = cv2.imdecode(fileBytes, cv2.IMREAD_COLOR)
    
    return jsonify({
        "message": "success",
        "image": detectFacesAndReturnBase64(img)
    })
     