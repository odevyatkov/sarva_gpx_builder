# SARVA gpx builder


## install without ssh key (over https)

```sh
$ git clone https://github.com/odevyatkov/sarva_gpx_builder.git
$ cd sarva_gpx_builder
$ npm ci
```

## install with ssh key

```sh
$ git clone git@github.com:odevyatkov/sarva_gpx_builder.git
$ cd sarva_gpx_builder
$ npm ci
```

## run builder with center and radius

run for center `49.841885,24.031832`
and radius `10 km`
and cell size `1 km`

```sh
npm start -- --center=49.841885,24.031832 --radius=10 --cell=1
```

## run builder with BBox

run for bbox `49.751952963627545,23.89238084438024` `49.93181703637245,24.17128315561976`
and cell size `1 km`

```sh
npm run start -- --fromPoint=49.751952963627545,23.89238084438024 --toPoint=49.93181703637245,24.17128315561976 --cell=1
```
