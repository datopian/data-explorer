import App from '../../src/AppWithProvider'

// FROM: fixedresidualconsumption
// https://www.energidataservice.dk/tso-electricity/fixedresidualconsumption
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
           "package_id":"845fdfd2-51f7-43cf-87fe-af2dd4573c54",
           "datastore_active":true,
           "id":"65cc37bb-1272-42b8-852c-22d99b6c7fee",
           "size":null,
           "title":"Fixed Residual Consumption Data",
           "state":"active",
           "schema":{
              "fields":[
                 {
                    "title":"Hour UTC",
                    "description":"A date and time (interval), shown in _UTC time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day interval  00:00 - 00:59 and 01:00 covers the second hour (interval) of the day and so forth. Please note: The naming is based on the length of the interval of the finest grain of the resolution.",
                    "comment":"Please note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mmZ\r\ne.g. 2017-07-14 08:00Z. \r\nThe Z will remind viewers that this is UTC.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the \\u201cZ\\u201d and the seconds. Excel will recognize it as date-time. The user must remember the convention about time zones.\r\n\r\nIn **download (JSON and XML)** the full format is used\r\nYYYY-MM-DDThh:mmZ\r\ne.g. 2017-07-14T08:00Z.\r\n",
                    "name":"HourUTC",
                    "type":"datetime",
                    "unit":"",
                    "size":"17",
                    "example":"2017-07-14T08:00Z",
                    "format":"",
                    "property_constraint":"",
                    "validation_rules":"Always full hours, i.e. minutes are 00"
                 },
                 {
                    "title":"Hour DK",
                    "description":"A date and time (interval), shown in _Danish time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day, interval 00:00 - 00:59, and 01:00 covers the second hour period (interval) of the day and so forth. ",
                    "comment":"On one normal day there will be 24 intervals.\r\n\r\nWhen daylight saving times shifts there will be either 23 or 25 intervals.\r\n\r\nPlease note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00. \r\nPlease note that is no time zone indicator, showning that this is local (Danish) time.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the seconds. Excel will recognize it as date-time. The user must remember that this is local (Danish) time.\r\n\r\nIn **download (JSON and XML)** the  format used is\r\nYYYY-MM-DDThh:mm\r\ne.g. 2017-07-14T08:00.",
                    "name":"HourDK",
                    "type":"datetime",
                    "unit":"",
                    "size":"17",
                    "example":"2017-07-14T08:00",
                    "format":"",
                    "property_constraint":"",
                    "validation_rules":"Always full hours, i.e. minutes are 00"
                 },
                 {
                    "title":"Grid company",
                    "description":"Grid Company number according Danish Energy Association",
                    "comment":"",
                    "name":"GridCompany",
                    "type":"string",
                    "unit":"text",
                    "size":"3",
                    "example":"031",
                    "format":"",
                    "property_constraint":"",
                    "validation_rules":">000 and <= 999"
                 },
                 {
                    "title":"Residual Consumption",
                    "description":"The residual consumption is calculated hour by hour and consists of the total consumption of the individual grid areas deducted the consumption of all remote meter reading customers for the individual grid areas.",
                    "comment":"The first hour of a day is from 00:00 to 00:59 represented as YYYY-MM-DD 00:00 and the second hour is from 01:00 to 01:59 represented as YYYY-MM-DD 01:00 and so forth. ",
                    "name":"ResidualConsumption",
                    "type":"number",
                    "unit":"kWh",
                    "size":"9.3",
                    "example":"184.301",
                    "format":"([0-9]*[,])[0-9][0-9][0-9]",
                    "property_constraint":"",
                    "validation_rules":">=0"
                 }
              ],
              "primary_key":[
                 "HourUTC",
                 "GridCompany"
              ]
           },
           "hash":"",
           "description":" The residual consumption is calculated hour by hour and consists of the total consumption of the individual grid area deducted the consumption of all remote meter reading customers.",
           "format":"data",
           "last_modified":"2020-10-13T20:38:19.989771",
           "url_type":"datastore",
           "attributes":"[{\"comment\": \"Please note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\\r\\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\\r\\n\\r\\n**In preview (in the GUI)** all timestamps are shown as (display convention)\\r\\nYYYY-MM-DD hh:mmZ\\r\\ne.g. 2017-07-14 08:00Z. \\r\\nThe Z will remind viewers that this is UTC.\\r\\n\\r\\nIn **download (CSV and XLSX)** the date time are exported as\\r\\nYYYY-MM-DD hh:mm\\r\\ne.g. 2017-07-14 08:00.\\r\\nThat is without the \\u201cT\\u201d and the \\u201cZ\\u201d and the seconds. Excel will recognize it as date-time. The user must remember the convention about time zones.\\r\\n\\r\\nIn **download (JSON and XML)** the full format is used\\r\\nYYYY-MM-DDThh:mmZ\\r\\ne.g. 2017-07-14T08:00Z.\\r\\n\", \"name_of_field\": \"HourUTC\", \"property_constraint\": \"\", \"name_of_attribute\": \"Hour UTC\", \"unit\": \"\", \"example\": \"2017-07-14T08:00Z\", \"validation_rules\": \"Always full hours, i.e. minutes are 00\", \"type\": \"timestamptz\", \"format_regex\": \"\", \"attribute_description\": \"A date and time (interval), shown in _UTC time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day interval  00:00 - 00:59 and 01:00 covers the second hour (interval) of the day and so forth. Please note: The naming is based on the length of the interval of the finest grain of the resolution.\", \"size\": \"17\"}, {\"comment\": \"On one normal day there will be 24 intervals.\\r\\n\\r\\nWhen daylight saving times shifts there will be either 23 or 25 intervals.\\r\\n\\r\\nPlease note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\\r\\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\\r\\n\\r\\n**In preview (in the GUI)** all timestamps are shown as (display convention)\\r\\nYYYY-MM-DD hh:mm\\r\\ne.g. 2017-07-14 08:00. \\r\\nPlease note that is no time zone indicator, showning that this is local (Danish) time.\\r\\n\\r\\nIn **download (CSV and XLSX)** the date time are exported as\\r\\nYYYY-MM-DD hh:mm\\r\\ne.g. 2017-07-14 08:00.\\r\\nThat is without the \\u201cT\\u201d and the seconds. Excel will recognize it as date-time. The user must remember that this is local (Danish) time.\\r\\n\\r\\nIn **download (JSON and XML)** the  format used is\\r\\nYYYY-MM-DDThh:mm\\r\\ne.g. 2017-07-14T08:00.\", \"name_of_field\": \"HourDK\", \"property_constraint\": \"\", \"name_of_attribute\": \"Hour DK\", \"unit\": \"\", \"example\": \"2017-07-14T08:00\", \"validation_rules\": \"Always full hours, i.e. minutes are 00\", \"type\": \"timestamp\", \"format_regex\": \"\", \"attribute_description\": \"A date and time (interval), shown in _Danish time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day, interval 00:00 - 00:59, and 01:00 covers the second hour period (interval) of the day and so forth. \", \"size\": \"17\"}, {\"comment\": \"\", \"name_of_field\": \"GridCompany\", \"property_constraint\": \"\", \"name_of_attribute\": \"Grid company\", \"unit\": \"text\", \"example\": \"031\", \"validation_rules\": \">000 and <= 999\", \"type\": \"text\", \"format_regex\": \"\", \"attribute_description\": \"Grid Company number according Danish Energy Association\", \"size\": \"3\"}, {\"comment\": \"00:00 o\\u2019clock is the first hour of a given day interval  00:00 - 00:59 and 01:00 covers the second hour (interval) of the day and so forth.\\r\\nPlease note: The naming is based on the length of the interval of the finest grain of the resolution\", \"name_of_field\": \"ResidualConsumption\", \"property_constraint\": \"\", \"name_of_attribute\": \"Residual consumption\", \"unit\": \"MWh per hour\", \"example\": \"300,00\", \"validation_rules\": \">=0\", \"type\": \"float\", \"format_regex\": \"([0-9]*[,])[0-9]\", \"attribute_description\": \"The residual consumption is calculated hour by hour and consists of the total consumption of the individual grid area deducted the consumption of all remote meter reading customers.\", \"size\": \"9.1\"}]",
           "path":"https://www.energidataservice.dk/datastore/dump/65cc37bb-1272-42b8-852c-22d99b6c7fee",
           "mimetype":null,
           "cache_url":null,
           "name":"fixedresidualconsumption",
           "created":"2018-01-09T10:32:00.834488",
           "mimetype_inner":null,
           "position":0,
           "revision_id":"264dd6e1-38fa-4b45-a627-144769ff59f1",
           "resource_type":null,
           "alias":"fixedresidualconsumption",
           "apiBase":"https://www.energidataservice.dk/proxy/api/",
           "api":"https://www.energidataservice.dk/proxy/api/datastore_search_sql?sql=SELECT \"HourUTC\", \"HourDK\", \"GridCompany\", \"ResidualConsumption\" FROM \"fixedresidualconsumption\" ORDER BY \"HourUTC\" DESC LIMIT 100",
           "views":[
              {
                 "id":1,
                 "specType":"table"
              }
           ],
           "descriptionHtml":"<p>The residual consumption is calculated hour by hour and consists of the total consumption of the individual grid area deducted the consumption of all remote meter reading customers.</p>\n"
        }
     ]
  }
}

export default {
  component: App,
  props: { widgets: copiedDatapackage.widgets, datapackage: JSON.stringify(copiedDatapackage.datapackage) }
}
