// This script runs the logic.

doc = "index.html"

var scaleFillRuns = 0;
var errorFlag = false;
function scaleFill () {
	// Read the inputs
	var LFWeight = document.getElementById("LFWeight").value;
	var RFWeight = document.getElementById("RFWeight").value;
	var LRWeight = document.getElementById("LRWeight").value;
	var RRWeight = document.getElementById("RRWeight").value;
	// Check for all inputs to be non-zero, non-blank.
	if (LFWeight.length > 0 && RFWeight.length > 0 && LRWeight.length > 0 && RRWeight.length > 0){
		// Ensure the background colors are back to normal if necessary.
		if (errorFlag == true) {
			document.getElementById("LFParent").style.backgroundColor = "#ffffff";
			document.getElementById("LRParent").style.backgroundColor = "#ffffff";
			document.getElementById("RFParent").style.backgroundColor = "#ffffff";
			document.getElementById("RRParent").style.backgroundColor = "#ffffff";
			errorFlag = false;
		}
		
		// Write the outputs
		// Redefine as float values.
		LFWeight = parseFloat(LFWeight);
		RFWeight = parseFloat(RFWeight);
		LRWeight = parseFloat(LRWeight);
		RRWeight = parseFloat(RRWeight);
		
		var TotalWeight = LFWeight + RFWeight + LRWeight + RRWeight;
		document.getElementById("TotalWeight").innerHTML = TotalWeight.toFixed(0) + " lbs";
		document.getElementById("CrossWeight").innerHTML = (LRWeight+RFWeight).toFixed(0) + " lbs";
		document.getElementById("CrossPct").innerHTML = (((LRWeight+RFWeight)/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("RearWeight").innerHTML = (LRWeight+RRWeight).toFixed(0) + " lbs";
		document.getElementById("RearPct").innerHTML = (((LRWeight+RRWeight)/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("LeftWeight").innerHTML = (LFWeight+LRWeight).toFixed(0) + " lbs";
		document.getElementById("LeftPct").innerHTML = (((LFWeight+LRWeight)/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("RightWeight").innerHTML = (RFWeight+RRWeight).toFixed(0) + " lbs";
		document.getElementById("RightPct").innerHTML = (((RFWeight+RRWeight)/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("LFPct").innerHTML = ((LFWeight/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("RFPct").innerHTML = ((RFWeight/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("LRPct").innerHTML = ((LRWeight/TotalWeight)*100).toFixed(2) + "%";
		document.getElementById("RRPct").innerHTML = ((RRWeight/TotalWeight)*100).toFixed(2) + "%";
		scaleFillRuns += 1;
		console.log(scaleFillRuns);
	}
	else {
		// Identify the corner (if scale fill has already ran that is)!
		if (scaleFillRuns > 0){
			if (LFWeight.length == 0) {
				document.getElementById("LFParent").style.backgroundColor = "#ff9292";
				errorFlag = true;
			}
			else if (RFWeight.length == 0) {
				document.getElementById("RFParent").style.backgroundColor = "#ff9292";
				errorFlag = true;
			}
			else if (LRWeight.length == 0) {
				document.getElementById("LRParent").style.backgroundColor = "#ff9292";
				errorFlag = true;
			}
			else if (RRWeight.length == 0) {
				document.getElementById("RRParent").style.backgroundColor = "#ff9292";
				errorFlag = true;
			}
		}
		
		// Empty the values to prevent nonsense measurements
		document.getElementById("TotalWeight").innerHTML = "lbs";
		document.getElementById("CrossWeight").innerHTML = "lbs";
		document.getElementById("CrossPct").innerHTML = "%";
		document.getElementById("RearWeight").innerHTML = "lbs";
		document.getElementById("RearPct").innerHTML = "%";
		document.getElementById("LeftWeight").innerHTML = "lbs";
		document.getElementById("LeftPct").innerHTML = "%";
		document.getElementById("RightWeight").innerHTML = "lbs";
		document.getElementById("RightPct").innerHTML = "%";
		document.getElementById("LFPct").innerHTML = "%";
		document.getElementById("RFPct").innerHTML = "%";
		document.getElementById("LRPct").innerHTML = "%";
		document.getElementById("RRPct").innerHTML = "%";
		
		return console.log("Missing a corner weight!");
	}
}
