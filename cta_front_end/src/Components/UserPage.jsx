import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class UserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: 0,
            username: "",
            user_img_url: "",
            shows: []
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
            this.setState({
                shows: res.data.body.shows
            })
        } catch (error) {
            console.log(error)
        }
    }

    getGenre = async (genre_id) => {
        try{
            let res = await axios.get(`http://localhost:3001/genres`)
        } catch (error) {
            console.log(error)
        }

    }

    componentDidMount() {
        this.getUser();
        this.getUsersShows();
    }

    render() {
        const {shows} = this.state
        return(
            <div className="profile">
                <h1> {this.state.username}</h1>
                <img src={this.state.user_img_url}/>
                <h3>Watching:</h3>
                {shows.map((show) => {
                    return(
                        <div className="profileShows">
                            <img src={show.img_url}/>
                            <div className="profileShowInfo">
                                <h3>{show.title}</h3>
                                <p>{show.genre_name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UserPage;