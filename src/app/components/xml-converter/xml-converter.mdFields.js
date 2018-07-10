import {
    empty
} from './xml-converter.empty'

export const mdFields = {
    mdFileIdentifier: {
        name: 'mdFileIdentifier',
        xpath: '//gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    mdLanguage: {
        name: 'mdLanguage',
        xpath: '//gmd:MD_Metadata/gmd:language/gmd:LanguageCode/_attributes/codeListValue',
        empty: empty.mdLanguage
    },
    mdCharacterSet: {
        name: 'mdCharacterSet',
        xpath: '//gmd:MD_Metadata/gmd:characterSet/gmd:MD_CharacterSetCode/_attributes/codeListValue',
        empty: empty.mdCharacterSet
    },
    mdHierarchyLevel: {
        name: 'mdHierarchyLevel',
        xpath: '//gmd:MD_Metadata/gmd:hierarchyLevel/gmd:MD_ScopeCode/_attributes/codeListValue',
        empty: empty.mdHierarchyLevel
    },
    mdContacts: {
        name: 'mdContacts',
        xpath: '//gmd:MD_Metadata/gmd:contact',
        empty: empty.mdContacts
    },

    ////////////////////////////////////////////////
    // CONTACT - start
    individualName: {
        name: 'individualName',
        xpath: 'gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    positionName: {
        name: 'positionName',
        xpath: 'gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    organisationName: {
        name: 'organisationName',
        xpath: 'gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    phoneVoices: {
        name: 'phoneVoices',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice',
        empty: empty.mdFileIdentifier,
        children: [{
            name: 'phoneVoice',
            xpath: 'gco:CharacterString/_text',
            empty: empty.mdFileIdentifier,
        }]
    },
    emails: {
        name: 'emails',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress',
        empty: empty.mdFileIdentifier,
        children: [{
            name: 'email',
            xpath: 'gco:CharacterString/_text',
            empty: empty.mdFileIdentifier,
        }]
    },
    deliveryPoints: {
        name: 'deliveryPoints',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint',
        empty: empty.mdFileIdentifier,
        children: [{
            name: 'deliveryPoint',
            xpath: 'gco:CharacterString/_text',
            empty: empty.mdFileIdentifier,
        }]
    },
    postalCode: {
        name: 'postalCode',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:postalCode/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    city: {
        name: 'city',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:city/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    country: {
        name: 'country',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:country/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    logoUrl: {
        name: 'logoUrl',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/@src',
        empty: empty.mdFileIdentifier
    },
    logoDescription: {
        name: 'logoDescription',
        xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/_text',
        empty: empty.mdFileIdentifier
    },
    role: {
        name: 'role',
        xpath: [
            'gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/_attributes/codeListValue',
            'gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/_text',
        ],
        empty: empty.mdFileIdentifier
    },
    // CONTACT - end

    mdDateStamp: {
        name: 'mdDateStamp',
        xpath: '/gmd:MD_Metadata/gmd:dateStamp',
        empty: empty.mdFileIdentifier
    },
    mdStandardName: {
        name: 'mdStandardName',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    mdStandardVersion: {
        name: 'mdStandardVersion',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataTitle: {
        name: 'dataTitle',
        xpath: '//gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString/_text',
        empty: empty.dataTitle
    },
    dataDateCreation: {
        name: 'dataDateCreation',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataDateRevision: {
        name: 'dataDateRevision',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataDatePublication: {
        name: 'dataDatePublication',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    _data_dates: {
        name: 'md_dates',
        xpath: 'gmd:CI_Date/gmd:date/gco:Date/_text',
        empty: empty.mdFileIdentifier,
        children: {
            type: {
                name: 'type',
                xpath: 'gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/_attributes/codeListValue',
                empty: empty.mdFileIdentifier
            },
            time: {
                name: 'time',
                xpath: 'gmd:CI_Date/gmd:date/gco:DateTime/_text',
                empty: empty.mdFileIdentifier
            },
            date: {
                name: 'date',
                xpath: 'gmd:CI_Date/gmd:date/gco:Date/_text',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataIdentifiers: {
        name: 'dataIdentifiers',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            code: {
                name: 'code',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            codeSpace: {
                name: 'codespace',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataAbstract: {
        name: 'dataAbstract',
        xpath: '//gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString/_text',
        empty: empty.mdFileIdentifier
    },
    dataBrowseGraphics: {
        name: 'dataBrowseGraphics',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            fileName: {
                name: 'fileName',
                xpath: 'gmd:MD_BrowseGraphic/gmd:fileName/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            fileDescription: {
                name: 'fileDescription',
                xpath: 'gmd:MD_BrowseGraphic/gmd:fileDescription/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            fileType: {
                name: 'fileType',
                xpath: 'gmd:MD_BrowseGraphic/gmd:fileType/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            image: {
                name: 'image',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataMaintenanceFrequency: {
        name: 'dataMaintenanceFrequency',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataTemporalExtents: {
        name: 'dataTemporalExtents',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            dataTemporalExtentBegin: {
                name: 'dataTemporalExtentBegin',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataTemporalExtentEnd: {
                name: 'dataTemporalExtentEnd',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataExtentName: {
                name: 'dataExtentName',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataLanguages: {
        name: 'dataLanguages',
        xpath: 'gmd:LanguageCode/_attributes/codeListValue',
        empty: empty.mdFileIdentifier
    },
    dataTopicCategories: {
        name: 'dataTopicCategories',
        xpath: '',
        empty: empty.dataTopicCategories,
        children: {
            keyword: {
                name: 'topicCategory',
                xpath: 'gmd:MD_TopicCategoryCode/_text',
                empty: empty.topicCategory
            }
        }
    },
    dataInspireKeywords: {
        name: 'dataInspireKeywords',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataKeywordsList: {
        name: 'dataKeywordsList',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataKeywords: {
        name: 'dataKeywords',
        xpath: 'gmd:MD_Keywords/gmd:keyword',
        empty: empty.mdFileIdentifier,
        children: {
            keyword: {
                name: 'keyword',
                xpath: 'gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            keywordType: {
                name: 'keywordType',
                xpath: 'gmd:MD_Keywords/gmd:type/gmd:MD_KeywordTypeCode/_attributes/codeListValue',
                empty: empty.mdFileIdentifier
            },
            thesaurusName: {
                name: 'thesaurusName',
                xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            thesaurusDatePublication: {
                name: 'thesaurusDatePublication',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            thesaurusDates: {
                name: 'thesaurusDates',
                xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:date',
                empty: empty.mdFileIdentifier,
                children: {
                    dateType: {
                        name: 'dateType',
                        xpath: '',
                        empty: empty.mdFileIdentifier
                    },
                    date: {
                        name: 'date',
                        xpath: '',
                        empty: empty.mdFileIdentifier
                    }
                }
            }
        }
    },
    dataPointOfContacts: {
        name: 'dataPointOfContacts',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            individualName: {
                name: 'individualName',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            positionName: {
                name: 'positionName',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            organisationName: {
                name: 'organisationName',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            phoneVoice: {
                name: 'phoneVoice',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            email: {
                name: 'email',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            deliveryPoint: {
                name: 'deliveryPoints',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            postalCode: {
                name: 'postalCode',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            city: {
                name: 'city',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            logo: {
                name: 'logo',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            logoUrl: {
                name: 'logoUrl',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            logoDescription: {
                name: 'logoDescription',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            role: {
                name: 'data_contact_role',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataGeographicExtents: {
        name: 'dataGeographicExtents',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            dataExtentName: {
                name: 'dataExtentName',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataGeographicExtentWestBound: {
                name: 'dataGeographicExtentWestBound',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataGeographicExtentEastBound: {
                name: 'dataGeographicExtentEastBound',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataGeographicExtentSouthBound: {
                name: 'dataGeographicExtentSouthBound',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dataGeographicExtentNorthBound: {
                name: 'dataGeographicExtentNorthBound',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataReferenceSystems: {
        name: 'dataReferenceSystems',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            code: {
                name: 'code',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            codeSpace: {
                name: 'codeSpace',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataPresentationForm: {
        name: 'dataPresentationForm',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataSpatialRepresentationType: {
        name: 'dataSpatialRepresentationType',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataScaleDenominator: {
        name: 'dataScaleDenominator',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataScaleDistance: {
        name: 'dataScaleDistance',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    _dataDqLevel: {
        name: '_dataDqLevel',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataLiStatement: {
        name: 'dataLiStatement',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataCharacterSet: {
        name: 'dataCharacterSet',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataDistributionFormats: {
        name: 'dataDistributionFormats',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            formatName: {
                name: 'formatName',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            formatVersion: {
                name: 'formatVersion',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            formatSpecification: {
                name: 'formatSpecification',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataUseLimitations: {
        name: 'dataUseLimitations',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            name: {
                name: 'dataUseLimitation',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataLegalUseLimitations: {
        name: 'dataLegalUseLimitations',
        xpath: '',
        empty: empty.mdFileIdentifier,
        _children: {
            name: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataLegalUseConstraints: {
        name: 'dataLegalUseConstraints',
        xpath: '',
        empty: empty.mdFileIdentifier,
        _children: {
            name: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataLegalAccessConstraints: {
        name: 'dataLegalAccessConstraints',
        xpath: '',
        empty: empty.mdFileIdentifier,
        _children: {
            name: {
                name: 'name',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataLegalAccessInspireConstraints: {
        name: 'dataLegalAccessInspireConstraints',
        xpath: '',
        empty: empty.mdFileIdentifier,
        _children: {
            name: {
                name: 'name',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    _dataLegalAccessOtherConstraints: {
        name: '_dataLegalAccessOtherConstraints',
        xpath: '',
        empty: empty.mdFileIdentifier,
        _children: {
            name: {
                name: 'name',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataSecurityUseLimitations: {
        name: 'dataSecurityUseLimitations',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            name: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataSecurityClassification: {
        name: 'dataSecurityClassification',
        xpath: '',
        empty: empty.mdFileIdentifier
    },
    dataLinkages: {
        name: 'dataLinkages',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            name: {
                name: 'name',
                xpath: 'gmd:CI_OnlineResource/gmd:name/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            description: {
                name: 'description',
                xpath: 'gmd:CI_OnlineResource/gmd:description/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            },
            url: {
                name: 'url',
                xpath: 'gmd:CI_OnlineResource/gmd:linkage/gmd:URL/_text',
                empty: empty.mdFileIdentifier
            },
            protocol: {
                name: 'protocol',
                xpath: 'gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString/_text',
                empty: empty.mdFileIdentifier
            }
        }
    },
    dataDqInspireConformities: {
        name: '',
        xpath: '',
        empty: empty.mdFileIdentifier,
        children: {
            specification: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            explaination: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            pass: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier
            },
            dates: {
                name: '',
                xpath: '',
                empty: empty.mdFileIdentifier,
                children: {
                    type: {
                        name: '',
                        xpath: '',
                        empty: empty.mdFileIdentifier
                    },
                    date: {
                        name: '',
                        xpath: '',
                        empty: empty.mdFileIdentifier
                    }
                }
            }
        }
    }
}