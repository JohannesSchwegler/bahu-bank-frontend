<template>
  <div class="home">
    <img class="home-image" alt="Bahu Bank logo" src="../assets/svg/Bahu.svg" />
    <h1>Innot Bahu Bank</h1>
    <FaceRecognition />
    <ChatBot />
    <Geolocation />
    <ObjectDetection />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FaceRecognition from "@/components/FaceRecognition.vue";
import ChatBot from "@/components/ChatBot.vue";
import Geolocation from "@/components/Geolocation.vue";
import ObjectDetection from "@/components/ObjectDetection.vue";
import store from "@/store";

@Component({
  components: {
    FaceRecognition,
    ChatBot,
    Geolocation,
    ObjectDetection
  }
})
export default class Home extends Vue {
  mounted() {
    store.dispatch("fetchInitalMessages");
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-image {
    max-width: 300px;
  }
}
</style>
