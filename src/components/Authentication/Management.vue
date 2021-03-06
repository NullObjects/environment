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
          readonly
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
          v-model="oldPassword"
          type="password"
          color="success"
          class="mt-3"
          label="OldPassword"
          prepend-icon="mdi-onepassword"
          dense
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          type="password"
          color="success"
          class="mt-3"
          label="NewPassword"
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
            v-model="selected"
            :headers="dataHeader"
            :items="dataBody"
            :search="search"
            :items-per-page="5"
            item-key="user"
            dense
            single-select
            show-select
            multi-sort
            style="background:rgba(128, 128, 128, 0)"
          ></v-data-table>
        </v-card>
        <v-spacer></v-spacer>
        <v-btn text @click="manageMenu = false">取消</v-btn>
        <v-btn text @click="Modify">修改</v-btn>
        <v-btn text @click="Delete">删除</v-btn>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SecurityRsa from "@/components/Application/SecurityRsa";

@Component
export default class Register extends Vue {
  /**
   * 登录状态控制
   */
  @Prop() isLogin!: { login: boolean };

  manageMenu = false;
  user = "";
  roles = "public::";
  email = "";
  oldPassword = "";
  newPassword = "";

  alert = false;
  alertType = "warning";
  alertMsg = "";

  table = false;
  selected = [];
  search = "";
  dataHeader = [
    { text: "用户", value: "user" },
    { text: "角色", value: "roles" },
    { text: "邮箱", value: "email" }
  ];
  dataBody: object[] = [];

  /**
   * 选项变更
   */
  @Watch("selected")
  onSelectedChanged() {
    if (this.selected.length != 1) return;
    this.user = this.selected[0]["user"];
    this.roles = this.selected[0]["roles"];
    this.email = this.selected[0]["email"];
    this.oldPassword = "oldPassword";
  }

  /**
   * 密码确认
   */
  @Watch("newPassword")
  onPasswordChange() {
    if (this.newPassword.length > 15) {
      this.alert = true;
      this.alertMsg = "密码长度不能大于15位";
    } else {
      this.alert = false;
      this.alertMsg = "";
    }
  }

  /**
   * 状态初始化
   */
  mounted(): void {
    this.user = "";
    this.roles = "public::";
    this.email = "";
    this.oldPassword = "";
    this.newPassword = "";

    this.alert = false;
    this.alertType = "warning";
    this.alertMsg = "";

    this.table = false;
    this.selected = [];
    this.search = "";
    this.dataHeader = [
      { text: "用户", value: "user" },
      { text: "角色", value: "roles" },
      { text: "邮箱", value: "email" }
    ];
    this.dataBody = [];

    this.getUser();
  }

  /**
   * 获取用户列表
   */
  getUser(): void {
    this.axios
      .get("Authentication/Information")
      .then(Response => {
        this.dataBody = [];
        if (typeof Response.data.length === "number") {
          // 管理员获取所有用户
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
          // 普通用户获取当前用户
          this.user = Response.data.userName;
          this.roles = Response.data.role;
          this.email = Response.data.email;
        }
      })
      .catch(Error => {
        this.alert = true;
        this.alertType = "warning";
        this.alertMsg = "获取用户信息失败";
        console.log(Error);
      });
  }

  /**
   * 修改用户信息
   * @constructor
   */
  Modify(): void {
    //检验信息
    if (
      this.user == "" ||
      this.roles == "" ||
      this.email == "" ||
      this.oldPassword == "" ||
      this.newPassword == ""
    ) {
      this.alert = true;
      this.alertType = "warning";
      this.alertMsg = "请检查修改信息";
      return;
    }
    this.axios
      .post("Authentication/Modify", {
        username: this.user,
        role: this.roles,
        email: this.email,
        oldPassword: SecurityRsa.Encrypt(this.oldPassword),
        password: SecurityRsa.Encrypt(this.newPassword)
      })
      .then(Response => {
        this.alert = true;
        this.alertType = "success";
        this.alertMsg = this.user + Response.data;
        // 非管理员，退出登录;管理员，刷新数据
        if (!this.table) this.isLogin.login = false;
        else this.getUser();
      })
      .catch(Error => {
        this.alert = true;
        this.alertType = "warning";
        this.alertMsg = "修改失败,请确定原密码";
        console.log(Error);
      });
  }

  /**
   * 删除用户信息
   * @constructor
   */
  Delete(): void {
    this.axios
      .get("Authentication/Delete/" + this.user)
      .then(Response => {
        console.log("DeleteSuccess" + Response.data);
        // 非管理员，退出登录;管理员，刷新数据
        if (!this.table) this.isLogin.login = false;
        else this.getUser();
      })
      .catch(Error => {
        this.alert = true;
        this.alertType = "warning";
        this.alertMsg = "删除失败";
        console.log(Error);
      });
  }
}
</script>
