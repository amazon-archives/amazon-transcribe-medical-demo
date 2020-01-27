export const testEntities = [
    {
        "Id": 8,
        "BeginOffset": 8,
        "EndOffset": 10,
        "Score": 0.9996215105056763,
        "Text": "55",
        "Category": "PROTECTED_HEALTH_INFORMATION",
        "Type": "AGE",
        "Traits": []
    },
    {
        "Id": 30,
        "BeginOffset": 35,
        "EndOffset": 50,
        "Score": 0.9322949051856995,
        "Text": "coronary artery",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 19,
        "BeginOffset": 35,
        "EndOffset": 58,
        "Score": 0.9708243608474731,
        "Text": "coronary artery disease",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.9642532467842102
            }
        ]
    },
    {
        "Id": 20,
        "BeginOffset": 144,
        "EndOffset": 159,
        "Score": 0.6239369511604309,
        "Text": "unstable angina",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.9316730499267578
            }
        ]
    },
    {
        "Id": 31,
        "BeginOffset": 175,
        "EndOffset": 180,
        "Score": 0.9174451231956482,
        "Text": "heart",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 0,
        "BeginOffset": 175,
        "EndOffset": 196,
        "Score": 0.8168078064918518,
        "Text": "heart catheterization",
        "Category": "TEST_TREATMENT_PROCEDURE",
        "Type": "PROCEDURE_NAME",
        "Traits": []
    },
    {
        "Id": 9,
        "BeginOffset": 200,
        "EndOffset": 218,
        "Score": 0.999921441078186,
        "Text": "November 15th 2007",
        "Category": "PROTECTED_HEALTH_INFORMATION",
        "Type": "DATE",
        "Traits": []
    },
    {
        "Id": 21,
        "BeginOffset": 276,
        "EndOffset": 284,
        "Score": 0.9353875517845154,
        "Text": "stenosis",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.883020281791687
            }
        ]
    },
    {
        "Id": 22,
        "BeginOffset": 292,
        "EndOffset": 301,
        "Score": 0.8078563213348389,
        "Text": "occlusion",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.7105074524879456
            }
        ]
    },
    {
        "Id": 23,
        "BeginOffset": 306,
        "EndOffset": 323,
        "Score": 0.6496255993843079,
        "Text": "collateralization",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.6418631076812744
            }
        ]
    },
    {
        "Id": 34,
        "BeginOffset": 335,
        "EndOffset": 345,
        "Score": 0.9498670101165771,
        "Text": "circumflex",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 36,
        "BeginOffset": 354,
        "EndOffset": 369,
        "Score": 0.9896780252456665,
        "Text": "coronary artery",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 24,
        "BeginOffset": 354,
        "EndOffset": 380,
        "Score": 0.5877816677093506,
        "Text": "coronary artery was normal",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.5261317491531372
            },
            {
                "Name": "DIAGNOSIS",
                "Score": 0.4877127408981323
            }
        ]
    },
    {
        "Id": 1,
        "BeginOffset": 383,
        "EndOffset": 399,
        "Score": 0.9268413782119751,
        "Text": "Ventriculography",
        "Category": "TEST_TREATMENT_PROCEDURE",
        "Type": "TEST_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "TEST_VALUE",
                "Score": 0.9431789517402649,
                "RelationshipScore": 0.9999979734420776,
                "Id": 2,
                "BeginOffset": 404,
                "EndOffset": 410,
                "Text": "normal",
                "Traits": []
            }
        ]
    },
    {
        "Id": 25,
        "BeginOffset": 383,
        "EndOffset": 410,
        "Score": 0.4023064374923706,
        "Text": "Ventriculography was normal",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SIGN",
                "Score": 0.5777601599693298
            }
        ]
    },
    {
        "Id": 3,
        "BeginOffset": 420,
        "EndOffset": 437,
        "Score": 0.6070330739021301,
        "Text": "ejection fraction",
        "Category": "TEST_TREATMENT_PROCEDURE",
        "Type": "TEST_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "TEST_VALUE",
                "Score": 0.7755399942398071,
                "RelationshipScore": 0.9999972581863403,
                "Id": 4,
                "BeginOffset": 442,
                "EndOffset": 444,
                "Text": "65",
                "Traits": []
            },
            {
                "Type": "TEST_UNIT",
                "Score": 0.9880689978599548,
                "RelationshipScore": 1,
                "Id": 5,
                "BeginOffset": 444,
                "EndOffset": 445,
                "Text": "%",
                "Traits": []
            }
        ]
    },
    {
        "Id": 6,
        "BeginOffset": 470,
        "EndOffset": 510,
        "Score": 0.4484747350215912,
        "Text": "placement of a Cypher drug eluting stent",
        "Category": "TEST_TREATMENT_PROCEDURE",
        "Type": "PROCEDURE_NAME",
        "Traits": []
    },
    {
        "Id": 26,
        "BeginOffset": 527,
        "EndOffset": 533,
        "Score": 0.9661190509796143,
        "Text": "lesion",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.8729239702224731
            }
        ]
    },
    {
        "Id": 7,
        "BeginOffset": 547,
        "EndOffset": 568,
        "Score": 0.8525057435035706,
        "Text": "coronary intervention",
        "Category": "TEST_TREATMENT_PROCEDURE",
        "Type": "PROCEDURE_NAME",
        "Traits": []
    },
    {
        "Id": 27,
        "BeginOffset": 576,
        "EndOffset": 586,
        "Score": 0.3154433071613312,
        "Text": "Circumflex",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": []
    },
    {
        "Id": 38,
        "BeginOffset": 576,
        "EndOffset": 586,
        "Score": 0.3795539438724518,
        "Text": "Circumflex",
        "Category": "ANATOMY",
        "Type": "SYSTEM_ORGAN_SITE",
        "Traits": []
    },
    {
        "Id": 28,
        "BeginOffset": 610,
        "EndOffset": 616,
        "Score": 0.9516215920448303,
        "Text": "lesion",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "DIAGNOSIS",
                "Score": 0.7193875312805176
            }
        ]
    },
    {
        "Id": 29,
        "BeginOffset": 774,
        "EndOffset": 787,
        "Score": 0.7645808458328247,
        "Text": "feeling great",
        "Category": "MEDICAL_CONDITION",
        "Type": "DX_NAME",
        "Traits": [
            {
                "Name": "SYMPTOM",
                "Score": 0.6777747273445129
            }
        ]
    },
    {
        "Id": 10,
        "BeginOffset": 822,
        "EndOffset": 829,
        "Score": 0.9994939565658569,
        "Text": "aspirin",
        "Category": "MEDICATION",
        "Type": "GENERIC_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "DOSAGE",
                "Score": 0.9795075058937073,
                "RelationshipScore": 0.9998388290405273,
                "Id": 11,
                "BeginOffset": 831,
                "EndOffset": 845,
                "Text": "325 milligrams",
                "Traits": []
            },
            {
                "Type": "FREQUENCY",
                "Score": 0.9990812540054321,
                "RelationshipScore": 0.997694194316864,
                "Id": 12,
                "BeginOffset": 846,
                "EndOffset": 851,
                "Text": "daily",
                "Traits": []
            }
        ]
    },
    {
        "Id": 13,
        "BeginOffset": 853,
        "EndOffset": 860,
        "Score": 0.9997574687004089,
        "Text": "Lipitor",
        "Category": "MEDICATION",
        "Type": "BRAND_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "DOSAGE",
                "Score": 0.9893191456794739,
                "RelationshipScore": 0.9997712969779968,
                "Id": 14,
                "BeginOffset": 862,
                "EndOffset": 875,
                "Text": "40 milligrams",
                "Traits": []
            },
            {
                "Type": "FREQUENCY",
                "Score": 0.9990082383155823,
                "RelationshipScore": 0.9977346658706665,
                "Id": 15,
                "BeginOffset": 876,
                "EndOffset": 881,
                "Text": "daily",
                "Traits": []
            }
        ]
    },
    {
        "Id": 16,
        "BeginOffset": 883,
        "EndOffset": 889,
        "Score": 0.9997712969779968,
        "Text": "Plavix",
        "Category": "MEDICATION",
        "Type": "BRAND_NAME",
        "Traits": [],
        "Attributes": [
            {
                "Type": "DOSAGE",
                "Score": 0.9953740239143372,
                "RelationshipScore": 0.9980205297470093,
                "Id": 17,
                "BeginOffset": 891,
                "EndOffset": 904,
                "Text": "75 milligrams",
                "Traits": []
            },
            {
                "Type": "FREQUENCY",
                "Score": 0.99614018201828,
                "RelationshipScore": 0.992948055267334,
                "Id": 18,
                "BeginOffset": 905,
                "EndOffset": 910,
                "Text": "daily",
                "Traits": []
            }
        ]
    }
]