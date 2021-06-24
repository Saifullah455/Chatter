import firebase from '../../Configuration/Firebase/firebase';

const facebookLogin = (history) => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                let userData = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    profilePhoto: user.photoURL
                }

                firebase.database().ref('/').child(`users/${user.uid}`).set(userData)
                    .then(() => {
                        dispatch({
                            type: "USERDATA",
                            payload: userData
                        })
                        alert("Login Successfully!")
                        history.push('/inbox');
                    })


                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorMessage);

                // ...
            });
    }
}

const getUsers = () => {
    return (dispatch) => {
        let users = [];
        firebase.database().ref('/').child('/users').on('child_added', (data) => {
            users.push(data.val());
        })
        dispatch({type: "GETUSERS", payload: users})
    }
}

const saveChats = (chatuser, curruser, message) => {
    const mergeuid = (c_uid, u_uid) => {
        if(c_uid < u_uid) {
            return c_uid + u_uid;
        }
        else {
            return u_uid + c_uid;
        }
    }

    let mess = {
        uid: curruser.uid,
        name: curruser.name,
        message: message
    }
     
    return (dispatch) => {
        firebase.database().ref('/').child(`chats/${mergeuid(chatuser.uid, curruser.uid)}`).push(mess);
        // dispatch({type: "CHATS", payload: mess})
    }
}

export {
    facebookLogin,
    getUsers,
    saveChats
}