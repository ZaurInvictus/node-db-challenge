exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {name: 'software', description: 'sales force', project_id: 1},
        {name: 'meeting room', description: 'for 200 people', project_id: 2},
        {name: 'board', description: 'for drawing', project_id: 3}
      ]);
    });
};