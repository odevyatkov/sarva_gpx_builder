# savra_gpx_builder


## install without ssh key (over https)

```sh
$ git clone https://github.com/odevyatkov/savra_gpx_builder.git
$ cd savra_gpx_builder
$ npm ci
```

## install with ssh key

```sh
$ git clone git@github.com:odevyatkov/savra_gpx_builder.git
$ cd savra_gpx_builder
$ npm ci
```

## run builder

run for center `49.841885,24.031832`
and radius `10 km`
and cell size `1 km`

```sh
npm start -- --center=49.841885,24.031832 --radius=10 --cell=1
```
