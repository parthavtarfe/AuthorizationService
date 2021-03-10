import * as express from 'express';
import { AuthorizeRoutes } from './components/authorize/authorizeRoutes';

export function registerRoutes(app: express.Express): any {

    const router: any = express.Router();
    app.use('/', router);
    AuthorizeRoutes(app, router);
}
