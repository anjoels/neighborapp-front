import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Contributions from './components/Contributions'
import Request from './components/Request'
import Account from './components/Account'
import Chat from './components/Chat'
import Contribution from './components/Contribution'
import ChatThread from './components/ChatThread'
import Login from './components/Login'

import './styles/messages.scss'

class App extends Component {
    async requestToken(data) {
        await fetch(`https://neighborapp-backend.herokuapp.com/sessions/${data}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.status === 'SUCCESS') {
                    localStorage.removeItem('token')
                }
            })
    }

    componentDidMount = () => {
        this.requestToken(localStorage.getItem('token'))
    }

    render() {
        if (localStorage.getItem('token') != null) {
            return (
                <div className="App">
                    <Route path="/c/contributions" exact component={Contributions} />
                    <Route path="/c/request" exact component={Request} />
                    <Route path="/c/account" exact component={Account} />
                    <Route path="/c/chat" exact component={Chat} />
                    <Route path="/c/contribution/:id" component={Contribution} />
                    <Route path="/c/chatthread/:id" component={ChatThread} />
                    <div className="fader" />
                    <Navbar />
                </div>
            )
        } else {
            return <Login />
        }
    }
}

export default App
