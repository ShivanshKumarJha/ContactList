// Importing the required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

//connecting the server with the database when fired up
const db = require('./config/mongoose');
const Contact = require('./models/contact');
// Creating our own first express app
const app = express();

//To set up the view engine and also giving it the path in terms of the absolute path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// urlencoded is for reading the data of form in the key-value format
app.use(bodyParser.urlencoded({ extended: false }));

//express.static means that go to the assets folder and search for the file whenever there will be need of the static files
app.use(express.static('assets'));

//Writing our own middleware
// Middleware 1
// app.use(function (req, res, next) {
//   req.myName = 'Shivansh';
//   console.log('Middleware called');
//   next();
// });

// Middleware 2
// app.use(function (req, res, next) {
//   console.log('My name from MW2', req.myName);
//   console.log('Middleware 2 called');
//   next();
// });

var contactList = [
  {
    name: 'Shivansh Kumar Jha',
    phone: '8368704104',
  },
  {
    name: 'Santosh Kumar Jha',
    phone: '9891994448',
  },
  {
    name: 'Anupam Jha',
    phone: '9891995874',
  },
];

// '/' part is the route and the function part is the controller
// It means when this route is encountered this controller is called
app.get('/', function (request, response) {
  // console.log(request);
  // console.log(__dirname);
  // response.send('<h1>Cool it is running! or is it?</h1>');

  // Fetching the contacts from the database
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

  // console.log(request.myName);
  //   render means whenver this controller is controlled it automatically goes to the home section i.e. home.ejs
  // return response.render('home', {
  //   title: 'My Contacts List',
  //   contact_list: contactList,
  // });
});

app.get('/practice', function (request, response) {
  return response.render('practice', {
    title: 'Let us play with EJS',
  });
});

app.post('/create-contact', function (request, response) {
  // return response.redirect('/practice');
  // console.log(request.body);
  // console.log(request.body.name);
  // console.log(request.body.phone);

  //To add the contact from the server side to the main document or home page of the contact list
  // contactList.push({
  //     name: request.body.name,
  //     phone: request.body.phone,
  // });
  // Can also write in this way
  // contactList.push(request.body);

  // Used to add the contact in the database
  Contact.create({
    name: request.body.name,
    phone: request.body.phone,
  })

    // .then(): This method is used to handle the successful resolution of a Promise.
    .then(newContact => {
      console.log('********', newContact);
      return response.redirect('back');
    })
    // .catch(): This method is used to handle errors that occur during the execution of a Promise.
    .catch(err => {
      console.log('error in creating a contact');
      return;
    });
});

//Deleting the contact
app.get('/delete-contact', function (request, response) {
  // get the query from the url
  // let phone = request.query.phone;

  // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }
  // return response.redirect('back');

  // Deleting the contact from the database using MONGODB
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

// Most Common Error:
// 1.Library Inclusion
// 2.Syntax Mistakes
// 3.Quotes - open and closed errors
