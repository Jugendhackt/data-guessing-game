import { readdirSync, createReadStream, writeFileSync } from 'fs'
//import csv from 'csv-parser'
const csv = require('csv-parser')

// @ts-ignore
const diagrams = readdirSync('owid-datasets/datasets/', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name).slice(0, 10)

buildQuestions()

async function buildQuestions() {
    const questions = await Promise.all(diagrams.map(diagram => new Promise((resolve) => {
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
        if (results.length > 0) {
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
                    if (value > 0) {
                        const dataPoint = {year, value}
                        data.answer.push(dataPoint)
                    }
                }
            })
            if (data.answer.length > 2) {
                console.log(data)
                resolve(data)
            }
        }
      });
    })))
    console.log(questions.length)
    writeFileSync('questions.json', JSON.stringify(questions))
}
