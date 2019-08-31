exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {notes: 'this is notes', description: 'sales force', completed: false, project_id: 1},
        {notes: 'some notes', description: 'for 200 people', completed: false, project_id: 2},
        {notes: 'note from me', description: 'for drawing', completed: false, project_id: 3}
      ]);
    });
};