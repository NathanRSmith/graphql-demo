# GraphQL Demo!!!

Demo for presentations about GraphQL. Implements a sample ERM involving users, groups, memberships and group roles. See `erd.pdf` for visual representation. Data is stored in JSON files in the `data/` directory. In real life the models would resolve via a call to a database or other service.

See slides from the talk that this demo was created for in `Local_Variables_Feb_16_2017.pdf`.

Components include:

* Simple express.js server with `POST /query` route that accepts `{"query": "<query>"}` body.
* Root query model `queryType`
* User model `userType`
* Group model `groupType`
* Group member model `groupMemberType`
* Group role model `groupRoleType`
* Sample queries in `queries/`


See tags for incremental implementations.

```
npm install
node index.js
open http://localhost:3000
```

Optional Stuff

```
npm install -g nodemon graphqlviz bunyan
brew install graphviz

nodemon index.js | bunyan -o short  # automatically restarts on change and prints nicer logging
graphqlviz http://localhost:3000/query | dot -Tpdf | open -fa Preview   # visualizes ERD
```

Tested with Node.js 6.
