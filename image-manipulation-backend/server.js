const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    let modifiedImage;

    // Check the operation
    switch (req.body.operation) {
      case 'color':
        modifiedImage = await sharp(req.file.buffer).toFormat('jpeg').toBuffer();
        break;
      case 'bw':
        modifiedImage = await sharp(req.file.buffer).grayscale().toBuffer();
        break;
      case 'grayscale':
        modifiedImage = await sharp(req.file.buffer).greyscale().toBuffer();
        break;
      case 'rotate':
        modifiedImage = await sharp(req.file.buffer).rotate(90).toBuffer(); // Rotate by 90 degrees
        break;
      case 'crop':
        modifiedImage = await sharp(req.file.buffer).extract({ left: 0, top: 0, width: 200, height: 200 }).toBuffer(); // Crop 200x200 from top-left
        break;
      case 'flip':
        modifiedImage = await sharp(req.file.buffer).flop().toBuffer(); // Flips the image
        break;
      default:
        return res.status(400).send('Invalid operation.');
    }

    res.type('jpeg').send(modifiedImage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the image.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
