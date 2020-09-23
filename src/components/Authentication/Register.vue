<template>
  <v-container>
    <v-menu
      ref="registerMenu"
      v-model="registerMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3" icon outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-account-plus</v-icon>
          注册
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
          v-model="email"
          color="success"
          class="mt-3"
          label="Email"
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
        <v-text-field
          v-model="confirm"
          type="password"
          color="success"
          class="mt-3"
          label="Confirm"
          prepend-icon="mdi-onepassword"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn text @click="registerMenu = false">Cancel</v-btn>
        <v-btn text @click="Register">OK</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  registerMenu = false;
  user = "";
  email = "";
  password = "";
  confirm = "";

  $refs!: { registerMenu: HTMLFormElement };

  Register(): void {
    this.$refs.registerMenu.save();

    window.localStorage["token"] = this.user + this.password;

    this.user = "";
    this.email = "";
    this.password = "";
    this.confirm = "";
  }
}
</script>
