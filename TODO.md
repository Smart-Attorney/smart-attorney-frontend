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

<hr />

### nitpicks
- [ ] re-organize functions for dependency injection pattern for reusability
- [ ] add dynamic deadline status color
- [ ] add upload confirmation under each uploaded file
- [ ] create edit modal so user can change name of case and files
- [ ] use svgs instead of png/jpg

<hr />

### temporary workarounds
- using nanoID to create unique IDs for new case folders
- using local storage as makeshift database
- sorting is done faux-server-side (may change to client-side in the future once true backend is implemented)

<hr />

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

<hr />

### notes
```
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
```
