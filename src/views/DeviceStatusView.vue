<template>
  <v-container class="home text-center">
    <img alt="Vue logo" src="../assets/logo.svg" width="80" />
    <DeviceStatusRefresh />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeviceStatusRefresh from "@/components/DeviceStatus/DeviceStatusRefresh.vue";

@Component({
  components: {
    DeviceStatusRefresh
  }
})
export default class DeviceStatusView extends Vue {}
</script>