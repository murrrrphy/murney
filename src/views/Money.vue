<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <div class="createdAt">
      <InputItem field-name="日期"
                 type="date"
                 placeholder="在这里输入日期"
                 :value.sync="record.createdAt"/>
    </div>
    <div class="notes">
      <InputItem field-name="备注"
                 placeholder="在这里输入备注"
                 :value.sync="record.notes"/>
    </div>
    <Tags @update:value="onUpdateTag"  :tagCommit = "tagCommit"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
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
    tagCommit = false;
    typeList = typeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};

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
        this.tagCommit = true;
      }
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>