"use strict";

/*const logger = require('./utils/logger.js');*/

const Components = require('./components.js');

// Create a server instance
// var config = config || {};
const config = {};
config.logger = logger;

// Create a server instance
const server = Components('/components', config);

// Start the server listening..
server.listen(process.env.SERVICE_PORT || 8888);

logger.info('App starting...');
