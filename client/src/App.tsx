import React, {useState} from 'react';
import "./styles/index.css";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Home, NotFound, SignIn} from "./containers";
import {User} from "./lib/types";
import {SignUp} from "./containers/SignUp";

const initialUser: User = {
    _id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    didRequest: false
};

function App() {
    const [user, setUser] = useState<User>(initialUser);

    return (
        <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/sign-up" render={props => <SignUp {...props} setUser={setUser}/>}/>
                    <Route exact path="/sign-in" render={props => <SignIn {...props} setUser={setUser}/>}/>

                    <Route path="/*" component={NotFound} />
                </Switch>
        </BrowserRouter>
    )
}

export default App;
