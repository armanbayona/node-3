function create(req, res) {
  const db = req.app.get('db');

  const { userId, content } = req.body;

  db.posts 
    .save({
      userId,
      content,
    })
    .then(post => res.status(201).json(post)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });  
}

function getById(req, res) {
  const db = req.app.get('db');

  db.posts
    .findOne(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getByIdWithComments(req, res) {
  const db = req.app.get('db');

  db.posts
    .findOne(req.params.id)
    .then(post => {
      db.comments
        .find({
          postId: req.params.id
        })
        .then(comment => {
          post.comments = comment
          res.status(200).json(post)
        })
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getAllByUser(req, res) {
  const db = req.app.get('db');

  db.posts
    .find({userId: req.params.userId})
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function update(req, res) {
  const db = req.app.get('db');

  const { id } = req.params;
  const { content } = req.body;

  db.posts 
    .update({
      id,
    },{
      content,
    })
    .then(post => res.status(201).json(post)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });  
}

module.exports = {
  create, getById, getByIdWithComments, getAllByUser, update
};