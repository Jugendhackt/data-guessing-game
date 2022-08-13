import { readdirSync, createReadStream } from 'fs'
//import csv from 'csv-parser'
const csv = require('csv-parser')

// @ts-ignore
const diagrams = readdirSync('owid-datasets/datasets/', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

//diagrams.forEach(diagram => {

const diagram = "Whale catch by decade (Rocha et al. & IWC)"

//readFile(`owid-datasets/datasets/${diagram}/datapackage.json`, (_, data) => {
//    const datapackage = JSON.parse(data.toString())
//    console.log(datapackage)
//})

const csvFiles = readdirSync(`owid-datasets/datasets/${diagram}`, { withFileTypes: true }).filter(fn => fn.name.endsWith(".csv"))
const csvFileName = `owid-datasets/datasets/${diagram}/${csvFiles[0].name}`

type RawCSVLine = Record<string, string>

const results: Array<RawCSVLine> = []

createReadStream(csvFileName)
  .pipe(csv())
  .on('data', (data: RawCSVLine) => results.push(data))
  .on('end', () => {
    console.log(results);

    let entities: Set<string> = new Set()
    let columns: Array<string> = []
    let minYear = 9999
    let maxYear = -9999

    results.forEach(line => {
        entities.add(line["Entity"])
        const year = parseInt(line["Year"])
        if (year > maxYear) {
            maxYear = year
        }
        if (year < minYear) {
            minYear = year
        }
    })

    Object.keys(results[0]).filter(key => key !== "Entity" && key !== "Year").forEach(key => columns.push(key))

    console.log(entities)
    console.log(columns)
    console.log(`${minYear} - ${maxYear}`)

    const interestingColumn = columns[columns.length - 1]
    let entity: string
    if (entities.has("World")) {
        entity = "World"
    } else {
        entity = Array.from(entities)[0]
    }

    let data = {
        question: `${diagram} (${interestingColumn}, ${entity})`,
        type: "series",
        answer: [] as Array<{year: number, value: number}>,
    }
    results.forEach(line => {
        if (line["Entity"] === entity) {
            const year = parseInt(line["Year"])
            const value = parseFloat(line[interestingColumn])
            const dataPoint = {year, value}
            data.answer.push(dataPoint)
        }
    })
    console.log(data)

  });

//readFile(csvFileName, (_, data) => {
//    const content = data.toString()
//    console.log(.split('\n').length)
//})

//})
