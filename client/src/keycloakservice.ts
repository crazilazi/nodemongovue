import * as Keycloak from "keycloak-js";
export class KeycloakService {
    static keycloak = Keycloak({
        realm: "CareplanningDev",
        url: "https://identity.ahc.oneadvanced.io/auth",
        clientId: "training-console",
    });
    static init() {
        return KeycloakService.keycloak.init({ onLoad: "login-required" });
    }
    static login() {
        KeycloakService.keycloak.login();
    }

    static logout() {
        KeycloakService.keycloak.logout();
    }

    static isAuthenticated() {
        return KeycloakService.keycloak.authenticated;
    }
}
