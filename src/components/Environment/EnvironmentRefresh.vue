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

  timer: any;

  mounted(): void {
    this.Environment.title.text = "环境趋势(实时)";
    this.Environment.xAxis.axisLabel.interval = 10;

    this.RefreshData();
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

  RefreshData(): void {
    this.axios
      .get("/Environment/Get/latest")
      .then(Response => {
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
        console.log("Err:" + Error);
      });
  }
}
</script>
