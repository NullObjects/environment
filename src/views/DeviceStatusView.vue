<template>
  <v-container class="home text-center">
    <img alt="Vue logo" src="../assets/logo.svg" width="80" />
    <DeviceStatusRefresh />
    <DeviceStatus />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeviceStatusRefresh from "@/components/DeviceStatus/DeviceStatusRefresh.vue";
import DeviceStatus from "@/components/DeviceStatus/DeviceStatus.vue";

@Component({
  components: {
    DeviceStatusRefresh,
    DeviceStatus
  }
})
export default class DeviceStatusView extends Vue {}
</script>
