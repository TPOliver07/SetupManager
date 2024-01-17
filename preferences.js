// Handle preferences

doc = 'index.html'

var configurableNames = [
[['Weights', false],
	['Cross Weight', false],
	['Left Weight', false],
	['Right Weight', false],
	['Rear Weight', false],
	['Total Weight', false],
	['Driver Weight', false],
	['Ballast Weight', false]],
[['Setup', false],
	['Heights', false],
	['Springs', false],
	['Camber', false],
	['Caster', false],
	['Shocks', false],
	['Wheelbase', false],
	['Toe-In', false],
	['Brake Bias', false],
	['Panhard Bar', false],
	['Trailing Arms', false],
	['Pinion', false],
	['Rear Axle Offset', false],
	['Top Link', false]],
[['Tire Info', false],
	['Air Pressure', false],
	['Stagger', false],
	['Tires', false]],
[['Drive', false],
	['Engine', false],
	['Gear', false]],
[['Notes', false],
	['Comments', false],
	['Qualifying Time', false],
	['Qualifying Position', false],
	['Pole Time', false],
	['Started Race', false],
	['Finished Race', false],
	['Car Count', false]]
];
var unsavedConfigs = configurableNames; // An array where any preferences are stored before they are saved in updatePreferences().
// Use a three-dimensional array to access category, object, then preferences.
// configurableNames[category][object][preference]
// Preference[0]: Name, Preference[1]: hidden
// These names match a named span where style can be applied.

var generalPreferences = [
['car', 'text','legend', 'cars'],
['team info', 'boolean', false, 'teamNameCheck'],
['team name', 'text', 'Team Name Here', 'teamNameField'],
['team logo', 'imageURL', 'empty', 'teamLogoField'], // image will use a URL for now
['default file name', 'filename', 'None', 'defaultFileField'], // just a file
['default file', 'file', 'no file', 'defaultFileField'], // contentes (easier to save into cookies than reload)
['load on launch', 'boolean', false, 'loadOnLaunchCheckbox']
]; // Preferences are stored in a two-dimensional array.
// The second dimensions can only contain three elements: preference name, type, value, and id of container.

// Call this function anytime cookies are edited to immediately put them back in order.
function parseCookies(getNames){ // getNames is a boolean allowing the user to request names of the cookies instead of values.
	if (document.cookie.length > 0 && document.cookie.includes('useCookies') == true) { // Check to see if cookies are enabled.
		cookieList = []; // empty cookie list
		cookieList = document.cookie.split("; ");
		cookieList.sort();
		//console.log(cookieList);

		for (let i = 0; i < cookieList.length; i++){
			if (getNames == true) {
				cookieList[i] = cookieList[i].split(":=:")[0]; // return names
			}
			else {
				cookieList[i] = cookieList[i].split(":=:")[1]; // return values
			}
		}
		return cookieList;
	}
	else {
		console.log("Cookies are not enabled.");
		return;
	}
}

function loadPreferences() {
	// load cookies into useable arrays
	if (document.cookie.length > 0 && document.cookie.includes('useCookies') == true) { // Check for cookies
		document.getElementById('cookieBox').style.display = 'none';
		configurableNames = parseCookies(false)[parseCookies(true).indexOf('configurableNames')].split('~newline ');
		for (let j = 0; j < configurableNames.length; j++) {
			configurableNames[j] = (configurableNames[j].split('~split '));
			for (let k = 0; k < configurableNames[j].length; k++) {
				configurableNames[j][k] = configurableNames[j][k].split(',');
			}
		}
		/* Below is an in progress process that fixes old cookies. It is not necessary for this update, but must work by the next.
		// Check to see if the length of configurableNames matches the expected length using the not yet assigned unsavedConfigs.
		if (configurableNames.length != unsavedConfigs.length) {
			console.log('Old cookies!');
			// Assign unsaved configs where possible, leave alone where not.
			for (let i = 0; i < unsavedConfigs.length; i++) {
				for (let j = 0; j < unsavedConfigs[i].length; i++) {
					// Before running an unnecessary loop, just see if the string contains the value anywhere. If it doesn't, we can stop.
					if (configurableNames[i].toString().contains(unsavedConfigs[i][j][0]) == true) {
						// The string is present, but the value may be a different index, so loop through to fix the index.
					}
					else {
						// Use the unsaved config.
					}
				}
			}
		}*/
		if (configurableNames.length != unsavedConfigs.length) {
			alert('The cookies saved to this site do not match the current version. Some preference data may be lost.');
			configurableNames = unsavedConfigs;
		}
		
		unsavedConfigs = configurableNames; // Ensures that checkbox works correctly.

		generalPreferences = parseCookies(false)[parseCookies(true).indexOf('generalPreferences')].split('~newline ');
		for (let j = 0; j < generalPreferences.length; j++) {
			generalPreferences[j] = generalPreferences[j].match(/("{".*?"}"|".*?"|[^,"\s]+)(?=\s*,|\s*$)/g); // look for "content", ...
			// The regexp above adds '" to the beginning and end of each, so now need to loop through and grab the substring that does not contain those.
			for (let k=0; k < generalPreferences[j].length; k++) {
				generalPreferences[j][k] = generalPreferences[j][k].substr(1, generalPreferences[j][k].length - 2);
			}
		}
	}
	else {
		console.log('No cookies');
		unsavedConfigs = configurableNames;
	}
	//console.log(generalPreferences);

	// Ensure the default values of the preferences form are correct
	let ijk = 0;
	while (ijk < generalPreferences.length) {
		if (generalPreferences[ijk][1] == 'boolean') {
			document.getElementById(generalPreferences[ijk][3]).checked = JSON.parse(generalPreferences[ijk][2]);
		}
		else if (generalPreferences[ijk][1] == 'filename') {
			if (generalPreferences[ijk][0] == 'default file name') {
				document.getElementById('defaultFileExisting').innerHTML = generalPreferences[ijk][2];
			}
		}
		else if (generalPreferences[ijk][1] == 'file') {
			// Nothing needs to happen here
		}
		else {
			//console.log(generalPreferences[ijk][3]);
			document.getElementById(generalPreferences[ijk][3]).value = generalPreferences[ijk][2];
		}
		//console.log('Assigned ' + generalPreferences[ijk][0]);
		ijk += 1;
	}


	let i = 0;
	while (i < configurableNames.length) {
		if (configurableNames[i][0][1] == 'true') {
			console.log("Disabled, but this function does not work quite yet");
		}

		let j = 0;
		while (j < configurableNames[i].length) {
			//console.log(configurableNames[i][j]);
			// Loop through specific Preferences
			let configList = Array.prototype.slice.call(document.getElementsByName(configurableNames[i][j][0]));

			let k = 0;
			while (k < configList.length) {
				// Assign a temp ID if there is not an ID
				if (configList[k].id == "") {
					configList[k].id = "object_" + (Math.floor(Math.random() * 100000)).toString();
					console.log("ID is empty. Assigned random ID to object " + configList[k] + ". The ID is " + configList[k].id + ".");
				}

				//console.log(configList[k].id);
				//console.log(configurableNames[i][j][0] + ' is set to ' + configurableNames[i][j][1]);
				// Visibility settings
				if (configurableNames[i][j][1] == 'true') {
					document.getElementById(configList[k].id).style.visibility = 'hidden';
				}
				else {
					document.getElementById(configList[k].id).style.visibility = 'visible';
				}
				k += 1;
			}
			j += 1;
		}
		i += 1;
	}

	// Modify elements to match user preferences by looping through and identifying the preference type.
	for (let i = 0; i < generalPreferences.length; i++) {
		if (generalPreferences[i][1] == 'text'){
			if (generalPreferences[i][0] == 'car') {
				// Nothing to update yet for this.
			}
			else if (generalPreferences[i][0] == 'team name') {
				let teamNameElements = document.getElementsByName("Team Name");
				for (let j = 0; j < teamNameElements.length; j++) {
					document.getElementById(teamNameElements[j].id).innerHTML = generalPreferences[i][2]; // Team names should always be stored in spans or text where innerHTML finds only the name.
				}
			}
		}
		else if (generalPreferences[i][1] == 'file'){ // File should contain the contents
			var fileContents = generalPreferences[i][2].substr(1, generalPreferences[i][2].length - 2).match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			// Contents are stored, but will not be loaded until the user does so.
		}
		else if (generalPreferences[i][1] == 'boolean'){
			if (generalPreferences[i][0] == 'team info') {
				let teamInfoElements = document.getElementsByName("Team Info");
				for (let j = 0; j < teamInfoElements.length; j++) {
					if (generalPreferences[i][2] == true || generalPreferences[i][2] == 'true') { // dealing with cookies but avoiding using JSON.parse
						document.getElementById(teamInfoElements[j].id).style.display = "block";
					}
					else {
						document.getElementById(teamInfoElements[j].id).style.display = "none";
					}
				}
			}
			else if (generalPreferences[i][0] == 'load on launch') {
				if (generalPreferences[i][2] == true || generalPreferences[i][2] == 'true') {
					display(['setupSheet'],'inline-block','menu','landing');
					for (let j = 0; j < fileContents.length; j++){
						document.getElementById(fileContents[j].substr(1,fileContents[j].length - 2).split(":")[0]).value = fileContents[j].substr(1,fileContents[j].length - 2).split(":")[1];
					}
				}
				else {
					// no action is needed.
				}
			}
		}
		else if (generalPreferences[i][1] == 'filename'){
			// No action needed for filenames. 
		}
		else if (generalPreferences[i][1] == 'imageURL'){
			if (generalPreferences[i][0] == 'team logo') {
				let teamLogoElements = document.getElementsByName("Team Logo");
				for (let j = 0; j < teamLogoElements.length; j++) {
					document.getElementById(teamLogoElements[j].id).src = generalPreferences[i][2];
				}
			}
		}
		else {
			console.log(generalPreferences[i][1] + ' for ' + generalPreferences[i][0] + ' does not match any expected file type: text, boolean, file, filename, or imageURL.');
		}
	}


	/*let teamInfoElements = document.getElementsByName("Team Info");
	console.log(generalPreferences.indexOf('team info'));
	for (let i = 0; i < teamInfoElements.length; i++) {
		if (generalPreferences[generalPreferences.indexOf('team info')][2] == true || generalPreferences[generalPreferences.indexOf('team info')][2] == 'true') { // dealing with cookies but avoiding using JSON.parse
			document.getElementById(teamInfoElements[i].id).style.display = "block";
		}
		else {
			document.getElementById(teamInfoElements[i].id).style.display = "none";
		}
	}
	let teamNameElements = document.getElementsByName("Team Name");
	for (let i = 0; i < teamNameElements.length; i++) {

	}
	let teamLogoElements = document.getElementsByName("Team Logo");
	for (let i = 0; i < teamLogoElements.length; i++) {

	}
	*/


}
loadPreferences();

function updatePreferences() { // Take various actions to match the output to the preferences the user has selected.
	configurableNames = unsavedConfigs; // Make temporary selections permanent.
	//console.log(generalPreferences);
	var i = 0; // loop variable
	while (i < generalPreferences.length) { // Read and assign all preferences to prepare them for saving.
		if (generalPreferences[i][1] == 'text'){
			generalPreferences[i][2] = document.getElementById(generalPreferences[i][3]).value;
		}
		else if (generalPreferences[i][1] == 'boolean'){
			console.log(generalPreferences[i]);
			generalPreferences[i][2] = document.getElementById(generalPreferences[i][3]).checked;
		}
		else if (generalPreferences[i][1] == 'file'){ // File should get the contents
			console.log(generalPreferences[i]);
			if (document.getElementById(generalPreferences[i][3]).files.length == 0) {
				// No file
			}
			else {
				// In order to read content, load the file then obtain the values stored.
				load(generalPreferences[i][3]);
				var loadValueString = "{";
				loadValueString += save(false)+"}";
				//console.log(loadValueString);
				generalPreferences[i][2] = loadValueString;
			}

		}
		else if (generalPreferences[i][1] == 'filename'){
			if (document.getElementById(generalPreferences[i][3]).files.length == 0) {
				// No file
			}
			else {
				generalPreferences[i][2] = load(generalPreferences[i][3]).name;
			}
		}
		else if (generalPreferences[i][1] == 'imageURL'){
			var userImageURL = document.getElementById(generalPreferences[i][3]).value;
			if (/^data:image/g.test(userImageURL) == true) { // this is not valid, likely a base 64 image.
				generalPreferences[i][2] = 'Invalid image';
				alert('The image URL you added is not valid.');
				return false;
			}
			else {
				generalPreferences[i][2] = document.getElementById(generalPreferences[i][3]).value; // Raw URL
			}

		}
		else {
			console.log(generalPreferences[i][1] + ' for ' + generalPreferences[i][0] + ' does not match any expected file type: text, boolean, file, filename, or imageURL.');
		}
		i += 1;
	}
	// Now need to assign values for hidden
	// Convert multi-dimensional to strings with care
	var configurableNamesString = '';
	var generalPreferencesString = '';
	var i = 0;
	var j = 0;
	var k = 0;
	while (i < configurableNames.length){
		j = 0;
		while (j < configurableNames[i].length) {
			if (j < configurableNames[i].length - 1){ // Include split
				configurableNamesString += configurableNames[i][j].toString() + "~split "; // Use ~split to ensure there is a unique combination.
			}
			else { // do not include split
				configurableNamesString += configurableNames[i][j].toString();
			}

			j += 1;
		}
		if (i < configurableNames.length -1){
			configurableNamesString += "~newline ";
		}

		i += 1;
	}
	i = 0;
	while (i < generalPreferences.length){
		if (i < generalPreferences.length - 1) {
			// generalPreferencesString += generalPreferences[i].toString() + "~newline ";
			for (let j = 0; j < generalPreferences[j].length; j++) {
				if (j < generalPreferences[j].length - 1) {
					generalPreferencesString += '"' + generalPreferences[i][j] + '",';
				}
				else {
					generalPreferencesString += '"' + generalPreferences[i][j] + '"~newline ';
				}

			}
		}
		else {
			for (let j = 0; j < generalPreferences[j].length; j++) {
				if (j < generalPreferences[j].length - 1) {
					generalPreferencesString += '"' + generalPreferences[i][j] + '",';
				}
				else {
					generalPreferencesString += '"' + generalPreferences[i][j] + '"';
				}

			}
			//generalPreferencesString += generalPreferences[i].toString()
		}
		i += 1;
	}

	// save using cookies
	//console.log(configurableNamesString);
	console.log(generalPreferencesString);
	// Dealing with multi-dimensional arrays!!!!
	if (document.cookie.length > 0 && document.cookie.includes('useCookies') == true) {
		document.cookie = "configurableNames:=:"+ configurableNamesString+";Max-Age=220924800;path=/;SameSite=strict;"; // write cookies with :=: for accurate reading
		document.cookie = "generalPreferences:=:"+ generalPreferencesString+";Max-Age=220924800;path=/;SameSite=strict;";
	}
	else {
		console.log("Cookies are not enabled.");
	}
	return true;
}

var preferencesLoaded = false;

function getObjects(target) { // Get objects and send them to the target
	if (preferencesLoaded == false) { // prevents the object from reloading on every click
		var innerHTMLString = "";
		var i=0;
		var j=1;
		while (i < configurableNames.length) {
			j = 1;
			innerHTMLString += "<optgroup label='"+configurableNames[i][0][0]+"'>"
			while (j < configurableNames[i].length) {
				innerHTMLString += "<option value='"+configurableNames[i][j][0]+"'>"+configurableNames[i][j][0]+"</option>"
				j += 1;
			}
			innerHTMLString += "</optgroup>"
			i += 1;
		}
		document.getElementById(target).innerHTML = innerHTMLString;
		preferencesLoaded = true;
	}
	else {
		return console.log("Preferences have already been loaded");
	}

}

function checkDisplay(source, target) { // Checks to see whether the object selected is hidden then updates the value of the checkbox. 'source' is the value containing object. 'target' is the checkbox to update.
	var i = 0;
	var j = 1;
	var listValue = document.getElementById(source).value;
	while (i < unsavedConfigs.length) {
		j = 1;
		while (j<unsavedConfigs[i].length) {
			if (unsavedConfigs[i][j][0] == listValue) {
				document.getElementById(target).checked = JSON.parse(unsavedConfigs[i][j][1]); // cookies converts a boolean to string, so must be parsed.
				return console.log(listValue+ " is currently set to "+ unsavedConfigs[i][j][1]);
			}
			else {
				j += 1;
			}
		}
		i += 1;
	}

}

function hideObject(source, checkboxObj) { // update preference for hidden objects.
	var i = 0;
	var j = 1;
	var listValue = document.getElementById(source).value;
	while (i < unsavedConfigs.length) {
		j = 1;
		while (j<unsavedConfigs[i].length) {
			if (unsavedConfigs[i][j][0] == listValue) {
				if (document.cookie.length > 0) {
					JSON.parse(unsavedConfigs[i][j][1]) = document.getElementById(checkboxObj).checked;
				}
				else {
					unsavedConfigs[i][j][1] = document.getElementById(checkboxObj).checked;
				}
				return console.log(listValue+ " is currently set to "+ unsavedConfigs[i][j][1]);
			}
			else {
				j += 1;
			}
		}
		i += 1;
	}
}

function cookies(enabled) {
	if (enabled == true) {
		console.log('wrote cookie');
		document.cookie = "useCookies:=:"+enabled+";Max-Age=220924800;path=/;SameSite=strict;";
	}
	document.getElementById('cookieBox').style.display = 'none';
}