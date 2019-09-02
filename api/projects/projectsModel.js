const db = require('../../data/db-config');

module.exports = {
  getProjects,
  getProjectById,
  postProject,
  getResources,
  postResource,
  getTasks,
  getTaskById,
  postTask,
}



// HELPER FUNCTION TO COVERT COMPLETED PROPERTIES TO FALSE OR TRUE
const convert = obj => ({
  ...obj,
  completed: !!obj.completed
})


// RETURNS PROJECTS WITH CONVERTED COMPLETED PROPERTIES TO FALSE OR TRUE
async function getProjects() {
  const projects = await db('projects');
  const newProjects = projects.map(convert);
  return newProjects
}


function getProjectById(id) {
  return db('projects').where({ id }).first()
}


function getResources() {
  return db('resources')
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
    .where({ project_id }).first()
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
