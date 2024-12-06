const express = require("express")
const {createCompany, deleteCompany, getCompany, getCompanyById, updateCompany} = require("../Controllers/companyController.js")

const router = express.Router()

router.post("/create",createCompany)
router.delete("/delete/:id",deleteCompany)
router.get("/fetch",getCompany)
router.get("/fetchbyid/:id",getCompanyById)
router.put("/update/:id",updateCompany)


module.exports = router