import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class UserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: 0,
            username: "",
            user_img_url: ""
        }
    }
    
    getUser = async () => {
        try {
            const { user_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/users/${user_id}`)
            
            this.setState({
                username: res.data.body.users.username,
                user_id: res.data.body.users.id,
                user_img_url: res.data.body.users.avatar_url
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUsersShows = async () => {
        try{
            const { user_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/shows/user/${user_id}`)
        }
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return(
            <div className="profile">
                <h1> {this.state.username}</h1>
                <img src={this.state.user_img_url}/>
                <h3>Watching:</h3>
            </div>
        )
    }
}

export default UserPage;