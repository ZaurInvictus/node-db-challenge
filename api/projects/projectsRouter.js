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



// GET RESOURCES
router.get('/resources', async (req, res) => {
  try {
     const resources = await projectsDB.getResources()
     res.status(200).json(resources)
  } catch (error) {
    res.status(500).json({message: 'error getting resources'})
  }
})


// GET TASKS
router.get('/tasks', async (req, res) => {
  try {
     const tasks = await projectsDB.getTasks()
     res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({message: 'error getting tasks'})
  }
})


// POST PROJECT
router.post('/', async (req, res) => {
  const projectData = req.body;

  try {
    const project = await projectsDB.postProject(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post project' });
  }
});



// POST RESOURCE
router.post('/:id/resources', async (req, res) => {
  const resourceData = req.body;
  const { id } = req.params; 

  try {
    const resource = await projectsDB.postResource(resourceData, id);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post resource' });
  }
});



module.exports = router