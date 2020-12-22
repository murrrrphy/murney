<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        @click="select(item)"
        class="tabs-item"
        :class="{[classPrefix+'-item']: classPrefix,selected: item.value ===value}">
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type dataSourceItem = {
    text: string;
    value: string;
  }

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array})
    dataSource!: dataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    select(item: dataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: #75b9be;
    display: flex;
    text-align: center;
    font-size: 24px;

    &-item {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #023e8a;
      }
    }
  }
</style>