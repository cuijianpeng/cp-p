<template>
  <div class="sidebar">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务讲解</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="dialogClose"></el-button>
      </div>
      <div class="sidebar-content">
          <div v-html="formatHtml(sideBarData.detail)"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import showdown from 'showdown'
var showdownConverter = new showdown.Converter();

export default {
  data() {
    return {};
  },
  props:['visibleStatus', 'sideBarData', 'sideBarCloseHandler'],
  methods:{
    formatHtml(v){
      return showdownConverter.makeHtml(v)
    },
    dialogClose(){
      this.visibleStatus.sidebar = !!0
      this.$emit('sideBarCloseHandler');
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  text-align: left;
  position: fixed;
  width: 240px;
  right: 20px;
  top: 20%;
  z-index: 999;
  &-content{
    height: 50vh;
    overflow: auto;
  }
}
</style>
