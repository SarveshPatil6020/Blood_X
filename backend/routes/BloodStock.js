import express from "express";
import { BloodStock, Appointment } from "../models.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const stock = await BloodStock.find();
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/bloodgroupwisedonar", async (req, res) => {
  try {
    const filter = await Appointment.aggregate([
      {
        $match: {
          app_donated: true // Only consider documents where donation has occurred
        }
      },
      {
        $group: {
          _id: "$app_blood_type",
          totalDonations: { $sum: 1 }
        }
      }
    ]);

    // console.log("filter -> ", filter);

    res.status(200).json(filter); // Send the result as JSON response

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/bloodgroupwisereq", async(req, res) => {
  try {
    const filter = await Appointment.aggregate([
      {
        $match: {
          app_donated: false // Only consider documents where donation has occurred
        }
      },
      {
        $group: {
          _id: "$app_blood_type",
          totalDonations: { $sum: 1 }
        }
      }
    ]);

    // console.log("filter -> ", filter);

    res.status(200).json(filter); // Send the result as JSON response

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})


export default router;
