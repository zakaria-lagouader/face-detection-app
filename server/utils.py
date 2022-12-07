import cv2
import base64

trained_face_data = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def detectFacesAndReturnBase64(img):
    # Must convert to grayscale
    grayscaled_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect Face
    face_coods = trained_face_data.detectMultiScale(grayscaled_img)


    # Draw Reactangle arround the face
    for (x, y, w, h) in face_coods:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 10)

    # Convert captured image to JPG
    retval, buffer = cv2.imencode('.jpg', img)

    # Convert to base64 encoding and show start of data
    jpg_as_text = base64.b64encode(buffer).decode()

    return jpg_as_text