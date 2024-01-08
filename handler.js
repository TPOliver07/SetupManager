// This script handles page changes and save/load

doc = "index.html"

var elementIDs = [
"track","date",
"LFWeight", "RFWeight", "LRWeight", "RRWeight",
"DriverWeight", "BallastWeight",
"LFHeight","RFHeight","LRHeight","RRHeight",
"LFPressure","RFPressure","LRPressure","RRPressure",
"LFCamber", "RFCamber", "LFCaster", "RFCaster",
"FStagger","RStagger","LFTireCirc", "RFTireCirc", "LRTireCirc", "RRTireCirc",
"LFSpring","RFSpring","LRSpring","RRSpring",
"TireSet","TireAge","ToeIn","FrontBias",
"LFShock","RFShock","LRShock","RRShock",
"PanhardAngle","PinionAngle",
"comments", "QTime", "QPos", "QPole", "RStart", "RFinish", "CarCount"
]; // List of IDs in the order they should be referenced.

var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

function download(url,fileName) {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName // Use a specific filename to make the files verifiable.
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function save() {
	// Need to get the value of every input.
	var savedValues = [];
	// var readable = []; // Readable version of the saveArray.
	var i = 0
	while (i < elementIDs.length) {
		savedValues.push('"'+ document.getElementById(elementIDs[i]).value + '"');
		// readable.push(elementIDs[i] + ": " + document.getElementById(elementIDs[i]).value);
		i += 1;
	}
	console.log(savedValues.toString());
	// console.log(readable.toString());
	
	download(makeTextFile(savedValues.toString()), savedValues[0] + "_" + savedValues[1] + ".stp");
}
var loadedValues = [];
function load() {
	var file = document.getElementById("loadPathInput").files[0];
	
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			loadedValues = evt.target.result.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			//console.log(evt.target.result.split(","));
			console.log(loadedValues);
			
			// Update data
			var i = 0
			while (i < elementIDs.length) {
				document.getElementById(elementIDs[i]).value = loadedValues[i].substr(1,(loadedValues[i].length)-2);
				i += 1;
			}
		}
		reader.onerror = function (evt) {
			alert("error reading file");
		}
	}
	
	scaleFill();
	
}
