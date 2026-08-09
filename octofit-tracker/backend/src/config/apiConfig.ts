const codespaceName = process.env.CODESPACE_NAME;
const port = Number(process.env.PORT) || 8000;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

export default {
  apiBaseUrl,
  port
};
