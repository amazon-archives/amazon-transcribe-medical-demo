import AWS from 'aws-sdk';
import {credential} from '../aws-credential';

// TODO: use credential from cognito
const comprehendMedical = new AWS.ComprehendMedical(credential);

export async function detectEntity(text) {
    
    if(text === undefined || text.replace(/\s/g,"") === ""){
        // Transcript is empty, nothing to detect, also CompMed would through exception
        return [];
    }
    //clients can be shared by different commands
    const params = {
        Text: text,
    };

    console.log(`Send text ${text} to comprehend medical`);
    return new Promise((resolve, reject) => {
        comprehendMedical.detectEntitiesV2(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            }
            else     {
                console.log(data);           // successful response
                resolve(data);
            }
        })
    });
}