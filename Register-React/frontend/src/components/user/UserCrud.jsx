import React, { Component } from "react"
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Users',
    subtitle: 'User Registration: Include, List, Change e Delete'
}

const baseUrl = 'http://localhost:3001/users' 
const initialState = {     
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    
    state = { ...initialState}

    //function that make to get the users list of the backend
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }
    //function that clear the form that is showing.
    clear() {
        this.setState({ user: initialState.user })
    }
    //function that save and change the users's data
    save() {
        const user = this.state.user
        const method= user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user : initialState.user, list})
            })
    }
    // function support, remove user of the list and add in the first position if add true
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }
    //Function that updates the fields
    updateField(event) {
        const user = { ...this.state.user } //clone the user
        user[event.target.name] = event.target.value 
        this.setState({ user })
    }
    //Function that render the form
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" 
                               name="name"
                               value={this.state.user.name}
                               onChange={e => this.updateField(e)}
                               placeholder="Digite o nome..." />

                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" 
                               name="email"
                               value={this.state.user.email}
                               onChange={e => this.updateField(e)}
                               placeholder="Digite o e-mail..." />
                         </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end" onClick={e => this.save(e)}>
                        <button className="btn btn-primary">
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    // Function that load the user
    load(user) {
        this.setState({ user })
    }
   // Function that delete the user in list local and database
    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState( {list})
        })
    }
   // Function that render the table with the data
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    // Function that render the buttons to actions
    renderRows() {
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    // Function that render the page
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}