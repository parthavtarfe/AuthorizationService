/**
 * Keyclock controller
 */
const axios = require('axios');
import { daprPort, stateStoreName, stateUrl } from '../../environments/dapr.environment';
import { JWTTOKENSECRETKEY } from './secretkey'
import { UserRepository } from '../../repository/user.repository';
import { JsonWebToken }  from './jsonwebtoken';
export class AuthorizeController {
    /**
     * 
     * @param code 
     */
   
    public async login(requestBody) {
        return new Promise(async(resolve, reject) => {
            try {
                let sendResponse;
                let username = requestBody.username;
                let passwordhash = requestBody.passwordhash;
                let filter = { $and: [ {"userInformations.userName" :username }, {"userInformations.passwordhash" :passwordhash} ] }
                // console.log(filter)
                // ( PENDING ) Make an interservice call by using dapr if there is any microservice whcih handles the users
                let userObject = new UserRepository();
                let promise:any = await userObject.findOne(filter);
                console.log(promise)
                if(promise) {
                    //Following data object is the payload required to generate a token
                    let data = {
                        username : username,
                        passwordhash : passwordhash
                    }
                    let jwt = new JsonWebToken(JWTTOKENSECRETKEY);
                    let token = await jwt.getToken(data);
                    console.log("this is the token");
                    console.log(token);
                    promise.token = token ?? "";
                    //( PENDING ) Make an interservice call by using dapr to session APP/microservice before sending the response  
    
                    sendResponse = { data : promise , message : "User data found"}
                    return resolve(sendResponse);
                } else {
                    sendResponse = { data : {}, message: "Authentication failed as user not found with provided credentials" };
                    return resolve(sendResponse);
                }
            } catch(err) {
                throw (err);
            }
        })
    }

   public logout(requestBody) {
        return new Promise(async(resolve, reject) => {
            try {

            } catch(err) {
                throw (err);
            }
        })
   }

}
