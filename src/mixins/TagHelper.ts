import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name === '') {
      return window.alert('标签名不能为空');
    }else if(name === null){
      return;
    }
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      if(this.$store.state.createTagError.message === 'tag name duplicated'){
        window.alert('标签名重复了')
      }
    }
  }
}