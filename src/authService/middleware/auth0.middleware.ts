import { auth } from 'express-oauth2-jwt-bearer';
import config from 'config';

const validateJwt = auth({
  issuerBaseURL: config.get('auth0.domain'),
  audience: config.get('auth0.audience'),
  jwksUri: 'https://liucuxiu.auth0.com/.well-known/jwks.json'
});



export { validateJwt };
