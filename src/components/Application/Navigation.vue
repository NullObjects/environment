<template>
  <v-container>
    <v-navigation-drawer
      v-model="navDrawer.draw"
      color="primary"
      :src="bg"
      app
      expand-on-hover
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="'px-0'">
          <v-list-item-avatar>
            <v-img
              alt="self Logo"
              class="shrink mr-2"
              contain
              src="../../assets/self.png"
              transition="scale-transition"
              width="40"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>HomeEnvironment</v-list-item-title>
            <v-list-item-subtitle>NullObject</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link tag="p" :to="item.link">{{ item.title }}</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
  @Prop() navDrawer!: { draw: boolean };
  items = [
    { title: "环境监控", icon: "mdi-view-dashboard", link: "/" },
    { title: "设备状态", icon: "mdi-devices", link: "/device" },
    { title: "About", icon: "mdi-help-box", link: "/about" }
  ];

  background = false;

  get bg() {
    return this.background
      ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      : undefined;
  }
}
</script>
