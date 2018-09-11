import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { IUser, User } from "../../Interface/User";

@Component({
  template: require("./details.html"),
})

export class DetailsComponent extends Vue {

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
