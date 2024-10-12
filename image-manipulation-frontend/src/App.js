import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [operation, setOperation] = useState(''); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setOriginalImage(URL.createObjectURL(event.target.files[0]));
    setModifiedImage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('operation', operation);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      setModifiedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setModifiedImage(null);
    setOperation('');
  };

  const handleSaveImage = () => {
    if (modifiedImage) {
      const link = document.createElement('a');
      link.href = modifiedImage;
      link.download = 'modified_image.jpg';
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Image Manipulation Tool</h1>

      <div style={styles.sidebar}>
        <h3>Edit Methods</h3>
        <button onClick={() => setOperation('color')} style={styles.sidebarButton}>Color</button>
        <button onClick={() => setOperation('bw')} style={styles.sidebarButton}>Black & White</button>
        <button onClick={() => setOperation('grayscale')} style={styles.sidebarButton}>Grayscale</button>
        <button onClick={() => setOperation('rotate')} style={styles.sidebarButton}>Rotate</button>
        <button onClick={() => setOperation('crop')} style={styles.sidebarButton}>Crop</button>
        <button onClick={() => setOperation('flip')} style={styles.sidebarButton}>Flip</button>
      </div>

      <div style={styles.mainContent}>
        <input type="file" accept="image/*" onChange={handleFileChange} style={styles.uploadButton} />
        <button onClick={handleUpload} style={styles.actionButton}>Process</button>
        <button onClick={handleReset} style={styles.actionButton}>Reset</button>
        <button onClick={handleSaveImage} style={styles.actionButton}>Save Modified Image</button>

        <div style={styles.imageContainer}>
          {originalImage && <img src={originalImage} alt="Original" style={styles.image} />}
          {modifiedImage && <img src={modifiedImage} alt="Modified" style={styles.image} />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: 'linear-gradient(to right, lightblue, lightpurple)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    color: '#fff'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  sidebarButton: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'left'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px'
  },
  actionButton: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    width: '200px',
    textAlign: 'center'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    width: '100%'
  },
  image: {
    width: '300px',
    height: 'auto',
    border: '2px solid #fff',
    borderRadius: '10px'
  }
};

export default App;
