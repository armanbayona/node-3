const express = require('express');
const massive = require('massive');

const users = require('./controllers/users.js');
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js');

massive({
  host: 'localhost',
  port: 5432,
  database: 'node3',
  user: 'postgres',
  password: 'node3db',
}).then(db => {
  const app = express();

  app.set('db', db);

	//MIDDLEWARE
  app.use(express.json());

  //ROUTING USERS
  app.post('/api/users', users.create);
  app.get('/api/users', users.list);
  app.get('/api/users/:id', users.getById);
  app.get('/api/users/:id/profile', users.getProfile);

  //ROUTING POSTS
	app.post('/api/posts', posts.create); 
  app.get('/api/posts/:id', posts.getById); 
  app.get('/api/posts/:id/comments', posts.getByIdWithComments); 
  app.get('/api/posts/user/:userId/', posts.getAllByUser); 
  app.put('/api/posts/:id', posts.update); 

  //ROUTING COMMENTS
  app.post('/api/comments', comments.create); 
  app.put('/api/comments/:id', comments.update); 


  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});