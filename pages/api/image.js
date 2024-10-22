const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Images = mongoose.model("ImageDetails");

router.post('/upload-data', async (req, res) => {
  const { name, sport, location } = req.body;
  console.log("This is request", req.body);
  try {
    // Check if name and sport are provided
    if (!name || !sport) {
      throw new Error('Name or sport data missing');
    }

    // Save image and other data to MongoDB
    await Images.create({ name, sport, location });
    res.send({ status: "ok", message: "Sport Registered" });
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(400).send({ status: "error", message: "Failed to save data", error: error.message });
  }
});

router.get('/get-data', async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ status: "error", message: "Failed to fetch data", error: error.message });
  }
});

module.exports = router;
