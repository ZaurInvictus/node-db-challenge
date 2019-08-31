exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'react-app', project_description: 'react projects app', completed: false},
        {project_name: 'node-express app', project_description: 'node projects app', completed: false},
        {project_name: 'react-redux-app', project_description: 'react-redux projects app', completed: false}
      ]);
    });
};