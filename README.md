# A simple service for build and code statistics from VSTS

Integrates with Visual Studio Team Services (VSTS) using vsts-node-api, and returns a flat JSON structure. Written in TypeScript for Node.js.

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

Verify the service, for example using [httpie](https://httpie.org/)

```bash
$ http localhost:3000/api/v1/ping
``` 

Get 100 latest builds

```bash
$ http localhost:3000/api/v1/builds top==50
``` 
