const db = require('../../data/db-config');

module.exports = {
  getProjects,
  postProject,
  getResources,
  postResource,
  getTasks,
  postTask
}

function getProjects() {
  return db('projects')
}

function getResources() {
  return db('resources')
}

function getTasks() {
  return db('tasks')
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
