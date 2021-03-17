import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import Router from 'express-promise-router';
import { registerRoutes } from './routes';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();
const defaultEnv = 'local';
const envPath = path.resolve(process.cwd(), `.env.${defaultEnv}`);
dotenv.config({ path: envPath });

const swaggerDocument = YAML.load('./openapi.yaml');

const app: express.Express = express();

app.set('port', process.env.PORT || 3300);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use('/avatars', express.static(path.resolve('/avatars')));

const router = Router();
app.use(router);
registerRoutes(router);

export default app;
