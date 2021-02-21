const fs = require('fs')
const wav = require('wav')

const SignalDetectionStream = require('../index.js')

const file = fs.createReadStream('artifacts/morse.i_love_you.wav')

const reader = new wav.Reader()
 
reader.on('format', function (format) {
    //console.log(format)

    const opts = {
        threshold: 0.1,
        numSamples: 20,
    }

    const sds = new SignalDetectionStream(format, opts)

    sds.on("signal", data => {
        console.log(`sds signal: ${JSON.stringify(data)}`)
    })

    sds.on("end", () => {
        console.log(`sds end`)
    })

/*
    // piping is not working (i believe there is backpressure and the reader is not handling it. I will check this later)

    reader.pipe(sds)

    sds.on('close', () => {
        console.log("sds close")
    })

    sds.on('error', (error) => {
        console.log(`sds error: ${error}`)
    })
*/

    reader.on('data', data => {
        //console.log(`reader data.length=${data.length}`) 
        sds.write(data)
    })

    reader.on('end', () => {
        //console.log(`reader end`)
        sds.end()
    })
})

file.pipe(reader)

