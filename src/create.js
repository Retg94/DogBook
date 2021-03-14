import React from "react"
import { Link } from "react-router-dom"

export default class CreateNewDog extends React.Component {
    constructor( props ){
        super( props );
        this.handleNewDog = this.handleNewDog.bind(this);
    }

    handleNewDog(event) {
        var existingDogs = this.props.dogs;
        if(existingDogs === null) existingDogs = [];
        const dogForm = document.getElementById("createNewDogForm");
        let tmpDogName = dogForm.dogName.value;
        let tmpNickName = dogForm.nickName.value;
        let tmpAge = dogForm.age.value;
        let tmpBio = dogForm.bio.value;

        const selectElement = document.getElementById("selectFriends");
        let tmpFriends = []
        tmpFriends.push(selectElement.value);

        let index = existingDogs.length + 1;
        while(existingDogs.includes(index)){
            index++;
        }     

        let newDog = {
            key: index,
                dogName: tmpDogName,
                nickName: tmpNickName,
                age: tmpAge,
                bio: tmpBio,
                friends: tmpFriends  
        }

        existingDogs.push(newDog)
        
        window.localStorage.setItem("dogs", JSON.stringify(existingDogs));
    }

    getOptionValues () {
        let existingDogs = this.props.dogs;
        if(existingDogs===null) existingDogs = [];
        
        let optionsArr = existingDogs.map(element => {
            return <option name="friends" key={element.key} value={element.key}>{element.dogName}</option>
        });
        return optionsArr;
    }

    render() {
        return (
            <div id="createNewDogContainer">
                <h1>Create new dog</h1>
                <br/>
                <p>Enter inputs in the fields, then click "Create" to create the new dog:</p>
                    <form id="createNewDogForm" action="/action_page.php">
                        Name of dog: <input type="text" name="dogName"/><br/>
                        Nickname: <input type="text" name="nickName"/><br/>
                        Age: <input type="number" name="age" min="0"/><br/>
                        Bio: <input type="text" name="bio"/><br/>

                        Friends: <select id="selectFriends">{this.getOptionValues()}</select>
                        <br/>
                        <input type="button" onClick={this.handleNewDog} value="Create"/>
                    </form>
                <p>
                    <Link to="/">home</Link>
                </p>
            </div>
        )
    }
};

/*
const handleNewDog = () => {
    const dogForm = document.getElementById("createNewDogForm");
    let tmpDogName = dogForm.dogName.value;
    let tmpNickName = dogForm.nickName.value;
    let tmpAge = dogForm.age.value;
    let tmpBio = dogForm.bio.value;
    let tmpFriends = dogForm.friends.value;

    let newDog = {
        dogName: {tmpDogName},
        nickName: {tmpNickName},
        age: {tmpAge},
        bio: {tmpBio},
        friends: {tmpFriends}
    }

    window.localStorage.setItem('dog', JSON.stringify(newDog));
}

export default function CreateNewDog() {
    return (
        <div id="createNewDogContainer">
            <h1>Create new dog</h1>
            <br/>
            <p>Enter inputs in the fields, then click "Create" to create the new dog:</p>
                <form id="createNewDogForm" action="/action_page.php">
                    Name of dog: <input type="text" name="dogName"/><br/>
                    Nickname: <input type="text" name="nickName"/><br/>
                    Age: <input type="text" name="age"/><br/>
                    Bio: <input type="text" name="bio"/><br/>
                    Friends: <input type="text" name="friends"/><br/>
                    <input type="button" onClick={handleNewDog()} value="Create"/>
                </form>
            <p>
                <Link to="/">home</Link>
            </p>
        </div>
    )
}
*/