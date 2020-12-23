<template>
  <div class="container">
    <div class="hidden">
      <vs-navbar
        class="bg-navbar"
        shadow
        square
        center-collapsed
        v-model="active"
      >
        <template #left>
          <v-app-bar-nav-icon
            @click="activeSidebar = !activeSidebar"
          ></v-app-bar-nav-icon>
        </template>
        <vs-navbar-item :active="active == 'guide'" id="guide" @click="home()">
          Home
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'docs'" id="docs" @click="report()">
          Dashboard
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'components'" id="components" @click="map()">
          Map
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'license'" id="license" @click="about()">
          license
        </vs-navbar-item>
      </vs-navbar>
      <vs-sidebar absolute v-model="active" :open.sync="activeSidebar" >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item id="market">
          <template #icon>
            <i class="bx bx-grid-alt"></i>
          </template>
          Market Overview
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
          <template #icon>
            <i class="bx bxs-music"></i>
          </template>
          Music
        </vs-sidebar-item>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class="bx bx-group"></i>
              </template>
              Social media
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item id="Instagram">
            <template #icon>
              <i class="bx bxl-instagram"></i>
            </template>
            Instagram
          </vs-sidebar-item>
          <vs-sidebar-item id="twitter">
            <template #icon>
              <i class="bx bxl-twitter"></i>
            </template>
            Twitter
          </vs-sidebar-item>
          <vs-sidebar-item id="Facebook">
            <template #icon>
              <i class="bx bxl-facebook"></i>
            </template>
            Facebook
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class="bx bx-code-alt"></i>
              </template>
              Coding
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item id="github">
            <template #icon>
              <i class="bx bxl-github"></i>
            </template>
            Github
          </vs-sidebar-item>
          <vs-sidebar-item id="codepen">
            <template #icon>
              <i class="bx bxl-codepen"></i>
            </template>
            Codepen
          </vs-sidebar-item>
          <vs-sidebar-item id="discord">
            <template #icon>
              <i class="bx bxl-discord"></i>
            </template>
            Discord
          </vs-sidebar-item>
          <vs-sidebar-item id="Javascript">
            <template #icon>
              <i class="bx bxl-javascript"></i>
            </template>
            Javascript
          </vs-sidebar-item>
          <vs-sidebar-item id="git">
            <template #icon>
              <i class="bx bxl-git"></i>
            </template>
            Git
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class="bx bxs-donate-heart"></i>
          </template>
          Donate
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class="bx bx-drink"></i>
          </template>
          Drink
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class="bx bxs-shopping-bags"></i>
          </template>
          Shopping
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class="bx bx-chat"></i>
          </template>
          Chat
        </vs-sidebar-item>
        <template #footer> </template>
      </vs-sidebar>
      
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: "home",
    activeSidebar: false,
    myStyle: {
      backgroundColor: "#000000",
    },
  }),
  methods: {
    home(){
      this.$router.push('/')
    },
    report(){
      this.$router.push('/report')
    },
    map(){
      this.$router.push('/map')
    },
    about(){
      this.$router.push('/about')
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
.bg-navbar {
  background-color: #ffffff;
}
.bar {
  color: #ffffff;
}
</style>



        