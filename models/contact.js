const mongoose = require('mongoose');

//defining the contactSchema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

//Creating the model with the name 'Contact'
const Contact = mongoose.model('Contact', contactSchema);

// Exporting the Contact model
module.exports = Contact;
