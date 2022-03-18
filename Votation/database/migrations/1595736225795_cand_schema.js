'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CandSchema extends Schema {
  up () {
    this.create('cands', (table) => {
     table.increments()
      table.string('name',254).notNullable()
      table.string('office',254).notNullable()
      table.text('description').notNullable()
      table.string('photo', 254)
      table.integer('vote').defaultTo(0)

      table
         .integer('user_id',11)
         .unsigned()
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE')
         .onDelete('CASCADE')
      table.boolean('status').defaultTo(1)   
      table.timestamps()
    })
  }

  down () {
    this.drop('cands')
  }
}

module.exports = CandSchema
