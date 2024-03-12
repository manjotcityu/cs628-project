import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const router = express.Router();

const storeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

storeSchema.index({ location: "2dsphere" });
const Store = mongoose.model("Store", storeSchema);

// API endpoint to search stores within 3 miles
router.get("/stores/nearby", async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const stores = await Store.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 4828.03,
        },
      },
    });

    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to search stores within 3 miles
router.post("/", async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // API endpoint to create a new store
// router.post("/stores", async (req, res) => {
//   const { name, latitude, longitude } = req.body;

//   try {
//     const newStore = new Store({
//       name,
//       location: {
//         type: "Point",
//         // coordinates: [parseFloat(longitude), parseFloat(latitude)],
//         coordinates: [0, 0],
//       },
//     });
//     console.log(newStore);
//     const savedStore = await newStore.save();
//     res.json(savedStore);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/stores", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    },
  };
  let collection = await db.collection("stores");
  let result = await collection.insertMany([
    {
      name: req.body.name,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    },
  ]);
  res.send(result).status(204);
});

export default router;
