import React, {useEffect, useRef, useState} from 'react';
import "./styles/index.css";
import {BrowserRouter, Switch, Route, RouteProps, Redirect} from "react-router-dom";
import {Apartments, EditApartment, Home, NotFound, SignIn} from "./containers";
import {User} from "./lib/types";
import {SignUp} from "./containers/SignUp";
import {Affix} from "antd";
import {AppHeader} from "./components/AppHeader";
import {useMutation} from "react-apollo";
import {SignIn as SingInData, SignInVariables} from "./lib/graphql/mutations/SignIn/__generated__/SignIn";
import {SIGN_IN} from "./lib/graphql/mutations/SignIn";
import {ErrorBanner} from "./components/ErrorBanner";
import {USER_ROLES} from "./lib/utils/constants";

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
    const [logIn, { error }] = useMutation<SingInData, SignInVariables>(SIGN_IN, {
        onCompleted: data => {
            if (data && data.signIn) {
                setUser(data.signIn);

                if (data.signIn.token) {
                    sessionStorage.setItem("token", data.signIn.token);
                } else {
                    sessionStorage.removeItem("token");
                }
            }
        }
    });
    const logInRef = useRef(logIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    const logInErrorBannerElement = error ? (
        <ErrorBanner description="We weren't able to verify if you were signed in. Please try again later!" />
    ) : null;

    return (
        <BrowserRouter>
                <Affix offsetTop={0} className="app__affix-header">
                    <AppHeader user={user} setUser={setUser} />
                </Affix>
                {logInErrorBannerElement}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute isAllowed={!user} exact path="/sign-up" render={props => <SignUp {...props} setUser={setUser}/>}/>
                    <ProtectedRoute isAllowed={!user} exact path="/sign-in" render={props => <SignIn {...props} setUser={setUser}/>}/>

                    <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartments" component={Apartments}/>
                    <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartment" component={EditApartment}/>
                    <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartment/:id" component={EditApartment}/>

                    <Route path="/*" component={NotFound} />
                </Switch>
        </BrowserRouter>
    )
}

const ProtectedRoute = ({isAllowed, ...props}: {isAllowed: boolean} & RouteProps) => {
    return isAllowed ? <Route {...props} /> : <Redirect to={"/"}/>
};

export default App;
