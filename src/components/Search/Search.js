import React, {Component} from 'react';
import '../Indexes/Indexes.css';
import "./Search.css"
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {Card, CardContent, Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            case_sensitive: false,
            urls: null,
            descriptions: [],
            titles: [],
            showAutoFill: false,
            autoFillSuggestions: [],
            resultsPerPage: 5,
            currentPage: 1,
            ordering: true,
            numOfPages: 1,
        };
    }

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value}, () => {
            if (name === 'search') {
                this.getAutoFill();
            }
        });
    };

    goBack = () => {
        let pageNum = this.state.currentPage - 1;
        if (pageNum < 1) {
            pageNum = 1;
        }
        this.setState({currentPage: pageNum});
    };

    goForward = () => {
        let pageNum = this.state.currentPage + 1;
        if (pageNum > this.state.numOfPages) {
            pageNum = this.state.numOfPages;
        }
        this.setState({currentPage: pageNum});
    };

    showPageStepper = () => {
        if (this.state.urls === null || this.state.urls.length === 0) {
            return;
        }
        let pages = [];
        for (let i = 0; i < this.state.numOfPages; i++) {
            pages.push(i + 1);
        }
        return (
            <Grid container className="CenterSearch">
                <Fab variant="extended" onClick={this.goBack}>
                    Prev
                </Fab>
                {pages.map(((value, index) => this.getStyleTypo(value)))}
                <Fab variant="extended" onClick={this.goForward}>
                    Next
                </Fab>
            </Grid>
        )
    };

    getStyleTypo = (value) => {
        if (value === this.state.currentPage) {
            return <Typography style={{padding: "15px", fontWeight: "bold"}} variant="h6">{value}</Typography>
        } else {
            return <Typography style={{padding: "15px"}} variant="h6">{value}</Typography>;
        }
    };

    getAutoFill = async () => {
        let url = "http://localhost:8000/server_bp/auto-fill";
        const response = await fetch(url, {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
            body: JSON.stringify({
                query: this.state.search,
            }),
        });
        let body = await response.json();
        console.log(body);
        this.setState({autoFillSuggestions: body['auto_fill']});

    };

    searchIndexes = async () => {
        const response = await fetch('http://localhost:8000/server_bp/search', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
            body: JSON.stringify({
                query: this.state.search,
                case_sensitive: this.state.case_sensitive,
                noise_words: this.props.noiseWords,
                ordering: this.state.ordering,
                results_per_page: this.state.resultsPerPage
            }),
        });
        let body = await response.json();
        this.setState({urls: body['urls'], descriptions: body['descriptions'], titles: body['titles'], numOfPages : body['num_of_pages']});
    };

    displayIfInPage = (index) => {
        // resultsPerPage: 5,
        // currentPage: 1
        if (index < (this.state.currentPage * this.state.resultsPerPage) && index >= (this.state.currentPage * this.state.resultsPerPage) - this.state.resultsPerPage) {
            return <Card style={{margin: "5px"}}>
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
            </Card>;
        }
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
        return this.state.urls.map((url, index) =>
            this.displayIfInPage(index));
    };

    handleCheckChange = (name) => (event) => {
        this.setState({...this.state, [name]: event.target.checked}, () => {
            this.searchIndexes();
        });
    };

    displayAutofill = () => {
        return (
            <div className="Search">
                {this.state.autoFillSuggestions.map(value => {
                    return (
                        <div onClick={() => {
                            this.setState({search: value, showAutoFill: false}, () => {
                                this.searchIndexes();
                            })
                        }} style={{
                            cursor: "pointer",
                            paddingTop: "15px",
                            paddingLeft: "15px",
                            borderBottom: "2px solid black"
                        }}>
                            <Typography variant="h5">
                                {value}
                            </Typography>
                        </div>
                    );
                })}
            </div>
        );
    };

    showAuto = (e) => {
        this.setState({showAutoFill: true});
    };

    hideAuto = (e) => {
        setTimeout(() => {
            this.setState({showAutoFill: false});
        }, 100);
    };

    render() {
        return (
            <div className="Indexes">
                <Typography className="Indexes-Title" variant="h4" component="h4">
                    Zephyr
                </Typography>
                <Container className="Indexes-Container">
                    <Typography gutterBottom>Results Per Page</Typography>
                    <Slider
                        defaultValue={5}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={20}
                        onChange={(e, val) => this.setState({resultsPerPage: val}, () => {
                            this.searchIndexes();
                        })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.case_sensitive}
                                      onChange={this.handleCheckChange('case_sensitive')} value="case_sensitive"/>
                        }
                        label="Case Sensitive"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.ordering}
                                      onChange={this.handleCheckChange('ordering')} value="ordering"/>
                        }
                        label="Ordering Alphabetical"
                    />
                    <TextField
                        autoComplete="off"
                        id="search"
                        placeholder="Search"
                        value={this.state.search}
                        className="Indexes-SearchField"
                        onChange={this.handleChange('search')}
                        onFocus={this.showAuto}
                        onBlur={this.hideAuto}
                        margin="normal"
                        variant="outlined"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.searchIndexes();
                                this.setState({showAutoFill: false});
                                ev.preventDefault();
                            } else {
                                this.setState({showAutoFill: true});
                            }
                        }}
                    />
                    {this.state.showAutoFill && this.displayAutofill()}
                    <Fab onClick={this.searchIndexes} style={{marginTop: "10px"}} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                    <Container>
                        {this.displayResults()}
                    </Container>
                    <Container>
                        {this.showPageStepper()}
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Search;
