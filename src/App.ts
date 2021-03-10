import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as session from "express-session";
import { Connection, ConnectionNotFoundError, createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { registerRoutes } from './routes';

/**
 * Main application class
 */
export class App {
    public express: express.Express;
    public httpServer: http.Server;

    public async init(environment?: string): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.express.use(this.setupCors);
        this.setupMiddleware();
        this.dbConnection();
        registerRoutes(this.express);
    }

    private async dbConnection() {
        let connection: Connection;

        try {
            connection = getConnection();

            if (!connection.isConnected) {
                await connection.connect();
            }
        } catch (e) {
            if (e instanceof ConnectionNotFoundError) {
                let connectionOptions: any = await getConnectionOptions();
                connection = await createConnection(connectionOptions);
            }
            return connection;
        }
    }

    private setupMiddleware(): void {
        const memoryStore = new session.MemoryStore();
        const sessionObj = {
            secret: "mySecret",
            resave: false,
            saveUninitialized: true,
            store: memoryStore,
        };
        this.express.use(session(sessionObj));
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(express.static("public"));
        this.express.use(express.static(path.join(__dirname, 'public')))
    }

    private setupCors(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let origin: string = req.header('Origin');
        if (!origin) {
            origin = '*';
        }
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }

    }
}
