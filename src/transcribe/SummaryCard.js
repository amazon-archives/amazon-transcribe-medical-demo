import React, { Component } from 'react';
import { allAnnotationStyle, annotationDisplayName } from './TranscriptionWindow';
import * as _ from 'lodash';


const testData = [
    {
        "Id": 0,
        "BeginOffset": 6,
        "EndOffset": 10,
        "Score": 0.9984116554260254,
        "Text": "40yo",
        "Category": "PROTECTED_HEALTH_INFORMATION",
        "Type": "AGE",
        "Traits": []
    },
    {
        "Id": 1,
        "BeginOffset": 19,
        "EndOffset": 37,
        "Score": 0.28823626041412354,
        "Text": "highschool teacher",
        "Category": "PROTECTED_HEALTH_INFORMATION",
        "Type": "PROFESSION",
        "Traits": []
    },
    {
        "Id": 12,
        "BeginOffset": 45,
        "EndOffset": 61,
        "Score": 0.8431940674781799,
        "Text": "Sleeping trouble",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SYMPTOM",
                "Score": 0.6973861455917358
            }
        ]
    },
    {
        "Id": 2,
        "BeginOffset": 83,
        "EndOffset": 92,
        "Score": 0.9933062195777893,
        "Text": "Clonidine",
        "Category": "MEDICATION",
        "Type": "GENERIC_NAME",
        "Traits": []
    },
    {
        "Id": 13,
        "BeginOffset": 101,
        "EndOffset": 105,
        "Score": 0.9964956641197205,
        "Text": "Rash",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SYMPTOM",
                "Score": 0.7529560327529907
            }
        ]
    },
    {
        "Id": 20,
        "BeginOffset": 110,
        "EndOffset": 114,
        "Score": 0.987630307674408,
        "Text": "face",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 21,
        "BeginOffset": 119,
        "EndOffset": 122,
        "Score": 0.9952499866485596,
        "Text": "leg",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 14,
        "BeginOffset": 133,
        "EndOffset": 138,
        "Score": 0.8465854525566101,
        "Text": "itchy",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SYMPTOM",
                "Score": 0.5371742248535156
            }
        ]
    },
    {
        "Id": 3,
        "BeginOffset": 148,
        "EndOffset": 155,
        "Score": 0.9995427131652832,
        "Text": "Vyvanse",
        "Category": "MEDICATION",
        "Type": "BRAND_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "DOSAGE",
                "Score": 0.9910679459571838,
                "RelationshipScore": 0.9999822378158569,
                "Id": 4,
                "BeginOffset": 156,
                "EndOffset": 162,
                "Text": "50 mgs",
                "Traits": []
            },
            {
                "Type": "ROUTE_OR_MODE",
                "Score": 0.9997182488441467,
                "RelationshipScore": 0.9993832111358643,
                "Id": 5,
                "BeginOffset": 163,
                "EndOffset": 165,
                "Text": "po",
                "Traits": []
            },
            {
                "Type": "FREQUENCY",
                "Score": 0.983681321144104,
                "RelationshipScore": 0.9999642372131348,
                "Id": 6,
                "BeginOffset": 166,
                "EndOffset": 184,
                "Text": "at breakfast daily",
                "Traits": []
            }
        ]
    },
    {
        "Id": 7,
        "BeginOffset": 199,
        "EndOffset": 208,
        "Score": 0.9982216954231262,
        "Text": "Clonidine",
        "Category": "MEDICATION",
        "Type": "GENERIC_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "STRENGTH",
                "Score": 0.7696018815040588,
                "RelationshipScore": 0.9999960660934448,
                "Id": 8,
                "BeginOffset": 209,
                "EndOffset": 216,
                "Text": "0.2 mgs",
                "Traits": []
            },
            {
                "Type": "DOSAGE",
                "Score": 0.7776447534561157,
                "RelationshipScore": 0.999992847442627,
                "Id": 9,
                "BeginOffset": 220,
                "EndOffset": 236,
                "Text": "1 and 1 / 2 tabs",
                "Traits": []
            },
            {
                "Type": "ROUTE_OR_MODE",
                "Score": 0.9981689453125,
                "RelationshipScore": 0.999950647354126,
                "Id": 10,
                "BeginOffset": 237,
                "EndOffset": 239,
                "Text": "po",
                "Traits": []
            },
            {
                "Type": "FREQUENCY",
                "Score": 0.99753737449646,
                "RelationshipScore": 0.9999890327453613,
                "Id": 11,
                "BeginOffset": 240,
                "EndOffset": 243,
                "Text": "qhs",
                "Traits": []
            }
        ]
    },
    {
        "Id": 22,
        "BeginOffset": 245,
        "EndOffset": 250,
        "Score": 0.9863994121551514,
        "Text": "HEENT",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 15,
        "BeginOffset": 253,
        "EndOffset": 278,
        "Score": 0.8274092078208923,
        "Text": "Boggy inferior turbinates",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.9156995415687561
            }
        ]
    },
    {
        "Id": 24,
        "BeginOffset": 268,
        "EndOffset": 278,
        "Score": 0.6090001463890076,
        "Text": "turbinates",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 16,
        "BeginOffset": 283,
        "EndOffset": 303,
        "Score": 0.8783770799636841,
        "Text": "oropharyngeal lesion",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.974597156047821
            },
            {
                "Name": "NEGATION",
                "Score": 0.9596592783927917
            }
        ]
    },
    {
        "Id": 25,
        "BeginOffset": 305,
        "EndOffset": 310,
        "Score": 0.9986869692802429,
        "Text": "Lungs",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 17,
        "BeginOffset": 305,
        "EndOffset": 318,
        "Score": 0.45761173963546753,
        "Text": "Lungs : clear",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.932341456413269
            }
        ]
    },
    {
        "Id": 26,
        "BeginOffset": 320,
        "EndOffset": 325,
        "Score": 0.9976004958152771,
        "Text": "Heart",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 18,
        "BeginOffset": 328,
        "EndOffset": 342,
        "Score": 0.9421206116676331,
        "Text": "Regular rhythm",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.950810968875885
            }
        ]
    },
    {
        "Id": 27,
        "BeginOffset": 344,
        "EndOffset": 348,
        "Score": 0.9977248311042786,
        "Text": "Skin",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 19,
        "BeginOffset": 357,
        "EndOffset": 378,
        "Score": 0.8226966857910156,
        "Text": "erythematous eruption",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.6876195669174194
            }
        ]
    },
    {
        "Id": 28,
        "BeginOffset": 382,
        "EndOffset": 390,
        "Score": 0.7733517289161682,
        "Text": "hairline",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    }
];

export default class SummaryCard extends Component {
    constructor(props) {
        super(props);
        let entities = props.entities;
        let summary = this.getSummaryFromEntityList(entities);
        this.state = {
            entities: entities,
            // entities: testData,
            summary: summary
        };

    }

    componentWillReceiveProps(props) {
        let { entities } = props;
        let summary = this.getSummaryFromEntityList(entities);
        this.setState({
            entities: entities,
            // entities: testData,
            summary: summary
        });
    }

    getSummaryFromEntityList(entities) {
        let summary = {
            'PROTECTED_HEALTH_INFORMATION': [],
            'ANATOMY': [],
            'MEDICAL_CONDITION': [],
            'MEDICATION': [],
            'TEST_TREATMENT_PROCEDURE': [],
        };

        // re-group entities to summary
        _.forEach(entities, (entity, i) => {
            let entityList = summary[entity.Category]
            if (entityList !== undefined) {
                entityList.push(entity)
            }
        });

        return summary;
    }

    flattenEntity = (entities) => {
        let text = "";
        _.map(entities, (e, i) => {
            text = text + " " + e.Text

            _.map(e.Attributes, (a, j) => {
                text = text + " " + a.Text
            })
        });

        return text;
    }

    render() {
        let { entities, summary } = this.state
        return (
            <div>
                <div class="border">
                    {/* <div class="card-header" style={{ 'fontWeight': 'bold', 'text-align': 'left' }}>{this.flattenEntity(entities)}</div> */}
                    <div
                        style={{ 'background-color': 'lightgrey', 'fontWeight': 'bold', 'text-align': 'left' }}>
                        <label 
                            class="my-3"
                            style={{'padding-left': '4px' }}
                        >
                            Entity Detail
                        </label>
                    </div>
                    <ul
                        class="ml-n3"
                        style={{ 'list-style': 'square inside', 'padding-left': '20px' }}
                    >
                        {_.map(entities, (entity, i) => {
                            return (
                                <li class="text-left mt-1" >
                                    {/* <div class="text-left"> */}
                                    <span style={{ 'fontWeight': 'bold', 'text-align': 'left' }}>{entity.Text}</span>
                                    {/* <h5 class="card-title">{entity.Text}</h5> */}
                                    <ul>
                                        <li class="text-left">
                                            {/* <h6 class="card-subtitle my-2 text-muted"> */}
                                            ({entity.Score.toPrecision(3)}) {annotationDisplayName[entity.Category]}
                                            {annotationDisplayName[entity.Type] && ` - ${annotationDisplayName[entity.Type]}`}
                                            {_.map(entity.Traits, (trait, j) => ` - (${trait['Score'].toPrecision(3)}) ${annotationDisplayName[trait['Name']]}`)}
                                            {/* </h6> */}
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </li>
                            )

                        })}
                        {_.map(entities, (entity, i) => {
                            return (
                                _.map(entity.Attributes, (a, i) => {
                                    return (
                                        <li class="text-left mt-1" >
                                            <span style={{ 'fontWeight': 'bold', 'text-align': 'left' }}>{a.Text}</span>
                                            {/* <div class="text-left"> */}
                                            {/* <h5 class="card-title">{a.Text}</h5> */}
                                            <ul>
                                                <li class="text-left">
                                                    {/* <h6 class="card-subtitle my-2 text-muted"> */}
                                                    ({a.Score.toPrecision(3)}) {annotationDisplayName[entity.Category]}
                                                    {annotationDisplayName[a.Type] && ` - ${annotationDisplayName[a.Type]}`}
                                                    {_.map(a.Traits, (trait, j) => ` - ${annotationDisplayName[trait['Name']]}`)}
                                                    {/* </h6> */}
                                                </li>
                                            </ul>
                                            {/* </div> */}
                                        </li>
                                    );
                                })

                            )

                        })}
                    </ul>

                </div>
            </div>
        );
    }
}