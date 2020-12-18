<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
    <InputItem field-name="备注"
               placeholder="在这里输入备注"
               :value.sync="record.notes"/>
    <Tags @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tabs from '@/components/Tabs.vue';
  import InputItem from '@/components/Money/InputItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/constants/typeList';

  @Component({
    components: {Tags, InputItem, Tabs, NumberPad},
  })
  export default class Money extends Vue {
    typeList = typeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateTag(value: []) {
      this.record.tags = value;
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        window.alert('已保存');
        this.record.notes = '';
      }
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>