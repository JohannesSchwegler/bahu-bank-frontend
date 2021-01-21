<template>
  <div class="home">
    <img class="home-image" alt="Bahu Bank logo" src="../assets/svg/Bahu.svg" />
    <h1>Innot Bahu Bank</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  mounted() {
    this.$store.dispatch("fetchInitalMessages");
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
