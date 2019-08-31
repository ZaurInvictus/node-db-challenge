const express = require('express');

const projectsDB = require('./projectsModel');
const router = express.Router();



// GET PROJECTS
router.get('/', async (req, res) => {
  try {
     const projects = await projectsDB.getProjects()
     res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({message: 'error getting projects'})
  }
})


module.exports = router