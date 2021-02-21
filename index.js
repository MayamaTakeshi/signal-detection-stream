const { Writable } = require('stream')
const { EventEmitter } = require('events')

class SignalDetectionStream extends Writable {
	constructor(format, opts) {
		super()

		this.bytesPerSample = format.bitDepth ? format.bitDepth/8 : 2

        this.sampleRate = format.sampleRate

		this.float = format.float
		this.signed = format.signed

		this.numSamples = opts.numSamples

        this.threshold = opts.threshold

		this.remains = null

		this.eventEmitter = new EventEmitter()

        this.samples = 0

        this.signal = {
            on: false,
            start: 0,
        }
	}

	on(evt, cb) {
		this.eventEmitter.on(evt, cb)
	}

	_processSamples(data) {
		var buffer0 = new Float32Array(this.numSamples)
		var buffer = new Float32Array(this.numSamples)

		for(var i = 0 ; i<this.numSamples ; i++) {
			var f
			if(this.bytesPerSample == 1) {
				f = data[i]
			} else if (this.bytesPerSample == 2) {
				f = data.readInt16LE(i*this.bytesPerSample)
				if(f != 0) {
					var LIMIT = 0.9999999999999999
					f = (LIMIT - -LIMIT)/(32767 - -32768)*(f - 32767)+LIMIT
				}
			} else if (this.bytesPerSample == 4) {
				if(this.float) {
					f = data.readFloatLE(i*this.bytesPerSample)
				} else {
					f = data.readInt32LE(i*this.bytesPerSample)
					if(f != 0) {
						var LIMIT = 0.9999999999999999
						f = (LIMIT - -LIMIT)/(2147483647 - -2147483648)*(f - 2147483647)+LIMIT
					}
				}
			} else {
				throw "NOT SUPPORTED"
			}

            f = Math.abs(f)
            var signal = f >= this.threshold ? 1 : 0

			buffer0[i] = f
			buffer[i] = signal

            this.samples++
		}

        var on_total = buffer.reduce((acc, val) => { return val == 1 ? acc+1 : acc }, 0) 
        var on = on_total > (buffer.length / 2) ? true : false

        //console.log(this.samples)
        //console.log(buffer0)

        if(on) {
            if(!this.signal.on) {
                this.eventEmitter.emit('flip', {on: true, start: (this.samples - this.numSamples) / this.sampleRate * 1000})
                this.signal.on = true
                this.signal.start = this.samples    
            }
        } else {
            if(this.signal.on) {
                this.eventEmitter.emit('flip', {on: false, start: (this.samples - this.numSamples) / this.sampleRate * 1000})
                this.signal.on = false
                this.signal.start = this.samples
            }
        }
	}

	_write(chunk, encoding, callback) {
		//console.log('_write', chunk)
		var data = chunk

		if(this.remains) {
			data = Buffer.concat([this.remains, data])
			this.remains = null
		}

		var numBytes = this.numSamples * this.bytesPerSample

		//console.log(data.length, numBytes)
		if(data.length < numBytes) {
			this.remains = data
		} else if(data.length == numBytes) {
			this._processSamples(data)
		} else {
			var blocks = Math.floor(data.length / numBytes)
			//console.log('blocks', blocks)
			//console.log("data.length", data.length)
			//console.log(blocks * numBytes)
			for(var i=0 ; i<blocks ; i++) {
				this._processSamples(data.slice(i*numBytes, i*numBytes+numBytes))
			}
			var remaining = data.length - blocks*numBytes
			if(remaining > 0) {
				this.remains = data.slice(-remaining)
			}
		}

		if(callback) callback(null)
	}

    _final() {
        this.eventEmitter.emit('end')
    }
}

module.exports = SignalDetectionStream

