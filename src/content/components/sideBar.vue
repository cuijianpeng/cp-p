<template>
  <div class="sidebar">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务讲解</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="visibleStatus.sidebar = !!0">关闭</el-button>
      </div>
      <div>
          <el-input placeholder="搜索任务讲解" />
      </div>
      <div>
          <ul>
              <li>收到消息自动回复</li>
              <li>1.准备好关注回复文字，图片</li>
              <li>2.为文字分段，适配移动端阅读</li>
              <li>3.添加到微信后台被关注自动回复</li>
          </ul>
      </div>
      <div>
          <ul>
            <li>image</li>
          </ul>
      </div>
      <div>
          <ul>
              <li>相关任务</li>
              <li>关键词自动回复</li>
              <li>被关注自动回复</li>
          </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['visibleStatus']
};
</script>
<style lang="scss" scoped>
.sidebar {
  text-align: left;
  position: fixed;
  width: 400px;
  right: 12px;
  top: 24%;
  z-index: 999;;
}
</style>
