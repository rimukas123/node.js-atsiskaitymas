import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  funder: { type: String, required: true },
  foundedYear: { type: Number, required: true },
  numberOfEmployees: { type: Number, required: true }
});

export default mongoose.model('CompanyProfile', companyProfileSchema);
