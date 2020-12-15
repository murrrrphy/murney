<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes"></div>
    <InputItem field-name="备注"
           placeholder="在这里输入备注"
           @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import InputItem from '@/components/Money/InputItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/models/recordList';
  import tagListModel from  '@/models/tagList'

  const recordList: RecordItem[] = model.fetch();
  const tagList = tagListModel.fetch();

  @Component({
    components: {Tags, InputItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    recordList: RecordItem[] = recordList;
    tags = tagList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string){
      this.record.notes = value;
    }

    saveRecord() {
      const deepClone: RecordItem = model.clone(this.record);
      deepClone.createdAt = new Date();
      this.recordList.push(deepClone);
    }

    @Watch('recordList')
    onRecordListChanged() {
      model.save(this.recordList);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes{
    padding: 12px 0;
  }
</style>