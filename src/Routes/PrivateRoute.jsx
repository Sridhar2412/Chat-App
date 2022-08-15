import React from 'react'
import { Route, Redirect } from 'react-router'
export default function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated === true ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
        />
    )
}
