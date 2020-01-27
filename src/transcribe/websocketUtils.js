import {credential} from '../aws-credential';

const audioUtils = require('./audio');  // for encoding audio data as PCM
const crypto = require('crypto'); // tot sign our pre-signed URL
const v4 = require('./utils'); // to generate our pre-signed URL
const marshaller = require("@aws-sdk/eventstream-marshaller"); // for converting binary event stream messages to and from JSON
const util_utf8_node = require("@aws-sdk/util-utf8-node"); // utilities for encoding and decoding UTF8
const mic = require('microphone-stream'); // collect microphone input as a stream of raw bytes


// our converter between binary event streams messages and JSON
const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

// our global variables for managing state
let languageCode;
let region;
let sampleRate;
let transcription = "";
let socket;
let micStream;
let socketError = false;
let transcribeException = false;

export function streamAudioToWebSocket(userMediaStream, onTranscript, onError) {
    //let's get the mic input from the browser, via the microphone-stream module
    console.log("Start new stream");
    micStream = new mic();
    micStream.setStream(userMediaStream);

    // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
    // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
    let url = createPresignedUrl();

    //open up our WebSocket connection
    try {
        let websocket = new WebSocket(url);
        websocket.binaryType = "arraybuffer";

        // when we get audio data from the mic, send it to the WebSocket if possible
        websocket.onopen = function () {
            micStream.on('data', function (rawAudioChunk) {
                // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
                let binary = convertAudioToBinaryMessage(rawAudioChunk);

                if (socket.OPEN)
                    socket.send(binary);
            }
            )
        };

        // handle messages, errors, and close events
        // handle inbound messages from Amazon Transcribe
        websocket.onmessage = function (message) {
            //convert the binary event stream message to JSON
            let messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                let results = messageBody.Transcript.Results;

                if (results.length > 0) {
                    if (results[0].Alternatives.length > 0) {
                        let transcript = results[0].Alternatives[0].Transcript;

                        // fix encoding for accented characters
                        transcript = decodeURIComponent(escape(transcript));
                        console.log("get transcript: " + transcript);



                        // update the textarea with the latest result
                        // $('#transcript').val(transcription + transcript + "\n");
                        onTranscript({
                            results: results,
                            text: transcript,
                            isPartial: results[0].IsPartial
                        });

                    }
                }
                // handleEventStreamMessage(messageBody);
            }
            else {
                transcribeException = true;
                showError(messageBody.Message);
                // toggleStartStop();
            }
        };

        websocket.onerror = function () {
            socketError = true;
            console.log("Websocket connection error");
            showError('WebSocket connection error. Try again.');
            // toggleStartStop();
        };

        websocket.onclose = function (closeEvent) {
            micStream.stop();

            console.log("Websocket connection error:" + JSON.stringify(closeEvent));
            console.log("Websocket connection error:" + closeEvent.reason);
            // the close event immediately follows the error event; only handle one.
            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    showError('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
                }
                toggleStartStop();
            }
        };

        socket = websocket;
    } catch (error) {
        console.log(error);
    }
}

let handleEventStreamMessage = function (messageJson) {
    let results = messageJson.Transcript.Results;

    if (results.length > 0) {
        if (results[0].Alternatives.length > 0) {
            let transcript = results[0].Alternatives[0].Transcript;

            // fix encoding for accented characters
            transcript = decodeURIComponent(escape(transcript));
            console.log("get transcript: " + transcript);

            // update the textarea with the latest result
            // $('#transcript').val(transcription + transcript + "\n");

            // if this transcript segment is final, add it to the overall transcription
            if (!results[0].IsPartial) {
                //scroll the textarea down
                // $('#transcript').scrollTop($('#transcript')[0].scrollHeight);

                transcription += transcript + "\n";
            }
        }
    }
}

export const closeSocket = function () {
    if (socket.OPEN) {
        micStream.stop();

        // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
        let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
        let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
        socket.send(emptyBuffer);
    }
}


function toggleStartStop(disableStart = false) {
    // $('#start-button').prop('disabled', disableStart);
    // $('#stop-button').attr("disabled", !disableStart);
}

function showError(message) {
    // $('#error').html('<i class="fa fa-times-circle"></i> ' + message);
    // $('#error').show();
}

function convertAudioToBinaryMessage(audioChunk) {
    let raw = mic.toRaw(audioChunk);

    if (raw == null)
        return;

    // downsample and convert the raw audio bytes to PCM
    let downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
    let pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);

    // add the right JSON headers and structure to the message
    let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    //convert the JSON object + headers into a binary event stream message
    let binary = eventStreamMarshaller.marshall(audioEventMessage);

    return binary;
}

function getAudioEventMessage(buffer) {
    // wrap the audio data in a JSON envelope
    return {
        headers: {
            ':message-type': {
                type: 'string',
                value: 'event'
            },
            ':event-type': {
                type: 'string',
                value: 'AudioEvent'
            }
        },
        body: buffer
    };
}

function createPresignedUrl() {
    let endpoint = `transcribestreaming.${credential.region}.amazonaws.com:8443`;

    // get a preauthenticated URL that we can use to establish our WebSocket
    return v4.createPresignedURL(
        'GET',
        endpoint,
        '/medical-stream-transcription-websocket',
        'transcribe',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
        'key': credential.accessKeyId,
        'secret': credential.secretAccessKey,
        // 'sessionToken': $('#session_token').val(),
        'protocol': 'wss',
        'expires': 60,
        'region': credential.region,
        'query': "language-code=en-US&media-encoding=pcm&sample-rate=16000&specialty=PRIMARYCARE&type=DICTATION"
    }
    );
}
