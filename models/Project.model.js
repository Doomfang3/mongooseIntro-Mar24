const { Schema, model, Types } = require('mongoose')

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'Student',
  },
})

const Project = model('Project', projectSchema)

module.exports = Project
