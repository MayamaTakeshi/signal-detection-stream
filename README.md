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
const SignalDetectionStream = require('signal-detection-stream')

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
sds signal: {"on":true,"start":27.5,"end":null}
sds signal: {"on":true,"start":28.75,"end":96.25}
sds signal: {"on":false,"start":96.25,"end":null}
sds signal: {"on":false,"start":97.5,"end":161.25}
sds signal: {"on":true,"start":161.25,"end":null}
sds signal: {"on":true,"start":162.5,"end":230}
sds signal: {"on":false,"start":230,"end":null}
sds signal: {"on":false,"start":231.25,"end":980}
sds signal: {"on":true,"start":980,"end":null}
sds signal: {"on":true,"start":981.25,"end":1048.75}
sds signal: {"on":false,"start":1048.75,"end":null}
sds signal: {"on":false,"start":1050,"end":1113.75}
sds signal: {"on":true,"start":1113.75,"end":null}
sds signal: {"on":true,"start":1115,"end":1316.25}
sds signal: {"on":false,"start":1316.25,"end":null}
sds signal: {"on":false,"start":1317.5,"end":1380}
sds signal: {"on":true,"start":1380,"end":null}
sds signal: {"on":true,"start":1381.25,"end":1448.75}
sds signal: {"on":false,"start":1448.75,"end":null}
sds signal: {"on":false,"start":1450,"end":1513.75}
sds signal: {"on":true,"start":1513.75,"end":null}
sds signal: {"on":true,"start":1515,"end":1582.5}
sds signal: {"on":false,"start":1582.5,"end":null}
sds signal: {"on":false,"start":1583.75,"end":1876.25}
sds signal: {"on":true,"start":1876.25,"end":null}
sds signal: {"on":true,"start":1877.5,"end":2077.5}
sds signal: {"on":false,"start":2077.5,"end":null}
sds signal: {"on":false,"start":2078.75,"end":2142.5}
sds signal: {"on":true,"start":2142.5,"end":null}
sds signal: {"on":true,"start":2143.75,"end":2345}
sds signal: {"on":false,"start":2345,"end":null}
sds signal: {"on":false,"start":2346.25,"end":2410}
sds signal: {"on":true,"start":2410,"end":null}
sds signal: {"on":true,"start":2411.25,"end":2611.25}
sds signal: {"on":false,"start":2611.25,"end":null}
sds signal: {"on":false,"start":2612.5,"end":2905}
sds signal: {"on":true,"start":2905,"end":null}
sds signal: {"on":true,"start":2906.25,"end":2972.5}
sds signal: {"on":false,"start":2972.5,"end":null}
sds signal: {"on":false,"start":2973.75,"end":3037.5}
sds signal: {"on":true,"start":3037.5,"end":null}
sds signal: {"on":true,"start":3038.75,"end":3106.25}
sds signal: {"on":false,"start":3106.25,"end":null}
sds signal: {"on":false,"start":3107.5,"end":3171.25}
sds signal: {"on":true,"start":3171.25,"end":null}
sds signal: {"on":true,"start":3172.5,"end":3240}
sds signal: {"on":false,"start":3240,"end":null}
sds signal: {"on":false,"start":3241.25,"end":3305}
sds signal: {"on":true,"start":3305,"end":null}
sds signal: {"on":true,"start":3306.25,"end":3507.5}
sds signal: {"on":false,"start":3507.5,"end":null}
sds signal: {"on":false,"start":3508.75,"end":3800}
sds signal: {"on":true,"start":3800,"end":null}
sds signal: {"on":true,"start":3801.25,"end":3868.75}
sds signal: {"on":false,"start":3868.75,"end":null}
sds signal: {"on":false,"start":3870,"end":4618.75}
sds signal: {"on":true,"start":4618.75,"end":null}
sds signal: {"on":true,"start":4620,"end":4821.25}
sds signal: {"on":false,"start":4821.25,"end":null}
sds signal: {"on":false,"start":4822.5,"end":4886.25}
sds signal: {"on":true,"start":4886.25,"end":null}
sds signal: {"on":true,"start":4887.5,"end":4955}
sds signal: {"on":false,"start":4955,"end":null}
sds signal: {"on":false,"start":4956.25,"end":5020}
sds signal: {"on":true,"start":5020,"end":null}
sds signal: {"on":true,"start":5021.25,"end":5221.25}
sds signal: {"on":false,"start":5221.25,"end":null}
sds signal: {"on":false,"start":5222.5,"end":5286.25}
sds signal: {"on":true,"start":5286.25,"end":null}
sds signal: {"on":true,"start":5287.5,"end":5487.5}
sds signal: {"on":false,"start":5487.5,"end":null}
sds signal: {"on":false,"start":5488.75,"end":5781.25}
sds signal: {"on":true,"start":5781.25,"end":null}
sds signal: {"on":true,"start":5782.5,"end":5982.5}
sds signal: {"on":false,"start":5982.5,"end":null}
sds signal: {"on":false,"start":5983.75,"end":6047.5}
sds signal: {"on":true,"start":6047.5,"end":null}
sds signal: {"on":true,"start":6048.75,"end":6250}
sds signal: {"on":false,"start":6250,"end":null}
sds signal: {"on":false,"start":6251.25,"end":6315}
sds signal: {"on":true,"start":6315,"end":null}
sds signal: {"on":true,"start":6316.25,"end":6516.25}
sds signal: {"on":false,"start":6516.25,"end":null}
sds signal: {"on":false,"start":6517.5,"end":6810}
sds signal: {"on":true,"start":6810,"end":null}
sds signal: {"on":true,"start":6811.25,"end":6878.75}
sds signal: {"on":false,"start":6878.75,"end":null}
sds signal: {"on":false,"start":6880,"end":6943.75}
sds signal: {"on":true,"start":6943.75,"end":null}
sds signal: {"on":true,"start":6945,"end":7012.5}
sds signal: {"on":false,"start":7012.5,"end":null}
sds signal: {"on":false,"start":7013.75,"end":7076.25}
sds signal: {"on":true,"start":7076.25,"end":null}
sds signal: {"on":true,"start":7077.5,"end":7278.75}
sds signal: {"on":false,"start":7278.75,"end":null}
sds end
```

## Disclaimer

The file artifacts/morse.i_love_you.wav was obtained by converting
https://commons.wikimedia.org/wiki/File:I_love_you_morse_code.ogg
from ogg to wav.

