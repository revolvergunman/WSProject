'use strict';
import User from '../../models/user'

/** 
 * @module RenderUser
 */

/**
 * Render user page
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {

        let username = null;

        if( request.params.username ){
            let user = await User.findOne({name: request.params.username});

            if( user ){
                username = user.name
            }
            else{//No user with that name was found
                response.redirect('/UserNotFound');
                return false;
            }
            
        }
        else if(  request.user ){
            username = request.user.name
        }
    	else{
    		response.redirect('/login');
            return false;
    	}

        response.render("user", {loggedin: request.user ? true : false, username: username});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}