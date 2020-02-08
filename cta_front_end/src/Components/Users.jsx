import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],

        }
        
    }

    getAllUsers = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/users`)
            let newArr = [];
            res.data.body.users.map((user) => {
                newArr.push(user)
            })
            this.setState({
                users: newArr
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    render() {
        const { users } = this.state
        return(
            <div>
                <h1> Users Page</h1>
                {users.map((user) => {return <div className="userPageUsers"><img src={user.avatar_url}/><Link to={`/users/${user.id}`} username={user.username}>{user.username}</Link></div>})}
            </div>
        )
    }
}

export default Users;