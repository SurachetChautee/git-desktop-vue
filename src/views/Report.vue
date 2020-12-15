<template>
  <div class="box">
    <vs-row>
      <vs-col w="3">
        <vs-card class="card_1">
          <template #text>
            <vs-row>
              <vs-col w="3">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/498/498231.svg"
                  width="50"
                  height="50"
                />
              </vs-col>
              <vs-colo w="8">
                <p>กำลังใช้งาน:1000</p>
              </vs-colo>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
      <vs-col w="3">
        <vs-card class="card_1">
          <template #text>
            <vs-row>
              <vs-col w="3">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/498/498231.svg"
                  width="50"
                  height="50"
                />
              </vs-col>
              <vs-colo w="8">
                <p>กำลังใช้งาน:1000</p>
              </vs-colo>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
      <vs-col w="3">
        <vs-card class="card_1">
          <template #text>
            <vs-row>
              <vs-col w="3">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/498/498231.svg"
                  width="50"
                  height="50"
                />
              </vs-col>
              <vs-colo w="8">
                <p>กำลังใช้งาน:1000</p>
              </vs-colo>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}
.card_1 {
  height: 100px;
  width: 200px;
}
.card_2 {
  width: 200px;
  height: 150px;
}
.card_3 {
  width: 200px;
  height: 150px;
}
</style>