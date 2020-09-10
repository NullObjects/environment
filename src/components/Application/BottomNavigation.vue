<template>
  <v-container>
    <v-bottom-navigation v-if="!draw" color="primary" app grow hide-on-scroll>
      <v-btn v-for="item in items" :key="item.title">
        <router-link tag="span" :to="item.link">{{ item.title }}</router-link>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BottomNavigation extends Vue {
  @Prop() draw!: boolean;
  items = [
    { title: "环境监控", icon: "mdi-view-dashboard", link: "/" },
    { title: "设备状态", icon: "mdi-devices", link: "/device" },
    { title: "About", icon: "mdi-help-box", link: "/about" }
  ];
}
</script>
