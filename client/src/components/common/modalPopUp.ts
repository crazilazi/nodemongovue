import axios, { AxiosResponse } from "axios";
import bModal from "bootstrap-vue/es/components/modal";
import { Component, Vue } from "vue-property-decorator";

@Component({
    template: require("./modalPopUp.html"),
    components: {
        "b-modal": bModal,
    },
})

export class ModalPopUpComponent extends Vue {

}
