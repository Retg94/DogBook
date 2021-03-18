import React, { useImperativeHandle } from "react"
import { Link, Redirect } from "react-router-dom"
import regeneratorRuntime from "regenerator-runtime"; //för att kunna använda async

export default class CreateNewDog extends React.Component {
    constructor( props ){
        super( props );
        this.handleNewDog = this.handleNewDog.bind(this);
        this.validateKey = this.validateKey.bind(this);
    }

    getDogFromIdAndAddFriend(id, friendId) {
        let tmpDog = "";

        this.props.dogs.forEach(element => {
            if(element.key==id){
                tmpDog=element;
            }
        });
        tmpDog.friends.push(friendId)
        return tmpDog;
    }

    async handleNewDog(event) {
        
        var existingDogs = this.props.dogs;
        if(existingDogs === null) existingDogs = [];
        const dogForm = document.getElementById("createNewDogForm");
        let tmpDogName = dogForm.dogName.value;
        let tmpNickName = dogForm.nickName.value;
        let tmpAge = dogForm.age.value;
        let tmpBio = dogForm.bio.value;
        let tmpPresent = "false";
        
        let response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        response = await response.json();
        let tmpImgUrl = response.message;
        
        let uniqueValue = existingDogs.length + 1;
        while(this.validateKey(existingDogs, uniqueValue)){
            uniqueValue++;
        }

        const selectElement = document.getElementById("selectFriends");
        let tmpFriends = [];

        let friendDog = "";
        if(selectElement.value!=""){ //Add this dog to selected dog's friendlist
            tmpFriends.push(selectElement.value);
            friendDog = this.getDogFromIdAndAddFriend(selectElement.value, uniqueValue)
            let deleteIndex = existingDogs.findIndex(element => element.key===friendDog.key)
            existingDogs.splice(deleteIndex, 1)
            existingDogs.push(friendDog)
        }

        let newDog = {
            key: uniqueValue,
            dogName: tmpDogName,
            nickName: tmpNickName,
            age: tmpAge,
            bio: tmpBio,
            friends: tmpFriends,
            present: tmpPresent,
            imgUrl: tmpImgUrl
        }
        console.log(newDog)

        existingDogs.push(newDog)
        
        window.localStorage.setItem("dogs", JSON.stringify(existingDogs));
        alert("Dog created! Returning to homepage.")
        this.props.history.push('/')
    }

    validateKey (arr, tmpIndex) {
        let found = false;
        arr.forEach(element => {
            if(element.key === tmpIndex){
                found = true;
            }
        });
        return found;
    }

    getOptionValues () {
        let existingDogs = this.props.dogs;
        if(existingDogs===null) existingDogs = [];
        
        let optionsArr = existingDogs.map(element => {
            return <option name="friends" key={element.key} value={element.key}>{element.dogName}</option>
        });
        optionsArr.unshift(<option key="emptyFirstValue" value="">Add new friend</option>)
        return optionsArr;
    }

    render() {
        return (
            <div className="createAndEditPageContainer">
                <h1>Create new dog</h1>
                <br/>
                <p>Enter inputs in the fields, then click "Create" to create the new dog:</p>
                    <form id="createNewDogForm">
                        <div className="formDiv">
                            <div>
                                <label htmlFor="dogName">Name:</label>
                                <input type="text" name="dogName"/>
                            </div>
                            <div>
                                <label htmlFor="nickName">Nickname:</label>
                                <input type="text" name="nickName"/>
                            </div>
                            <div>
                                <label htmlFor="age">Age:</label>
                                <input type="number" name="age" min="0"/>
                            </div>
                            <div>
                                <label htmlFor="bio">Bio:</label>
                                <input type="text" name="bio"/>
                            </div>
                            <div>
                                <label htmlFor="friends">Add new friend:</label>
                                <select id="selectFriends" name="friends">{this.getOptionValues()}</select>
                            </div>
                            <br/>
                            <input type="button" onClick={this.handleNewDog} value="Create"/>
                        </div>
                    </form>
                <p>
                    <Link to="/">Back to homepage</Link>
                </p>
            </div>
        )
    }
};
