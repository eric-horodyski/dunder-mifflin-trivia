import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiBaseUrl: 'https://5iix6efc3a.execute-api.us-east-1.amazonaws.com/',
  hosts: {
    web: 'http://localhost:8100/',
    app: 'me.horodyski.dmt://',
  },
  auth: {
    clientID: 'KhjZ5wKIcjhykuaya0W7BcZHXZtTbXzG',
    discoveryUrl:
      'https://dev-kym0pd30.us.auth0.com/.well-known/openid-configuration',
    redirectUri: '',
    scope: 'openid offline_access email picture profile',
    audience: '',
    logoutUrl: '',
    iosWebView: 'private',
    logLevel: 'DEBUG',
    authConfig: 'auth0',
  },
};
