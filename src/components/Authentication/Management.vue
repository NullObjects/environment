<template>
  <v-container>
    <v-menu
      ref="manageMenu"
      v-model="manageMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3" icon outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-account-edit</v-icon>
          {{ user }}
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
          v-model="roles"
          color="success"
          class="mt-3"
          label="Group"
          prepend-icon="mdi-account-group"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="email"
          color="success"
          class="mt-3"
          label="Email"
          prepend-icon="mdi-email"
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
        <v-alert
          v-model="alert"
          :type="alertType"
          dismissible
          dense
          border="top"
          colored-border
          >{{ alertMsg }}
        </v-alert>
        <v-card v-if="table" style="background:rgba(128, 128, 128, 0)">
          <v-card-title>
            用户信息
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="dataHeader"
            :items="dataBody"
            :search="search"
            :items-per-page="5"
            dense
            single-select
            multi-sort
            style="background:rgba(128, 128, 128, 0)"
          ></v-data-table>
        </v-card>
        <v-spacer></v-spacer>
        <v-btn text @click="manageMenu = false">取消</v-btn>
        <v-btn text>修改</v-btn>
        <v-btn text>注册</v-btn>
        <v-btn text>删除</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  manageMenu = false;
  user = "";
  roles = "public::";
  email = "";
  password = "";
  confirm = "";

  alert = false;
  alertType = "warning";
  alertMsg = "";

  table = false;
  search = "";
  dataHeader = [
    { text: "用户", value: "user" },
    { text: "角色", value: "roles" },
    { text: "邮箱", value: "email" }
  ];
  dataBody: object[] = [];

  /**
   * 状态初始化
   */
  mounted(): void {
    this.user = "";
    this.roles = "public::";
    this.email = "";
    this.password = "";
    this.confirm = "";

    this.alert = false;
    this.alertType = "warning";
    this.alertMsg = "";

    this.table = false;
    this.search = "";
    this.dataHeader = [
      { text: "用户", value: "user" },
      { text: "角色", value: "roles" },
      { text: "邮箱", value: "email" }
    ];
    this.dataBody = [];

    this.axios
      .get("Authentication/Information")
      .then(Response => {
        if (typeof Response.data.length === "number") {
          Response.data.forEach(
            (element: { userName: string; role: string; email: string }) => {
              this.dataBody.push({
                user: element.userName,
                roles: element.role,
                email: element.email
              });
              if (element.userName == window.localStorage["user"]) {
                this.user = element.userName;
                this.roles = element.role;
                this.email = element.email;
              }
            }
          );
          this.table = true;
        } else {
          this.user = Response.data.userName;
          this.roles = Response.data.role;
          this.email = Response.data.email;
        }
      })
      .catch(Error => {
        this.alert = true;
        this.alertMsg = "获取用户信息失败";
        console.log(Error);
      });
  }
}
</script>
