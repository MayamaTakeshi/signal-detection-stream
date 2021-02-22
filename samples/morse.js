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

    reader.pipe(sds)
})

file.pipe(reader)

