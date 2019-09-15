import React, {Component} from 'react';
import './Indexes.css';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Indexes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    handleChange = name => event => {
        this.setState({...this.state, [name]: event.target.value});
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
                    <Fab style={{marginTop: "7px"}} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Container>
                <Grid container className="Indexes-Grid">
                    <TextareaAutosize
                        rows={30}
                        className="Indexes-TextArea"
                        aria-label="circular_shift"
                        placeholder="Words to Circular Shift"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                    />
                    <TextareaAutosize
                        rows={30}
                        className="Indexes-TextArea"
                        aria-label="alphabetizer"
                        placeholder="Words to Alphabetizer"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                    />
                    <TextareaAutosize
                        rows={30}
                        className="Indexes-TextArea"
                        aria-label="denoiser"
                        placeholder="Words to Denoise"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                    />
                </Grid>
            </div>
        );
    }
}

export default Indexes;