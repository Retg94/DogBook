import React, {useState} from "react"
import { Link, useHistory } from "react-router-dom"

function returnOptions (dogs, currentKey, friends) {
    let existingDogs = dogs;
    //console.log(existingDogs)
    if(existingDogs===null) existingDogs = [];
    if(friends===null || friends === undefined) friends = [];

    console.log(friends)
    let optionsArr = existingDogs.map(element => {
        if(element.key!=currentKey && !friends.includes(element.key.toString()))
            return <option name="friends" key={element.key} value={element.key}>{element.dogName}</option>           
    });
    //console.log(optionsArr)
    optionsArr.unshift(<option key="firstOption" value="">Add new friend</option>)
    return optionsArr;
}

export default function EditInfo(props) {
    const dogs = props.dogs;
    function saveHandler (tmpKey, dogs, friends, tmpPresent, tmpImgUrl) {
        let index = dogs.findIndex(element => element.key===tmpKey)
        dogs.splice(index, 1)
        const dogForm = document.getElementById("updateDogForm");
        let tmpDogName = dogForm.dogName.value;
        let tmpNickName = dogForm.nickName.value;
        let tmpAge = dogForm.age.value;
        let tmpBio = dogForm.bio.value;   
    
        const selectElement = document.getElementById("selectFriend");
        let tmpFriends = friends;
        if(selectElement.value!=="")
            tmpFriends.push(selectElement.value);
    
        let newDog = {
            key: tmpKey,
            dogName: tmpDogName,
            nickName: tmpNickName,
            age: tmpAge,
            bio: tmpBio,
            friends: tmpFriends,
            present: tmpPresent,
            imgUrl: tmpImgUrl
        }
    
        //console.log(newDog)
        dogs.push(newDog)
        window.localStorage.clear();
        window.localStorage.setItem("dogs", JSON.stringify(dogs));
        alert("Saved! Returning to homepage.")
        props.history.push("/")
    }
    return (
        <div className="createAndEditPageContainer">
            <p>Enter inputs in the fields, then click "Save" to save the new info: </p>

            <form id="updateDogForm">
                <div className="formDiv">
                    <div>
                        <label htmlFor="dogName">Name:</label>
                        <input type="text" name="dogName" defaultValue={props.location.state.dogName} />
                    </div>
                    <div>
                        <label htmlFor="nickName">Nickname: </label>
                        <input type="text" name="nickName" defaultValue={props.location.state.nickName} />
                    </div>
                    <div>
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" min="0" defaultValue={props.location.state.age} />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio: </label>
                        <input type="text" name="bio" defaultValue={props.location.state.bio} />  
                    </div>
                    <div>
                        <label htmlFor="friends">Add first friend: </label>
                        <select id="selectFriend" name="friends">{returnOptions(dogs, props.location.state.key, props.location.state.friends)}</select>
                    </div>
                    <br/>
                    <input type="button" onClick={() => saveHandler(props.location.state.key, dogs, props.location.state.friends, props.location.state.present, props.location.state.imgUrl)} 
                    value="Save"/>
                </div>


            </form>
            <Link to={{
                        pathname: `/profile`,
                        state: {
                            key: props.location.state.key,
                            dogName: props.location.state.dogName,
                            nickName: props.location.state.nickName,
                            age: props.location.state.age,
                            bio: props.location.state.bio,
                            friends: props.location.state.friends,
                            present: props.location.state.present,
                            imgUrl: props.location.state.imgUrl
                        }
                    }}><p>Back to profile</p>
            </Link>
            <p>
                <Link to="/">Back to homepage</Link>
            </p>
            <br/>
        </div>
    )
}
