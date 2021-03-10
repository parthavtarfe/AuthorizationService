import { tokenToString } from "typescript";

var JWT = require('jsonwebtoken');

export class JsonWebToken{

    private secretkey;
    private message;
    public errormessage;
    constructor(key) {
        this.secretkey = key;
    }
    public getToken = async(data) => {
        return new Promise(async(resolve, reject) => {
            let token = JWT.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // expiration in one hour
                    data: data
                }, 
                this.secretkey);
            return resolve(token);
        })
    }

    public verifyToken = async(token) => {
        return new Promise(async(resolve, reject) => {
            try {
                let verifyResponse =  JWT.verify(token, this.secretkey);
                // console.log("This is the verify response in jwt")
                // console.log(verifyResponse)
                return resolve(verifyResponse);
            } catch(err) {
                // console.log("in error");
                this.errormessage = err.message
                return resolve(false);
            }
            
        })
        
    }
}