<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes"></div>
    <InputItem field-name="备注"
               placeholder="在这里输入备注"
               @update:value="onUpdateNotes"/>
    <Tags @update:value="onUpdateTag"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import InputItem from '@/components/Money/InputItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';


  @Component({
    components: {Tags, InputItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    get recordList(){
      return this.$store.state.recordList;
    }
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateTag(value: []){
      this.record.tags = value;
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
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