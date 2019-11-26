import React, {Component, Fragment} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialAppBar from "../MaterialAppBar/MaterialAppBar";
import NoMatch from "../NoMatch/NoMatch";
import Indexes from "../Indexes/Indexes";
import Search from "../Search/Search";
import NoiseWords from "../NoiseWords/NoiseWords";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noiseWords: []
        };
    }

    componentDidMount() {
        this.getNoiseWords();
    }

    updateNoiseWords = (noiseWords) => {
        this.setState({noiseWords: noiseWords});
    };

    render() {
        return (
            <Fragment>
                <CssBaseline/>
                <div className="App">
                    <MaterialAppBar/>
                    <Switch>
                        <Route exact path="/" component={Indexes}/>
                        <Route exact path="/search" render={(props) => <Search {...props} noiseWords={this.state.noiseWords}/>}/>
                        <Route exact path="/noise-words"
                               render={(props) => <NoiseWords {...props} updateNoiseWords={this.updateNoiseWords}
                                                              noiseWords={this.state.noiseWords}/>}/>
                        <Redirect to="/"/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }


    getNoiseWords = async () => {
        const response = await fetch('http://localhost:8000/server_bp/noise-words', {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
        });
        let body = await response.json();
        console.log(body);
        let words = [];
        for (let i = 0; i < body['noise_words'].length; i++) {
            words.push({'word': body['noise_words'][i]});
        }
        this.setState({noiseWords: words});
    };
}

export default App;
