import App from '../../src/AppWithProvider'

// FROM: 
// https://edstest01.energidataservice.dk/tso-electricity/powersupplierchangepergridarea
// note: the source is on Energinet test env, is not expected to work without access to it
// to get a new one, copy the output of the following in the browser:
// JSON.stringify(JSON.parse($(document).find('#data-explorer-1')[0].getAttribute('data-datapackage')), null, 2)
const copiedDatapackage = {
  "widgets": [
    {
      "name": "",
      "active": true,
      "datapackage": {
        "views": [
          {
            "id": 1,
            "specType": "table"
          }
        ]
      }
    }
  ],
  "datapackage": {
    "resources": [
      {
        "cache_last_updated": null,
        "package_id": "f7a23cbb-cbfd-43a0-a113-e8610943b17b",
        "datastore_active": true,
        "id": "73da7b52-3cff-4397-86eb-2c1c87a0bba0",
        "size": null,
        "title": "Change of Electricity Suppliers Per Grid Area Data",
        "state": "active",
        "schema": {
          "fields": [
            {
              "title": "Month",
              "description": "Year and month",
              "comment": "-",
              "name": "Month",
              "type": "date",
              "unit": "Months",
              "size": "7",
              "example": "2017-01",
              "property_constraint": "",
              "validation_rules": ""
            },
            {
              "title": "Grid company",
              "description": "Grid company number according to Danish Energy. Dan-ish Energy is a non-commercial lobby organization for Danish energy companies. Read more about Danish Ener-gy here: https://www.danskenergi.dk/about-danish-energy",
              "comment": "-",
              "name": "GridCompany",
              "type": "string",
              "unit": "text",
              "size": "3",
              "example": "031",
              "property_constraint": "",
              "validation_rules": "between 000 and 999",
              "format_regex ": ""
            },
            {
              "title": "Grid Company Name",
              "description": "Grid company name according to Danish Energy. Danish Energy is a non-commercial lobby organization for Danish energy companies. Read more about Danish Energy here: https://www.danskenergi.dk/about-danish-energy",
              "comment": "- ",
              "name": "GridCompanyName",
              "type": "string",
              "unit": "text",
              "size": "40",
              "example": "Cerius A/S",
              "property_constraint": "",
              "validation_rules": ""
            },
            {
              "title": "Number of changes for small consumers",
              "description": "Number of changes in electricity supplier for flex and profiled settled customers. ",
              "comment": "Small consumers are electricity customers (typically households and small businesses) with consumption less than 100,000 kWh/year.\n\nData about change of electricity supplier counts the number of times the business process of a change in electricity supplier is completed within the selected time period. Data is corrected so that it counts unique measuring points, ie. a customer who change electricity supplier several times during the period only counts once. Change of electricity supplier that are registered in connection with mergers between companies do not count in the statistics, and product changes where the electricity customer remains with the same electricity supplier do not count in the statistics either.",
              "name": "NumberofChangesforSmallConsumers",
              "type": "integer",
              "unit": "Number",
              "size": "6",
              "example": "2,243",
              "property_constraint": "",
              "validation_rules": "",
              "format_regex ": "/d{6}"
            },
            {
              "title": "Number of changes for large consumers",
              "description": "Number of changes in electricity supplier for hourly settled customers. ",
              "comment": "Large consumers are electricity customers (typically businesses) with consumption more than 100,000 kWh/year.\n\nData about change of electricity supplier counts the number of times the business process of a change in electricity supplier is completed within the selected time period. Data is corrected so that it counts unique measuring points, ie. a customer who change electricity supplier several times during the period only counts once. Change of electricity supplier that are registered in connection with mergers between companies do not count in the statistics, and product changes where the electricity customer remains with the same electricity supplier do not count in the statistics either.",
              "name": "NumberofChangesforLargeConsumers",
              "type": "integer",
              "unit": "Number",
              "size": "6",
              "example": "1,628",
              "property_constraint": "",
              "validation_rules": "",
              "format_regex ": "/d{6}"
            }
          ],
          "primary_key": [
            "Month",
            "GridCompany"
          ]
        },
        "hash": "",
        "description": "",
        "format": "data",
        "last_modified": "2020-11-18T12:55:42.183951",
        "url_type": "datastore",
        "path": "https://edstest01.energidataservice.dk/datastore/dump/73da7b52-3cff-4397-86eb-2c1c87a0bba0",
        "mimetype": null,
        "cache_url": null,
        "name": "powersupplierchangepergridarea",
        "created": "2020-11-05T08:30:55.038214",
        "mimetype_inner": null,
        "position": 0,
        "revision_id": "4fb2a122-cf0f-4a3d-aa70-966d591bee71",
        "resource_type": null,
        "alias": "powersupplierchangepergridarea",
        "apiBase": "https://edstest01.energidataservice.dk/proxy/api/",
        "api": "https://edstest01.energidataservice.dk/proxy/api/datastore_search_sql?sql=SELECT \"Month\", \"GridCompany\", \"GridCompanyName\", \"NumberofChangesforSmallConsumers\", \"NumberofChangesforLargeConsumers\" FROM \"powersupplierchangepergridarea\" ORDER BY \"Month\" DESC LIMIT 100",
        "views": [
          {
            "id": 1,
            "specType": "table"
          }
        ]
      }
    ]
  }
}

export default {
  component: App,
  props: { widgets: copiedDatapackage.widgets, datapackage: JSON.stringify(copiedDatapackage.datapackage) }
}
