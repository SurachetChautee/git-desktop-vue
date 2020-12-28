<template>
  <div class="home" :style="myStyle">
    <div class="card-card">
      <br />
      <h1 class="title-h">รายการทั้งหมด: {{ total }}</h1>
      <vs-select placeholder="Select" v-model="value" @change="select(value,item.province)">
        <vs-option label="ทั้งหมด" value="1"> ทั้งหมด </vs-option>
        <vs-option
          v-for="(item, index) in province"
          v-bind:key="index + 2"
          v-bind:label="item.province"
          v-bind:value="item.province"
        >
          {{ item.province }}
        </vs-option>
        
      </vs-select>

      

      <vs-row>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          w="4"
          class="card"
          type="1"
          v-for="(item, index) in data"
          :key="index"
        >
          <vs-card>
            <template #title>
              <h3>{{ item.fm_name }}</h3>
            </template>
            <template #img>
              <div v-if="item.fm_status == '1'">
                <img src="../assets/img/online.jpg" />
              </div>
              <div v-if="item.fm_status == '2'">
                <img src="../assets/img/off.jpg" />
              </div>
            </template>
            <template #text>
              <div class="box-card">
                <vs-row>
                  <vs-col w="4">
                    <div v-if="item.fm_status == '1'">
                      <img
                        src="../assets/img/icon_online.png"
                        width="20"
                        height="20"
                      />
                    </div>
                    <div v-if="item.fm_status == '2'">
                      <img
                        src="../assets/img/icon_offline.png"
                        width="20"
                        height="20"
                      />
                    </div>
                  </vs-col>
                  <vs-col w="4">
                    <div
                      v-if="item.fm_status == '1'"
                      style="padding-left: 10px"
                    >
                      <p style="margin-left: -80px">สถานะ: กำลังใช้งาน</p>
                    </div>
                    <div
                      v-else-if="item.fm_status == '2'"
                      style="padding-left: 10px"
                    >
                      <p style="margin-left: -80px">สถานะ: ไม่ได้ใช้งาน</p>
                    </div>
                  </vs-col>
                </vs-row>
                <vs-row>
                  <vs-col w="4">
                    <div>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                        width="20"
                        height="20"
                      />
                    </div>
                  </vs-col>
                  <vs-col w="8">
                    <div style="margin-left: -70px">
                      <vs-row>
                        <vs-col w="9">
                          <p>
                            ที่อยู่ปัจจุบัน:{{
                              item.fm_latitude + "," + item.fm_longitude
                            }}
                          </p>
                        </vs-col>
                        <vs-col w="3">
                          <vs-button
                            class="btn_map"
                            flat
                            success
                            animation-type="vertical"
                            @click="map(item.fm_latitude, item.fm_longitude,item.fm_name)"
                          >
                            ดูแผนที่
                            <template #animate>
                              <i class="bx bx-mail-send"></i> ดูแผนที่
                            </template>
                          </vs-button>
                        </vs-col>
                      </vs-row>
                    </div>
                  </vs-col>
                </vs-row>
                <div style="margin-left: 40%; margin-top: 20px">
                  <div v-if="item.fm_status == '2'">
                    <vs-button
                      success
                      class="btn_on"
                      @click="UPDATE_STATUS(item.id, 1)"
                    >
                      เปิดการใช้งาน
                    </vs-button>
                  </div>

                  <div v-if="item.fm_status == '1'">
                    <vs-button
                      danger
                      class="btn_off"
                      @click="UPDATE_STATUS(item.id, 2)"
                    >
                      ปิดการใช้งาน
                    </vs-button>
                  </div>
                  <vs-dialog width="90%" not-center v-model="active">
                    <template #header> </template>
                    <div class="con-content">
                      <GmapMap
                        id="map"
                        :center="{ lat: lat, lng: long }"
                        :zoom="15"
                        map-type-id="terrain"
                        style="width: 100%; height: 405px; margin-top: 5px"
                        ref="mapRef"
                      >
                        <gmap-marker
                          :position="{
                            lat: lat,
                            lng: long,
                          }"
                          :clickale="true"
                          :draggable="true"
                        >
                          <gmap-info-window
                            
                            :position="{
                              lat: lat,
                              lng: long,
                            }"
                          >
                            {{ position }}
                          </gmap-info-window>
                        </gmap-marker>
                      </GmapMap>
                    </div>
                  </vs-dialog>
                </div>
              </div>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      value: 1,
      active: false,
      data: [],
      total: "",
      province: [],
      myStyle: {
        backgroundColor: "",
      },
      lat: "",
      long: "",
      position: "",
    };
  },
  mounted() {
    this.CALL_API_FARM();
    this.PROVINCE();
  },
  methods: {
    CALL_API_FARM() {
      axios
        .get("http://localhost:5000/farm")
        .then((res) => {
          this.data = res.data;
          this.total = res.data.length;
          console.log(this.total);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async PROVINCE() {
       await axios
        .get("http://localhost:5000/province")
        .then((res) => {
          this.province = res.data;
          console.log(this.province);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    UPDATE_STATUS(id, status) {
      let data = {
        id: id,
        status: status,
      };
      axios.put("http://localhost:5000/update_status", data).then((res) => {
        console.log(res);
        location.reload();
      });
    },
    select(value,label) {
      console.log(label)
      if (value == 1) {
        console.log("all");
        this.data = "";
        this.CALL_API_FARM();
      } else {
        let data = {
          id: value,
        };
        axios.post("http://localhost:5000/select", data).then((res) => {
          this.data = "";
          this.data = res.data;
          this.total = "";
          this.total = res.data.length;
          console.log(res);
        });
      }
    },
    map(lat, long, position) {
      this.active = true;
      this.lat = lat;
      this.long = long;
      this.position = position;
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 3%;
  padding-bottom: 3%;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.card-card {
  margin-left: 5%;
  margin-top: 5%;
}

.btn_on {
  height: 40px;
  width: 150px;
  margin: 0 auto;
  display: block;
  background: #4e9525;
  margin-bottom: 5%;
  margin-left: -40px;
}
.btn_off {
  height: 40px;
  width: 150px;
  margin: 0 auto;
  display: block;
  background: #cd0a0a;
  margin-bottom: 3%;
  margin-left: -40px;
}
.box {
  margin-left: 8%;
}
.home {
  margin-top: -18px;
}
.box-card {
}
.title-h {
  margin-top: 20px;
}
p {
  color: black;
  font-weight: bold;
}
.btn_map {
  margin-top: -3px;
  width: 70px;
  height: 25px;
}
</style>
