import Keycloak from 'keycloak-js';

const url = import.meta.env.VITE_KEYCLOAK_URL;
const realm = import.meta.env.VITE_KEYCLOAK_REALM;
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

const keycloak = new Keycloak({
  url: url,
  realm: realm,
  clientId: clientId,
  
});

export default keycloak