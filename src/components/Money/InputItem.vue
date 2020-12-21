<template>
  <div>
    <label class="inputItem">
      <span class="name">{{this.fieldName}}</span>
      <template v-if="type === 'date'">
        <input :type="type||'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
      <template v-else>
        <input :type="type||'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class InputItem extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() type?: string;
    @Prop() placeholder?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    x(isoString: string){
      return dayjs(isoString).format('YYYY-MM-DD')
    }
  }
</script>

<style lang="scss" scoped>
  .inputItem {
    font-size: 14px;
    display: flex;
    padding-left: 16px;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>