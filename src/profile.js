import React from "react";
import { Link } from "react-router-dom"

export default class UserPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dogName: null,
            nickName: null,
            age: null,
            bio: null,
            friends: null  
        }
    }
    componentDidMount() {
        const { handle } = this.props.match.params
        const { dogName, nickName, age, bio, friends } = this.props.location.state

        this.setState({
            dogName: dogName,
            nickName: nickName,
            age: age,
            bio: bio,
            friends: friends
        })
    }

    render() { return (
            <div className="container">
                <h3>This is the profile page</h3>
                <p>Name: {this.state.dogName}</p>
                <p>Nickname: {this.state.nickName}</p>
                <p>Age: {this.state.age}</p>
                <p>Bio: {this.state.bio}</p>
                <p>Friends: {this.state.friends}</p>
                <br/>
                <p>
                    <Link to="/edit">Edit</Link>
                </p>
                <p>
                    <Link to="/">home</Link>
                </p>
            </div>
        )
    }
}

/*
export default function UserPage(props) {
    return (
        <div class="container">
            <h1>Hello there dog</h1>
            <p>This is your awesome User Profile page</p>
            <p>
                <Link to="/edit">Edit</Link>
            </p>
            <br/>
            <p>
                <Link to="/">home</Link>
            </p>
        </div>
    );
}*/