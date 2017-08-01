var fs = require('fs');
var util = require('util');
var es = require('event-stream');
var express = require('express');

var filesFunctionalities = express.Router();

var iisAnalyzingResult = []; // create an empty array


filesFunctionalities.get("/listLogDetails", function(req, res) {

    readAnalyseIisDetails();
            res.send(JSON.stringify(iisAnalyzingResult));
});

var readAnalyseIisDetails = function () {

    fs.createReadStream('./public/resourceFiles/IISLog.log')
        .pipe(es.split())
        .pipe(es.mapSync(function (line) {

            var re = new RegExp("([0-9]+\\s\\S\\s)(\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b)\\s(\\S+)");
            var interestingLogDetails = re.exec(line);

            if (interestingLogDetails != null) {
                var cip = interestingLogDetails[2];
                var fqdn = interestingLogDetails[3];

                if (!cip.isNullOrUndefined && !fqdn.isNullOrUndefined){
                    if (iisAnalyzingResult.length == 0) {
                        iisAnalyzingResult.push({cip: cip, frequency: 0, fqdn: [fqdn]})
                    } else {
                        var cipFound = false;
                        var cipFqdnFound = false;
                        for (var i = 0; i < iisAnalyzingResult.length && !cipFound;++i){
                            if (iisAnalyzingResult[i].cip == cip) {
                                cipFound = true;
                                iisAnalyzingResult[i].frequency++;
                                for (var j = 0; j < iisAnalyzingResult[i].fqdn.length && !cipFqdnFound;++j){
                                    if (iisAnalyzingResult[i].fqdn[j] == fqdn){
                                        cipFqdnFound = true;
                                    }
                                }
                                if (!cipFqdnFound){
                                    iisAnalyzingResult[i].fqdn.push(fqdn);
                                }
                            }
                        }
                        if (!cipFound) {
                            iisAnalyzingResult.push({cip: cip, frequency: 0, fqdn: [fqdn]});
                        }
                    }
                }
            }
            else
                console.log(line);

            })
                .on('error', function (err) {
                    console.log('Error while reading file.', err);
                })
                .on('end', function () {
                    console.log('Read entire file.');
                })
        );
};

module.exports = filesFunctionalities;
