
<template>
  <div class="center">
    <div style="margin-top: 60px">
      <vs-button relief @click="active = !active" style="min-width: 110px">
        <vs-row>
          <vs-col w="3">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/1828/1828925.svg"
              height="10"
              width="10"
            />
          </vs-col>
          <vs-col w="9"> เพิ่มอุปกรณ์ </vs-col>
        </vs-row>
      </vs-button>
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th style="width: 1px">ลำดับ</vs-th>
            <vs-th>ชื่ออุปกรณ์</vs-th>
            <vs-th>สถานะ</vs-th>
            <vs-th>latitude , longitude</vs-th>
            <vs-th>จังหวัด</vs-th>
            <vs-th></vs-th>
            <vs-th></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(farm, page, max)"
            :data="tr"
          >
            <vs-td>
              {{ i + 1 }}
            </vs-td>
            <vs-td>
              {{ tr.fm_name }}
            </vs-td>
            <vs-td>
              <div v-if="tr.fm_status == '1'" style="margin-left: -20px">
                <vs-button
                  gradient
                  style="min-width: 50px; min-height: 35px"
                  success
                  animation-type="scale"
                >
                  Online
                  <template #animate> Online </template>
                </vs-button>
              </div>
              <div v-if="tr.fm_status == '2'" style="margin-left: -20px">
                <vs-button
                  gradient
                  style="min-width: 50px; min-height: 35px"
                  danger
                  animation-type="scale"
                >
                  Offline
                  <template #animate> Offline </template>
                </vs-button>
              </div>
            </vs-td>
            <vs-td> {{ tr.fm_latitude }} , {{ tr.fm_longitude }} </vs-td>
            <vs-td>
              {{ tr.fm_province }}
            </vs-td>
            <vs-td>
              <vs-button
                warn
                gradient
                :active="active == 3"
                style="min-width: 70px"
                flat
                @click="SELECT_DATA(tr.id)"
              >
                <v-row>
                  <vs-col w="3" style="padding-left: 8px; margin-top: -1px">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/1159/1159633.svg"
                      height="10"
                      width="10"
                    />
                  </vs-col>
                  <vs-col w="9" style="margin-left: -7px; margin-top: -1px">
                    <vs-row>
                      <vs-col></vs-col>
                    </vs-row>
                    แก้ไข
                  </vs-col>
                </v-row>
              </vs-button>
            </vs-td>
            <vs-td>
              <vs-button
                danger
                gradient
                :active="active == 3"
                @click="delete_data(tr.id)"
                style="min-width: 70px"
              >
                <v-row>
                  <vs-col w="3" style="padding-left: 8px; margin-top: -1px">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/1214/1214428.svg"
                      height="10"
                      width="10"
                    />
                  </vs-col>
                  <vs-col w="9" style="margin-left: -7px; margin-top: -1px">
                    ลบ
                  </vs-col>
                </v-row>
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination
            circle
            v-model="page"
            :length="$vs.getLength(farm, max)"
          />
        </template>
      </vs-table>
      <vs-dialog width="550px" not-center v-model="active2">
        <div v-for="(item, index) in data_select" :key="index">
          <template>
            <h4 class="not-margin">แก้ไขข้อมูลข้อมูล</h4>
          </template>

          <div class="con-content" style="margin-top: 50px; margin-left: 8%">
            <vs-row>
              <vs-col w="6">
                <vs-input label="ชื่ออุปกรณ์" v-model="value1" />
              </vs-col>
              <vs-col w="6">
                <vs-input label="จังหวัด" v-model="value2" />
              </vs-col>

              <vs-col w="6">
                <br />
                <vs-input label="latitude" v-model="value3" />
              </vs-col>
              <vs-col w="6">
                <br />
                <vs-input label="longitude" v-model="value4" />
              </vs-col>
            </vs-row>
          </div>

          <template>
            <div class="con-footer" style="margin-top: 3%; margin-left: 30%">
              <vs-row>
                <vs-col w="4">
                  <vs-button
                    warn
                    gradient
                    :active="active == 1"
                    @click="update_data()"
                    style="min-width: 80px"
                  >
                    <vs-col w3="3" style="margin-left: -90%">
                      <img
                        src="https://www.flaticon.com/svg/static/icons/svg/875/875100.svg"
                        height="10"
                        width="10"
                      />
                    </vs-col>
                    <vs-col w="3" style="margin-left: -20px"> Update </vs-col>
                  </vs-button>
                </vs-col>
                <vs-col w="4">
                  <vs-button
                    danger
                    gradient
                    @click="active2 = fale"
                    style="min-width: 80px"
                  >
                    <vs-col w="3" style="margin-left: -35%">
                      <img
                        src="https://www.flaticon.com/svg/static/icons/svg/1286/1286853.svg"
                        height="10"
                        width="10"
                      />
                    </vs-col>
                    <vs-col w="3" style="margin-left: 5px"> Exit </vs-col>
                  </vs-button>
                </vs-col>
              </vs-row>
            </div>
          </template>
        </div>
      </vs-dialog>
      <vs-dialog width="550px" not-center v-model="active" @close="Close()">
        <template #header>
          <h4 class="not-margin">เพิ่มอุปกรณ์</h4>
        </template>
        <div class="con-content" style="margin-top: 15px; margin-left: 25px">
          <vs-row>
            <vs-col w="6">
              <vs-input label="ชื่ออุปกรณ์" v-model="input_1" />
            </vs-col>
            <vs-col w="6">
              <vs-input label="จังหวัด" v-model="input_2" />
            </vs-col>
            <vs-col w="6"
              ><br />
              <vs-input label="latitude" v-model="input_3" />
            </vs-col>
            <vs-col w="6"
              ><br />
              <vs-input label="longitude" v-model="input_4" />
            </vs-col>
            <vs-button
              relief
              color="#7d33ff"
              :active="active == 0"
              style="margin-top: 5%; min-width: 25%"
              @click="position()"
            >
              <vs-row>
                <vs-col w="3">
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/622/622669.svg"
                    height="10"
                    width="10"
                  />
                </vs-col>
                <vs-col w="9"> ค้นหาตำแหน่ง </vs-col>
              </vs-row>
            </vs-button>
          </vs-row>
        </div>
        <template #footer>
          <div class="con-footer">
            <vs-button
              success
              gradient
              :active="active == 0"
              @click="insert()"
              style="margin-left: 65%; margin-top: -10%; min-width: 25%"
            >
              <vs-row>
                <vs-col w="3">
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/3580/3580085.svg"
                    height="10"
                    width="10"
                  />
                </vs-col>
                <vs-col w="9"> บันทึกข้อมูล </vs-col>
              </vs-row>
            </vs-button>
          </div>
        </template>
      </vs-dialog>

      <vs-dialog overflow-hidden full-screen v-model="active3"  @close="Close()">
        <template #header>
          <vs-row style="margin-top: 20px">
            <vs-col w="3">
              <vs-input label="latitude" v-model="input_3" />
            </vs-col>
            <vs-col w="3" style="margin-left: -50px">
              <vs-input label="longitude" v-model="input_4" />
            </vs-col>
            <vs-col w="3" style="margin-left: -60px">
              <vs-button
                circle
                success
                gradient
                @click="active3 = false"
                style="min-width: 30%"
              >
                ตกลง <i class="bx bxs-bell-ring"></i>
              </vs-button>
            </vs-col>
          </vs-row>
        </template>
        <div>
          <GmapMap
            id="map"
            :center="{ lat: 16.429876, lng: 102.822213 }"
            :zoom="10"
            map-type-id="terrain"
            style="width: 100%; height: 480px"
            @click="mark"
          >
          </GmapMap>
        </div>
        <template #footer> </template>
      </vs-dialog>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import axios from "axios";
import { gmapApi } from "vue2-google-maps";
export default {
  data: () => ({
    page: 1,
    max: 6,
    farm: [],
    data_select: "",
    active: false,
    active2: false,
    active3: false,
    id: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    input_1: "",
    input_2: "",
    input_3: "",
    input_4: "",
  }),
  created() {},
  mounted() {
    this.CALL_API_FARM();
  },
  methods: {
    CALL_API_FARM() {
      axios
        .get("http://localhost:5000/farm")
        .then((res) => {
          this.farm = res.data;
          console.log(this.farm);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    SELECT_DATA(id) {
      let data = {
        id: id,
      };
      axios
        .post("http://localhost:5000/select_data", data)
        .then((res) => {
          this.data_select = res.data;
          this.id = res.data[0].id;
          this.value1 = res.data[0].fm_name;
          this.value2 = res.data[0].fm_province;
          this.value3 = res.data[0].fm_latitude;
          this.value4 = res.data[0].fm_longitude;
          console.log(this.id);
        })
        .catch((error) => {
          console.log("error", error);
        });
      this.active2 = true;
    },

    update_data() {
      let data = {
        id: this.id,
        name: this.value1,
        province: this.value2,
        latitude: this.value3,
        longitude: this.value4,
      };
      axios
        .post("http://localhost:5000/update_data", data)
        .then((res) => {
          console.log(res.data);
          location.reload();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    delete_data(id) {
      console.log(id);
      swal({
        title: "คำเตือน",
        text: "คุณต้องการลบอุปกรณ์ที่เลือกหรือไม่",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .post("http://localhost:5000/delete", data)
            .then((res) => {
              swal("ลบข้อมูลสำเร็จ", {
                icon: "success",
              });
              setTimeout(() => {
                console.log(res);
                location.reload();
              }, 1000);
            })
            .catch((error) => {
              console.log("error", error);
            });
        } else {
          console.log("");
        }
      });

      let data = {
        id: id,
      };
    },
    insert() {
      if (this.input_1 == "") {
        alert("1");
      } else if (this.input_2 == "") {
        alert("2");
      } else if (this.input_3 == "") {
        alert("3");
      } else if (this.input_4 == "") {
        alert("4");
      } else {
        let data = {
          name: this.input_1,
          latitude: this.input_3,
          longitude: this.input_4,
          province: this.input_2,
        };
        axios
          .post("http://localhost:5000/insert_item", data)
          .then((res) => {
            console.log(res);
            location.reload();
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    position() {
      this.active3 = true;
      this.input_3 = "";
      this.input_4 = "";
    },
    mark(event) {
      // console.log(event.latLng.lat());
      // console.log(event.latLng.lng());
      this.input_3 = event.latLng.lat().toFixed(6);
      this.input_4 = event.latLng.lng().toFixed(6);
    },
    Close(){
      this.input_3=""
      this.input_4=""
    }
  },
  computed: {
    google: gmapApi,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
</style>
        