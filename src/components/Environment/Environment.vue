<template>
  <v-container fluid>
    <DataPicker
      @on-span-change="RefreshData"
      @on-start-change="RefreshData"
      @on-end-change="RefreshData"
    />
    <DataDisplay
      :data-chart="Environment"
      :data-header="tableHeader"
      :data-body="tableBody"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnvironmentChart from "./EnvironmentChart";
import DataPicker from "@/components/History/DataPicker.vue";
import DataDisplay from "@/components/History/DataDisplay.vue";

@Component({
  components: {
    DataPicker,
    DataDisplay
  }
})
export default class Environment extends Vue {
  /**
   * 图表
   */
  Environment = new EnvironmentChart().LineChart;
  /**
   * 表头
   */
  tableHeader = [
    { text: "记录时间", value: "recordTime" },
    { text: "温度*C", value: "temperature" },
    { text: "湿度%", value: "humidity" }
  ];

  /**
   * 数据
   */
  get tableBody() {
    const table: any[] = [];
    this.Environment.xAxis.data.forEach((val, index) => {
      table.push({
        recordTime: val,
        temperature: this.Environment.series[0].data[index],
        humidity: this.Environment.series[1].data[index]
      });
    });
    return table;
  }

  /**
   * 刷新数据
   * @param value:axios参数
   * @constructor
   */
  RefreshData(value: string): void {
    this.axios
      .get("/Environment/Get/" + value)
      .then(Response => {
        this.Environment.xAxis.data = [];
        this.Environment.series[0].data = [];
        this.Environment.series[1].data = [];
        if (typeof Response.data.length === "number") {
          //获取多条数据
          Response.data.forEach(
            (element: {
              recordTime: string;
              temperature: number;
              humidity: number;
            }) => {
              this.Environment.xAxis.data.push(
                element.recordTime.replace("T", " ")
              );
              this.Environment.series[0].data.push(element.temperature);
              this.Environment.series[1].data.push(element.humidity);
            }
          );
        } else {
          //获取一条数据
          for (let i = 0; i < 5; i++) {
            this.Environment.xAxis.data.push(
              Response.data.recordTime.replace("T", " ")
            );
            this.Environment.series[0].data.push(Response.data.temperature);
            this.Environment.series[1].data.push(Response.data.humidity);
          }
        }
      })
      .catch(Error => {
        console.log(Error);
      });
  }
}
</script>
