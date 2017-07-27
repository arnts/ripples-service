# A simple service for build and code statistics from VSTS

Provides a super simple REST API for build and code stats by integrating with Visual Studio Team Services (VSTS) using vsts-node-api. Written in TypeScript for Node.js.

## Want to run this service?

Run `npm install` first

Set environment variables using set or export:

```bash
API_URL=https://fabrikam.visualstudio.com/defaultcollection  

// use your token
API_TOKEN=cbdeb34vzyuk5l4gxc4qfczn3lko3avfkfqyb47etahq6axpcqha  

API_PROJECT=myProject  
```

Build:

```bash
$ npm run build
``` 

Test:

```bash
$ npm run test
``` 

Start server in dev mode:

```bash
$ npm run dev
``` 

Verify the service, for example using [httpie](https://httpie.org/):

```bash
$ http localhost:3000/api/v1/ping
``` 

Get all git repositories with id, name and description:

```bash
$ http localhost:3000/api/v1/repos
``` 

Get all git commits for a give repo:

```bash
$ http localhost:3000/api/v1/commits repo=="MY_REPO_ID"
``` 

Get top N latest builds:

```bash
$ http localhost:3000/api/v1/builds top==50
``` 

Or use the browser to test:

```bash
http://localhost:3000/api/v1/builds?top=50
``` 
