const fs = require('fs');

function getKeysFromOption(options) {
  const { settings, _locals, cache, ...objectKeys } = options;
  return Object.keys(objectKeys);
}

function getRenderedContent(content, options) {
  const keys = getKeysFromOption(options);
  let contentString = content.toString();
  for (let key of keys) {
    contentString = contentString.replace(new RegExp(`\{${key}\}`, 'gi'), options[key]);
  }
  return contentString;
}

function expressJsx(filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(err);
    }
    const rendered = getRenderedContent(content, options);
    return callback(null, rendered);
  });
}

module.exports = expressJsx;
