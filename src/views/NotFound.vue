<template>
  <div>
    <div>404</div>
    <div>
      <router-link to="/">
        <Button>返回首页</Button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Button from '@/components/Button.vue';
  export default {
    name: 'NotFound',
    components: {Button}
  };
</script>

<style lang="scss" scoped>

</style>