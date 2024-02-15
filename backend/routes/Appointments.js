import express from "express";
import { Appointment, User } from "../models.js";

import authenticateToken from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    // console.log(appointments)
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fetch_user_appointments", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "unsuccess", message: "User not found." });
    }
    const appointments = await Appointment.find({ user: userId });
    res.status(200).json({ context: appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "unsuccess", message: "User not found." });
    }
    const newAppointment = new Appointment({
      app_email: req.body.app_email,
      app_name: req.body.app_name,
      app_phone_no: req.body.app_phone_no,
      app_blood_type: req.body.app_blood_type,
      app_camp_address: req.body.app_camp_address,
      app_age: req.body.app_age,
      app_diabetic: req.body.app_diabetic,
      app_date: req.body.app_date,
      app_time: req.body.app_time,
      user: userId,
    });

    await newAppointment.save();
    res.json({status:"success", message: "Appointment has been booked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({status:"unsuccess",  message: "Internal Server Error" });
  }
});

router.delete("/delete/:app_email", async (req, res) => {
  const app_email = req.params.app_email;

  try {
    const deletedAppointment = await Appointment.findOneAndDelete({
      app_email,
    });

    if (deletedAppointment) {
      res.status(200).json("Appointment has been deleted successfully!!");
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:app_email", async (req, res) => {
  const app_email = req.params.app_email;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { app_email },
      { app_donated: true },
      { new: true }
    );

    if (updatedAppointment) {
      res.json("Appointment has been approved successfully!!");
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/donated", async (req, res) => {
  try {
    const appointments = await Appointment.find({ app_donated: true });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/donorCount", async (req, res) => {
  try {
    const donorCounts = await Appointment.aggregate([
      {
            $match: { app_donated: true},
      },
      {
        $group: {
          _id: "$app_blood_type", 
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          app_blood_type: "$_id",
          count: 1,
        },
      },
    ]);

    res.json(donorCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
