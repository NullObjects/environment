<template>
  <v-container class="home text-center">
    <!--展示信息选择标签-->
    <v-tabs
      grow
      v-model="tabItem"
      color="accent"
      background-color="rgba(128, 128, 128, 0)"
    >
      <v-tab v-for="(tabItem, index) in tabItems" :key="index">
        <v-icon>{{ tabItem.icon }}</v-icon>
        {{ tabItem.title }}
      </v-tab>
    </v-tabs>
    <!--数据展示-->
    <v-tabs-items
      v-model="tabItem"
      style="width:100%; background:rgba(128, 128, 128, 0)"
    >
      <!--当前-->
      <v-tab-item :key="0">
        <DeviceStatusRefresh />
      </v-tab-item>
      <!--历史-->
      <v-tab-item :key="1">
        <DeviceStatus />
      </v-tab-item>
    </v-tabs-items>
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
export default class DeviceStatusView extends Vue {
  /**
   * 展示信息选择
   */
  tabItem = 0;
  /**
   * 展示信息
   */
  tabItems = [
    { title: "当前", icon: "mdi-refresh-circle" },
    { title: "历史", icon: "mdi-history" }
  ];
}
</script>
