<template>
  <div>
    <div>
      <video
        autoplay
        playsinline
        muted
        id="webcam"
        width="5-0"
        height="500"
      ></video>
    </div>
    <div>
      <!--<canvas ref="canvas" id="canvas" width="640" height="480" style="border:1px solid #BBB;"></canvas>-->
    </div>
  </div>
</template>

<script>
import { Webcam } from "../assets/webcam";

export default {
  name: "RwvCamera",
  data() {
    return {
      webcam: null
    };
  },
  mounted() {
    this.loadWebCam();
  },
  methods: {
    loadWebCam: function() {
      this.webcam = new Webcam(document.getElementById("webcam"));
      this.webcam.setup();
    },
    async getImage() {
      const img = await this.webcam.capture();
      // eslint-disable-next-line no-undef
      const processedImg = tf.tidy(() =>
        img
          .expandDims(0)
          .toFloat()
          .div(127)
          .sub(1)
      );
      img.dispose();
      return processedImg;
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

video {
  visibility: hidden;

  width: 1px;
  height: 1px;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
</style>
