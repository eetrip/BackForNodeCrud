const Note = require("../db/note.schema.js");

export default class NoteModel {
  creatNote = async (data) => {
    try {
      // Validate request
      if (!req.body.content) {
        return res.status(400).send({
          message: "Note content can not be empty",
        });
      }

      // Create a Note
      //   const note = new Note({
      //     title: req.body.title || "Untitled Note",
      //     content: req.body.content,
      //   });

      const note = new Note(data);
      note
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Note.",
          });
        });
    } catch (error) {
      console.log(`
        errpr = ${error}
        `);
    }
  };
  list = async (data) => {
    try {
      const note = await Note.find()
        .then((notes) => {
          res.send(notes);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving notes.",
          });
        });

      return note;
    } catch (error) {
      console.log(`
        error = ${error}
        `);
    }
  };

  getOne = async (id) => {
    try {
      const notes = await Note.findById(id)
        .then((note) => {
          if (!note) {
            return res.status(404).send({
              message: "Note not found with id " + id,
            });
          }
          res.send(note);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Note not found with id " + id,
            });
          }
          return res.status(500).send({
            message: "Error retrieving note with id " + id,
          });
        });

      return notes;
    } catch (error) {
      console.log(`
        error = ${error}
        `);
    }
  };

  update = async (data) => {
    try {
      // Find note and update it with the request body
      const notes = await Note.findByIdAndUpdate(
        data.id,
        {
          title: data.title || "Untitled Note",
          content: data.content,
        },
        { new: true }
      )
        .then((note) => {
          if (!note) {
            return res.status(404).send({
              message: "Note not found with id " + data.noteId,
            });
          }
          res.send(note);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Note not found with id " + data.noteId,
            });
          }
          return res.status(500).send({
            message: "Error updating note with id " + data.noteId,
          });
        });

      return notes;
    } catch (error) {
      console.log(`
        error = ${error}
        `);
    }
  };

  delete = async (id) => {
    try {
      Note.findByIdAndRemove(req.params.noteId)
        .then((note) => {
          if (!note) {
            return res.status(404).send({
              message: "Note not found with id " + req.params.noteId,
            });
          }
          res.send({ message: "Note deleted successfully!" });
        })
        .catch((err) => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
              message: "Note not found with id " + req.params.noteId,
            });
          }
          return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId,
          });
        });
    } catch (error) {
      console.log(`
        error = ${JSON.stringify(error)}
        `);
    }
  };
}
