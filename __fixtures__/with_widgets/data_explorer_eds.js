import App from '../../src/AppWithProvider'

const widgets = [
    {
      active: true,
      name: 'Table',
      datapackage: {
        views: [
          {
            "id": 1,
            "specType": "table"
          }
        ]
      }
    }
  ]

const datapackage = {
    name: 'test',
    resources: [
            {
        "views": [
          {
            "id": 1,
            "specType": "table",
            "resources": [
              "commercial_gas_amounts_data"
            ]
          }
        ],
        "schema": {
          "fields": [
            {
              "comment": "",
              "description": "Gas Day is a period commencing at 06:00 CET on any day and ending at 06:00 CET on the following day. The Gas Day is reduced to 23 Hours at the transition to summer time and is increased to 25 Hours at the transition to winter time.",
              "format": "any",
              "title": "GasDay",
              "name": "GasDay",
              "type": "datetime",
              "example": "2017-12-24",
              "unit": "Days",
              "constraints": {
                "property_constraint": "",
                "pattern": "",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Positive data indicates flow into the Danish gas system.",
              "description": "Total amount of biogas injected into the Danish gas system. The flow comes from biogas plants supplying biomethane to either the distributions network or the transmission network. Commercially this amount is allocated the BNG-Entry point.",
              "format": "any",
              "title": "kWh from Biogas",
              "name": "KWhFromBiogas",
              "type": "integer",
              "example": "8.504.020",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Negative data indicates flow from the Danish gas system.",
              "description": "The total commercial amount of gas consumption toin the Danish distribution networkgas system. This amount of gas indicates the total consumption of gas in Denmark. Commercially this amount is allocated at the Exit Zone point.",
              "format": "any",
              "title": "kWh to Denmark",
              "name": "KWhToDenmark",
              "type": "integer",
              "example": "200.000",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Positive data indicates amounts going into the Danish gas system.",
              "description": "The total commercial amount of gas from the North Sea to the Danish gas system. Commercially this amount is allocated at the Nybro Entry/Exit point.",
              "format": "any",
              "title": "kWh from North Sea",
              "name": "KWhFromNorthSea",
              "type": "integer",
              "example": "4.200.000",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Negative data indicates injection and positive data indicates withdrawal of amounts from the storage point.",
              "description": "Total commercial amount injected or withdrawn from the Danish collective storage point. Commercially this amount is allocated at the Collective Storage Point.",
              "format": "any",
              "title": "kWh to or from Storage",
              "name": "KWhToOrFromStorage",
              "type": "integer",
              "example": "1.504.020",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Positive data indicates amounts going into the Danish gas system. Negative data indicates amounts going from the Danish gas system.",
              "description": "The total commercial amount of gas from or towards Germany. Commercially this amount is allocated at the Ellund Entry/Exit point.",
              "format": "any",
              "title": "kWh to or from Germany",
              "name": "KWhToOrFromGermany",
              "type": "integer",
              "example": "8.504.020",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            },
            {
              "comment": "Negative data indicates amounts from the Danish gas system to the Swedish gas system.",
              "description": "The total commercial amount of gas from Denmark to Sweden. Commercially this amount is allocated at the Dragoer Entry/Exit point",
              "format": "any",
              "title": "kWh to Sweden",
              "name": "KWhToSweden",
              "type": "integer",
              "example": "200.000",
              "unit": "kWh",
              "constraints": {
                "property_constraint": "",
                "pattern": "/d{10}",
                "size": "10",
                "validation_rules": ""
              }
            }
          ]
        },
        "cache_last_updated": null,
        "package_id": "5f0c92ca-899f-4891-8277-29c9d84c722e",
        "filters": [
          {
            "type": "timestamp",
            "name": "GasDay"
          },
          {
            "type": "int",
            "name": "KWhFromBiogas"
          },
          {
            "type": "int",
            "name": "KWhToDenmark"
          },
          {
            "type": "int",
            "name": "KWhFromNorthSea"
          },
          {
            "type": "int",
            "name": "KWhToOrFromStorage"
          },
          {
            "type": "int",
            "name": "KWhToOrFromGermany"
          },
          {
            "type": "int",
            "name": "KWhToSweden"
          }
        ],
        "datastore_active": true,
        "id": "2f4d7a69-4c7b-4283-8de5-c1288b40d4e9",
        "size": null,
        "state": "active",
        "hash": "",
        "description": "Daily commercial flow in the Danish gas market. The commercial flow can vary slightly from the physical flow.\r\n",
        "format": "data",
        "last_modified": "2019-10-16T10:36:10.359585",
        "url_type": "datastore",
        "attributes": [
          {
            "comment": "",
            "name_of_field": "GasDay",
            "property_constraint": "",
            "name_of_attribute": "GasDay",
            "unit": "Days",
            "example": "2017-12-24",
            "validation_rules": "",
            "type": "timestamp",
            "format_regex": "",
            "attribute_description": "Gas Day is a period commencing at 06:00 CET on any day and ending at 06:00 CET on the following day. The Gas Day is reduced to 23 Hours at the transition to summer time and is increased to 25 Hours at the transition to winter time.",
            "size": "10"
          },
          {
            "comment": "Positive data indicates flow into the Danish gas system.",
            "name_of_field": "KWhFromBiogas",
            "property_constraint": "",
            "name_of_attribute": "kWh from Biogas",
            "unit": "kWh",
            "example": "8.504.020",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "Total amount of biogas injected into the Danish gas system. The flow comes from biogas plants supplying biomethane to either the distributions network or the transmission network. Commercially this amount is allocated the BNG-Entry point.",
            "size": "10"
          },
          {
            "comment": "Negative data indicates flow from the Danish gas system.",
            "name_of_field": "KWhToDenmark",
            "property_constraint": "",
            "name_of_attribute": "kWh to Denmark",
            "unit": "kWh",
            "example": "200.000",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "The total commercial amount of gas consumption toin the Danish distribution networkgas system. This amount of gas indicates the total consumption of gas in Denmark. Commercially this amount is allocated at the Exit Zone point.",
            "size": "10"
          },
          {
            "comment": "Positive data indicates amounts going into the Danish gas system.",
            "name_of_field": "KWhFromNorthSea",
            "property_constraint": "",
            "name_of_attribute": "kWh from North Sea",
            "unit": "kWh",
            "example": "4.200.000",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "The total commercial amount of gas from the North Sea to the Danish gas system. Commercially this amount is allocated at the Nybro Entry/Exit point.",
            "size": "10"
          },
          {
            "comment": "Negative data indicates injection and positive data indicates withdrawal of amounts from the storage point.",
            "name_of_field": "KWhToOrFromStorage",
            "property_constraint": "",
            "name_of_attribute": "kWh to or from Storage",
            "unit": "kWh",
            "example": "1.504.020",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "Total commercial amount injected or withdrawn from the Danish collective storage point. Commercially this amount is allocated at the Collective Storage Point.",
            "size": "10"
          },
          {
            "comment": "Positive data indicates amounts going into the Danish gas system. Negative data indicates amounts going from the Danish gas system.",
            "name_of_field": "KWhToOrFromGermany",
            "property_constraint": "",
            "name_of_attribute": "kWh to or from Germany",
            "unit": "kWh",
            "example": "8.504.020",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "The total commercial amount of gas from or towards Germany. Commercially this amount is allocated at the Ellund Entry/Exit point.",
            "size": "10"
          },
          {
            "comment": "Negative data indicates amounts from the Danish gas system to the Swedish gas system.",
            "name_of_field": "KWhToSweden",
            "property_constraint": "",
            "name_of_attribute": "kWh to Sweden",
            "unit": "kWh",
            "example": "200.000",
            "validation_rules": "",
            "type": "int",
            "format_regex": "/d{10}",
            "attribute_description": "The total commercial amount of gas from Denmark to Sweden. Commercially this amount is allocated at the Dragoer Entry/Exit point",
            "size": "10"
          }
        ],
        "mimetype": null,
        "cache_url": null,
        "name": "commercial_gas_amounts_data",
        "created": "2018-11-21T13:47:00.030291",
        "mimetype_inner": null,
        "position": 0,
        "revision_id": "51bcf0f2-4e39-439c-b85b-aa4bf4ad8534",
        "resource_type": null,
        "title": "commercial_gas_amounts_data",
        "path": "https://edstest01.energidataservice.dk/datastore/dump/2f4d7a69-4c7b-4283-8de5-c1288b40d4e9",
        "api": "http://0.0.0.0:4000/proxy/api/datastore_search?resource_id=2f4d7a69-4c7b-4283-8de5-c1288b40d4e9&sort=_id desc&include_total=true",
        "descriptionHtml": "<p>Daily commercial flow in the Danish gas market. The commercial flow can vary slightly from the physical flow.</p>\n"
      }
    ]
  }

export default {
  component: App,
  props: {widgets, datapackage: JSON.stringify(datapackage)}
}
