import express from 'express';
import Company from '../models/company.js';
import CompanyProfile from '../models/companyProfile.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('profileId');
    if (company == null) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const company = new Company({
    name: req.body.name,
    industry: req.body.industry,
    location: req.body.location
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (company == null) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (req.body.name != null) {
      company.name = req.body.name;
    }
    if (req.body.industry != null) {
      company.industry = req.body.industry;
    }
    if (req.body.location != null) {
      company.location = req.body.location;
    }
    if (req.body.profileId != null) {
      company.profileId = req.body.profileId;
    }

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
