import express from 'express';
import {
  getAllCompanyProfiles,
  createCompanyProfile,
  updateCompanyProfile
} from '../controllers/companyProfileController.js';

const router = express.Router();

router.get('/companyProfiles', getAllCompanyProfiles);
router.post('/companyProfile', createCompanyProfile);
router.put('/companyProfile/:id', updateCompanyProfile);

export default router;
