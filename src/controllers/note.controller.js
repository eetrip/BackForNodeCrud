import NoteModel from "../models/note.model";

exports.create = async (req, res) => {
  try {
    const data = req.body;
    // Validate request
    if (!data.content) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    }
    const noteDb = new NoteModel();
    const note = await noteDb.creatNote(data);
    res.json(note);
  } catch {
    console.log(`
    error in create controller
    `);
  }
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  try {
    const noteDb = new NoteModel();
    const note = await noteDb.list();
    res.json(note);
  } catch {
    console.log(`JSON
    error in findAll controller
    `)
  }
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  try {
    const id = req.params.noteId;
    const noteDb = new NoteModel();
    const note = await noteDb.getOne(id);
    res.json(note);
  } catch {
    console.log(`
    error in findOne controller
    `)
  }
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
  const data = req.body;
  if (!data.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  const noteDb = new NoteModel();
  const note = await noteDb.update(data);

  res.json(note);
  } catch {
    console.log(`
    error in update controller
    `)
  }
};

// Delete a note with the specified noteId in the request
exports.deleteById = (req, res) => {
  const id = req.params.noteId;
  const noteDb = new NoteModel();
  const note = await noteDb.delete(id);
  res.json(note);
};
