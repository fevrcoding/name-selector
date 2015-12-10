module.exports = function  (options) {

    var url = require('url'),
        path = require('path'),
        fs = require('fs'),
        fixturePath = path.join(process.cwd(), options.paths.src.fixtures),
        fixturePathRegEx = /\/api\/(.+)/;

    var fixtures = function (req, res, next) {


        var parserUrl = url.parse(req.url, false);

        var match = parserUrl.path.match(fixturePathRegEx),
            filepath = match !== null ? path.join(fixturePath, 'api-' + match[1]) + '.json' : null;

        if (filepath) {
            fs.readFile(filepath, 'utf8', function (err, data) {
                res.end(data);
            });
            return;
        }
        next();

    };

    return [fixtures];
};