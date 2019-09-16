import React, {Component} from 'react';
import './Indexes.css';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularShift from "../../backend/CircularShift";
import Alphabetizer from "../../backend/Alphabetizer";
import Denoiser from "../../backend/Denoiser";

class Indexes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            circularShifts: "",
            alphaShifts: "",
            denoiseShifts: "",
        };
        this.circularShift = new CircularShift();
        this.alphaShift = new Alphabetizer();
        this.denoiseShift = new Denoiser();
    }

    startShifts = () => {
        this.circularShift.setInputLine(this.state.search);
        let circularShifts = this.circularShift.getShiftedLines();

        this.alphaShift.setInputLines(circularShifts);
        let alphaShifts = this.alphaShift.getAlphabetizedLines();

        this.denoiseShift.setInputLines(alphaShifts);
        let denoisedShifts = this.denoiseShift.getDenoisedLines();

        this.outputShifts(circularShifts, alphaShifts, denoisedShifts);

    };

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value});
    };

    outputShifts = (circular, alpha, denoise) => {
        console.log("Circular");
        console.log(circular);
        let circularShifts = "";
        circular.forEach((item, index) => {
            circularShifts += item + "\n";
        });
        let alphaShifts = "";
        alpha.forEach((item, index) => {
            alphaShifts += item + "\n";
        });
        let denoiseShifts = "";
        denoise.forEach((item, index) => {
            denoiseShifts += item + "\n";
        });
        this.setState({circularShifts, alphaShifts, denoiseShifts});
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
                    />
                    <Fab onClick={this.startShifts} style={{marginTop: "7px"}} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Container>
                <Grid container className="Indexes-Grid">
                    <Grid item>
                        <Typography className="Indexes-Grid-Title" variant="h5" component="h4">
                            Circular Shift
                        </Typography>
                        <TextareaAutosize
                            disabled={true}
                            rows={30}
                            className="Indexes-TextArea"
                            aria-label="circular_shift"
                            placeholder="Words to Circular Shift"
                            value={this.state.circularShifts}
                        />
                    </Grid>
                    <Grid item>
                        <Typography className="Indexes-Grid-Title" variant="h5" component="h4">
                            Alphabetized Shift
                        </Typography>
                        <TextareaAutosize
                            disabled={true}
                            rows={30}
                            className="Indexes-TextArea"
                            aria-label="alphabetizer"
                            placeholder="Words to Alphabetizer"
                            value={this.state.alphaShifts}
                        />
                    </Grid>
                    <Grid item>
                        <Typography className="Indexes-Grid-Title" variant="h5" component="h4">
                            Denoise Shift
                        </Typography>
                        <TextareaAutosize
                            disabled={true}
                            rows={30}
                            className="Indexes-TextArea"
                            aria-label="denoiser"
                            placeholder="Words to Denoise"
                            value={this.state.denoiseShifts}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Indexes;