import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompanyById);
router.post('/companies', createCompany);
router.put('/companies/:id', updateCompany);

export default router;
