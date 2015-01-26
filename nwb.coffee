
NwBuilder = require 'node-webkit-builder'

nwb = new NwBuilder
	files: './app/**/*'
	platforms: ['linux32']

nwb.run()
