import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';
import * as buildRoute from './routes/builds';
import * as commitsRoute from './routes/commits';
import * as reposRoute from './routes/repos';

// create and configure the express app
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
}

let router = express.Router();

// add router middleware and supported routes
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/ping', function (req, res) {
    res.send({ status: 'alive' });
});

router.get('/builds', function (req, res) {
    try {
        buildRoute.getBuilds(req.query.project, req.query.defs, req.query.top).then((results) => {
            res.send(results);
        });
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/repos', function (req, res) {
    try {
        reposRoute.getRepos(req.query.project).then((results) => {
            res.send(results);
        });
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/commits', function (req, res) {
    try {
        commitsRoute.getCommits(req.query.project, req.query.repo).then((results) => {
            res.send(results);
        });
    }
    catch (err) {
        console.log(err);
    }
});

// apply under /api/v1
app.use('/api/v1', router);

export default app