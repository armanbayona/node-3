const express = require('express');
const massive = require('massive');

const users = require('./controllers/users.js');
const posts = require('./controllers/posts.js');

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

  //ROUTING 
  app.post('/api/users', users.create);
  app.get('/api/users', users.list);
  app.get('/api/users/:id', users.getById);
  app.get('/api/users/:id/profile', users.getProfile);
	//POST
	app.post('/api/posts', posts.create);



  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});