const mongoose = require('mongoose');
 
var QuestionAndAnswerSchema = mongoose.Schema({
 
  
       answer: {
          type: String,
          required: true,
          trim: true
        },

       link: {
        type: String,
        trim: true
      },
        file_path: {
          type: String,
          required: true
        },
        file_link: {
          type: String,
          required: true
        },
        file_mimetype: {
          type: String,
          required: true
        }
      },
      {
        timestamps: true
      }
    );
 
module.exports = mongoose.model('migrants', QuestionAndAnswerSchema);