import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_email: String,
  user_name: String,
  user_phone_no: String,
  user_gender: String,
  user_address: String,
  user_password: String,
  user_photo: String,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const adminSchema = new mongoose.Schema({
  admin_email: String,
  admin_name: String,
  admin_password: String,
  admin_phone_no: String,
});

const appointmentSchema = new mongoose.Schema({
  app_email: String,
  app_name: String,
  app_phone_no: String,
  app_blood_type: String,
  app_camp_address: String,
  app_age: Number,
  app_diabetic: String,
  app_date: Date,
  app_time: String,
  app_donated: {
    type: Boolean,
    default: false
  },
  stage: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const hospitalSchema = new mongoose.Schema({
  reg_no: {
    type: String,
    unique: true,
  },
  hospital_name: {
    type: String,
  },
  hospital_address: {
    type: String,
  },
  hospital_phone_no: {
    type: String,
  },
  hospital_password: {
    type: String,
  },
});

const bloodRequestSchema = new mongoose.Schema({
  reg_no: {
    type: String,
  },
  request_blood_type: {
    type: String,
  },
  request_units: {
    type: Number,
  },
  urgent: {
    type: String,
  },
  request_delivered: {
    type: String,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospitals",
  },
});

const bloodStockSchema = new mongoose.Schema({
  blood_type: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});


export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Appointment = mongoose.model("Appointment", appointmentSchema);
export const Hospitals = mongoose.model("Hospitals", hospitalSchema);
export const BloodRequests = mongoose.model("BloodRequests", bloodRequestSchema);
export const BloodStock = mongoose.model("BloodStock", bloodStockSchema);
