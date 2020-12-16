<template>
  <div>
    <div class="box">
      <vs-row>
        <vs-col w="3">
          <v-card :loading="loading" class="mx-auto my-12" max-width="240">
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
                    <p class="text-p-online">กำลังใช้งาน:{{ online }}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
        <vs-col w="3">
          <v-card :loading="loading" class="mx-auto my-12" max-width="240">
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
                    <p class="text-p-online">ไม่ได้ใช้งาน:{{ offline }}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
        <vs-col w="3">
          <v-card :loading="loading" class="card-chat" max-width="240">
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
                    <p class="text-p-online">อุปกรณ์ทั้งหมด:{{ total }}</p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
      </vs-row>
    </div>
    <vs-row>
      <vs-col w="8">
        <div class="card-chart">
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="493"
            height="300"
          >
            <v-card-text>
              <canvas id="myChart" height="180%"></canvas>
            </v-card-text>
          </v-card>
        </div>
      </vs-col>
      <vs-col w="4">
        <div class="card-chart2">
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="240"
            height="300"
          >
            <v-card-text>
              <canvas id="my-chart" height="350%"></canvas>
            </v-card-text>
          </v-card>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
export default {
  components: {},
  data() {
    return {
      online: 0,
      offline: 0,
      total: 0,
      data: [],
      on: 0,
      off: 0,
      on_1:0,
      off_1:0,
      total_1:0,
    };
  },
  mounted() {
    this.data_offline();
    this.data_online();
    this.chart();
    this.chart_pipe();
  },
  methods: {
    data_offline() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          this.data = res;
          var i;
          for (i = 0; i < this.data.data.length; i++) {
            if (this.data.data[i].fm_status == 2) {
              this.offline = this.offline + 1;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    data_online() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          this.data = res;
          var i;
          for (i = 0; i < this.data.data.length; i++) {
            if (this.data.data[i].fm_status == 1) {
              this.online = this.online + 1;
            }
          }
          this.total = this.data.data.length;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    chart() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          const responseData = res.data;
          console.log(responseData);
          for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].fm_status == 1) {
              this.on = this.on + 1;
            } else {
              this.off = this.off + 1;
            }
          }
          console.log(this.on);
          var ctx = document.getElementById("myChart");
          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["กำลังใช้งาน", "ไม่ได้ใช้งาน"],
              datasets: [
                {
                  data: [this.on, this.off],
                  backgroundColor: [
                    "rgba(124,252,0, 0.2)",
                    "rgba(220,20,60, 0.2)",
                  ],
                  borderColor: ["rgba(0,128,0, 1)", "rgba(255,0,0, 1)"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      fontFamily: "Kanit",
                    },
                  },
                ],
              },
            },
          });
          console.log(myChart);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    chart_pipe() {
      axios
        .get("http://localhost:4000/farm")
        .then((res) => {
          const responseData = res.data;
          console.log(responseData)
          for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].fm_status == 1) {
              this.on_1= this.on_1 + 1;
            } else {
              this.off_1 = this.off_1 + 1;
            }
          }
          this.total_1=responseData.length
          var ctx = document.getElementById("my-chart");
          var myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: ["กำลังใช้งาน", "ไม่ได้ใช้งาน", "อุปกรณ์ทั้งหมด"],
              datasets: [
                {
                  label: "Page A",
                  data: [this.on_1, this.off_1, this.total_1],
                  backgroundColor: ["#a8df65", "#ff4646", "#393e46"],
                },
              ],
            },
            options: {
              responsive: true,
            },
          });
          console.log(myChart);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
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
  font-size: 18px;
  font-weight: bold;
}
.img-icon {
  margin-top: 10px;
}
.text-refresh {
  display: block;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
.card-chart {
  margin-top: 3%;
  margin-left: 30%;
}
.card-chart2 {
  margin-top: 6%;
  margin-left: -20%;
}
</style>