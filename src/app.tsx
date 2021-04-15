import React, { useReducer } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './app.css';

import RegionList from './domains/regionList';
import Lib from './domains/lib';
import { ContextApp, initialState, reducer } from './core/reduser';

const { Header, Footer, Content } = Layout;

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ContextApp.Provider value={{ dispatch, state }}>
            <Layout>
                <Header>База библиотек</Header>
                <Content>
                    <Switch>
                        <Route path="/lib/:address">
                            <Lib />
                        </Route>
                        <Route path="/">
                            <RegionList />
                        </Route>
                    </Switch>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </ContextApp.Provider>
    );
}
