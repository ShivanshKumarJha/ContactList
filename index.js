// Importing the required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('assets'));

// Fetching the contacts from the database
app.get('/', function (request, response) {
  Contact.find({})
    .exec()
    .then(contacts => {
      return response.render('home', {
        title: 'My Contacts List',
        contact_list: contacts,
      });
    })
    .catch(error => {
      console.log('Error in fetching the contacts from db:', error);
      return response.status(500).send('Internal Server Error');
    });
});

// Used to add the contact in the database
app.post('/create-contact', function (request, response) {
  Contact.create({
    name: request.body.name,
    phone: request.body.phone,
  })

  .then(newContact => {
    console.log('********', newContact);
    return response.redirect('back');
  })
  .catch(err => {
    console.log('error in creating a contact');
    return;
  });
});

//Deleting the contact
app.get('/delete-contact', function (request, response) {
  // get the id from query in the url
  let id = request.query.id;

  // find the contact in the database using id and delete
  Contact.findByIdAndDelete(id)
    .then(() => {
      return response.redirect('back');
    })
    .catch(err => {
      console.log('error in deleting an object from database:', err);
      return response.status(500).send('Internal Server Error');
    });
});

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server', err);
  }
  console.log('Yup! My Express Server is running on Port:', port);
});