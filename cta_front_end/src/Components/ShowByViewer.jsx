import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class ShowByViewer extends React.Component {
    constructor(){
        super()

        this.state = {
            thisProfilesName: "",
            user_id: 0,
            user_img_url: "",
            show_title: "",
            show_img: "",
            comments: [],
            commentors_id: 1,
            newComment: ""
        }
    }

    getUser = async () => {
        try {
            const { user_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/users/${user_id}`)
            
            this.setState({
                thisProfilesName: res.data.body.users.username,
                user_id: res.data.body.users.id,
                user_img_url: res.data.body.users.avatar_url,
                
            })
        } catch (error) {
            console.log(error)
        }
    }

    getShow = async () => {
        try {
            const { show_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/shows/${show_id}`)
            
            this.setState({
                show_title: res.data.body.shows.title,
                show_img: res.data.body.shows.img_url
            })
        } catch (error) {
            console.log(error)
        }
    }

    getComments = async () => {
        try {
            const { show_id } = this.props.match.params;
            let res = await axios.get(`http://localhost:3001/comments/show/${show_id}`)
            this.setState({
                comments: res.data.body.shows
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleComment = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getUser()
        this.getShow()
        this.getComments()
    }

    render() {
        let { thisProfilesName, show_title, show_img, comments } = this.state
        return (
            <div>
                <h1>{thisProfilesName} watches {show_title}</h1>
                <img src={show_img} />  
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Comment..." onChange={this.handleComment}></input>
                    <button type="submit">Add</button>
                </form>
                {comments.map((comment) => {
                    return (
                        <div>
                            <h3>{comment.username}</h3>
                            <p>{comment.comment_body}</p>
                        </div>
                    )
                })} 
                
            </div>
        )
    }   
}

export default ShowByViewer;