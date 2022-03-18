'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', 'CandController.index')
Route.on('/cand').render('cand-vote')

Route.on('/login').render('login')
Route.post('/session', 'SessionController.login')
Route.get('/logout', 'SessionController.logout')

Route.on('/register').render('register')
Route.post('/create-user', 'UserController.store').validator('StoreUser')
Route.get('/result', 'CandController.index')


Route.get('/manager-cands', 'CandController.index')
Route.on('/create-cand').render('create-cand')
Route.post('/store-cand','CandController.store')
Route.get('/cand/:id','CandController.show')
Route.get('/cand/:id/destroy','CandController.destroy')
Route.get('/cand/:id/votar','CandController.votar')
Route.get('/cand/:id/edit','CandController.edit')
Route.post('/cand/:id/update','CandController.update')