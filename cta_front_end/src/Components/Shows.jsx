import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

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
            showArr.map((show) => {
                if(!showObj[show.title]) {
                    showObj[show.title] = {}
                    showObj[show.title].img_url = show.img_url
                    let viewers = [];
                    viewers.push(show.username)
                    showObj[show.title].viewers = viewers
                } else {
                    showObj[show.title].viewers.push(show.username)
                }
            })
        
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
        return(
            <div>
                <h1>These are the shows everyone is watching!</h1>
                {Object.keys(shows).map((show) => {
                        console.log(show)

                        return (
                            <div key={show}>
                                <img src={shows[show].img_url}/>
                                <h3>{show}</h3>
                                <p>Watched by {shows[show].viewers.join(", ")}</p>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Shows;