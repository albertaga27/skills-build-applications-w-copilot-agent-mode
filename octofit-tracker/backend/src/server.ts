import express from 'express';
import { serverConfig } from './config';
import { connectDatabase } from './config/database';
import { createApiRouter } from './routes';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', createApiRouter(apiBaseUrl));

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API request failed', error);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(serverConfig.port, () => {
    console.log(`OctoFit backend listening on port ${serverConfig.port}`);
    console.log(`OctoFit API available at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start backend service', error);
  process.exit(1);
});