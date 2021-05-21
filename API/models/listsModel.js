const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true                   
    },
    description:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})
module.exports ={ List:mongoose.model('list', newSchema) }