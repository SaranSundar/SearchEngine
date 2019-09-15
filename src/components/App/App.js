import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialAppBar from "../MaterialAppBar/MaterialAppBar";
import NoMatch from "../NoMatch/NoMatch";
import Indexes from "../Indexes/Indexes";

function App() {
    return (
        <div className="App">
            <MaterialAppBar/>
            <Switch>
                <Route exact path="/indexes" component={Indexes}/>
                <Redirect to="/indexes"/>
                <Route component={NoMatch}/>
            </Switch>
        </div>
    );
}

export default App;
