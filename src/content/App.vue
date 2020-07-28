<template>
<div class="chrome-plugin-insertPage">
  <div class="">
    <div style="margin-bottom: 24px;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="float: right;">
          <el-popover
            placement="bottom"
            width="320"
            trigger="click">
            <div style="text-align: left;">
              <div style="margin: 12px 0 12px; border-bottom: 1px solid #efefef; padding-bottom: 12px;">
                <div style="float: right;">课程平台</div>
                任务阶段
              </div>
              <div>
                青铜任务-设置自动回复
              </div>
              <div style="margin: 12px 0 12px; border-bottom: 1px solid #efefef; padding-bottom: 12px;">
                <div style="float: right;">管理</div>
                已绑定新媒体帐号
              </div>
              <div>
                <ul>
                  <li>帐号121</li>
                  <li>帐号22</li>
                </ul>
              </div>
            </div>
            <el-avatar size="medium" shape="square" slot="reference" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </el-popover>
        </el-menu-item>
        <el-menu-item disabled>
          LOGO:
          新媒体营销实训平台
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">首页</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">任务中心</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">实用工具</el-menu-item>
        <el-menu-item index="3">素材中心</el-menu-item>
        <el-menu-item index="4">发文记录</el-menu-item>
        <el-menu-item index="5">新媒体帐号管理</el-menu-item>
        <el-menu-item index="6">课程平台</el-menu-item>
      </el-menu>
    </div>
    <div style="margin: 0 auto 24px; padding: 48px 0; width: 80%;">
      <el-steps :active="2" align-center finish-status="success">
        <el-step title="新手任务"></el-step>
        <el-step title="青铜任务"></el-step>
        <el-step title="白银任务"></el-step>
        <el-step title="黄金任务"></el-step>
      </el-steps>
    </div>
    <div style="margin: 48px auto 24px; padding: 0; width: 80%;">
      <el-collapse accordion v-model="activeName">
        <el-collapse-item title="自定义菜单" name="1">
          <div style="margin: 12px 12px 0;">
            <div style="clear: both; height: inherit; overflow: hidden; margin-bottom: 12px; line-height: 40px;">
              <div style="float: right;">
                <el-button type="primary" plain @click="visibleStatus.sidebar = true">任务讲解</el-button>
                <el-button type="primary">已完成</el-button>
              </div>
              被关注自动回复
              <span style="font-size: 12px; color: #bfbfbf;">已有8940个学员完成此任务</span>
            </div>
            <div style="clear: both; height: inherit; overflow: hidden; margin-bottom: 12px; line-height: 40px;">
              <div style="float: right;">
                <el-button type="primary" plain @click="visibleStatus.sidebar = true">任务讲解</el-button>
                <el-button type="primary">已完成</el-button>
              </div>
              收到消息自动回复
              <span style="font-size: 12px; color: #bfbfbf;">已有7940个学员完成此任务</span>
            </div>
            <div style="clear: both; height: inherit; overflow: hidden; line-height: 40px;">
              <div style="float: right;">
                <el-button type="primary" plain @click="visibleStatus.sidebar = true">任务讲解</el-button>
                <el-button type="primary">已完成</el-button>
              </div>
              关键词自动回复
              <span style="font-size: 12px; color: #bfbfbf;">已有5940个学员完成此任务</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="设置自动回复" disabled name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="发布一篇文章" disabled name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="开启赞赏功能" disabled name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>

    </div>
    <div style="margin: 0 auto 24px; padding: 48px 0; width: 80%; text-align: center;">
      <el-button type="primary" plain @click="submit">完成任务</el-button>
    </div>
  </div>
  <sideBar :visibleStatus="visibleStatus" v-if="visibleStatus.sidebar" />
</div>
</template>

<script>
import sideBar from "./components/sideBar.vue";
export default {
  data() {
    return {
      activeName: "1",
      activeIndex: "1",
      activeIndex2: "1",
      visibleStatus: {
        sidebar: false
      }
    };
  },
  components: {
    sideBar
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submit() {
      this.$alert("完成任务", "消息", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chrome-plugin-insertPage{
  text-align: left;
}
</style>
