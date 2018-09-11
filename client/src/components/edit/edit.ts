import axios, { AxiosResponse } from "axios";
import bModal from "bootstrap-vue/es/components/modal";
import { Component, Vue, Watch } from "vue-property-decorator";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import { IError } from "../../Interface/Error";
import { IUser, User } from "../../Interface/User";
import { KeycloakService } from "../../keycloakservice";
@Component({
  template: require("./edit.html"),
  components: {
    Datepicker,
  },
  methods: {
    gotoHome() {
      return this.$router.push({ name: "careuserList" });
    },
  },
})

export class EditComponent extends Vue {

  user: IUser = new User();
  isDataSaved: boolean;
  isDataChanged: boolean;
  modalBodyText: string;
  modalHeaderTitle: string;
  originalUserData: IUser = new User();
  errorsReturnByServer: IError[] = [];
  keycloakObj: Keycloak.KeycloakInstance = KeycloakService.keycloak;
  success: boolean = false;
  protected axios;
  constructor() {
    super();
    this.axios = axios;
    this.isDataSaved = false;
    this.isDataChanged = false;
    this.modalBodyText = "Are you sure, you want to save?.";
    this.modalHeaderTitle = "Save";
    // this.errorsReturnByServer = [];
  }
  @Watch("user.firstName")
  onFirstNameChanged(val: any, oldVal: any) {
    this.isDataChanged = false;
    if (oldVal !== undefined && val !== oldVal) {
      this.isDataChanged = true;
    }
  }
  @Watch("user.lastName")
  onLastNameChanged(val: any, oldVal: any) {
    this.isDataChanged = false;
    if (oldVal !== undefined && val !== oldVal) {
      this.isDataChanged = true;
    }
  }
  @Watch("user.email")
  onEmailChanged(val: any, oldVal: any) {
    this.isDataChanged = false;
    if (oldVal !== undefined && val !== oldVal) {
      this.isDataChanged = true;
    }
  }
  @Watch("user.age")
  onAgeChanged(val: any, oldVal: any) {
    this.isDataChanged = false;
    if (oldVal !== undefined && val !== oldVal) {
      this.isDataChanged = true;
    }
  }
  @Watch("user.doj")
  onDOJChanged(val: any, oldVal: any) {
    this.isDataChanged = false;
    if (oldVal !== undefined && val !== oldVal) {
      this.isDataChanged = true;
    }
  }
  mounted() {
    this.$nextTick(() => {
      this.loadItems();
    });
  }

  showModal(type: string) {
    const bModalPopUp = this.$refs.saveModal as bModal;
    // bModalPopUp.dialogClasses.push("lightSpeedIn");
    // bModalPopUp.dialogClasses.push("animated");
    switch (type) {
      case "Save":
        this.modalHeaderTitle = "Save";
        this.modalBodyText = "Are you sure, you want to save?.";
        bModalPopUp.show();
        break;
      case "Cancel":
        if (!this.isDataChanged) {
          this.$router.push({ name: "careuserdetails", params: { id: this.user._id } });
          break;
        }
        this.modalHeaderTitle = "Cancel";
        this.modalBodyText = "Are you sure, you want to discard the changes?.";
        bModalPopUp.show();
        break;
    }
  }
  show = () => {
    const bModalPopUp = this.$refs.saveModal as bModal;
    const Index = bModalPopUp.dialogClasses.findIndex((item) => item === "flipOutX");
    if (Index !== -1) {
      bModalPopUp.dialogClasses.splice(Index, 1);
    }
    bModalPopUp.dialogClasses.push("flipInX");
    bModalPopUp.dialogClasses.push("animated");
  }

  hide = () => {
    const bModalPopUp = this.$refs.saveModal as bModal;
    const Index = bModalPopUp.dialogClasses.findIndex((item) => item === "flipInX");
    if (Index !== -1) {
      bModalPopUp.dialogClasses.splice(Index, 1);
    }
    bModalPopUp.dialogClasses.push("flipOutX");
  }

  handleOk() {
    const bModalPopUp = this.$refs.saveModal as bModal;
    const type = bModalPopUp.title;
    switch (type) {
      case "Save":
        this.save();
        break;
      case "Cancel":
        this.$router.push({ name: "careuserdetails", params: { id: this.user._id } });
        break;
    }
  }

  IsFieldContainError(fieldname: string) {
    const err = this.errorsReturnByServer.find((item) => item.field === fieldname);
    return err === undefined ? false : true;
  }

  save() {
    this.user.__v = this.user.__v + 1;
    this.axios.put("http://localhost:3000/careuser/" + this.$route.params.id, this.user,
      { headers: { Authorization: `Bearer ${this.keycloakObj.token.toString()}` } })
      .then((response: AxiosResponse) => {
        this.isDataSaved = true;
        this.isDataChanged = false;
        this.errorsReturnByServer = [];
        this.success = true;
        // console.log(response.data);
      }, (error) => {
        this.isDataSaved = false;
        this.errorsReturnByServer = [];
        this.success = false;
        if (error.response.status === 403) {
          const err = { field: "forbidden", message: error.response.data };
          this.errorsReturnByServer.push(err);
          return;
        }
        Object.keys(error.response.data.errors).forEach((key) => {
          const err = { field: key, message: error.response.data.errors[key].message };
          this.errorsReturnByServer.push(err);
        });
        console.log(this.errorsReturnByServer);
      });
  }

  private loadItems() {
    this.axios.get("http://localhost:3000/careuser/" + this.$route.params.id,
      { headers: { Authorization: `Bearer ${this.keycloakObj.token.toString()}` } }).then((response: AxiosResponse) => {
        this.user = response.data.careusers[0];
        this.originalUserData = JSON.parse(JSON.stringify(response.data.careusers[0]));
      }, (error) => {
        console.log(error);
      });
  }
}
