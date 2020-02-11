import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            thisProfilesName: "",
            user_img_url: "",
            shows: [],
            profiles_id: 0
        }
    }
    
    getUser = async () => {
        try {
            const { user_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/users/${user_id}`)
            console.log(res)
            this.setState({
                thisProfilesName: res.data.body.users.username,
                profiles_id: res.data.body.users.id,
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


    componentDidMount() {
        this.getUser();
        this.getUsersShows();
    }

    render() {
        const {shows, thisProfilesName, user_img_url} = this.state


        return(
            <div className="profile">
                <h1> {thisProfilesName}</h1>
                <img src={user_img_url} alt={thisProfilesName}/>
                <h3>Watching:</h3>
                {shows.map((show) => {
                    return(
                        <div className="profileShows" key={show.title}>
                            <img src={show.img_url} alt={show.title}/>
                            <div className="profileShowInfo">
                                <Link to={`/shows/${show.id}/users/${show.user_id}`} ><h3>{show.title}</h3></Link>
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