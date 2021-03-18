import React, {useState} from "react"
import { Route, Switch } from "react-router-dom" 
import HomePage from "./start"
import UserPage from "./profile"
import CreateNewDog from "./create"
import EditInfo from "./edit"


function deleteFromFriendList(){

}

export default function App() {
    const getDogs = () => {
        let dogs = JSON.parse(window.localStorage.getItem('dogs'));
        //console.log(dogs)
        if(dogs!==null){
            dogs = dogs.sort( (a, b) => {
                var nameA=a.dogName.toLowerCase(), nameB=b.dogName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            });       
        }
        return dogs || [];
    }

    const [dogs] = useState(getDogs());

    return (
        <Switch>
            <Route exact path="/" render={(props => (<HomePage dogs={dogs} {...props}/>) )} />
            <Route path="/profile" component={(props => (<UserPage dogs={dogs} {...props}/>) )} />
            <Route path="/create" render={(props => (<CreateNewDog dogs={dogs} {...props}/>) )} />
            <Route path="/edit" render={(props => (<EditInfo dogs={dogs} {...props}/>) )} />
        </Switch>
    )
}