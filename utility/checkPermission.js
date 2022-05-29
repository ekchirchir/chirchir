const fs = require('fs')
module.exports = function canWrite(path, callback) {
    fs.access(path, fs.R_OK, function(err) {
      callback(null, !err);
    });
  }