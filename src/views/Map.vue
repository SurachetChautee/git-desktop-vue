<template>
  <div style="margin-top: 50px">
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="10"
      :rules="nameRules"
      label="Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="address"
      :counter="10"
      :rules="nameRules"
      label="Address"
      required
    ></v-text-field>
    <vs-button color="" type="" @click="summit()">summit</vs-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      username: "",
      password: "",
      name: "",
      address: "",
    };
  },
  mounted() {},
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    summit() {
      // let data = {
      //       username: this.username,
      //       password: this.password,
      //       name: this.name,
      //       address: this.address,
      //     };
      let formData = new FormData();
      formData.append("profile_pic", this.file);
      axios.post("http://localhost:5000/register",formData).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>