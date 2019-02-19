const { Router } = require('express');
const app = Router();

//Requerir Auth.js
const isAuthenticated = require('../../services/Auth');

const Users = require('../controllers/users/users');
const Projects = require('../controllers/projects/projects');
const Notes = require('../controllers/notes/notes');

//Users Routes
app.get('/users', isAuthenticated, Users.index);
app.get('/users/:userId', isAuthenticated, Users.findBy);
//app.post('/users', Users.create);
//app.put('/users/:userId',   Users.updateBy);
app.delete('/users/:userId', isAuthenticated, Users.deleteBy);

//Auth Routes
app.post('/auth/signup', Users.signup);
app.post('/auth/login', Users.login);


//Projects Routes
app.get('/projects', Projects.index);
app.get('/projects/:projectId', Projects.findBy);
app.get('/users/:userId/projects', Users.findProjectBy)
app.post('/projects', Projects.create);
app.delete('/projects/:projectId', Projects.removeBy);
app.put('/projects/:projectId', Projects.updateBy);


//Notes Routes
app.get('/notes',Notes.index);
app.post('/notes', Notes.create);
app.get('/projects/:projectId/notes', Projects.findNotesBy)
app.get('/notes/:noteId', Notes.findBy);
//app.get('/notes/:noteId/texts', Notes.findByText);
//app.get('/notes/:noteId/photos', Notes.findByPhoto);


module.exports = app;