
exports.up = function(knex) {
  return knex.schema

  // PROJECTS
  .createTable('projects', table => {
    table.increments()

    table.string('project_name', 128).notNullable().unique()
    table.text('project_description')
    table.boolean('completed').notNullable().defaultTo(false)

  })

   // RESOURCES
  .createTable('resources', table => {
    table.increments()

    table.string('name', 128).notNullable().unique()
    table.text('description')
    
    table.integer('project_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('projects')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })


   // TASKS
  .createTable('tasks', table => {
    table.increments()

    table.text('description').notNullable()
    table.string('notes', 128)
    table.boolean('completed').notNullable().defaultTo(false)

    table.integer('project_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('projects')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};
