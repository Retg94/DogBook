import React from "react"
import { Link } from "react-router-dom"



export default function HomePage(props) {
return (
    <div className="container">
        <h1>Dogbook!!!!</h1>
        <br/>
        <div>{props.dogs.map(dog => {
            return (
                    <>
                        <Link key={dog.key} 
                            to={{
                                pathname: `/profile/${dog.dogName}`,
                                state: dog
                        }}>
                                <p key={dog.key}>{dog.dogName}</p>  
                        </Link>
                        <button onClick={() => {
                            let index = props.dogs.findIndex(element => element.key===dog.key)
                            props.dogs.splice(index, 1)
                            console.log(props.dogs)
                            window.localStorage.clear();
                            window.localStorage.setItem("dogs", JSON.stringify(props.dogs));
                            location.reload();
                        }}>X</button>
                    </>
            )
        })}
        </div>
        <p>
            <Link to="/profile">Dog number one</Link>
        </p>
        <br/>
        <p>
            <Link to="/create">Create new dog</Link>
        </p>
    </div>
    )
}