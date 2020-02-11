import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: props.user_id,
            username: props.username
        }
    }

    componentWillReceiveProps() {
        this.setState({
            user_id: this.props.user_id,
            username: this.props.username
        })
    }


    render() {
        return (
            <nav>
                <strong><p>Binge</p></strong>
                <Link to="/" >Home</Link>
                <Link to="/users" user_id={this.state.user_id}>Users</Link>
                <Link to="/shows" >Shows</Link>
                <Link to="/addShow" user_id={this.state.user_id} username={this.state.username}>Add a Show</Link>
                <Link to="/about" >About</Link>
            </nav>
        )
    }
}

export default NavBar;

