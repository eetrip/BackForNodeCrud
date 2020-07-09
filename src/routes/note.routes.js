import {
  create as createRoute,
  findAll as findAllRoute,
  findOne as findOneRoute,
  update as updateRoute,
  deleteById as deleteByIdRoute,
} from "../controllers/note.controller";

export default (app) => {
  // const notes = require("../controllers/note.controller.js");

  // Create a new Note
  app.post("/notes/add", createRoute);

  // Retrieve all Notes
  app.get("/notes", findAllRoute);

  // Also retrieves all notes
  app.get("/", findAllRoute);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", findOneRoute);

  // Update a Note with noteId
  app.put("/notes/:noteId", updateRoute);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", deleteByIdRoute);
};
