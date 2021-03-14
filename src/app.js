import React, {useState} from "react"
import { Route, Switch } from "react-router-dom" 
import HomePage from "./start"
import UserPage from "./profile"
import CreateNewDog from "./create"
import EditInfo from "./edit"




export default function App() {
    const getDogs = () => {
        let dogs = JSON.parse(window.localStorage.getItem('dogs'));
        console.log(dogs)

        /*console.log(dogs)
        let result = [];
        if(dogs === null) {
            result = (
                <p>Empty dog list</p>
            )
        } else {
            dogs.forEach(dog => {
                result.push (
                    <div>
                        Name: {dog.dogName} <br/>
                        Nickname: {dog.nickName} <br/>
                    </div>
                )
            });
        }*/
        return dogs || [];
    }
    const [dogs, setDogs] = useState(getDogs());

    return (
        <Switch>
            <Route exact path="/" render={(props => (<HomePage dogs={dogs} {...props}/>) )} />
            <Route path="/profile/:handle" render={(props => (<UserPage dogs={dogs} {...props}/>) )} />
            <Route path="/create" render={(props => (<CreateNewDog dogs={dogs} {...props}/>) )} />
            <Route path="/edit" component={EditInfo} />
        </Switch>
    )
}