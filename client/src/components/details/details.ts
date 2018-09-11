import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import { Roles } from "../../Interface/clientenums";
import { IUser, User } from "../../Interface/User";
import { KeycloakService } from "../../keycloakservice";
@Component({
  template: require("./details.html"),
  components: {
    Datepicker,
  },
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

export class DetailsComponent extends Vue {

  user: IUser = new User();
  keycloakObj: Keycloak.KeycloakInstance = KeycloakService.keycloak;
  protected axios;
  constructor() {
    super();
    this.axios = axios;
  }

  mounted() {
    this.$nextTick(() => {
      console.log("chinna mane");
      console.log(this.keycloakObj);
      this.loadItems();
    });
  }

  isEditable() {
    const isRolePresent = this.keycloakObj.realmAccess.roles.find((x) => x.toLocaleLowerCase() === Roles.Emp);
    return isRolePresent === undefined ? true : false;
  }

  private loadItems() {
    this.axios.get("http://localhost:3000/careuser/" + this.$route.params.id,
      { headers: { Authorization: `Bearer ${this.keycloakObj.token.toString()}` } }).then((response: AxiosResponse) => {
        this.user = response.data.careusers[0];
        // console.log(this.user);
        // this.items = response.data.careusers
        //   console.log(response.data.careusers)
      }, (error) => {
        console.error(error);
      });
  }

}
