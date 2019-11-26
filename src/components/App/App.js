import React, {Fragment} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialAppBar from "../MaterialAppBar/MaterialAppBar";
import NoMatch from "../NoMatch/NoMatch";
import Indexes from "../Indexes/Indexes";
import Search from "../Search/Search";

function App() {
    return (
        <Fragment>
            <CssBaseline/>
            <div className="App">
                <MaterialAppBar/>
                <Switch>
                    <Route exact path="/" component={Indexes}/>
                    <Route exact path="/search" component={Search}/>
                    <Redirect to="/"/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </Fragment>
    );
}

export default App;
