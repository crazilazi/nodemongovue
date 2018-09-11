
import bCollapse from "bootstrap-vue/es/components/collapse/collapse";
import bNavItem from "bootstrap-vue/es/components/nav/nav-item";
import bNavbar from "bootstrap-vue/es/components/navbar/navbar";
import bNavbarBrand from "bootstrap-vue/es/components/navbar/navbar-brand";
import bNavbarNav from "bootstrap-vue/es/components/navbar/navbar-nav";
import bNavbarToggle from "bootstrap-vue/es/components/navbar/navbar-toggle";
import { Component, Vue } from "vue-property-decorator";
import { KeycloakService } from "../../keycloakservice";

@Component({
    template: require("./navbar.html"),
    components: {
        "b-collapse": bCollapse,
        "b-nav-item": bNavItem,
        "b-navbar": bNavbar,
        "b-navbar-toggle": bNavbarToggle,
        "b-navbar-brand": bNavbarBrand,
        "b-navbar-nav": bNavbarNav,
    },
})
export class NavbarComponent extends Vue {
    keycloakObj: Keycloak.KeycloakInstance = KeycloakService.keycloak;
    constructor() {
        super();
    }

    mounted() {
        this.$nextTick(() => {
            // your code
        });
    }

    logOut() {
        this.keycloakObj.logout();
    }
}
