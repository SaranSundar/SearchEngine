import React, {Component} from 'react';
import '../Indexes/Indexes.css';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {Card, CardContent, Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            case_sensitive: false,
            urls: null,
            descriptions: [],
            titles: [],
        };
    }

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value});
    };

    searchIndexes = async () => {
        const response = await fetch('http://localhost:8000/server_bp/search', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
            body: JSON.stringify({
                query: this.state.search,
                case_sensitive: this.state.case_sensitive,
                noise_words: this.props.noiseWords
            }),
        });
        let body = await response.json();
        console.log(body);
        this.setState({urls: body['urls'], descriptions: body['descriptions'], titles: body['titles']});
    };

    displayResults = () => {
        if (this.state.urls === null) {
            return;
        }
        if (this.state.urls.length === 0) {
            return (
                <Card style={{margin: "5px"}}>
                    <CardContent>
                        No Results
                    </CardContent>
                </Card>);
        }
        return this.state.urls.map(((url, index) =>
                <Card style={{margin: "5px"}}>
                    <CardContent>
                        <a href={this.state.urls[index]} style={{cursor: "pointer", textDecoration: "none"}}
                           target="_blank">
                            <Typography gutterBottom variant="h5" style={{color: "blue"}}>
                                {this.state.titles[index]}
                            </Typography>
                            <Typography gutterBottom variant="h5" style={{color: "green"}}>
                                {this.state.urls[index]}
                            </Typography>
                        </a>
                        <Typography gutterBottom variant="h5">
                            {this.state.descriptions[index]}
                        </Typography>
                    </CardContent>
                </Card>
        ))
    };

    handleCheckChange = (name) => (event) => {
        this.setState({...this.state, [name]: event.target.checked});
    };

    render() {
        console.log("Noise words are");
        console.log(this.props.noiseWords);
        return (
            <div className="Indexes">
                <Typography className="Indexes-Title" variant="h4" component="h4">
                    Zephyr
                </Typography>
                <Container className="Indexes-Container">
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.case_sensitive}
                                      onChange={this.handleCheckChange('case_sensitive')} value="case_sensitive"/>
                        }
                        label="Case Sensitive"
                    />
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
                    <Container>
                        {this.displayResults()}
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Search;
