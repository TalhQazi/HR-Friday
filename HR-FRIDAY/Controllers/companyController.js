const Company = require("../Models/company.js");

const createCompany = async (req, res) => {
    const { companyName, companyAddress, companyPhone, companyLogo } = req.body;

    if (!companyName || !companyAddress || !companyPhone || !companyLogo) {
        return res.status(400).json({ message: "Please fill all the fields!" });
    }

    try {
        const newCompany = new Company({
            CompanyName: companyName,
            CompanyAddress: companyAddress,
            CompanyPhone: companyPhone,
            CompanyLogo: companyLogo
        })
        await newCompany.save()
        res.status(201).json(newCompany)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while registering company!" })
    }

}

const getCompany = async (req, res) => {
    try {
        const company = await Company.find();
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while fetching company!" })
    }
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while fetching company!" })
    }
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { companyName, companyAddress, companyPhone, companyLogo } = req.body;
    try {
        const company = await Company.findByIdAndUpdate(id, {
            CompanyName: companyName,
            CompanyAddress: companyAddress,
            CompanyPhone: companyPhone,
            CompanyLogo: companyLogo
        }, { new: true });
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while updating company!" })
    }
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndDelete(id);
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting company!" })
    }
}

module.exports = {
    createCompany,
    getCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
}