import Company from '../models/company.js';

// Gauname kompanijas
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// gauname id su profiliu
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('profileId');
    if (company == null) {
      return res.status(404).json({ message: 'Cannot find company' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// sukuriam nauja kompanija

export const createCompany = async (req, res) => {
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
};

//atnaujinam kompanija pagal id
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (company == null) {
      return res.status(404).json({ message: 'Cannot find company' });
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
    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
