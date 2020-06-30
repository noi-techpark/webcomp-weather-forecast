# IDM STATIC WEB COMPONENTS

## Getting Started

Follow the instruction here below for the development instructions.

### Prerequisites

What things you need to install the software and how to install them

- Node (global)
- Yarn (global)

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn project's dependencies

```
yarn
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
...
```

### And coding style tests

Explain what these tests test and why

```
...
```

## Usage

Build all widget using Rollup:

```
yarn build
```

Watch component using Rollup with dev purpose:

```
yarn watch
```

To view the component changes:

```
cd ./work
sh ./work/serve.sh
```

You will see the components in action at [http://0.0.0.0:8000/](http://0.0.0.0:8000/) url.

## Customizations

### Use a custom font

Using the `--weather-forecast-widget-font-family` css variable you can set a custom `font-family`.
[link to MDN doc](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

```html
<style>
  weather-forecast-widget.en_widget {
    --weather-forecast-widget-font-family: Metal Mania;
  }
</style>
<weather-forecast-widget class="en_widget" forecast_days="4" selected_district_id="1" language_translation="en" ></weather-forecast-widget>
```

### Dist folder in packages

## Deployment

## Built With

- [Node]()
- [Polymer]() - The web framework used

## Contributing

Look the `CONTRIBUTING.md` file.

## Authors

- **Luca Fedrizzi** - _Initial work_ - [fedriz](https://github.com/fedriz)

## License

```

```
