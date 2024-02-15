import express from "express";
import { BloodRequests } from "../models.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newRequest = new BloodRequests({
      reg_no: req.body.reg_no,
      request_blood_type: req.body.request_blood_type,
      request_units: req.body.request_units,
      urgent: req.body.urgent,
      request_delivered: req.body.request_delivered,
    });

    await newRequest.save();
    res.json("Request has been created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const requests = await BloodRequests.find();

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete/:reg_no", async (req, res) => {
  const reg_no = req.params.reg_no;

  try {
    const deletedRequest = await BloodRequests.findOneAndDelete({ reg_no });

    if (deletedRequest) {
      res.json("Request has been deleted successfully!!");
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/update/:reg_no", async (req, res) => {
  const reg_no = req.params.reg_no;

  try {
    const updatedRequest = await BloodRequests.findOneAndUpdate(
      { reg_no },
      { request_delivered: "Y" },
      { new: true }
    );

    if (updatedRequest) {
      res.json("Request has been approved successfully!!");
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/bloodRequestCount", async (req, res) => {
  try {
    const requestCounts = await Request.aggregate([
      {
        $group: {
          _id: "$request_blood_type", 
          count: { $sum: 1 } 
        }
      },
      {
        $project: {
          _id: 0,
          request_blood_type: "$_id",
          count: 1
        }
      }
    ]);

    res.json(requestCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
