<template>
  <Layout>
    <Tabs :data-source="typeList" class-prefix="type" :value.sync="type"/>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{beautify(group.title)}}</h3>
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
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import typeList from '@/constants/typeList';
  import dayjs from 'dayjs';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
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

    get result() {
      const {recordList} = this;
      type hashTableValue = { title: string; items: RecordItem[] }
      const hashTable: { [key: string]: hashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    typeList = typeList;

    created() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .type-item {
    background: white;

    &.selected {
      background: #c4c4c4;

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
</style>