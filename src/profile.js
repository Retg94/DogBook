import React from "react";
import { Link, Redirect } from "react-router-dom"

export default class UserPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dogName: null,
            nickName: null,
            age: null,
            bio: null,
            friends: null,
            present: null,
            imgUrl: null
        }
    }

    componentDidMount() {
        const { handle } = this.props.match.params
        const { key, dogName, nickName, age, bio, friends, present, imgUrl } = this.props.location.state
        //console.log("Mounted")
        this.setState({
            key: key,
            dogName: dogName,
            nickName: nickName,
            age: age,
            bio: bio,
            friends: friends,
            present: present,
            imgUrl: imgUrl
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.state.key !== prevProps.location.state.key){
            const { handle } = this.props.match.params
            const { key, dogName, nickName, age, bio, friends, present, imgUrl } = this.props.location.state
            this.setState({
                key: key,
                dogName: dogName,
                nickName: nickName,
                age: age,
                bio: bio,
                friends: friends,
                present: present,
                imgUrl: imgUrl
            })

            console.log("Changed")
        }
    }

    getDogFromId(id) {
        let tmpDog = "";

        this.props.dogs.forEach(element => {
            if(element.key==id){
                tmpDog=element;
            }
        });

        return tmpDog;
    }

    
    
    renderPresent(){
        //console.log(`Presentvalue: ${this.state.present}`)
        let text = "";
        if(this.state.present==="false") {
            text = "Hunden är hemma"
            return (
                <>
                <label key={`label${this.state.key}`} htmlFor="present"><p>{text}</p></label>
                <input className="checkbox" key={`input${this.state.key}`} type="checkbox" id="present" name="present" onChange={e => this.handlePresent(e)}></input>
                </>
            )
        }
        else if (this.state.present==="true"){
            text = "Hunden är här";
            return (
                <>
                <label key={`label${this.state.key}`} htmlFor="present"><p>{text}</p></label>
                <input className="checkbox" key={`input${this.state.key}`} type="checkbox" id="present" name="present" onChange={e => this.handlePresent(e)} defaultChecked></input>
                </>
            )
        }
        else
        return "Error loading presentcheckbox"
    }
    
    innerHandlePresent(isChecked){
        let index = this.props.dogs.findIndex(element => element.key===this.state.key)
        this.props.dogs.splice(index, 1)
        console.log("Present value passed into localstorage: " + isChecked)
        let newDog = {
            key: this.state.key,
            dogName: this.state.dogName,
            nickName: this.state.nickName,
            age: this.state.age,
            bio: this.state.bio,
            friends: this.state.friends,
            present: isChecked,
            imgUrl: this.state.imgUrl
        }
        this.props.dogs.push(newDog)
        window.localStorage.clear();
        window.localStorage.setItem("dogs", JSON.stringify(this.props.dogs));
        alert("Saved!")
        console.log()
    }
    
    handlePresent(e){
        if(e.target.checked){
            this.setState({present: e.target.checked.toString()}, this.innerHandlePresent("true"))
        }
        else {
            this.setState({present: e.target.checked.toString()}, this.innerHandlePresent("false"))        
        }    
    }

    deleteFriend(key){
        let friendDog = this.getDogFromId(key)
        let friendDogIndex = this.props.dogs.findIndex(element => element.key===key)
        this.props.dogs.splice(friendDogIndex, 1)
        let thisDogIndex = this.props.dogs.findIndex(element => element.key===this.state.key)
        this.props.dogs.splice(thisDogIndex, 1)

        let deleteIndexFriendDog = friendDog.friends.findIndex(element => element.toString()===this.state.key.toString())
        console.log(deleteIndexFriendDog)
        let deleteIndexThisDog = this.state.friends.findIndex(element => element.toString()===key.toString())
        if(deleteIndexThisDog!==-1 && deleteIndexFriendDog!==-1){
            this.state.friends.splice(deleteIndexThisDog, 1)
            console.log(friendDog.friends)
            friendDog.friends.splice(deleteIndexFriendDog, 1)
            let thisDog = {
                key: this.state.key,
                dogName: this.state.dogName,
                nickName: this.state.nickName,
                age: this.state.age,
                bio: this.state.bio,
                friends: this.state.friends,
                present: this.state.present,
                imgUrl: this.state.imgUrl
            }

            this.props.dogs.push(thisDog)
            this.props.dogs.push(friendDog)
            window.localStorage.clear();
            window.localStorage.setItem("dogs", JSON.stringify(this.props.dogs));
            alert("Friend removed!")
        } else {
            console.log("Error deleting dog")
        }
    }
    renderLinkToEdit(Key, DogName, NickName, Age, Bio, Friends, Present, ImgUrl){
        return(
            <Link to={{
                pathname: `/edit`,
                state: {
                    key: Key,
                    dogName: DogName,
                    nickName: NickName,
                    age: Age,
                    bio: Bio,
                    friends: Friends,
                    present: Present,
                    imgUrl: ImgUrl
                }
            }}>Edit</Link>
        )
    }
    
    renderFriendList(friends) {
        let result = ""
        //console.log(friends)
        if(friends === undefined || friends==null || friends.length == 0){
            result = <p>No friends yet</p>
        } else {
            result = friends.map(id => {
                let tmpDog = this.getDogFromId(id)
                return (
                    <div className="profilePageFriendAndButtonContainer" key={tmpDog.key}>
                        <div>
                            <button className="profilePageDeleteFriendButton" key={`Button${tmpDog.key}`} onClick={() => this.deleteFriend(tmpDog.key)}>X</button>
                        </div>
                        <div>
                            <Link key={`LinkKey${tmpDog.key}`} 
                                to={{
                                    pathname: `/profile/${tmpDog.dogName}`,
                                    state: tmpDog
                            }}>
                                    <p key={tmpDog.key}>{tmpDog.dogName}</p>  
                            </Link>
                        </div>
                    </div>
                )
           });
           result.unshift(<h1 key="headerText">This is my friends: </h1>)
        }

       return result;
    }

    render() { 
        return (
            <div className="profilePageContainer">
                <div className="profilePagePicture">
                    <p>This is the profile page</p>
                    <img src={this.state.imgUrl} width="75%%" height="auto"></img>
                </div>
                <div className="profilePageInfo">
                    <div className="profilePageCheckboxContainer">{this.renderPresent()}</div>
                    <p>Name: {this.state.dogName}</p>
                    <p>Nickname: {this.state.nickName}</p>
                    <p>Age: {this.state.age}</p>
                    <p>Bio: {this.state.bio}</p>
                    <p>
                        {this.renderLinkToEdit(this.state.key, this.state.dogName, this.state.nickName, this.state.age, this.state.bio, this.state.friends, this.state.present, this.state.imgUrl)}
                    </p>
                    <p>
                        <Link to="/">home</Link>
                    </p>
                </div>
                <div className="profilePageFriendList">
                    {this.renderFriendList(this.state.friends)}
                </div>
            </div>
        )
    }
}