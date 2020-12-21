<template>
  <Layout>
    <Tabs :data-source="typeList" class-prefix="type" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="x"></Chart>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="(item,index) in group.items"
              :key="index"
              class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="show-notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import typeList from '@/constants/typeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';

  @Component({
    components: {Tabs, Chart}
  })
  export default class Statistics extends Vue {
    get y(){
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {title: dateString});
        array.push({date: dateString, amount: found ? found.total : 0});
      }
      array.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date === b.date) {
          return 0;
        } else {
          return -1;
        }
      });
      return array
    }

    get x() {
      const keys = this.y.map(item => item.date);
      const values = this.y.map(item => item.amount);
      return {
        grid: {
          left: 8,
          right: 8,
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {lineStyle: {color: '#666'}},
          type: 'category',
          data: keys
        },
        yAxis: {
          show: false
        },
        series: [{
          symbolSize: 12,
          itemStyle: {color: '#666'},
          data: values,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }],
        tooltip: {show: true, triggerOn: 'click', position: 'top'}
      };
    }

    tagString(tags: Tag[]) {
      const tagNames = [];
      if (tags.length === 0) {
        return '无';
      }
      for (let i = 0; i < tags.length; i++) {
        tagNames.push(tags[i].name);
      }
      return tagNames.join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList).filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    type = '-';
    typeList = typeList;

    created() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }
  }
</script>

<style lang="scss" scoped>
  .noResult {
    padding: 16px;
    text-align: center;
  }

  ::v-deep .type-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  ::v-deep .interval-item {
    height: 48px;
    font-size: 18px;
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item
  }

  .record {
    background: white;
    @extend %item
  }

  .show-notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

  .echarts {
    max-width: 100%;
    height: 400px;
  }

  .chart {
    width: 430%;

    &-wrapper {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>