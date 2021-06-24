import React, { Component } from 'react';
import { connect } from 'react-redux';
import { facebookLogin } from '../Store/action';
import '../App.css';
import logo from '../Assets/images/chat_logo.png';

class ChatApp extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="heading"> <img src={logo} width="80" className="logo" /> Chatter</h1>
                <p className="titletext">Click Repeatedly Together from Cold or Fear.Talk or Write in a Trivial or Foolish Way.</p>
                <button className="fb_login" onClick={() => this.props.facebook_login(this.props.history)}>FACEBOOK LOGIN</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user_data : state.auth_reducer.users
})

const mapDispatchToProps = (dispatch) => ({
    facebook_login: (history) => dispatch(facebookLogin(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);