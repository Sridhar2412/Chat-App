import React from 'react'
import { Route, Redirect } from 'react-router'
export default function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated === false ? (<Component {...props} />) : (<Redirect to="/dashboard" />)}
        />
    )
}
