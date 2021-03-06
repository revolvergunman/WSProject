'use strict';

/** 
 * @module RenderLogin
 */

/**
 * Render login page
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        response.render("login", {loggedin: request.user ? true : false, tab: request.params.tab, token: request.params.token});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}