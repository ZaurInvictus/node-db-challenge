const db = require('../../data/db-config');

module.exports = {
  getProjects,
  getProjectById,
  getResources,
  getResourceById,
  getTasks,
  getTaskById,
  postProject,
  postResource,
  postTask,
  removeProject,
  updateProject
}



// HELPER FUNCTION TO COVERT COMPLETED PROPERTIES TO FALSE OR TRUE
const convert = obj => ({
  ...obj,
  completed: !!obj.completed
})


// RETURNS PROJECTS WITH CONVERTED COMPLETED PROPERTIES TO FALSE OR TRUE
async function getProjects() {
  const projects = await db('projects')
  const newProjects = projects.map(convert)
  return newProjects
}


function getProjectById(id) {
  return db('projects').where({ id }).first()
}



function getResources() {
  return db('resources')
}

function getResourceById(id) {
  return db('resources').where({ id })
}


 async function getTasks() {
  const projects = await db('projects')
  .select(
    'project_name',
    'project_description',
    'tasks.description',
    'tasks.notes',
    'tasks.completed'
  )
  .innerJoin('tasks', 'projects.id', 'tasks.project_id')

  // CONVERTS COMPLETED PROPERTIES TO FALSE OR TRUE
  const newProjects = projects.map(convert)
  return newProjects
}


function  getTaskById(project_id) {
  return db('projects')
    .select(
      'project_name',
      'project_description',
      'tasks.description',
      'tasks.notes',
      'tasks.completed'
    )
    .innerJoin('tasks', 'projects.id', 'tasks.project_id')
    .where({ project_id })
}


function postProject(project) {
  return db('projects')
  .insert(project)
}

function postResource(resourceData, project_id) {
  const resource = {...resourceData, project_id};
  return db('resources').insert(resource);
}

function postTask(taskData, project_id) {
  const task = {...taskData, project_id};
  return db('tasks').insert(task);
}


function removeProject(id) {
  return db('projects')
  .where('id', id)
  .del()
}


function updateProject(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes);
}
