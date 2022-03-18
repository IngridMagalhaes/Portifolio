'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Cand = use('App/Models/Cand')
/**
 * Resourceful controller for interacting with cands
 */
class CandController {
  /**
   * Show a list of all cands.
   * GET cands
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
     if(request.url() == '/manager-cands'){
     const cands = await Cand.query().where('user_id', auth.user.id).with('user').fetch()
     return view.render('manager-cands', {
       cands: cands.toJSON()
       })
     }
     if(request.url() == '/result'){
     const cands = await Cand.query().fetch()
     return view.render('result', {
       cands: cands.toJSON()
       })
     }
     const cands = await Cand.all()
     return view.render('index', {
      cands: cands.toJSON(),
      substr:((txt) => `${String(txt).substr(0,100)}...`)
     

     })


  }

  /**
   * Render a form to be used for creating a new cand.
   * GET cands/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cand.
   * POST cands
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, session }) {
    const data = request.only([ 'name','office', 'photo', 'description', 'vote'])
    const cand = await Cand.create({ ...data, user_id: auth.user.id})
    session.flash({
      message:'Candidato cadastrado com sucesso!',
      type: 'success'
    })
    return response.redirect('/manager-cands')
  }

  /**
   * Display a single cand.
   * GET cands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
      const cand = await Cand.query().where('id', params.id).with('user').first()
      if(!cand){
        return response.redirect('back')
      }  
      return view.render('cand-vote',{
        cand:cand.toJSON()
      })
  }
  /**
   * Render a form to update an existing cand.
   * GET cands/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const cand = await Cand.findBy('id', params.id)

    if(!cand){
      return response.redirect('back')
    }

    return view.render('edit-cand',{
      cand: cand.toJSON()
    })
  }

  /**
   * Update cand details.
   * PUT or PATCH cands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth, session }) {
     const data = request.only(['name','office', 'photo', 'description', 'vote'])
     const cand = await Cand.findBy('id', params.id)
     
     cand.merge(data)
     await cand.save()
      session.flash({
        message: 'Perfil do Candidato editado com sucesso!',
        type:'success'
      })
      return response.redirect('/manager-cands')
    
  }

  /**
   * Delete a cand with id.
   * DELETE cands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const cand = await Cand.findBy('id', params.id)
    await cand.delete()
    session.flash({
      message: 'Perfil do candidato deletado com sucesso!',
      type: 'success'
    })
    return response.redirect('/manager-cands')
  }

  async votar({params, request, response, auth, view, session}){
  
     const cand = await Cand.findBy('id', params.id)
      if(!cand){
         return response.redirect('back')
       }      
     
    cand.vote = cand.vote + 1
     await cand.save()
      session.flash({
        message: 'Voto computado com sucesso!',
        type:'success'
      })
      return response.redirect('/result')

    }
}



module.exports = CandController
