var fs = require('fs');

/**
 * Publish hook for the JSDoc template.  Writes to JSON stdout.
 * @param {function} data The root of the Taffy DB containing doclet records.
 * @param {Object} opts Options.
 */
exports.publish = function (data, opts) {
  console.log('PUBLISHING JSON ');
  var docs = data()
    .get()
    .filter((doc) => {
      return !doc.undocumented;
    })
    .map((doc) => {
      let { name, synonyms, returns, params } = doc;
      return { name, synonyms, returns, params };
    });

  fs.writeFileSync(opts.destination, JSON.stringify({ docs: docs }, null, 2));
};
