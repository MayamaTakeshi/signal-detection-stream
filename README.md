# signal-detection-stream

## Overview

This is just a quick and dirty signal detection stream that I wrote to be used as part of a morse detection stream.

It will detect flips (transition of a signal from 'off' to 'on' and vice versa) in data present in a stream.

## Installation
```
npm install signal-detection-stream
```

## Usage

You just need pass parameters format and opts

The parameter format is obtained from the source (Readable) stream.
And the opts determine sensitivity for flipping events.

```
const SignalDetectionStream = require('../index.js')

const opts = { 
    threshold: 0.1, // magnitude of the signal to indicate a flip
    numSamples: 20, // how many samples to analyze for flip evaluation
}

const sds = new SignalDetectionStream(format, opts)

sds.on("flip", data => {
    console.log(`sds flip: ${JSON.stringify(data)}`)
})
```

## Sample

You can try the sample:
```
$ node samples/morse.js 
sds flip: {"on":true,"start":27.5}
sds flip: {"on":false,"start":96.25}
sds flip: {"on":true,"start":161.25}
sds flip: {"on":false,"start":230}
sds flip: {"on":true,"start":980}
sds flip: {"on":false,"start":1048.75}
sds flip: {"on":true,"start":1113.75}
sds flip: {"on":false,"start":1316.25}
sds flip: {"on":true,"start":1380}
sds flip: {"on":false,"start":1448.75}
sds flip: {"on":true,"start":1513.75}
sds flip: {"on":false,"start":1582.5}
sds flip: {"on":true,"start":1876.25}
sds flip: {"on":false,"start":2077.5}
sds flip: {"on":true,"start":2142.5}
sds flip: {"on":false,"start":2345}
sds flip: {"on":true,"start":2410}
sds flip: {"on":false,"start":2611.25}
sds flip: {"on":true,"start":2905}
sds flip: {"on":false,"start":2972.5}
sds flip: {"on":true,"start":3037.5}
sds flip: {"on":false,"start":3106.25}
sds flip: {"on":true,"start":3171.25}
sds flip: {"on":false,"start":3240}
sds flip: {"on":true,"start":3305}
sds flip: {"on":false,"start":3507.5}
sds flip: {"on":true,"start":3800}
sds flip: {"on":false,"start":3868.75}
sds flip: {"on":true,"start":4618.75}
sds flip: {"on":false,"start":4821.25}
sds flip: {"on":true,"start":4886.25}
sds flip: {"on":false,"start":4955}
sds flip: {"on":true,"start":5020}
sds flip: {"on":false,"start":5221.25}
sds flip: {"on":true,"start":5286.25}
sds flip: {"on":false,"start":5487.5}
sds flip: {"on":true,"start":5781.25}
sds flip: {"on":false,"start":5982.5}
sds flip: {"on":true,"start":6047.5}
sds flip: {"on":false,"start":6250}
sds flip: {"on":true,"start":6315}
sds flip: {"on":false,"start":6516.25}
sds flip: {"on":true,"start":6810}
sds flip: {"on":false,"start":6878.75}
sds flip: {"on":true,"start":6943.75}
sds flip: {"on":false,"start":7012.5}
sds flip: {"on":true,"start":7076.25}
sds flip: {"on":false,"start":7278.75}
sds end
```

## Disclaimer

The file artifacts/morse.i_love_you.wav was obtained by converting
https://commons.wikimedia.org/wiki/File:I_love_you_morse_code.ogg
from ogg to wav.

