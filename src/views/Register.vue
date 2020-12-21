<template>
  <div class="box">
    <div>
      <v-card elevation="2" height="400" width="700">
        <div style="margin-left: 25%">
          <vs-row>
            <vs-col w="12">
              <div id="app">
                <input type="file" @change="onFileChange" />
                <div id="preview">
                  <img v-if="url" :src="url" />
                </div>
              </div>
            </vs-col>
          </vs-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
    };
  },
  mounted() {},
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
.box {
  margin-top: 100px;
  margin-left: 25%;
  margin-right: 25%;
}
</style>