import React, { Component } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import { Layout } from './components/Layout';
import './custom.css';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import { SecureRoute } from './components/SecureRoute';
import { ProtectedFetchData } from './components/ProtectedFetchData';

const oktaAuth = new OktaAuth({
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri: window.location.origin + '/login/callback'
});

const App = () => {
    const navigate = useNavigate();

    const restoreOriginalUri = (_oktaAuth, originalUri) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <Layout>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
                <Routes>
                    <Route path="/" exact={true} element={<Home />} />
                    <Route path="/login/callback" element={<LoginCallback />} />
                    <Route path="/fetch-data" element={<FetchData />} />
                    <Route path="/protected-fetch-data" element={<SecureRoute />}>
                        <Route path="" element={<ProtectedFetchData />} />
                    </Route>
                </Routes>
            </Security>
        </Layout>
    );
}

export default App;
