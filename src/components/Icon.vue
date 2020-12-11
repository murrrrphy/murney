<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-'+name"></use>
  </svg>
</template>

<script lang="ts">
  export default {
    name: 'icon',
    props: ['name']
  };
</script>

<style lang="scss" scoped>
  .icon {
    height: 32px;
    width: 32px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>