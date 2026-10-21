/**
 * Legacy EJS Controller (Superseded by backend/controllers/apiController.js)
 * 
 * The project has been refactored into a decoupled Next.js + Express architecture.
 * All REST API controllers are now located in: backend/controllers/apiController.js
 */

const apiController = require('../controllers/apiController');

module.exports = {
    ...apiController
};
