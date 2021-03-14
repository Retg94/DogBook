import React from "react"
import { Link } from "react-router-dom"

export default function EditInfo() {
    return (
        <div className="container">
            <h1>Dogname</h1>
            <br/>
            <h1>I am cute</h1>
            <p>
                <Link to="/">home</Link>
            </p>
            <br/>
            <p>
                <Link to="/profile">back to profile</Link>
            </p>
        </div>
    )
}