import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record) {
      const deepClone: RecordItem = clone(record);
      deepClone.createdAt = deepClone.createdAt || new Date().toISOString();
      state.recordList.push(deepClone);
      store.commit('saveRecords');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(!state.tagList || state.tagList.length ===0){
        store.commit('createTag', '餐饮');
        store.commit('createTag', '零食');
        store.commit('createTag', '交通');
        store.commit('createTag', '服饰');
        store.commit('createTag', '健身');
        store.commit('createTag', '医疗');
        store.commit('createTag', '购物');
        store.commit('createTag', '餐饮');
        store.commit('createTag', '日用');
        store.commit('createTag', '旅行');
        store.commit('createTag', '学习');
        store.commit('createTag', '烟酒');
        store.commit('createTag', '居家');
        store.commit('createTag', '通讯');
        store.commit('createTag', '游戏');
        store.commit('createTag', '宠物');
        store.commit('createTag', '房租');
        store.commit('createTag', '水电');
        store.commit('createTag', '数码');
        store.commit('createTag', '工资');
        store.commit('createTag', '奖金');
        store.commit('createTag', '红包');
        store.commit('createTag', '报销');
      }
    },
    createTag(state, name: string) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter((item: { id: string }) => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
  },
  actions: {},
  modules: {}
});

export default store;
