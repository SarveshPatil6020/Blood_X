import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/Users.js";
import appointmentsRouter from "./routes/Appointments.js";
import hospitalsRouter from "./routes/Hospitals.js";
import bloodRequestRouter from "./routes/BloodRequests.js";
import bloodStockRouter from "./routes/BloodStock.js";
import adminRouter from "./routes/Admin.js";
import { User } from "../backend/models.js";
import { upload } from "./middlewares/multer.middleware.js"

import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})

const app = express();

app.use(express.json());
app.use(cors());

// console.log("port: "+process.env.PORT);s

// import admin from "firebase-admin";
// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "uploadfile-998a7",
//   "private_key_id": "b0ae610b521520d9c7424c96fafc49ab5d4e6dd9",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5Sj5liTYkBtF9\nGw3P5n9ULVgoV4mBAW9WJztXOqmh0rTk7s8HCHLI1h21y9iJ5ix5OOyG6G68SAjz\n9icOV6IrIK7a0r0HAPG7Nf+5m0YIc7bj40PHCwrjRZqTAyy6+dviq+NH8Bx2FqF+\nfBJJ+B21cYEqhzPn6hhane9nQ6SEn5HcseUJRc7deAcTSezSsxYjDnuHMlM7X/6k\nhAdi1+ROseKoHkpeGq1fNdT/+R4LBuYrCzt7TJ86EMnj27B6z7cftgT2zUfmavd3\nND0O4pQ1ofNxWVGdWCJmSCFdLj++JF8NmeUMBsWq1Dakw9neM5NqIYMjkCOQfLv2\nJfuibIV7AgMBAAECggEACjAiYSvbvbxgPWxE5KcMXkEGBWXWyjCdghOzKBcyJ5Mx\n3hqhaIYW5aMcTBgyxlZRILM4EizqldCyKVPiDuBTquJnquGGgkGTiRMthfObNLDE\nICCpY+LgDOIRXz7/8SH27K4914FE11tkMtO4n7eUTps4mnGHsZtGDol7leZ6v838\nXBOqX7jUUdFzwFcBFeDkxM/UA8KGDo7QBcqizPLi2sAnHsUBSqAWArBFie7XUvQ1\n3TnNoCf0JVD7NTQr5gBAEwTDR3C1LtqFKVVSHcCLODmoeBF7ojuhiiX3XunY3Cgz\nqmmFSPqL9ck1kDhywI1Zu2STQQ98jxwIbSNZfGhprQKBgQDiAq2tUy7ZyTt6NNMO\nLYXfbKGPKNbQLwwt4KUsmcXX0/R3Ac+xZ+Il1wZknjLfqwIdCO8puRcpWH4BoLDv\nrlR21c8uWZnu8vNWwgwtiqP/oXO3Z/xyzPOplufARK8FpuFnuD+ERkUvL1t84vFf\nRvbAtHVTL+lC8Qw9Q+rvakmydwKBgQDR4FZhmTtvObEgFTg3R0vJb3KVXxCuoGx/\nM5KnzocIj/shM/3RgINKoSL0eFa5k5e/wp4EDOdmO5MZqdTSDLp5I4PbCi4U427R\nRnloR0dtWDG8v6j6QaZzWwJakYBqSueeYXPVI6+MKFciKIxTqOJdyu2JGZI7MdCl\n1Abt+PyiHQKBgDHjKXbyv4qvEoPdGSEuBzjT/61b9F6ro+KUjaEUqEkFrhZ+vduI\n9LApkG2xRcV9N9A04qWxB13G/LlbQPMG5fn9I+g1Ovc1hWUHHC0JRz3r42D+gQjO\nGJK8jpcwEfoLZgHA97Q41piduXINnf3L6jeLHcKo9rIiBvOXBEqoiW/tAoGAE1Ei\nojkIT2Rv+RP66JuXTiMD2Nu3HVuGoO6OQQOxSgh2hMfURMQfUW8jWHz6/nmnLe8r\nvBOz+KTjFSmcfPjO8Pdj23VEaIfGW1yxL/ffiyDi8wxw8Re5ykRGIy/hMedTCjDO\nCIAQWEYePvacc9bHfvp+gm/oFaqwGZM6UAzqs8ECgYEAjxfTtEPS4OhA+DzeIZfI\nj8fWGr54gtYHI6iWH/FmKUYnpjOnnKq1YHO1rUzViMi8uVokWL879f/EVAd9JTZM\n2eUYwRIK2y8bFz9lc3iorJ0DK1R3FAwrtpBG0g2U3s+RJBQ2/JjUKqyKGBqG2Aak\n6ukJxiN/p1sxBggOIdOwPdE=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-q2oj2@uploadfile-998a7.iam.gserviceaccount.com",
//   "client_id": "104606523690568676123",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q2oj2%40uploadfile-998a7.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }


// const serviceAccount = require("./admin.json")

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


app.use("/api/users/", upload.fields([
  {
    name: "user_photo",
    maxCount: 1
  },

]),usersRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/bloodrequests", bloodRequestRouter);
app.use("/api/bloodstock", bloodStockRouter);
app.use("/api/admin", adminRouter);



let otp;
app.post("/send-otp", async (req, res) => {
  const { user_email } = req.body;

  const user = await User.findOne({ user_email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "unsucess", message: "User Not Found, Proceed to Signup !!" });
  }

  otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "khachanekn29@gmail.com",
      pass: "nzqboskwgmfaxfsw",
    },
  });

  const mailOptions = {
    from: "khachanekn29@gmail.com",
    to: user_email,
    subject: "OTP for Login to BloodX !!",
    text: `Your OTP for login is: ${otp}`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({
        status: "unsucess",
        message: "Error sending OTP !!",
        error: error,
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "OTP sent successfully !!" });
  });
  console.log(otp)
});

app.post("/verify-otp", async (req, res) => {
  const { user_otp } = req.body;
  const { user_email } = req.body;
  const user = await User.findOne({ user_email });
  if (user_otp !== otp) {
    return res.status(401).json({ status:"unsuccess", message: "Invalid OTP !!" });
  }

  const token = jwt.sign({ userId: user._id }, "my-secret-key", {});
  res.status(200).json({ status:"success", message:"OTP Verified Successfully !!", token: token, user_type: "donor", user_name: user.user_name, user_photo: user.user_photo });
});

const PORT = process.env.PORT || 8081;

mongoose.connect(
  "mongodb+srv://knk29:khachane29@atlascluster.wtf8ey2.mongodb.net/blood_bank?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB Connection Error:", err.message);
  console.log("Check Netwoek")
});

db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
