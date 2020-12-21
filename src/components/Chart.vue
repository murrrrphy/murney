<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop,Watch} from 'vue-property-decorator';
  import {EChartsOption} from 'echarts';
  import * as echarts from 'echarts';

  @Component
  export default class Charts extends Vue {
    @Prop() options?: EChartsOption;
    chart?: any;
    mounted(){
      if(this.options === undefined){
        return console.error('options 为空');
      }
      this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
      this.chart.setOption(this.options)
    }

    @Watch('options')
    onOptionsChanged(newValue: EChartsOption){
      this.chart.setOption(newValue);
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 400px;
  }
</style>