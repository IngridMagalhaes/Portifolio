'use strict'

class SessionController {
	async login({ request, response, auth, session }){
		const{ email, password} = request.all()
		
		try{
			await auth.attempt(email, password)
			return response.redirect('/manager-cands')
		}catch(error){
			session.flash({
				message:'Autenticação não pode ser efetuado, verifique seus dados',
				type: 'danger'
			})
			return response.redirect('/login')
		}
		console.log(email, password)
	
	}
	async logout({ request, response, auth}){
		await auth.logout()
		return response.redirect('/')
	}
}

module.exports = SessionController
