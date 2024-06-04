import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyProfile' }
});

export default mongoose.model('Company', companySchema);
