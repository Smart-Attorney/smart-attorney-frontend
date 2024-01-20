### core funtionalities
- [x] make the above look decent (adhere to hi-fidelity wireframe)
- [x] create new folders (tiles)
- [x] create new documents
- [x] assign deadlines for folders
- [x] create labels for folders
- [x] click on folder to view all case files inside
- [x] login / signup page
- [ ] sort feature
- [ ] preview of most recently opened document on folder
- [ ] user can create sub-folders within case folders


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
- [x] allow user to update cases by uploading more files
- [x] allow user to delete cases
- [x] figure out sidebar layout then inform C
- [x] modal for case folder to add additional files
- [x] match buttons
- [ ] add dynamic deadline status color
- [ ] add on hover effect (x) to labels to remove
- [ ] add upload confirmation under each uploaded file
- [ ] big fill upload for create new case file upload
- [ ] sort feature for case folder; none for create new


### bugs to fix
- [x] either label-assigner or date-picker can be open at a time, not both
- [x] labels array should have an id for each label
- [x] on loading of dashboard, retrieve case array or initialize empty array
- [x] fix modal style and behavior
- [ ] fix uploading new files feature by updating the database before updating the client state


### nitpicks
- [x] add delete confirmation box
- [x] modals
- [x] group related functions into a class
- [x] designate code that should be ran on the server
- [x] find system to organize types/interfaces
- [x] remove unnecessary explicit return statements
- [x] specify return type for all functions
- [x] rename terse functions for descriptive verbosity (verb/adjective/noun)
- [x] separate files into features and layouts
- [x] add adapter layer between client and file storage/database code
- [x] save uploaded files under folder id not file extension
- [x] save url of uploaded files so u dont have to make a call for each every time
- [x] replace ref property from uploaded files object with url
- [x] clean up rogue interface declarations
- [x] remove null/undefined on props interface declarations by type narrowing
- [x] fix UX of upload component
- [x] extract folder/file card component to be reusable
- [ ] ensure updated state flows in direction of: updates -> storage -> database -> client
- [ ] refactor database methods to single responsibility (CaseFile.delete() should not be updating the array as well)
- [ ] refactor database methods as a mock backend api
- [ ] when user deletes folder, remove all files associated with folder from cloud
- [ ] refactor: parent holds state, while business logic of child stays in child (ex: dashboard & cardfoldercards)
- [ ] when user leaves create page without creating, delete all uploaded files
- [ ] when user deletes folder, delete all files within
- [ ] include folder name when saving case folders
- [ ] re-organize assets and components by exporting via index file; named exports


### temporary workarounds
- using nanoID to create unique IDs for new case folders
- using local storage as makeshift database
- sorting is done faux-server-side (may change to client-side in the future once true backend is implemented)


### inquiries
 - [x] should documents be uploaded on drop or when user clicks upload?
 - [x] should the Create New Case page have a search bar and sort options?
 - [x] if yes to the above ^, what are the sort options for Create New Case page?
 - [x] favicon?
 - [ ] how to denote a open or closed case?


### figma wireframe notes
 - linear gradient color background/modal
   - [#2A2B81 100%]  &  [#080614 100%]



### references
React Project Structure
 - https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md

File Type Icons
 - https://www.flaticon.com/packs/file-formats-text