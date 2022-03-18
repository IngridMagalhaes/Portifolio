'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      name:'required|min:3',
      email:'required|email|unique:users,email',
      password:'required|min:6|confirmed'
    }
  }
  get messages(){
  	return{
  		'name.required':'Campo obrigatório',
  		'email.required':'Campo obrigatório',
  		'email.unique':'Email já cadastrado',
  		'email.email':'Email inválido',
  		'password.required':'Campo obrigatório',
  		'password.min':'Mínimo 6 caracteres',
  		'password.confirmed':'Password diferente da confirmada'
  	}
  }
  get validateAll(){
  	return true
  }
}

module.exports = StoreUser
