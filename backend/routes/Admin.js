import express from "express";
import { Admin } from "../models.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { admin_email, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({ admin_email, admin_password });

    if (admin) {
      // res.json(admin);
      const token = jwt.sign({ userId: admin._id }, "my-secret-key", {});
      res.status(200).json({ status: "success", message: "Logged in Successfully", user_type: "admin", admin_name: admin.admin_name, token: token });
    } else {
      res.status(404).json({ status:"unsuccess", message: "Wrong username/password !!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "unsuccess", error: "Internal Server Error" });
  }
});

export default router;
