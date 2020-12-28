<template>
  <div>
    <GmapMap
      id="map"
      :center="{ lat: 16.429876, lng: 102.822213 }"
      :zoom="10"
      map-type-id="roadmap" 
      style="width: 100%; height: 560px; margin-top: 45px"
      @click="mark"
      ref="mapRef"
    >
      <gmap-marker
        v-for="data in google_data"
        :key="data"
        :position="{ lat: data.fm_latitude, lng: data.fm_longitude }"
        :clickale="true"
        :draggable="true"
        readonly
      >
        <gmap-info-window
          :opened="window_open"
          :position="{ lat: data.fm_latitude, lng: data.fm_longitude }"
        >
          {{ data.fm_name }}
        </gmap-info-window>
      </gmap-marker>
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";
export default {
  data() {
    return {
      google_data: [],
    };
  },
  mounted() {
    this.data_map();
    this.$refs.mapRef.$mapPromise.then(() => {
        this.$refs.mapRef.$mapObject.setClickableIcons(false)
    })
    
  },
  methods: {
    data_map() {
      axios.get("http://192.168.1.43:5000/farm").then((res) => {
        this.google_data = res.data;
        console.log(res.data);
      });
    },
  },
  computed: {
    google: gmapApi,
  },
};
</script>

<style lang="scss" scoped>
</style>