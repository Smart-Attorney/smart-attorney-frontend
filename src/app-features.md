## App Features

#### User
 - create user
 - verify user
 - get user info

#### Case
 - create a case
 - get all user cases
 - get case
 - change case name
 - change case status
 - update last opened case
 - delete case

#### Case Label
 - create labels
 - get all labels
 - delete labels

#### Client
 - create client
 - get client

#### Document
 - create document
 - get all case documents
 - get document
 - get document deadlines
 - change document deadline
 - change document name
 - change document status
 - update last opened document
 - delete document


<hr />


#### notes

###### references
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