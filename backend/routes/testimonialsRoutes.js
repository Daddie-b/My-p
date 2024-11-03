const express = require('express');
const multer = require('multer');
const Testimonial = require('../models/Testimonials'); // Adjust according to your actual model
const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  },
});

const upload = multer({ 
  storage,
  // Optionally, you can add limits here if needed
});

// Update endpoint for testimonials
router.put('/', upload.array('testimonials[0].image'), async (req, res) => {
    console.log("Incoming request body:", req.body);
    console.log("Incoming files:", req.files);
  
    // To properly access testimonials data, you might need to handle it differently
    const testimonialsData = Object.keys(req.body).reduce((acc, key) => {
      if (key.startsWith('testimonials')) {
        const index = key.match(/\d+/)[0]; // Extract the index from the key
        acc[index] = acc[index] || {};
        acc[index][key.split('.').pop()] = req.body[key]; // Set the property
      }
      return acc;
    }, []);
    
    console.log("Processed testimonials data:", testimonialsData);
    
    // Ensure testimonialsData is valid
    if (!Array.isArray(testimonialsData) || testimonialsData.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty testimonials data' });
    }
  
    try {
      // Process each testimonial
      await Promise.all(testimonialsData.map(async (testimonial, index) => {
        const { name, content, rating } = testimonial;
        const image = req.files[index] ? req.files[index].path : null;
  
        // Ensure required fields are present
        if (!name || !content || typeof rating === 'undefined') {
          throw new Error('Missing required testimonial fields');
        }
  
        // Perform the update
        await Testimonial.findByIdAndUpdate(testimonial._id, {
          name,
          content,
          image,
          rating,
        });
      }));
  
      res.status(200).json({ message: 'Testimonials updated successfully!' });
    } catch (error) {
      console.error("Error updating testimonials:", error);
      res.status(500).json({ error: 'Failed to update testimonials', details: error.message });
    }
  });
  
  
  
module.exports = router;
