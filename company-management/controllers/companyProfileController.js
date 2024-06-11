import CompanyProfile from '../models/companyProfile.js';
import Company from '../models/company.js';

// Get all company profiles
export const getAllCompanyProfiles = async (req, res) => {
  try {
    const profiles = await CompanyProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new company profile
export const createCompanyProfile = async (req, res) => {
  const profile = new CompanyProfile({
    companyId: req.body.companyId,
    funder: req.body.funder,
    foundedYear: req.body.foundedYear,
    numberOfEmployees: req.body.numberOfEmployees
  });

  try {
    const newProfile = await profile.save();

    // Update the company with the profile ID
    const company = await Company.findById(req.body.companyId);
    if (company) {
      company.profileId = newProfile._id;
      await company.save();
    }

    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a company profile by ID
export const updateCompanyProfile = async (req, res) => {
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
};
