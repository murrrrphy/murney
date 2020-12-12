<template>
  <Layout classPrefix="layout">
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags :data-source.sync="tags"/>
  </Layout>
</template>

<script>
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  export default {
    name: 'money',
    components: {Tags, Notes, Types, NumberPad},
    data(){
      return {
        tags: ['衣','食','住','行','娱乐','学习']
      }
    }
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>