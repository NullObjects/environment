<template>
  <v-container>
    <v-row>
      <v-chart :options="Environment" style="width:100%" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnvironmentChart from "./EnvironmentChart";

@Component
export default class EnvironmentRefresh extends Vue {
  Environment = new EnvironmentChart().LineChart;

  timer = 0;
  mounted(): void {
    this.Environment.title.text = "环境趋势(实时)";
    this.Environment.xAxis.axisLabel.interval = 10;

    this.InitData();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.RefreshData();
      }, 60000);
    }
  }

  destroyed(): void {
    clearInterval(this.timer);
  }

  /**
   * 刷新数据
   * @constructor
   */
  InitData(): void {
    this.axios
      .get("/Environment/Get/hour")
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
        }
      })
      .catch(Error => {
        console.log("axiosErr:" + Error);
      });
  }

  /**
   * 刷新数据
   * @constructor
   */
  RefreshData(): void {
    this.axios
      .get("/Environment/Get/latest")
      .then(Response => {
        // 数据量大于指定数量
        if (this.Environment.xAxis.data.length >= 60) {
          this.Environment.xAxis.data.shift();
          this.Environment.series[0].data.shift();
          this.Environment.series[1].data.shift();
        }
        this.Environment.xAxis.data.push(
          Response.data.recordTime.replace("T", " ")
        );
        this.Environment.series[0].data.push(Response.data.temperature);
        this.Environment.series[1].data.push(Response.data.humidity);
      })
      .catch(Error => {
        console.log("axiosErr:" + Error);
      });
  }
}
</script>
