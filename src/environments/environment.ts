// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  KEYCLOAK_URL: 'http://localhost:8080/auth',
  KEYCLOAK_REALM: 'Aplos',
  KEYCLOAK_CLIENTID: 'aplos-frontend',
  BACKEND_URL: 'http://localhost:8888/maxzie-services'
};
