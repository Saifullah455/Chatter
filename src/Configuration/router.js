import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatApp from '../Components/chatapp';
import Inbox from '../Components/inbox';

class AppRouter extends Component {
    render(){
        return(
            <Router>
                <Route exact path = '/' component={ChatApp}/>
                <Route exact path = '/inbox' component={Inbox}/>
            </Router>
        )
    }
}

export default AppRouter;