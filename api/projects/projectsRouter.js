const express = require('express');

const projectsDB = require('./projectsModel');
const router = express.Router();



// GET PROJECTS
router.get('/', async (req, res) => {
  try {
     const projects = await projectsDB.getProjects()
     if(projects.completed === 1) {
       res.status(200).json(projects)
     } else {
      res.status(200).json(projects)
     }
    
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


// GET TASK BY ID
router.get('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await projectsDB.getTaskById(id);
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({message: 'error getting task'})
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


// POST TASK
router.post('/:id/tasks', async (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 

  try {
   const project = await projectsDB.getProjectById(id)
     
   if(project) {
     const task = await projectsDB.postTask(taskData, id)
     res.status(201).json(task);
   } else {
    res.status(404).json({ message: 'Could not find project with given id.' })
   }
   
  } catch (err) {
    res.status(500).json({ message: 'Failed to post task' });
  }
});


module.exports = router