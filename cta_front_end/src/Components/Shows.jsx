import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Shows extends React.Component {
    constructor(){
        super()

        this.state = {
            shows: {}
        }
    }

    getAllShows = async () => {
        let showObj = {}
        try{
            let res = await axios.get(`http://localhost:3001/shows`)
            let showArr = res.data.body.shows
            for (let show of showArr){
                if(!showObj[show.title]) {
                    showObj[show.title] = {}
                    showObj[show.title].img_url = show.img_url
                    showObj[show.title].genre = show.genre_name
                    let viewer = {}                   
                    viewer[show.id] = {user_id: "", username: ""}
                    viewer[show.id].user_id = show.user_id;
                    viewer[show.id].username = show.username;
                    
                    showObj[show.title].viewers = viewer
                } else {
                    showObj[show.title].viewers[show.id] = {user_id: "", username: ""}
                    showObj[show.title].viewers[show.id].user_id = show.user_id;
                    showObj[show.title].viewers[show.id].username = show.username;
                    
                }
            }
            this.setState({
                shows: showObj
            })
        } catch (error) {
            console.log(error)
        }

    }

    


    componentDidMount() {
        this.getAllShows();
    }

    render() {
        
        const {shows} = this.state
        console.log(shows)
        return(
            <div>
                <h1>These are the shows everyone is watching!</h1>
                {Object.keys(shows).map((show) => {
                        // console.log(show)

                        return (
                            <div key={show}>
                                <img src={shows[show].img_url} alt={show}/>
                                <h3>{show}</h3>
                                <p>{shows[show].genre}</p>
                                <ul> Currently watching: 
                                    {Object.keys(shows[show].viewers).map((viewer) => {
                                        // console.log(shows[show].viewers[viewer])
                                        return (
                                            <li><Link to={`/shows/${viewer}/users/${shows[show].viewers[viewer].user_id}`}>{`${shows[show].viewers[viewer].username}`}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Shows;