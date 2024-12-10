# Comprehensive Image Processing Tool

This project is a comprehensive image processing tool developed as a group assignment. It allows users to perform basic and advanced image manipulations and integrates deep learning techniques for advanced functionalities.

---

## Features

### Basic Requirements
- **Image Upload**:  
  Users can upload an image of their choice. Both the original image and the modified images are displayed in a side-by-side view.
  
- **Basic Manipulations**:  
  - **Color Change**: Convert images to color, black and white, or grayscale.
  - **Transformations**:  
    - **Rotation**: Rotate the image to any desired angle.  
    - **Cropping**: Crop the image to a desired size and shape.  
    - **Flipping**: Flip the image either horizontally or vertically.

### Advanced Requirements
Each group member implemented one or more of the following features:

- **Filters**:  
  - **Sharpening**: Enhance the details of the image.  
  - **Smoothing**: Reduce noise and blur the image.  
  - **Edge Detection**: Highlight edges in the image.  
  - **Embossing**: Create a raised effect on the image.

- **Intensity Manipulation using Color Transformation**:  
  - **Tonal Transformations**: Adjust tonal range to enhance or suppress specific tones.  
  - **Color Balancing**: Modify the colors to appear more natural or achieve a specific effect.

- **Image Segmentation**:  
  - **Region-Based Segmentation**: Divide the image into segments based on regions of interest.

### Deep Learning Features
- **Image Enhancement**: Enhance image quality by reducing noise and improving sharpness.
- **Style Transfer**: Apply the style of one image onto another using neural networks.
- **Image Segmentation**: Segment an image into multiple regions using advanced machine learning models.
- **Image Generation using GANs**: Generate new images resembling a given dataset.

---

### Usage
- Upload an image through the interface.
- Use the provided tools to apply basic or advanced manipulations.
- For deep learning functionalities, select the desired option (e.g., Style Transfer, GANs) and follow the instructions provided in the UI.  

### Technologies Used
- **Frontend**: HTML, CSS, JavaScript (Flask for templating)
- **Backend**: Python (Flask)
- **Image Manipulation**: OpenCV, NumPy
- **Deep Learning**: TensorFlow, PyTorch
