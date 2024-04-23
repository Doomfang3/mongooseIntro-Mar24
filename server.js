const express = require('express')
const mongoose = require('mongoose')
const Student = require('./models/Student.model')
const Project = require('./models/Project.model')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'All good' })
})

app.get('/students', async (req, res) => {
  const students = await Student.find(undefined, undefined, { sort: { name: -1 } })
  res.json({ message: 'Students route', data: students })
})

app.get('/students/:studentId', async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.studentId))
  if (mongoose.isValidObjectId(req.params.studentId)) {
    try {
      const student = await Student.findById(req.params.studentId)
      res.json({ message: 'Student route', data: student })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(400).json({ message: 'Not a valid ID' })
  }
})

app.post('/students', async (req, res) => {
  const payload = { name: 'Rui', favColor: 'Orange', bootcampWeek: 7 }
  try {
    const newStudent = await Student.create(payload)

    res.status(201).json(newStudent)
  } catch (error) {
    console.log(error)
    if (error.code == 11000) {
      res.status(400).json({ message: 'We have a duplicate !', error })
    }
  }
})

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy')
    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
  }
})

app.get('/projects/:projectId', async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.projectId))
  if (mongoose.isValidObjectId(req.params.projectId)) {
    try {
      const project = await Project.findById(req.params.projectId).populate('createdBy')
      res.json({ message: 'Project route', data: project })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(400).json({ message: 'Not a valid ID' })
  }
})

app.post('/projects', async (req, res) => {
  console.log(req.body)
  try {
    const newStudent = await Project.create(req.body)

    res.status(201).json(newStudent)
  } catch (error) {
    console.log(error)
    if (error.code == 11000) {
      res.status(400).json({ message: 'We have a duplicate !', error })
    }
  }
})

mongoose
  .connect('mongodb://127.0.0.1:27017/mongooseIntroPizza')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000')
    })
  })
  .catch(err => console.error('Error connecting to mongo', err))
