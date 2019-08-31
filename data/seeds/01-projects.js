exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'react-app', description: 'react projects app', completed: false},
        {name: 'node-express app', description: 'node projects app', completed: false},
        {name: 'react-redux-app', description: 'react-redux projects app', completed: false}
      ]);
    });
};