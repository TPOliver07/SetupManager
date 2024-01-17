// This script handles page changes and save/load

doc = "index.html"

var elementIDs = [
"track","date","altName",
"LFWeight", "RFWeight", "LRWeight", "RRWeight",
"DriverWeight", "BallastWeight",
"LFHeight","RFHeight","LRHeight","RRHeight",
"LFPressure","RFPressure","LRPressure","RRPressure",
"LFCamber", "RFCamber", "LFCaster", "RFCaster",
"FStagger","RStagger","LFTireCirc", "RFTireCirc", "LRTireCirc", "RRTireCirc",
"LFSpring","RFSpring","LRSpring","RRSpring",
"TireSet","TireAge","ToeIn","RearAxleOffset","FrontBias",
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

function save(downloadFile) { // New save function will use a NodeList to get and save all inputs.
	// download determines whether the saved data is for internal use or if a downloaded file will be generated.
	elementList = document.querySelectorAll("input[data-position='setup']");
	// console.log(elementList);
	let savedValues = [];
	for (let i = 0; i < elementList.length; i++) {
		savedValues.push('"' + elementList[i].id + ":" + document.getElementById(elementList[i].id).value + '"');
	}
	//console.log(savedValues.toString());
	if (downloadFile == true) {
		if (document.getElementById("altNameCheck").checked == true){
			download(makeTextFile(savedValues.toString()), document.getElementById("altName").value);
		}
		else {
			console.log(savedValues[0]);
			download(makeTextFile(savedValues.toString()), savedValues[0].substr(0,savedValues[0].length-1).split(":")[1] + "_" + savedValues[1].substr(0,savedValues[1].length-1).split(":")[1] + "_" + savedValues[2].substr(0,savedValues[2].length-1).split(":")[1]+ ".stp");
		}
	}
	else {
		return savedValues.toString();
	}
}

var loadedValues = [];
function load(object) {
	var file = document.getElementById(object).files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			loadedValues = evt.target.result.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			// console.log(loadedValues);
			// Need to create a way to validate files before attempting to write.
			
			// Assign values
			for (let i = 0; i < loadedValues.length; i++){
				//console.log('Set ' + loadedValues[i].substr(1,loadedValues[i].length - 2).split(":")[0] + ' to ' + loadedValues[i].substr(1,loadedValues[i].length - 2).split(":")[1] + '.');
				document.getElementById(loadedValues[i].substr(1,loadedValues[i].length - 2).split(":")[0]).value = loadedValues[i].substr(1,loadedValues[i].length - 2).split(":")[1];
			}
			
		}
		reader.onerror = function (evt) {
			alert("error reading file");
		}
	}
	return file;
}

function newFile() {
	var i = 0
	while (i < elementIDs.length) {
		document.getElementById(elementIDs[i]).value = null;
		i += 1;
	}
}

function display(elementID, displayType, instruction, callID) { // target element's IDs in an array, how it should be displayed, and specific instructions (if no instructions, leave blank), relevant target from instructions.
	var i = 0;
	while (i < elementID.length) {
		if (instruction == "checkbox") {
			if (document.getElementById(callID).checked == true){
				document.getElementById(elementID[i]).style.display = displayType;
			}
			else {
				if (document.getElementById(elementID[i]).style.display == "none"){
					document.getElementById(elementID[i]).style.display = "inline-block";
				}
				else{
					document.getElementById(elementID[i]).style.display = "none";
				}
			}
		}
		else if (instruction == "menu") {
			document.getElementById(callID).style.display = "none";
			document.getElementById(elementID).style.display = displayType;
		}
		else if (instruction == "closeAll") {
			
		}
		else if (instruction == "google form") {
			let divList = document.getElementsByTagName('div'); // Hide all displays.
			for (j = 0; j < divList.length; j++) {
				divList[j].style.display = "none";
			}
			document.getElementById(elementID[i]).style.display = displayType;
			document.getElementById(elementID[i]).innerHTML = '<iframe id="bugForm" src="https://docs.google.com/forms/d/e/1FAIpQLSd-Tzq8tGgyEe3g6QYzUeA_1UePy7pnaqmdpa1uhEcINjDZhQ/viewform?embedded=true" width="640" height="800" frameborder="10" marginheight="0" marginwidth="0">Loading…</iframe>'
		}
		else {
			document.getElementById(elementID[i]).style.display = displayType;
		}
		
		i += 1;
	}
}

function changeTab(targetBlock, targetTab) { // change to target tab, close other tabs.
	let blocks = Array.prototype.slice.call(document.getElementsByName('tab'));
	let tabs = Array.prototype.slice.call(document.getElementsByName('tabButton'));
	for (let i = 0; i < blocks.length; i++) {
		document.getElementById(blocks[i].id).style.display = "none";
	}
	for (let j = 0; j < tabs.length; j++){
		if (document.getElementById(tabs[j].id).classList.contains('tabActive')) {
			document.getElementById(tabs[j].id).classList.remove('tabActive');
			document.getElementById(tabs[j].id).classList.add('tabInactive');
		}
	}
	document.getElementById(targetBlock).style.display = "inline-block";
	
	if (document.getElementById(targetTab).classList.contains('tabInactive')) {
		document.getElementById(targetTab).classList.remove('tabInactive');
		document.getElementById(targetTab).classList.add('tabActive');
	}
}

function validateFile() {
	var tempFileName = document.getElementById("altName").value;
	console.log(tempFileName.substr(tempFileName.length - 4, tempFileName.length-1));
	if (tempFileName.substr(tempFileName.length - 4, tempFileName.length-1) == ".stp") {
		return console.log("Valid file name: " + tempFileName);
	}
	else {
		document.getElementById("altName").value = tempFileName + ".stp";
		return console.log("Invalid file name: "+ tempFileName + "\nUpdated file name to: "+ tempFileName+".stp");
	}
}