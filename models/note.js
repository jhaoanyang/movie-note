const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,

  authRead: String,
  authWrite: String,

  watchDay: String,
  editedDay: Date,

  scences: { type: Array, default: [] },
  scenceLv: { type: Array, default: [] },

  scenceRef: { type: Array, default: [[]] },
  scenceNote: { type: Array, default: [""] },

  genre: String,
});

mongoose.model("notes", noteSchema);
