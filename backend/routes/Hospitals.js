import express from "express";
import { Hospitals } from "../models.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newHospital = new Hospitals({
      hospital_name: req.body.hospital_name,
      hospital_address: req.body.hospital_address,
      hospital_phone_no: req.body.hospital_phone_no,
      hospital_password: req.body.hospital_password,
    });

    await newHospital.save();
    res.json("Hospital has been added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  const { reg_no, hospital_password } = req.body;
  console.log(reg_no)
  console.log(hospital_password)

  try {
    const hospital = await Hospitals.findOne({ reg_no, hospital_password });

    if (hospital) {
      res.json(hospital);
    } else {
      res.status(404).json({ message: "Wrong username/password !!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const hospitals = await Hospitals.find();

    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
