<template>
  <div class="home" :style="myStyle">
    <div class="card-card">
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.028071840172!2d102.82561571414878!3d16.474116188631925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228a42912a3673%3A0xe236ed5e8a0a21d9!2sKKU%20Smart%20Learning%20Academy!5e0!3m2!1sth!2sth!4v1607929817934!5m2!1sth!2sth"
                width="600"
                height="450"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </template>
            <template #text>
              <div class="box-card">
                <div v-if="item.fm_status == '1'">
                  <img
                    src="https://www.iconsdb.com/icons/preview/green/circle-xxl.png"
                    width="20"
                    height="20"
                  />
                </div>
                <div v-if="item.fm_status == '2'">
                  <img
                    src="https://www.iconsdb.com/icons/preview/red/circle-xxl.png"
                    width="20"
                    height="20"
                  />
                </div>

                <div v-if="item.fm_status == '1'" style="padding-left: 10px">
                  <p>สถานะ: กำลังใช้งาน</p>
                </div>
                <div
                  v-else-if="item.fm_status == '2'"
                  style="padding-left: 10px"
                >
                  <p>สถานะ: ไม่ได้ใช้งาน</p>
                </div>
                <div>
                  <br /><br />
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
      data: "",
      myStyle: {
        backgroundColor: "#333333",
      },
    };
  },
  mounted() {
    this.CALL_API_FARM();
  },
  methods: {
    API(id, value) {
      console.log(id);
      console.log(value);
    },

    CALL_API_FARM() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          this.data = res.data;
          console.log(this.data);
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
      axios.put("http://localhost:4000/update_status", data).then((res) => {
        console.log(res);
        location.reload();
      });
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
  display: flex;
}
</style>
