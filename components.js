'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const auth = require('http-auth');*/
const Shell = require('./mcebots/shell');*/

//authentication
const samplesAdminUser = process.env.BOTS_SAMPLES_USER || 'MyTestUser';
const samplesAdminPwd = process.env.BOTS_SAMPLES_PASSWORD || 'MyTestPassword';
const basic = auth.basic({
    realm: "Bots Default Custom Component Service"
}, (username, password, callback) => {
    callback(username === samplesAdminUser && password === samplesAdminPwd);
});

const createComponentsServer = function (urlPath, config) {
	const shell = Shell(config);
    const logger = config.logger;

	const app = express();
	app.use(bodyParser.json());

	/*server.use(bodyParser.urlencoded({
	    extended: true
	}));*/

    const router = express.Router();
    router.use(auth.connect(basic));   
    const shellInstance = shell(config);

    //Return component metadata
    router.route('/').get(function (req, res) {
        res.set('Content-Type', 'application/json')
            .status(200)
            .json(shell.getAllComponentMetadata());
    });

    // Invoke component by name
    router.route('/:componentName').post(function (req, res) {
        const componentName = req.params.componentName;
        shell.invokeComponentByName(componentName, req.body, {}, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            } else {
                switch (err.name) {
                    case 'unknownComponent':
                        res.status(404).send(err.message);
                        break;
                    case 'badRequest':
                        res.status(400).json(err.message);
                        break;
                    default:
                        res.status(500).json(err.message);
                        break;
                }
            }
        });
    });

	app.post('/get-respuesta', (req, res) => {

	    const elementToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.Entradas ? req.body.result.parameters.Entradas : 'zonulina';
	    
	    let msg = 'Me has preguntado sobre: ' + elementToSearch;
	    return res.json({
	            speech: msg,
	            displayText: msg,
	            source: 'get-respuesta'
	    });
	});

	app.use(urlPath, router);

    logger.info('Express server: component server created at context path=' + urlPath);

    app.locals.endpoints = [];

    app.locals.endpoints.push({
        name: 'metadata',
        method: 'GET',
        endpoint: urlPath
    });

    app.locals.endpoints.push({
        name: 'invocation',
        method: 'POST',
        endpoint: urlPath + '/:componentName'
    });

    app.locals.ui = {
        name: 'Metadata',
        endpoint: urlPath
    };

    return app;

};

/*server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});*/

module.exports = createComponentsServer;