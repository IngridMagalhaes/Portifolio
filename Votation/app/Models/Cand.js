'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const dateformat = use('dateformat')

class Cand extends Model {
	getCreatedAt(created_at){
		return dateformat(created_at, 'dd/mm/yyyy')
	}

	user(){
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Cand
