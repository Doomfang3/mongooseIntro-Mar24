const { Schema, model } = require('mongoose')

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  favColor: {
    type: String,
    required: true,
  },
  bootcampWeek: {
    type: Number,
  },
})

// CREATE MODEL
// The model() method defines a model (Student) and creates a collection (students) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Student" --> "students"
const Student = model('Student', studentSchema)

// export default Student
module.exports = Student
