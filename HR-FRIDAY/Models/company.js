const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
        unique: true
    },
    CompanyLogo: {
        type: String,
        required: true
    },
    CompanyAddress: {
        type: String,
        required: true
    },
    CompanyPhone: {
        type: String,
        required: true
    },
    CompanyTotalEmployees:{
        type: Number,
        required: true,
        default: 0
    }
})

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;