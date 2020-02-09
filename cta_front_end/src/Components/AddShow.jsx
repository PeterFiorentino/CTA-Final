import React from 'react';
import axios from 'axios';

class AddShow extends React.Component {
    constructor() {
        super()
        this.state = {
            thisProfilesName: "",
            thisProfilesID: 0,
            imgURL: "",
            title: "",
            genre_id: 0,
            genres: []
        }
    }

    getUser = async () => {
        try {
            const { user_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/users/${user_id}`)
            
            this.setState({
                thisProfilesName: res.data.body.users.username,
                thisProfilesID: res.data.body.users.id
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handlePoster = (event) => {
        this.setState({
            imgURL: event.target.value
        })
    }

    handleSubmit = async (event) => {
        const { title, imgURL, thisProfilesID, genre_id} = this.state;
        event.preventDefault()
        try{
            await axios.post(`http://localhost:3001/shows`, {title: title, img_url: imgURL, user_id: thisProfilesID, genre_id: genre_id})
        } catch (error) {
            console.log(error)
        }
    }

    getGenres = async () => {
        try{
            let res = await axios.get(`http://localhost:3001/genres`)
            this.setState({
                genres: res.data.body.genres
            })
        } catch(error) {
            console.log(error)
        }
    }

    getSelectValue = (event) => {
        this.setState({
            genre_id: event.target.value
        })
    }


    componentDidMount() {
        this.getUser()
        this.getGenres()
    }
    
    render() {
        const { genres } = this.state
        return(
            <div>
                <h3>Hey, {this.state.thisProfilesName}! Add a show to your watchlist</h3>
                <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title..." onChange={this.handleTitle} required></input>
                        <input placeholder="Show Poster..." type="text" onChange={this.handlePoster} required />
                        <select onChange={this.getSelectValue}>
                            <option>Pick a genre!</option>
                            {genres.map((genre) => {
                                return(
                                    <option value={genre.id}>{genre.genre_name}</option>
                                )
                            })}
                        </select>
                        <input type="submit" value="Upload" />
                </form>
            </div>
        )
    }

}

export default AddShow;