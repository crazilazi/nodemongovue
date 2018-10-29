import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Roles } from "../../Interface/clientenums";
import { IUser, User } from "../../Interface/User";
import { KeycloakService } from "../../keycloakservice";
@Component({
    template: require("./login.html"),
    methods: {
        gotoEdit(userId: string) {
            return this.$router.push({ name: "careuseredit", params: { id: userId } });
        },
        gotoHome(userId: string) {
            return this.$router.push({ name: "careuserList" });
        },
    },
    beforeCreate: () => {
        // `this` points to the view model instance
        // const keycloak = Keycloak({
        //   realm: "CareplanningDev",
        //   url: "https://identity.ahc.oneadvanced.io/auth",
        //   clientId: "training-console",
        // });
        // keycloak.init({ onLoad: "login-required" }).success((authenticated) => {
        //   console.log(keycloak);
        // });
    },
})

export class LoginComponent extends Vue {

    keycloakObj: Keycloak.KeycloakInstance = KeycloakService.keycloak;
    constructor() {
        super();
    }

    mounted() {
        this.$nextTick(() => {
            console.log("chinna mane");
            // console.log(this.keycloakObj);
            // this.loadItems();
        });
    }
}
