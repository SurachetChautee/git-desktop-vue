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
        <vs-col w="3">
          <v-card
            :loading="loading"
            class="card-chat"
            max-width="270"
            max-height="132"
          >
            <v-card-text>
              <div>
                <vs-row>
                  <vs-col w="2">
                    <img
                      :src="'http://127.0.0.1/icweather/' + ic"
                      width="80"
                      height="70"
                      style="margin-top: 13px"
                    />
                  </vs-col>
                  <vs-col w="9">
                    <p
                      class="text-p-online"
                      style="margin-left: 70px; margin-top: 20px"
                    >
                      {{ tp }}°C<br />ความชื้น {{ hu }}%
                    </p>
                  </vs-col>
                </vs-row>
              </div>
            </v-card-text>
          </v-card>
        </vs-col>
      </vs-row>
    </div>
    <vs-row>
      <vs-col w="9">
        <div class="card-chart">
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="785"
            height="300"
          >
            <v-card-text>
              <canvas id="myChart" height="110%"></canvas>
            </v-card-text>
          </v-card>
        </div>
      </vs-col>
      <vs-col w="3">
        <div class="card-chart2">
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="269"
            height="300"
          >
            <v-card-text>
              <canvas id="my-chart" height="330%"></canvas>
            </v-card-text>
          </v-card>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col w="9">
        <div>
          <v-card
            :loading="loading"
            class="chart-line"
            width="785"
            height="300"
          >
            <v-card-text>
              <canvas id="my-chart-line" height="110%"></canvas>
            </v-card-text>
          </v-card>
        </div>
      </vs-col>
      <vs-col w="3">
        <div style="margin-top: 8.8%; margin-left: -4%">
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            width="265"
            height="300"
          >
            <v-card-text>
              <canvas id="my-chart-radar" height="330%"></canvas>
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
      on_1: 0,
      off_1: 0,
      total_1: 0,
      tp: "",
      ic: "",
      hu: "",
    };
  },
  mounted() {
    this.data_offline();
    this.data_online();
    this.chart();
    this.chart_pipe();
    this.chart_line();
    this.chart_radar();
    this.weather();
  },
  methods: {
    data_offline() {
      axios
        .get("http://192.168.1.43:4000/farm")
        .then((res) => {
          this.data = res;
          for (var i = 0; i < this.data.data.length; i++) {
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
        .get("http://192.168.1.43:4000/farm")
        .then((res) => {
          this.data = res;
          for (var i = 0; i < this.data.data.length; i++) {
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
        .get("http://192.168.1.43:4000/farm")
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
              labels: ["System"],
              datasets: [
                {
                  label: "Online",
                  data: [this.on],
                  backgroundColor: ["rgba(124,252,0, 0.2)"],
                  borderColor: ["rgba(0,128,0, 1)"],
                  borderWidth: 1,
                },
                {
                  label: "Offline",
                  data: [this.off],
                  backgroundColor: ["rgba(220,20,60, 0.2)"],
                  borderColor: ["rgba(255,0,0, 1)"],
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
        .get("http://192.168.1.43:4000/farm")
        .then((res) => {
          const responseData = res.data;
          console.log(responseData);
          for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].fm_status == 1) {
              this.on_1 = this.on_1 + 1;
            } else {
              this.off_1 = this.off_1 + 1;
            }
          }
          this.total_1 = responseData.length;
          var ctx = document.getElementById("my-chart");
          var myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: ["Online", "Offine", "All equipment"],
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
    chart_line() {
      var ctx = document.getElementById("my-chart-line");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Page A",
              data: [61, 122, 107, 73],
              borderColor: "#6E7EF5",
              fill: false,
            },
            {
              label: "Page B",
              data: [18, 170, 135, 92],
              borderColor: "#B277DE",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      console.log(myChart);
    },
    chart_radar() {
      axios
        .get("http://192.168.1.43:4000/farm")
        .then((res) => {
          const responseData = res.data;
          console.log(responseData);
          var x = 0;
          var y = 0;
          for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].fm_status == 1) {
              x = x + 1;
            } else {
              y = y + 1;
            }
          }
          this.total_1 = responseData.length;
          var ctx = document.getElementById("my-chart-radar");
          var myChart = new Chart(ctx, {
            type: "polarArea",
            data: {
              labels: ["Online", "Offine", "All equipment"],
              datasets: [
                {
                  label: "Page A",
                  data: [x, y, this.total_1],
                  backgroundColor: ["#30475e", "#7e8a97", "#cbaf87"],
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
    weather() {
      axios
        .get(
          "http://api.airvisual.com/v2/nearest_city?lat=16.479666&lon=102.803606&key=2add3575-a73d-4cb8-886a-78d187b87b0b"
        )
        .then((res) => {
          this.tp = res.data.data.current.weather.tp;
          this.hu = res.data.data.current.weather.hu;
          this.ic = res.data.data.current.weather.ic + ".png";
          console.log(this.ic);
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
  margin-left: 4%;
  padding-left: 60px;
  padding-right: 60px;
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
  margin-left: 11.7%;
}
.card-chart2 {
  margin-top: 9%;
  margin-left: -5%;
}
.chart-line {
  margin-top: 3%;
  margin-left: 11.8%;
  margin-bottom: 5%;
}
</style>