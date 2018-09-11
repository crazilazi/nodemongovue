import axios, { AxiosResponse } from "axios";
import bModal from "bootstrap-vue/es/components/modal";
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { IUser, User } from "../../Interface/User";
@Component({
  template: require("./edit.html"),
})

export class EditComponent extends Vue {

  user: IUser = new User();
  protected axios;

  constructor() {
    super();
    this.axios = axios;
  }

  mounted() {
    this.$nextTick(() => {
      this.loadItems();
    });
  }

  showModal() {
    const bModalPopUp = this.$refs.saveModal as bModal;
    bModalPopUp.show();
  }

  handleOk() {
    this.save();
    const bModalPopUp = this.$refs.saveModal as bModal;
    bModalPopUp.hide();
  }

  handleCancel() {
    const bModalPopUp = this.$refs.saveModal as bModal;
    bModalPopUp.hide();
  }

  save() {
    this.axios.put("http://localhost:3000/careuser/" + this.$route.params.id, this.user)
      .then((response: AxiosResponse) => {
        console.log(response.data);
      }, (error) => {
        console.error(error);
      });
  }

  private loadItems() {
    this.axios.get("http://localhost:3000/careuser/" + this.$route.params.id).then((response: AxiosResponse) => {
      this.user = response.data.careusers[0];
      console.log(this.user);
      // this.items = response.data.careusers
      //   console.log(response.data.careusers)
    }, (error) => {
      console.error(error);
    });
  }
}
