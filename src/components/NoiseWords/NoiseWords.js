import React, {Component} from 'react';
import './NoiseWords.css';
import MaterialTable from 'material-table';

class NoiseWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Noise Word', field: 'word'},
            ]
        }
    }

    deleteRow = (oldData, resolve) => {
        let data = [];
        for (let i = 0; i < this.props.noiseWords.length; i++) {
            if (oldData['word'] !== this.props.noiseWords[i]['word']) {
                data.push({word: this.props.noiseWords[i]['word']});
            }
        }
        this.setState({
            noiseWords: data
        }, () => {
            this.props.updateNoiseWords(data);
            resolve();
        });
    };

    addRow = (newData, resolve) => {
        if (newData['word'].indexOf(' ') >= 0) {
            alert("Noise Word can't contain a space");
            resolve();
            return;
        }
        let data = [];
        data.push({word: newData['word']});
        for (let i = 0; i < this.props.noiseWords.length; i++) {
            data.push({word: this.props.noiseWords[i]['word']});
        }
        this.setState({
            noiseWords: data
        }, () => {
            this.props.updateNoiseWords(data);
            resolve();
        });
    };

    changeNoiseWords = () => {
        this.setState({noiseWords: this.props.noiseWords});
    };

    render() {
        return (
            <MaterialTable
                title="Noise Words"
                columns={this.state.columns}
                data={this.props.noiseWords}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                this.addRow(newData, resolve);
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData => new Promise((resolve, reject) => {
                        setTimeout(() => {
                            this.deleteRow(oldData, resolve);
                            resolve();
                        }, 1)
                    })
                }}
            />
        )
    }
}

export default NoiseWords;