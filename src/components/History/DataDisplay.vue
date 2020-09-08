<template>
  <v-container fluid>
    <v-row>
      <!--展示方式选择标签-->
      <v-tabs grow v-model="tabItem">
        <v-tab v-for="(tabItem, index) in tabItems" :key="index">
          <v-icon>{{ tabItem.icon }}</v-icon>
          {{ tabItem.title }}
        </v-tab>
      </v-tabs>
      <!--数据展示-->
      <v-tabs-items v-model="tabItem" style="width:100%">
        <!--        图表展示-->
        <v-tab-item :key="0">
          <v-chart :options="dataChart" style="width:100%" />
        </v-tab-item>
        <!--        表格展示-->
        <v-tab-item :key="1">
          <v-card>
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
              dark
              dense
              multi-sort
              class="elevation-1"
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
  @Prop() dataChart!: any;
  /**
   * 表格-表头
   */
  @Prop() dataHeader!: any[];
  /**
   * 表格-数据
   */
  @Prop() dataBody!: any[];
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
