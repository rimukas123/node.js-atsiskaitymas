import express from 'express';
import CompanyProfile from '../models/companyProfile.js';
import Company from '../models/company.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const profiles = await CompanyProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const profile = new CompanyProfile({
    companyId: req.body.companyId,
    funder: req.body.funder,
    foundedYear: req.body.foundedYear,
    numberOfEmployees: req.body.numberOfEmployees
  });

  try {
    const newProfile = await profile.save();

    
    const company = await Company.findById(req.body.companyId);
    if (company) {
      company.profileId = newProfile._id;
      await company.save();
    }

    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const profile = await CompanyProfile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (req.body.funder != null) {
      profile.funder = req.body.funder;
    }
    if (req.body.foundedYear != null) {
      profile.foundedYear = req.body.foundedYear;
    }
    if (req.body.numberOfEmployees != null) {
      profile.numberOfEmployees = req.body.numberOfEmployees;
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
