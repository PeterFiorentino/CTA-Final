import React from 'react';
import axios from 'axios';

class AddShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            user_id: props.user_id,
            avatar_url: props.avatar_url,
            imgURL: "",
            title: "",
            genre_id: 0,
            genres: [],
            addedShow: ""
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
        const { title, imgURL, user_id, genre_id} = this.state;
        event.preventDefault()
        try{
            await axios.post(`http://localhost:3001/shows`, {title: title, img_url: imgURL, user_id: user_id, genre_id: genre_id})
            this.setState({
                imgURL: "",
                title: "",
                addedShow: `Thanks, ${this.state.username}, for adding a show!`
            })
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
        this.getGenres()
    }
    
    render() {
        const { genres, username, title, imgURL, addedShow } = this.state
        return(
            <div>
                <h3>Hey, {username}! Add a show to your watchlist</h3>
                <form onSubmit={this.handleSubmit} className="addShowForm">
                        <p className="addShowTextBox">Show Title:</p>
                        <input type="text" placeholder="Title..." onChange={this.handleTitle} required className="addShowTextBox" value={title}></input>
                        <p className="addShowTextBox">Show Poster URL:</p>
                        <input placeholder="Show Poster URL..." type="text" onChange={this.handlePoster} required className="addShowTextBox" value={imgURL}/>
                        <select onChange={this.getSelectValue} className="addShowTextBox">
                            <option>Pick a genre!</option>
                            {genres.map((genre) => {
                                return(
                                    <option value={genre.id}>{genre.genre_name}</option>
                                )
                            })}
                        </select>
                        <input type="submit" value="Upload" className="addShowTextBox" id="addShowSubmitButton"/>
                        <h3>{addedShow}</h3>
                </form>
            </div>
        )
    }

}

export default AddShow;