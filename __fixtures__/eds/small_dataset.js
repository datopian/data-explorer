import App from '../../src/AppWithProvider'

// FROM: electricitysupplierspergridarea
// https://www.energidataservice.dk/tso-electricity/electricitysupplierspergridarea
const copiedDatapackage = {
  "widgets":[
    {
      "name":"",
      "active":true,
      "datapackage":{
        "views":[
          {
            "id":1,
            "specType":"table"
          }
        ]
      }
    }
  ],
  "datapackage":{
    "resources":[
      {
        "cache_last_updated":null,
        "package_id":"electricitysupplierspergridarea",
        "datastore_active":true,
        "id":"5eb19b81-59c7-495c-90c3-acb3fe3cc5ba",
        "size":null,
        "title":"Active Electricity Suppliers per Grid Area Data",
        "state":"active",
        "schema":{
          "fields":[
            {
              "comment":"-",
              "description":"Year and month",
              "title":"Month",
              "property_constraint":"",
              "name":"Month",
              "validation_rules":"",
              "type":"date",
              "example":"2017-01",
              "unit":"Months",
              "size":"7"
            },
            {
              "comment":"-",
              "description":"Grid company number according to Danish Energy. Dan-ish Energy is a non-commercial lobby organization for Danish energy companies. Read more about Danish Ener-gy here: https://www.danskenergi.dk/about-danish-energy",
              "title":"Grid company",
              "property_constraint":"",
              "format":"",
              "name":"GridCompany",
              "validation_rules":">000 and <= 999",
              "type":"string",
              "example":"031",
              "unit":"text",
              "size":"3"
            },
            {
              "comment":"Since an electricity supplier can appear in more than one grid area it is not possible to make a sum of this column (\"Active electricity suppliers\") to get the total number of active electricity suppliers nationally. Instead the Grid company called \"DK\" shows the total number of active electricity suppliers nationally. ",
              "description":"Number of active electricity suppliers per grid area. ",
              "title":"Active electricity suppliers",
              "property_constraint":"",
              "format":"/d{4}",
              "name":"ActiveSupplierPerGridArea",
              "validation_rules":"",
              "type":"integer",
              "example":"46",
              "unit":"Number",
              "size":"4"
            }
          ],
          "primary_key":[
            "Month",
            "GridCompany"
          ]
        },
        "hash":"",
        "description":"",
        "format":"data",
        "last_modified":"2020-10-06T03:17:11.269993",
        "url_type":"datastore",
        "attributes":"[]",
        "path":"https://www.energidataservice.dk/datastore/dump/5eb19b81-59c7-495c-90c3-acb3fe3cc5ba",
        "mimetype":null,
        "cache_url":null,
        "name":"electricitysupplierspergridarea",
        "created":"2020-01-17T20:28:29.256612",
        "mimetype_inner":null,
        "position":0,
        "revision_id":"3cc8df00-a3a1-4fe4-b47e-5bc09b2c1d5a",
        "resource_type":null,
        "alias":"electricitysupplierspergridarea",
        "apiBase":"https://www.energidataservice.dk/proxy/api/",
        "api":"https://www.energidataservice.dk/proxy/api/datastore_search_sql?sql=SELECT \"Month\", \"GridCompany\", \"ActiveSupplierPerGridArea\" FROM \"electricitysupplierspergridarea\" ORDER BY \"Month\" DESC LIMIT 100",
        "views":[
          {
            "id":1,
            "specType":"table"
          }
        ]
      }
    ]
  }
}

export default {
  component: App,
  props: {widgets: copiedDatapackage.widgets, datapackage: JSON.stringify(copiedDatapackage.datapackage)}
}
