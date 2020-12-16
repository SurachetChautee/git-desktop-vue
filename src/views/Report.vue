<template>
  <div>
    <div class="box">
      <vs-row>
        <vs-col w="3">
          <v-card :loading="loading" class="mx-auto my-12" max-width="240">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-text>
              <div>
                <vs-row>
                  <vs-col w="3">
                    <img
                      class="img-icon"
                      src="https://www.flaticon.com/svg/static/icons/svg/1504/1504930.svg"
                      width="60"
                      height="75"
                    />
                  </vs-col>
                  <vs-col w="9">
                    <p class="text-p-online">กำลังใช้งาน:{{online}}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
        <vs-col w="3">
          <v-card :loading="loading" class="mx-auto my-12" max-width="240">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-text>
              <div>
                <vs-row>
                  <vs-col w="3">
                    <img
                      class="img-icon"
                      src="https://www.flaticon.com/svg/static/icons/svg/3616/3616005.svg"
                      width="60"
                      height="75"
                    />
                  </vs-col>
                  <vs-col w="9">
                    <p class="text-p-online">ไม่ได้ใช้งาน:{{offline}}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
        <vs-col w="3">
          <v-card :loading="loading" class="mx-auto my-12" max-width="240">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-text>
              <div>
                <vs-row>
                  <vs-col w="3">
                    <img
                      class="img-icon"
                      src="https://www.flaticon.com/svg/static/icons/svg/3869/3869853.svg"
                      width="60"
                      height="75"
                    />
                  </vs-col>
                  <vs-col w="9">
                    <p class="text-p-online">อุปกรณ์ทั้งหมด:{{total}}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      online: 0,
      offline: 0,
      total: 0,
      data:[],
    };
  },
  mounted() {
    this.data_offline()
    this.data_online()
  },
  methods: {
    data_offline() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          this.data=res
          var i;
          for (i = 0; i < this.data.data.length; i++) { 
            if(this.data.data.[i].fm_status==2){
              this.offline=this.offline+1
            }   
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    data_online(){
      axios
       .get("http://localhost:4000/farm")
        .then((res) => {
          this.data=res
          var i;
          for (i = 0; i < this.data.data.length; i++) { 
            if(this.data.data.[i].fm_status==1){
              this.online=this.online+1
            }   
          }
          this.total=this.data.data.length
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  },
};
</script>

<style scoped>
.box {
  margin-top: 100px;
  margin-left: 20%;
}
.text-p-online {
  margin-left: 25px;
  margin-top: 25%;
  margin-bottom: 25%;
  font-size: 15px;
}
.img-icon {
  margin-top: 10px;
}
</style>