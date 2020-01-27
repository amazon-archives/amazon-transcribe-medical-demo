import React, { Component } from "react";
import uuid from 'uuid'
import SummaryCard from './SummaryCard';
import { streamAudioToWebSocket, closeSocket } from './websocketUtils';
import { detectEntity } from '../comprehend/DetectEntities';
import Transcript, { tonkenizeTranscript } from './Transcript'
import EntityTable from './EntityTable';
import * as _ from 'lodash';
import audio from '../medasrdemo-Paul.mp4';

const borderStyle = "1px dotted blue"

export const lowConfidenceStyle = {
    // 'font-style': 'italic',
    '-webkit-text-stroke': '1px darkgrey',
    '-webkit-text-fill-color': 'lightgrey'
    // 'text-shadow': '0 0 5px black'
}

/**
 * Annotation style 
 */
export const allAnnotationStyle = {
    "PROTECTED_HEALTH_INFORMATION": {
        all: {
            background: '#fc7',
            // '-webkit-text-stroke-width': '1px',
            // '-webkit-text-stroke-color': '#fc7',
            // 'text-shadow': '0 1 10px #fc7'
        }
    },
    "MEDICAL_CONDITION": {
        all: { background: '#ff9' }
    },
    "ANATOMY": {
        all: { 'text-decoration': 'underline wavy red' }
    },
    "MEDICATION": {
        all: { 'text-decoration': 'underline wavy blue' }
    },
    // "TEST_TREATMENT_PROCEDURE": { 'color': 'blue', 'font-weight': 'bold' },
    "TEST_TREATMENT_PROCEDURE": {
        left: { 'border-left': borderStyle, 'border-top-left-radius': '7px', 'border-bottom-left-radius': '7px', 'padding': '2px' },
        mid: { 'border-top': borderStyle, 'border-bottom': borderStyle, 'padding': '2px' },
        right: { 'border-right': borderStyle, 'border-top-right-radius': '7px', 'border-bottom-right-radius': '7px', 'padding': '2px' },
        all: { 'border': borderStyle, 'border-radius': '7px', 'padding': '2px' }
    }
}

export const annotationDisplayName = {
    "MEDICAL_CONDITION": "Medical Condition",
    "MEDICATION": "Medication",
    "ANATOMY": "Anatomy",
    "PROTECTED_HEALTH_INFORMATION": "Protected Health Information (PHI)",
    "TEST_TREATMENT_PROCEDURE": "Tests, Treatments, & Procedures",
    "SYSTEM_ORGAN_SITE": 'System/Organ/Site',
    "DIRECTION": 'Direction',
    'DIAGNOSIS': 'Diagnosis',
    'DX_NAME': 'Medical Condition',
    'ACUITY': 'Acuity',
    'NEGATION': 'Negation',
    'SIGN': 'Sign',
    'SYMPTOM': 'Symptom',
    'BRAND_NAME': 'Brand Name',
    'GENERIC_NAME': 'Generic Name',
    'DOSAGE': 'Dosage',
    'DURATION': 'Duration',
    'FORM': 'Form',
    'FREQUENCY': 'Frequency',
    'RATE': 'Rate',
    'ROUTE_OR_MODE': 'Route/Mode',
    'STRENGTH': 'Strength',
    'PROCEDURE_NAME': 'Procedure Name',
    'TEST_NAME': 'Test Name',
    'TREATMENT_NAME': 'Treatment Name',
    'TEST_VALUE': 'Test Value',
    'TEST_UNIT': 'Test Unit',
    'ADDRESS': 'Address',
    'AGE': 'Age',
    'EMAIL': 'Email',
    'ID': 'Id',
    'NAME': 'Name',
    'PHONE_OR_FAX': 'Phone/Fax',
    'PROFESSION': 'Profession',
    'DATE': 'Date'
}

export default class TranscriptionWindow extends Component {

    constructor(props) {
        super(props);

        this.patientId = props.patientId;
        this.addNewPatientRecord = props.addNewPatientRecord; // call back to add new record to parent component
        this.discardPatientRecord = props.discardPatientRecord;
        this.state = {
            recording: false,
            id: uuid.v4(),
            audioStream: undefined,
            transcript: [], // list of finalized transcript
            transcriptBoxs: [], // list of boxed transcript words
            partialTranscript: "", // last chunk of transcript, which has not be finalized 
            entities: [],
            // entities: testEntities,
            segments: [],
            // segments: testSegments,
            annotations: [],
            annotationStyles: {},
            audioSource: undefined,
            showConfidence: false,
            showSummary: false
        }
    }

    async componentDidMount() { }

    async startRecord() {
        // TODO: clean up transcript and entities
        this.setState({
            transcript: [], // list of finalized transcript
            transcriptBoxs: [], // list of boxed transcript words
            segments: [],
            entities: [],
            partialTranscript: "", // last chunk of transcript, which has not be finalized 
            entities: [],
            annotations: [],
            audioSource: new Audio(audio)
        }, _ => {
            let { audioSource } = this.state;
            // let audioSource = new Audio(audio);
            let stream = audioSource.captureStream();
            audioSource.addEventListener('ended', _ => {
                this.stopRecord();
            })

            audioSource.play()
            // return getMicAudioStream()
            return audioSource.play()
                .then(_ => {
                    return stream;
                }).then(micAudioStream => {
                    console.log(`Browser support microphone audio input`);

                    // Start Streaming websocket connection
                    streamAudioToWebSocket(micAudioStream, this.updateTranscript, (error) => {
                        console.log(error)
                    });

                    this.setState({
                        audioStream: micAudioStream,
                        recording: true,
                    });
                    return micAudioStream;
                }).catch(err => {
                    // Users browser doesn't support audio.
                    // Add your handler here.
                    console.log(err);
                })
        })
    }

    async stopRecord() {
        let { audioSource, transcript } = this.state;

        // close web socket connection
        // TODO: add callback to wait to socket to close
        audioSource.pause();
        closeSocket();

        let allTranscript = this.combineTranscript(transcript);
        let response = await detectEntity(allTranscript);

        this.setState({
            recording: false,
            entities: response.Entities
        });
    }



    combineTranscript(transcript) {
        let allTranscript = _.reduce(transcript, (acc, v, i) => {
            acc = `${acc}  ${v}`; // concat transcript
            return acc;
        }, " "); // empty string as inital accumulator
        return allTranscript;

    }

    updateTranscript = async (newTranscript) => {
        let { results, text, isPartial } = newTranscript;

        /**
         * Temperary Hack for Re:Invent demo
         */
        text = text.replace("you was admitted", "he was admitted");

        if (isPartial) { // update last chuck of partial transcript
            this.setState({
                partialTranscript: text
            })
        } else { // append finalized transcript
            let { transcript, transcriptBoxs, segments, entities } = this.state;
            transcript.push(text);

            // Tokenize transcript
            var { wordTokens, segmentEntities } = await tonkenizeTranscript(text, results);


            var segment = {
                startTime: results[0].StartTime,
                words: wordTokens,
            }

            segments.push(segment);

            this.setState({
                transcriptBoxs: transcriptBoxs,
                transcript: transcript,
                partialTranscript: "",
                entities: entities.concat(segmentEntities),
                segments
            });
        }
    }

    updateAnnotation = (labels) => {
        this.setState({
            annotations: labels
        })
    }

    handleAnnotationChange = (category) => {
        var { annotationStyles } = this.state;
        console.log(JSON.stringify(annotationStyles));

        if (annotationStyles[category] === undefined) { // add annotation
            console.log("add annotations")
            annotationStyles[category] = allAnnotationStyle[category];

            this.setState({
                annotationStyles: annotationStyles
            });
        } else { // remove annotation
            console.log("delete annotations")
            annotationStyles[category] = undefined;

            this.setState({
                annotationStyles: annotationStyles
            });
        }
    }

    toggleConfidence = () => {
        let { showConfidence } = this.state;
        this.setState({
            showConfidence: !showConfidence
        });
    }

    toggleSummary = () => {
        let { showSummary } = this.state;
        this.setState({
            showSummary: !showSummary
        });
    }

    render() {
        const { recording, partialTranscript, entities, annotationStyles, segments, annotations, showConfidence, showSummary } = this.state;

        console.log(JSON.stringify(segments))
        console.log(JSON.stringify(entities))
        /**
         * Do not render if audioStream is not ready yet
         */
        // if (!audioStream) {
        //     return null;
        // }

        return (
            <div class="m-3">
                <div class="row d-flex mb-3 pl-3">
                    <button
                        class="btn btn-primary mr-3"
                        onClick={() => { recording ? this.stopRecord() : this.startRecord(); }} >
                        {recording ? 'Stop Dictation' : 'Start Dictation'}
                    </button>
                    <button class="btn btn-primary" type="button"
                        onClick={() => { this.toggleSummary() }}
                    >
                        {showSummary ? 'Hide Summary' : 'Show Summary'}
                    </button>
                </div>

                <div class="row pl-3">
                    <div class="border col-8" style={{ 'min-height': '200px', 'min-weight': '300px' }}>
                        <div class="row" style={{ 'background-color': 'lightgrey' }}>
                            <div class="form-check m-3">
                                <input class="form-check-input" type="checkbox" value=""
                                    id={"confidence"}
                                    checked={showConfidence}
                                    onClick={() => this.toggleConfidence()} />
                                <label class="form-check-label" for={"confidence"}>
                                    Highlight low confidence terms
                                </label>
                            </div>
                        </div>
                        {
                            _.map(segments, (seg, i) => {
                                return (
                                    <div class="text-left mt-1 mr-n3" style={{ 'fontWeight': 'normal' }} key={i}>
                                        <Transcript
                                            startTime={seg.startTime}
                                            words={seg.words}
                                            updateAnnotation={this.updateAnnotation}
                                            annotationStyle={annotationStyles}
                                            showConfidence={showConfidence}
                                        >
                                        </Transcript>
                                    </div>);
                            })
                        }
                        <div class="text-left mt-3 mb-3" style={{ 'fontWeight': 'bold' }} > {partialTranscript}</div>
                    </div>
                    <div class="col-4">
                        <div class="d-flex flex-column align-items-start mb-3">

                            {_.map(allAnnotationStyle, (v, k) => {
                                return (
                                    <div class="form-check mt-1">
                                        <input class="form-check-input" type="checkbox" value=""
                                            id={k}
                                            checked={annotationStyles[k] !== undefined}
                                            onClick={() => this.handleAnnotationChange(k)} />
                                        <label class="form-check-label" for={k} style={v.all}>
                                            {annotationDisplayName[k]}
                                        </label>

                                    </div>
                                )
                            })}
                        </div>
                        {annotations.length > 0 && <SummaryCard entities={annotations} ></SummaryCard>}
                        {/* <SummaryCard entities={annotations} ></SummaryCard> */}
                    </div>
                </div>
                <div class="mt-3">

                    {showSummary &&
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body mt-n3">
                                <EntityTable entities={entities} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
