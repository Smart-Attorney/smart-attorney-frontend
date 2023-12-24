### core funtionalities
- [x] create new folders (tiles)
- [x] create new documents
- [x] assign deadlines for folders
- [x] create labels for folders
- [ ] make the above look decent (adhere to hi-fidelity wireframe)
- [ ] preview of most recently opened document on folder
- [ ] click on folder to view all case files inside
- [ ] sort feature


### tasks
- [x] project gh repo
- [x] project template
- [x] dashboard header
- [x] search bar + button
- [x] search filters
- [x] new case button
- [x] folders displayed as tiles
- [x] new case page
- [x] add routing
- [x] add error page to catch bad urls
- [x] allow user to create new cases
- [x] allow user to delete cases
- [x] allow user to assign deadlines to folders
- [x] allow user to assign labels to folders
- [x] allow user to delete labels on folders
- [x] allow user to upload files to cases
- [x] upload files to cloud hosting service
- [x] user can view uploaded files retrieved from hosting service
- [x] allow user to view their cases in a new page
- [ ] allow user to update cases
- [ ] add dynamic deadline status color
- [ ] add on hover effect (x) to labels to remove
- [ ] add upload confirmation under each uploaded file


### bugs to fix
- [x] either label-assigner or date-picker can be open at a time, not both
- [ ] labels array should have an id for each label


### nitpicks
- [x] add delete confirmation box
- [x] modals
- [x] group related functions into a class
- [ ] fix UX of upload component
- [x] designate code that should be ran on the server
- [x] find system to organize types/interfaces
- [ ] save uploaded files under folder id not file extension
- [ ] save url of uploaded files so u dont have to make a call for each every time
- [ ] replace ref property from uploaded files object with url
- [ ] clean up rogue interface declarations
- [x] remove unnecessary explicit return statements
- [x] specify return type for all functions
- [x] rename terse functions for descriptive verbosity (verb/adjective/noun)


### temporary workarounds
- using nanoID to create unique IDs for new case folders
- using local storage as makeshift database


### inquiries
 - [ ] should documents be uploaded on drop or when user clicks upload?
 - [ ] should the Create New Case page have a search bar and sort options?
 - [ ] if yes to the above ^, what are the sort options for Create New Case page?
 - [ ] 