import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { IUser } from "../../Interface/User";

@Component({
  template: require("./list.html"),
})
export class ListComponent extends Vue {

  users: IUser[] = [];
  protected axios;
  private url = "http://localhost:3000/careuser";

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
    if (!this.users.length) {
      this.axios.get(this.url).then((response: AxiosResponse) => {
        this.users = response.data.careusers;
        console.log(response.data.careusers);
      }, (error) => {
        console.error(error);
      });
    }
  }

}
