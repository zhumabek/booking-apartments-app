import React, {useEffect, useRef, useState} from 'react';
import "./styles/index.css";
import {BrowserRouter, Switch, Route, RouteProps, Redirect} from "react-router-dom";
import {Apartments, EditApartment, EditApartmentTimeSlots, Home, NotFound, SignIn} from "./containers";
import {User} from "./lib/types";
import {SignUp} from "./containers/SignUp";
import {Affix, Col, Layout, Row} from "antd";
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
        },
        onError: (error) => {
            console.log(error);
        }
    });
    const logInRef = useRef(logIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    const logInErrorBannerElement = error ? (
        <ErrorBanner
            message="We weren't able to verify if you were signed in."
            type="info"
            description="If you are a seller please sign up or sign in to the system" />
    ) : null;

    return (
        <BrowserRouter>
            <Layout className="app">
                <Affix offsetTop={0} className="app__affix-header">
                    <AppHeader user={user} setUser={setUser} />
                </Affix>
                <Row className="app-main">
                    <Col xs={{span: 24, offset: 0 }} md={{ offset: 2, span: 20 }}>
                        {logInErrorBannerElement}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <ProtectedRoute isAllowed={!user._id} exact path="/sign-up" render={props => <SignUp {...props} setUser={setUser}/>}/>
                            <ProtectedRoute isAllowed={!user._id} exact path="/sign-in" render={props => <SignIn {...props} setUser={setUser}/>}/>

                            <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartment" component={EditApartment}/>
                            <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartment/:id" component={EditApartment}/>
                            <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartments" component={Apartments}/>
                            <ProtectedRoute isAllowed={user && user.role === USER_ROLES.SELLER} exact path="/apartment/:id/time-slots" component={EditApartmentTimeSlots}/>

                            <Route path="/*" component={NotFound} />
                        </Switch>
                    </Col>
                </Row>
            </Layout>
        </BrowserRouter>
    )
}

const ProtectedRoute = ({isAllowed, ...props}: {isAllowed: boolean} & RouteProps) => {
    return isAllowed ? <Route {...props} /> : <NotFound/>;
};

export default App;
