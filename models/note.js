const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({

    title: String,

    authRead: String,
    authWrite: String,
   
    watchDay: String,
    editedDay: Date,

    // acts: { type: Array, default: [""] },
    // sequenceMarks: { type: Array, default: [[0, 0]] },
    // scenceSeparations: { type: Array, default: [[0, 0]] },
    // scences: { type: Array, default: [""] },
    // beatSeparations: { type: Array, default: [[0, 0]] },
    // beats: { type: Array, default: [""] },

    genre: String,

    checkBoxes: { type: Array, default: [false, false, false, false, false, false, false] },

    otherNote: { type: String, default: "" },

    x: { type: Number, default: 950 },
    y: { type: Number, default: 200 },
    collapse: { type: Boolean, default: false}
    
});

mongoose.model('notes', noteSchema);