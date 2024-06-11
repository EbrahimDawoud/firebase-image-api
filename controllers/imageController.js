const { db } = require('../config/firebase');
const axios = require('axios');

// Firestore collection reference
const imagesCollection = db.collection('images');

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const snapshot = await imagesCollection.get();
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new image
exports.createImage = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const newImage = {
      title,
      url,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await imagesCollection.add(newImage);
    res.status(201).json({ id: docRef.id, ...newImage });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get image by ID
exports.getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const doc = await imagesCollection.doc(imageId).get();
    if (!doc.exists) {
      return res.status(404).send({ message: 'Image not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update an image
exports.updateImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const { title, url, description } = req.body;
    const updatedImage = {
      title,
      url,
      description,
      updatedAt: new Date().toISOString()
    };
    await imagesCollection.doc(imageId).set(updatedImage, { merge: true });
    res.status(200).json({ id: imageId, ...updatedImage });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    await imagesCollection.doc(imageId).delete();
    res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Shorten link
exports.shortenLink = async (req, res) => {
  try {
    const { url } = req.body;

    if (!process.env.SHAREAHOLIC_API_KEY) {
      return res.status(500).send({ message: 'Shareaholic API key is not configured.' });
    }

    const response = await axios.get('https://www.shareaholic.com/v2/share/shorten_link', {
      params: {
        apikey: SHAREAHOLIC_API_KEY, 
        url: url
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (response.data.status_code === "200" && response.data.data) {
      const shortenedUrl = response.data.data;

      const newLink = {
        originalUrl: url,
        shortenedUrl,
        description: 'Shortened URL for ' + url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await imagesCollection.add(newLink);

      res.status(201).json({ id: docRef.id, ...newLink });
    } else {
      res.status(400).send({ message: 'Failed to shorten URL' });
    }
  } catch (error) {
    console.error("Error during URL shortening:", error.response ? error.response.data : error.message);
    res.status(500).send({ message: error.message });
  }
};
