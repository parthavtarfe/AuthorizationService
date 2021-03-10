import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import { FactoryController } from './FactoryController';
import * as ResponseHandler from "../../helpers/response.handler";

export function factoryRoutes(app: express.Express, router: any) : any {



    const getFactory = async (request: express.Request, response: express.Response, next: any) => {
        try {
            const controller: FactoryController = new FactoryController();
            const result: any = await controller.getFactory(request.params);
            response.locals.data = result.data;
            ResponseHandler.JSONSUCCESS(request, response);

        } catch (err) {
            response.locals.errorCode = StatusCodes.UNAUTHORIZED;
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }

    const saveFactory = async (request: express.Request, response: express.Response, next: any) => {
        try {
            const controller: FactoryController = new FactoryController();
            const result: any = await controller.saveFactory(request.body);
            response.locals.data = result.data;
            ResponseHandler.JSONSUCCESS(request, response);

        } catch (err) {
            response.locals.errorCode = StatusCodes.UNAUTHORIZED;
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }


    router.get('/factory/:id', getFactory);
    router.post('/factory', saveFactory);
}
