const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Note = mongoose.model('notes');

module.exports = (app) => {
  app.get('/api/notes/:authId', (req, res) => {
    Note.find((err, foundNotes) => {
      if (!err) {
        if (req.params.authId) {
          const filteredNotes = foundNotes.filter(note => ((note.authRead === "") || (note.authRead === req.params.authId)));

          res.send(filteredNotes);

        } else {
          const filteredNotes = foundNotes.filter(note => note.authRead === "");

          res.send(filteredNotes);
        }
      } else {
        res.send(err);
      }
    });
  });

  app.post('/api/notes', requireLogin, (req, res) => {
    const newNote = new Note(req.body);
    newNote.save((err, response) => {
      if (!err) {
        res.send(response);
      } else {
        res.send(err);
      }
    });
  });

  app.patch('/api/notes/:notesId', requireLogin, (req, res) => {
    Note.updateOne(
        { _id: req.body._id },
        { $set: req.body },
        (err, response) => {
            if (!err) {
                res.send(response);
            } else {
                res.send(err);
            }
        }
    );
  });

  app.delete('/api/notes/:notesId', requireLogin, (req, res) => {
    Note.deleteOne(
      { _id: req.params.notesId },
      (err, response) => {
        if(!err){
          res.send(response);
        } else{
          res.send(err);
        }
      }
    );
  });
};
