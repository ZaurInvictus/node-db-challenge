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


// GET PROJECT BY ID
  router.get('/:id/project', async (req, res) => {
        const { id } = req.params

        try{
          const project = await projectsDB.getProjectById(id);
          
          if(project) {
            project.tasks = await projectsDB.getTaskById(id);
            project.resources = await projectsDB.getResourceById(id);
            return res.status(200).json({project})
          } else {
            res.status(404).json({ message: 'Could not find project with given id.' })
          }
        } 
          catch(error){
          res.status(500).json({message: 'error getting project information'});
      }
}); 



// GET RESOURCES
router.get('/resources', async (req, res) => {
  try {
     const resources = await projectsDB.getResources()
     res.status(200).json(resources)
  } catch (error) {
    res.status(500).json({message: 'error getting resources'})
  }
})

// GET RESOURCE BY ID
router.get('/:id/resource', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await projectsDB.getResourceById(id);
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({message: 'error getting resource'})
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
router.post('/:id/resource', async (req, res) => {
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
router.post('/:id/task', async (req, res) => {
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
    res.status(500).json({ message: 'Failed to post task' })
  }
});



// DELETE PROJECT
router.delete('/:id/', async (req, res) => {
  const { id } = req.params

  try {
    const project = await projectsDB.getProjectById(id)
      
    if(project) {
      const project = await projectsDB.removeProject(id)
      res.status(201).json(project);
    } else {
     res.status(404).json({ message: 'Could not find project with given id.' })
    }
    
   } catch (err) {
     res.status(500).json({ message: 'Failed to delete project' });
   }
})


// UPDATE PROJECT
router.put('/:id/', async (req, res) => {
  const { id } = req.params

  //define req.body
  const { project_name, project_description} = req.body

  if(!project_name || !project_description ) { 
  return res.status(400).json({ error: 'Please provide project_name and project_description' });
  }
  
  try {
    const project = await projectsDB.getProjectById(id)
      
    if(project) {
      const task = await projectsDB.updateProject(id, req.body)
      res.status(201).json(task);
    } else {
     res.status(404).json({ message: 'Could not find project with given id.' })
    }
    
   } catch (err) {
     res.status(500).json({ message: 'Failed to update project' });
   }
})

module.exports = router