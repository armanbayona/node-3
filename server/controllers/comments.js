function create(req, res) {
  const db = req.app.get('db');

  const { userId, postId, comment } = req.body;

  db.comments 
    .save({
      userId,
      postId,
      comment,
    })
    .then(comment => res.status(201).json(comment)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
    //console.log(`${userId}, ${postId}, ${comment}`)
}

function update(req, res) {
  const db = req.app.get('db');

  const { id } = req.params;
  const { comment } = req.body;

  db.comments
    .update({
      id,
    },{
      comment,
    })
    .then(comment => res.status(201).json(comment)) 
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });  
}

module.exports = {
  create, update
};