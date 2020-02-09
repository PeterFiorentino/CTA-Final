import React from 'react';
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
            newComment: "",
            
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
                show_img: res.data.body.shows.img_url,
                genre: res.data.body.shows.genre_name
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
        const { commentors_id, newComment } = this.state
        const { show_id } = this.props.match.params
        try {
            await axios.post(`http://localhost:3001/comments`, {comment_body: newComment, user_id: commentors_id, show_id: show_id})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getUser()
        this.getShow()
        this.getComments()
    }

    componentDidUpdate() {
        this.getComments()
    }

    render() {
        let { thisProfilesName, show_title, show_img, comments, user_img_url, genre } = this.state
        return (
            <div className="viewerPage">
                <div id="viewerInfo">
                    <img src={user_img_url} alt={thisProfilesName} id="viewerUser"></img>
                    <h1>{thisProfilesName} is binging {show_title}</h1>
                </div>
                <img src={show_img} alt={show_title}/> 
                <p id="genreViewer">For viewers who love {genre}</p>
                <p id="amountOfComments">{comments.length} Comments</p> 
                <div id="surroundingComments">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Comment..." onChange={this.handleComment}></input>
                        <button type="submit">Add</button>
                    </form>
                    {comments.map((comment) => {
                        return (
                            <div className="entireCommentInfo">
                                <div className="commentorInfo">
                                    <img src={comment.avatar_url} alt={comment.username} className="commentAvatar"/>
                                    <h3>{comment.username}</h3>
                                </div>
                                <p>{comment.comment_body}</p>
                            </div>
                        )
                    })} 
                </div>
            </div>
        )
    }   
}

export default ShowByViewer;