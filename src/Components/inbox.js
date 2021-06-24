import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, saveChats } from '../Store/action/index';
import firebase from '../Configuration/Firebase/firebase';
import '../Appinbox.css'

class Inbox extends Component {

    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }

    getFirebasechats = (uid) => {
        let chats = [];
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (data) => {
            chats.push(data.val());
        })
        this.state.chats = chats
        this.setState({
            chats: this.state.chats
        })
    }

    uidMerge = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2;
        }
        else {
            return uid2 + uid1;
        }
    }

    updateCurrUser = (chatUser) => {
        this.setState({
            chat_user: chatUser
        })
    }

    chat = () => {
        var uid = this.uidMerge(this.state.chat_user.uid, this.props.user_name.uid)
        this.getFirebasechats(uid)
    }

    send = () => {

        // ----- a. View text message through Redux State -----

        this.props.userChats(this.state.chat_user, this.props.user_name, this.state.message)
        var uid = this.uidMerge(this.state.chat_user.uid, this.props.user_name.uid)
        this.getFirebasechats(uid);
        this.state.message = "";

        // ----- a. View text message through State Data -----

        /*this.state.chats.push({
            message: this.state.message
        })
        this.setState({
            chats: this.state.chats,
            message: ""
        })*/
    }


    render() {
        let user = this.props.user_name;
        return (
            <div className="inbox" onMouseOver={
                () => {
                    this.chat()
                    {
                        this.state.chats.map((v, i) => {
                            return <li style={{ color: "black" }} key={i}>{v.message}</li>
                        })
                    }
                }
             }>
                <div>
                    <h5 className="profileName"><img src={user.profilePhoto} className="profile_pic" />{user.name}</h5>
                </div>

                {/* <p className="mail">{user.email}</p> */}

                <div>
                    <div>
                        <h4 className="friends">Friends</h4>
                        <ul>
                            {this.props.all_users.map((v, i) => {
                                // let check = v.name !== this.props.user_name.name ? <li key={i}> <img src={v.profilePhoto} width="20" /> {v.name} <button onClick={() => this.chat(v)}>Chat</button></li> : "";
                                // return check;
                                return v.name !== this.props.user_name.name && <li className="friends_list" key={i}> <img className="friends_list_image" src={v.profilePhoto} width="30" /> {v.name} <button
                                    className="chat_button"
                                    onClick={
                                        () => this.updateCurrUser(v)
                                    }
                                >Chat</button></li>
                            })}
                        </ul>
                        <div className="chatBox">
                            {Object.keys(this.state.chat_user).length
                                ?
                                <div className="chatinnnerbox" style={{ backgroundColor: "black", width: 350 }}>
                                    <h4 className="chatuser" style={{ color: "white" }}> <img className="chatimage" style={{ marginTop: 5, marginLeft: 5 }} width="25" src={this.state.chat_user.profilePhoto} /> {this.state.chat_user.name}</h4>
                                    <div>
                                        <ul>

                                            {/* ----- b. View text message through Redux State ----- */}

                                            {/* {this.props.chats.map((v, i) => {
                                            return <li style={{ color: "black" }} key={i}>{v.message}</li>
                                        })} */}

                                            {/* ----- b. View text message through State Data ----- */}

                                            {this.state.chats.map((v, i) => {
                                                return <li style={{ color: v.uid === user.uid ? "orange" : "white", marginRight: 50, textAlign: v.uid === user.uid ? "right" : "left", listStyleType: "none" }} key={i}>{v.profilePhoto}{v.message}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div className="send">
                                        <input className="message" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" placeholder="Enter your message..." style={{ textAlign: "center" }} />
                                        <button className="chat_button message" onClick={() => this.send()}>Send</button>
                                    </div>
                                </div>
                                :
                                ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_users()
    }
}

const mapStateToProps = (state) => ({
    user_name: state.auth_reducer.currUser,
    all_users: state.auth_reducer.users,
    chats: state.auth_reducer.chats
})

const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(getUsers()),
    userChats: (chat, user, msg) => dispatch(saveChats(chat, user, msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);