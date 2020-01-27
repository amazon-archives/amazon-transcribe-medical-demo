import React, { Component } from 'react';
import * as _ from 'lodash';

export default class TranscriptCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transcript: props.transcript,
            partialTranscript: props.partialTranscript
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            transcript: props.transcript,
            partialTranscript: props.partialTranscript
        });
    }

    render() {
        let {transcript, partialTranscript} = this.state;
        return (
            <div class="border rounded" style={{ 'min-height': '200px', 'min-weight': '300px'}}>
                {_.map(transcript, (content, i) => {
                    return (
                        <div class="text-left mt-3 mb-3 ml-3 mr-3" style={{ 'fontWeight': 'normal' }} key={i}> {content} </div>
                    );
                })}
                <div class="text-left mt-3 mb-3 mx-3" style={{ 'fontWeight': 'bold' }} > {partialTranscript}</div>
            </div>
        );
    }
}