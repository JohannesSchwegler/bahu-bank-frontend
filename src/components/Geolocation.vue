<template>
  <div>
    <h1>Location</h1>

    {{ output }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      output: ""
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },
  methods: {
    showPosition(position) {
      console.log(position);
      axios
        .get(
          "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude
        )
        .then(res => {
          const result = res.data;
          this.output =
            result.lat + ", " + result.lon + "<br>" + result.display_name;
        })
        .catch(err => (this.output = "An Error occured."));
    }
  }
};
</script>

<style scoped></style>
