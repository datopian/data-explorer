The Dataopian Data Explorer is a React single page application and framework for creating and displaying rich data explorers (think Tableau-lite). It incorporates connecting to data sources, searching and filtering, views such as table, charts and map as well as conrtros to create and customize those views.

Use stand-alone or with CKAN. For CKAN it is a drop-in replacement for ReclineJS in CKAN Classic.

Full overview and docs at: http://tech.datopian.com/data-explorer/


# Use it

## Usage

```htmlmixed=
<div class="data-explorer" id="..." data-datapackage="{...}" ></div>

<!-- where datapackage is -->
<srcipt>
  const datapackage = {
    resources: [{resource}], // single resource for this view
    views: [...], // can be 3 views aka widgets
    controls: { 
      showChartBuilder: true,
      showMapBuilder: true 
    }
  }
</srcipt>

<!-- import data explorer -->
<srcipt src="..."></srcipt>
```

TODO: Using it via webpack etc


# Development

This was built using create-react-app so you can use all the standard commands.

## Installation

* clone this repo
* `yarn`
* `yarn start`
* visit localhost:3000

You should see:
![alt text](https://i.imgur.com/IygXUYF.png))

## Cosmos

Run `yarn cosmos`

You should see:
![alt text](https://imgur.com/a/GSN7tST)


## Fixtures

Until we have better docs on settings, use fixtures as examples of how to instantiate the app.

Fixtures are representations of Data Explorer state, contained in `__fixtures__` directory.

## Serialized state 

`store->serializedState` is a representation of the application state _without fetched data_
A data-explorer can be "hydrated" using the serialized state, it will refetch the data, and will render in the same state it was exported in

### A note on share links

There is common limit of up 2000 characters on URL strings. Our share links contain the entire application store tree, which is often larger than 2000 characters, in which the application state cannot be shared via URL. Thems the breaks.


