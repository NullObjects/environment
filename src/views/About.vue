<template>
  <v-container class="home text-center">
    <v-row justify="center">
      <v-img
        alt="environment Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo/environment.svg"
        transition="scale-transition"
        width="80"
      />
      <v-img
        alt="self Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo/self.png"
        transition="scale-transition"
        width="80"
      />
    </v-row>
    <v-row justify="center">
      <v-img
        alt="vue Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo/vue.svg"
        transition="scale-transition"
        width="60"
      />
      <v-img
        alt="vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo/vuetify.svg"
        transition="scale-transition"
        width="60"
      />
      <v-img
        alt="echarts Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo/echarts.svg"
        transition="scale-transition"
        width="60"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>
