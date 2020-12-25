<template>
  <q-page padding>
    <GmapMap
      id="map"
      :center="{ lat: 16.429876, lng: 102.822213 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
      @click="mark"
    >
    </GmapMap>
  </q-page>
</template>

<script type="text/javascript">
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      markers: [
        {
          position: { lat: 10, lng: 10 },
        },
        {
          position: { lat: 50, lng: 10 },
        },
      ],
    };
  },
  methods: {
    mark(event) {
      console.log(event.latLng.lat().toFixed(6));
      console.log(event.latLng.lng().toFixed(6));
    },
    
  },
  computed: {
    google: gmapApi,
  },
};
</script>>