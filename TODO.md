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


### bugs to fix
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
- [x] re-organize assets and components by exporting via index file; named exports
- [x] separate routes into its own file
- [x] add reusable grid layout for cards (tailwind custom class)
- [x] add reusable modal layout
- [x] add reusuable page header layout
- [ ] ensure updated state flows in direction of: updates -> storage -> database -> client
- [ ] refactor database methods to single responsibility (CaseFile.delete() should not be updating the array as well)
- [ ] refactor database methods as a mock backend api
- [ ] when user deletes folder, remove all files associated with folder from cloud
- [ ] refactor: parent holds state, while business logic of child stays in child (ex: dashboard & cardfoldercards)
- [ ] when user leaves create page without creating, delete all uploaded files
- [ ] when user deletes folder, delete all files within
- [ ] include folder name when saving case folders
- [ ] re-organize functions for dependency injection pattern for reusability
- [ ] add dynamic deadline status color
- [ ] add upload confirmation under each uploaded file
- [ ] create edit modal so user can change name of case and files


### temporary workarounds
- using nanoID to create unique IDs for new case folders
- using local storage as makeshift database
- sorting is done faux-server-side (may change to client-side in the future once true backend is implemented)


### inquiries
 - [ ] how to denote a open or closed case?


### references
React Project Structure
 - https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md

File Type Icons
 - https://www.flaticon.com/packs/file-formats-text

Git Naming Conventions
 - https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4

Unicode Characters
 - https://stackoverflow.com/questions/5353461/unicode-character-for-x-cancel-close

Check Production or Development at Runtime
 - https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime



### notes
fetch('/user')
  .then(res => {
    if (!res.ok) {
      switch (res.status) {
        case 100: break;
        case 200: break;
        case 300: break;
        case 400: break;
        case 500: break;
      }
    }
    return res.json();
  })
  .catch(err => {
    // handle err
  })