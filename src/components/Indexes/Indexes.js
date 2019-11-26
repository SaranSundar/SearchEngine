import React, {Component} from 'react';
import './Indexes.css';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularShift from "../../backend/CircularShift";
import Alphabetizer from "../../backend/Alphabetizer";
import Denoiser from "../../backend/Denoiser";
import CircularProgress from "@material-ui/core/CircularProgress";

class Indexes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            circularShifts: "",
            alphaShifts: "",
            denoiseShifts: "",
            showLoader: false,
        };
        this.circularShift = new CircularShift();
        this.alphaShift = new Alphabetizer();
        this.denoiseShift = new Denoiser();
    }

    createNewIndexes = async () => {
        this.setState({showLoader: true});
        const response = await fetch('http://localhost:8000/server_bp/index', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',},
            body: JSON.stringify({
                url: this.state.search
            }),
        });
        let body = await response.json();
        console.log(body);
        alert("Message: " + body['message']);
        this.setState({showLoader: false});
    };

    startShifts = () => {
        this.setState({alphaShifts: "", denoiseShifts: ""}, () => {
            this.circularShift.setInputLine(this.state.search);
            let circularShifts = this.circularShift.getShiftedLines();
            let alphaShifts = this.alphaShift.alphabetize(circularShifts);
            let denoiseShifts = this.denoiseShift.denoise(alphaShifts);
            this.outputShifts(circularShifts, alphaShifts, denoiseShifts);
            this.setState({search: ""})
        });
    };

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value});
    };

    outputShifts = (circular, alpha, denoise) => {
        const circularShifts = circular.join('\n');
        const alphaShifts = alpha.join('\n');
        const denoiseShifts = denoise.join('\n');
        this.setState({circularShifts}, () => {
            setTimeout(() => {
                this.setState({alphaShifts}, () => {
                    setTimeout(() => {
                        this.setState({denoiseShifts});
                    }, 500);
                });
            }, 500);
        });
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
                        placeholder="Enter URL"
                        value={this.state.search}
                        className="Indexes-SearchField"
                        onChange={this.handleChange('search')}
                        margin="normal"
                        variant="outlined"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.createNewIndexes();
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Fab onClick={this.createNewIndexes} style={{marginTop: "10px"}} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Container>
                <Grid container className="Indexes-Grid">
                    {this.state.showLoader &&
                    <Typography variant="h5">
                        Indexing...
                    </Typography>
                    }
                    {/*<Grid item>*/}
                    {/*    <Typography className="Indexes-Grid-Title" variant="h5" component="h4">*/}
                    {/*        Circular Shift*/}
                    {/*    </Typography>*/}
                    {/*    <TextareaAutosize*/}
                    {/*        disabled={true}*/}
                    {/*        rows={30}*/}
                    {/*        className="Indexes-TextArea"*/}
                    {/*        aria-label="circular_shift"*/}
                    {/*        placeholder="Lines to Circular Shift"*/}
                    {/*        value={this.state.circularShifts}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    {/*    <Typography className="Indexes-Grid-Title" variant="h5" component="h4">*/}
                    {/*        Alphabetizer*/}
                    {/*    </Typography>*/}
                    {/*    <TextareaAutosize*/}
                    {/*        disabled={true}*/}
                    {/*        rows={30}*/}
                    {/*        className="Indexes-TextArea"*/}
                    {/*        aria-label="alphabetizer"*/}
                    {/*        placeholder="Lines to Alphabetize"*/}
                    {/*        value={this.state.alphaShifts}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    {/*    <Typography className="Indexes-Grid-Title" variant="h5" component="h4">*/}
                    {/*        Noise Eliminator*/}
                    {/*    </Typography>*/}
                    {/*    <TextareaAutosize*/}
                    {/*        disabled={true}*/}
                    {/*        rows={30}*/}
                    {/*        className="Indexes-TextArea"*/}
                    {/*        aria-label="denoiser"*/}
                    {/*        placeholder="Lines to Denoise"*/}
                    {/*        value={this.state.denoiseShifts}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </Grid>
                {this.state.showLoader &&
                <Grid container className="Indexes-Grid" style={{marginTop: "10px"}}>
                    <CircularProgress/>
                </Grid>
                }
            </div>
        );
    }
}

export default Indexes;
