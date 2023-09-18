import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
    country: {
      type: String
    },
  },
  contactEmail: String,
  contactPhoneNumber: String,
  websiteUrl: String,
  logoUrl: String,
  createdAt: Date,
  updatedAt: Date,default: Date.now,
});

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
