<template>
  <b-overlay :show="show" rounded="sm">
    <div class="home">
      <RwvCamera @pictureTaken="setImage($event)" />
      <RwvText v-bind:prediction="mood"></RwvText>
      <RwvRecommendations :mood="mood"></RwvRecommendations>
    </div>
  </b-overlay>
</template>

<script>
import { RECOMMENDATIONSERVICE_INSTANCE } from "@/services/recommendations.service";
// @ is an alias to /src
import RwvCamera from "@/components/TheCamera.vue";
import RwvText from "@/components/TheText.vue";
import RwvRecommendations from "@/components/TheRecommendations.vue";

import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

const params = {
  minConfidence: 0.5
};

export default {
  name: "Home",
  data() {
    return {
      mood: "",
      class: null,
      playlists: [],
      faceModel: null,
      emotionModel: null,
      image: null,
      show: false,
      imageSnapInterval: null
    };
  },
  components: {
    RwvCamera,
    RwvText,
    RwvRecommendations
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.imageSnapInterval);
  },
  methods: {
    async init() {
      // load the face detection api & emotion detection model
      await faceapi.loadSsdMobilenetv1Model("/models/features/");
      await faceapi.loadFaceLandmarkModel("/models/features");
      await faceapi.loadFaceExpressionModel("/models/features");

      this.emotionModel = await tf.loadLayersModel(
        "/models/emotion/model.json"
      );

      this.imageSnapInterval = setInterval(this.getEmotion, 1000);
    },
    setLoading() {
      this.show = true;
    },
    getEmotion: async function() {
      const image = this.$children[0].$children[0].webcam.webcamElement;
      const canvas = faceapi.createCanvasFromMedia(image);
      let expression;
      const userExpression = await faceapi
        .detectSingleFace(image)
        .withFaceLandmarks()
        .withFaceExpressions();
      if (typeof userExpression === "undefined") {
        this.show = false;
      } else {
        this.show = false;
        expression = Object.keys(userExpression.expressions).reduce(function(
          a,
          b
        ) {
          return userExpression.expressions[a] > userExpression.expressions[b]
            ? a
            : b;
        });
      }

      RECOMMENDATIONSERVICE_INSTANCE.setUserMood(expression);

      this.setMood(expression);
    },
    setMood(mood) {
      this.mood = mood;
    },
    setImage(image) {
      console.log("picture taken");
      this.image = image;
    }
  }
};
</script>

<style scoped>
RwvRecommendations {
  max-height: 720px;
  overflow-y: scroll;
  border: black;
}

#modal {
  opacity: 0.5 !important;
}
</style>
