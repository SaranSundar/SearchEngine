import React, {Component} from 'react';
import '../Indexes/Indexes.css';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularShift from "../../backend/CircularShift";
import Alphabetizer from "../../backend/Alphabetizer";
import Denoiser from "../../backend/Denoiser";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            circularShifts: "",
            alphaShifts: "",
            denoiseShifts: "",
            case_sensitive: false
        };
        this.circularShift = new CircularShift();
        this.alphaShift = new Alphabetizer();
        this.denoiseShift = new Denoiser();
    }

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value});
    };

    searchIndexes = async () => {
        const response = await fetch('http://localhost:8000/server_bp/search', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
            body: JSON.stringify({query: this.state.search, case_sensitive: this.state.case_sensitive}),
        });
        console.log(await response.json())
    };

    render() {
        return (
            <div className="Indexes">
                <Typography className="Indexes-Title" variant="h4" component="h4">
                    Zephyr
                </Typography>
                <Container className="Indexes-Container">
                    <TextField
                        id="search"
                        placeholder="Search"
                        value={this.state.search}
                        className="Indexes-SearchField"
                        onChange={this.handleChange('search')}
                        margin="normal"
                        variant="outlined"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.searchIndexes();
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Fab onClick={this.searchIndexes} style={{marginTop: "10px"}} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Container>
            </div>
        );
    }
}

export default Search;
