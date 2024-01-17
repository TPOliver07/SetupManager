# SetupManager

This is a web-based tool to create, edit, and manage racing setups. 
This tool is currently designed for oval racing cars with a focus on common measurements taken for US Legends for the time being.

## Versions

### Version 1.1.1
- Added Setup, Tires, and Drive tabs.
	- Chassis tab changed to Setup tab, with most elements moving with it.
	- Tires tab borrowed elements from old chassis tab.
- Some style updates.
- Fixed issue with team info banner being too small.
- When cookies are not compatible, the user is now notified that preference data may be lost.
	- A better system is possible which extracts some preference data from the old cookies.
- When old save files are used, the user is notified of the likelihood of an error and then any errors that appear.
- Added cross weight demonstrator image back to the center of weights.
	- This image can be improved substantially, but it is necessary to make it clear to the user that cross is measured from LR to RF.

### Version 1.1.0
- Prepared to squash bugs
	- Added a bug report/suggestion feature.
	- Expand audience to other Legend Car racers to increase user base -> more bug reports.
- Add a landing page to streamline user choice of loading a file or creating a new file.
- Finalize table formatting to maximize legibility and design.
	- Design targets being tablet friendly.
- Add preferences that allow the user to configure:
	- Custom logos
	- Custom team name
	- Launch file to load
	- Car (will not be implementing others yet)
	- Hide objects
		- Object hiding system uses names to hide table cells. 
- Added cookie functionality to save user preferences.
	- This cookie functionality does not work on Google Chrome currently.
- Rewrote saving functionality to ensure consistency across save files and much better backwards compatibility.
- Created a more modular table design that makes changing or hiding cells easier.
	- This will allow for easier addition of future cars, or even custom user configuration files.

### Version 1.0.1
- Added Rear Axle Offset measurement
- Modified file saving process
	- Optional alternate name field that will overwrite track_date.stp naming when modified.
	- Cleaned up the way file names are written in handler.js to remove extra spaces.
- Files are now loaded on modification of the load file input box.
- Added "New" button which clears existing data.

### Version 1.0.0
First publication. 
