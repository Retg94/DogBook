import React from "react"
import { Link } from "react-router-dom"

function deleteDog (dogs, currentKey) {
    return function () {
        let index = dogs.findIndex(element => element.key===currentKey)
        //console.log("index: " + index)
        dogs.splice(index, 1)
        //console.log(dogs)
        for(let i = 0; i<dogs.length; i++){
            //console.log(`Length: ${dogs[i].friends.length}`)
            if(!(dogs[i].friends === undefined) && !(dogs[i].friends==null) && !(dogs[i].friends.length == 0)){
                let dogsFriends = dogs[i].friends;
                let deleteIndex = dogsFriends.findIndex(element => element.toString()===currentKey.toString()) //element===currentKey didn't work, why?
                //console.log("deleteIndex: " + deleteIndex)
                if(deleteIndex!==-1){
                    //console.log("Inside delete!")
                    dogs[i].friends.splice(deleteIndex, 1)
                }

            }
        }
        window.localStorage.clear();
        window.localStorage.setItem("dogs", JSON.stringify(dogs));
        location.reload();
    }
}

function renderPresent(dog){
    if(dog.present==="true")
        return "The dog is here"
    else if(dog.present==="false")
        return "The dog is at home"
    else
        return "Error loading presentinfo"
}

export default function HomePage(props) {
return (
    <div className="homePageContainer">
        <div className="homePageHeader"><h1>Dogbook!!!!</h1></div>
        <br/>
        <div className="createNewDogLink">
            <p>
                <Link to="/create">Create new dog</Link>
            </p>
        </div>
        <div className="dogsHomePageContainer">{props.dogs.map(dog => {
            let color = "red";
            if(dog.present==="true"){
                color = "green"
            }

            return (
                    <div style={{"borderStyle": "solid", "borderColor": color, "borderWidth": "10px"}} className="oneDogHomePage" key={`DivKey${dog.key}`}>
                        <Link key={`LinkKey${dog.key}`} 
                            to={{
                                pathname: `/profile`,
                                state: dog
                        }}>
                                <p style={{"color": color, "fontWeight": "bold"}}>{dog.dogName}</p>  
                        </Link>
                        <p>{renderPresent(dog)}</p>
                        <button key={`ButtonKey${dog.key}`} onClick={deleteDog(props.dogs, dog.key)}>Delete dog</button>
                    </div>
            )
        })}
        </div>
        <br/>
    </div>
    )
}