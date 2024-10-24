
# Create a React component where users can add and remove text-based comments

### Here are the requirements for the React component:
- The component displays a list of comments
- The user can enter a text and click a button to add the comment to the list
- The user can delete a comment from the list
- Comments can be nested: The user can comment on another comment
- Comments are persisted: Restarting/ refreshing the app does not clear comments

![Getting Started](view.png)

------

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

---

### Nota bene:
Given the time constraints, I made some deliberate trade-offs and didn't handle every case, even though I recognize their importance. In a 'real' project, I would ensure to focus on those details.

#### Here is a list of those choices:
- The UI is not optimized for screens larger than mobile devices
- I deliberately used React, and not Typescript or Next.js, because by design it is a feature within an existing ecosystem. That might not be compatible with Typescript. Also the reusable components build here won’t be usable just anywhere
- Instead I went with including PropTypes, to still have type checking, and make a future transition to Typescript easier without any current TS limitations
- I did not to implement a log-in functionality for authorization. So two User objects are hardcoded from the seeding db and with the current user entering a name, the view assumes the current user is logged in and therefor authorized to create, updated and delete their respective comments
- No unlimeted nesting: The user is able to reply to comments, but can’t reply to replies of a comments
- When editing the "Save"-button serves as a save- and abort-button. I did not add an additional button
- I did not spend time on improving the user experience, by having smooth transitions, auto-scroll to the comment last added/edit etc.
- Only added 3 tests for the main functionality. Of course you can (and should) always test more granular, for the sake of time, three should be sufficient
- I ran into race condition issues when loading the user first from the localStorage. That is why the method to get it is so extensive, to ensure, the user is there from the start, while not delaying the app