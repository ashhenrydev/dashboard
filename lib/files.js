/*
-- This module is for reading names of files from local drive and
-- adjusting them for consumption on clientside.
*/

(function(){

	var log = require('./console'),
		config = require('./config'),
		fs = require('fs');

	module.exports = function(directory, extension, cb){
		
		log('i', 'files started');

		var filesRead = [];

		// config dev mode
		if(config.mode == 'dev'){
			log('de', 'files dev mode on');
		}

		// handle files
		fs.readdir('./public/' + directory, function(err, files){
			if(err) return log('e', err);

			files.forEach(function(file){

				log('d', file + ' read - file');

				if(file.indexOf(extension) !== -1){
					filesRead.push(directory + '/' + file);
				}
			});

			return cb(filesRead);
		});
	}

})();