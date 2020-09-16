<template>
  <v-container>
    <v-row>
      <!--展示方式选择标签-->
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
        <!--        图表展示-->
        <v-tab-item :key="0">
          <v-chart :options="dataChart" style="width:100%" />
        </v-tab-item>
        <!--        表格展示-->
        <v-tab-item :key="1">
          <v-card style="background:rgba(128, 128, 128, 0)">
            <v-card-title>
              历史信息
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
              dense
              multi-sort
              style="background:rgba(128, 128, 128, 0)"
            ></v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DataDisplay extends Vue {
  /**
   * 图表
   */
  @Prop() dataChart!: object;
  /**
   * 表格-表头
   */
  @Prop() dataHeader!: object[];
  /**
   * 表格-数据
   */
  @Prop() dataBody!: object[];
  /**
   * 表格-搜索
   */
  search = "";

  /**
   * 展示方式选择
   */
  tabItem = 0;
  /**
   * 展示方式
   */
  tabItems = [
    { title: "图表", icon: "mdi-chart-line" },
    { title: "表格", icon: "mdi-table" }
  ];
}
</script>
