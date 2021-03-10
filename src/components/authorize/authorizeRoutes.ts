import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { AuthorizeController } from './authorizeController';
import * as ResponseHandler from "../../helpers/response.handler";

export function AuthorizeRoutes(app: express.Express, router: any) : any {


    const login = async (request: any, response: express.Response, next: any) => {
        try {
            const controller: AuthorizeController = new AuthorizeController();
            const result: any = await controller.login(request.body);
            console.log(result);
            response.locals.data = result;
            ResponseHandler.JSONSUCCESS(request, response);

        } catch (err) {
            response.locals.errorCode = StatusCodes.UNAUTHORIZED;
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }

    const logout = async (request: any, response: express.Response, next: any) => {
        try {
            const controller: AuthorizeController = new AuthorizeController();
            const result: any = await controller.logout(request.body);
            response.locals.data = result.data;
            ResponseHandler.JSONSUCCESS(request, response);

        } catch (err) {
            response.locals.errorCode = StatusCodes.UNAUTHORIZED;
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }



    router.post('/login', login);
    router.post('/logout', logout);
}
