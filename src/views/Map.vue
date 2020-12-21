
<template>
  <div class="center" style="margin-top: 100px">
    <vs-select placeholder="Select" v-model="value">
      <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
      <vs-option label="Vue" value="2"> Vue </vs-option>
      <vs-option label="Javascript" value="3"> Javascript </vs-option>
      <vs-option disabled label="Sass" value="4"> Sass </vs-option>
      <vs-option label="Typescript" value="5"> Typescript </vs-option>
      <vs-option label="Webpack" value="6"> Webpack </vs-option>
      <vs-option label="Nodejs" value="7"> Nodejs </vs-option>
    </vs-select>
    <div>
      <div class="center" style="margin-top: 100px">
        <vs-select placeholder="Select" v-model="value2">
          <vs-option
            v-for="(item, index) in province"
            :key="index + 1"
            :label=item.fm_province
            v-bind:value=item.fm_province
          >
           {{item.fm_province}}
          </vs-option>
        </vs-select>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      value2: "",
      province: "",
    };
  },
  mounted() {
    this.PROVINCE();
  },
  methods: {
    PROVINCE() {
      axios
        .get("http://localhost:4000/province")
        .then((res) => {
          this.province = res.data;
          console.log(this.province);
        })
        .catch((error) => {
          console.log("error", error);
        
        });
    },
  },
};
</script>

        