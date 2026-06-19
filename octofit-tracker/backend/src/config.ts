const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

export const serverConfig = {
  port,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db',
  apiBaseUrl,
};