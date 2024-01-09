# SetupManager

This is a web-based tool to create, edit, and manage racing setups. 
This tool is currently designed for oval racing cars with a focus on common measurements taken for INEX Legends for the time being.

## Roadmap
List of planned changes and version targets.
### Version 1.0.2
- Squash bugs
	- Add a bug report/suggestion feature.
	- Expand audience to other Legend Car racers to increase user base -> more bug reports.
- Add a landing page to streamline user choice of loading a file or creating a new file.
- Finalize table formatting to maximize legibility.

### Version 1.1.0
- Prettier printing and display
	- Browser print output cleanup
  	- Dedicated "Print" button that produces a desired output.
	- Add custom logos (see preferences)
- Add preferences that allow the user to configure:
	- Custom logos
	- Custom team name
	- Launch file to load
- Add cookie functionality to save user preferences.
- Add site navigation
  	- Add a "How To" page

### Version 1.2.0
- Add cars in preferences
	- Use for more than just an INEX Legend
	- Late Model, Street Stock, Modified...
	- Custom: user selects measurements to include in preferences

### Version 1.3.0
- Add user login system
- Transition to closed-source and host site

## Versions

### Version 1.0.1
- Added Rear Axle Offset measurement
- Modified file saving process
	- Optional alternate name field that will overwrite track_date.stp naming when modified.
	- Cleaned up the way file names are written in handler.js to remove extra spaces.
- Files are now loaded on modification of the load file input box.
- Added "New" button which clears existing data.

### Version 1.0.0
First publication. 
