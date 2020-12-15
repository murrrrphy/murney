<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag"
                     v-for="tag in tags"
                     :key="tag.id"
                     :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagList';

  tagListModel.fetch();
  @Component
  export default class Labels extends Vue {
    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
          window.alert('标签重复');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;

      svg {
        color: #666;
        height: 18px;
        width: 18px;
        margin-right: 16px;
      }
    }
  }

  .createTag {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    padding: 8px 16px;

    &-wrapper {
      text-align: center;
      padding: 16px;
      margin: 44-16px;
    }
  }
</style>