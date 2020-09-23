<template>
  <v-container>
    <v-menu
      ref="loginMenu"
      v-model="loginMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3" icon outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-shield-account</v-icon>
          登录
        </v-btn>
      </template>
      <v-card color="primary" class="rounded-xl" no-title scrollable>
        <v-text-field
          v-model="user"
          color="success"
          class="mt-3"
          label="User"
          prepend-icon="mdi-account"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          color="success"
          class="mt-3"
          label="Password"
          prepend-icon="mdi-onepassword"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn text @click="loginMenu = false">Cancel</v-btn>
        <v-btn text @click="Login">OK</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  loginMenu = false;
  user = "";
  password = "";

  $refs!: { loginMenu: HTMLFormElement };

  Login(): void {
    this.$refs.loginMenu.save();

    window.localStorage["token"] = this.user + this.password;

    this.user = "";
    this.password = "";
  }
}
</script>
