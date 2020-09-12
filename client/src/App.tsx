import React from 'react';
import "./styles/index.css";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Home, NotFound, Login} from "./containers";


function App() {
    return (
        <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login}/>

                    <Route path="/*" component={NotFound} />
                </Switch>
        </BrowserRouter>
    )
}

export default App;
