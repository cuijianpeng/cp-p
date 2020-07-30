<template>
<div class="chrome-plugin-insertPage">
  <el-container>
    <el-header>
      <div class="el-header-content">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item style="float: right;">
            <el-popover placement="bottom" width="320" trigger="click">
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
                    <li>帐号222</li>
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
    </el-header>
    <el-main>
      <div class="">

        <div style="margin: 0 auto 24px; padding: 48px 0; width: 80%;">
          <el-steps :active="2" align-center finish-status="success">
            <el-step title="新手任务"></el-step>
            <el-step title="青铜任务"></el-step>
            <el-step title="白银任务"></el-step>
            <el-step title="黄金任务"></el-step>
          </el-steps>
        </div>
        <div class="cardlist">
          <el-card shadow="hover">
            <div class="elCardContent">
              自定义菜单
            </div>
          </el-card>
          <el-card shadow="hover">

            <div slot="header" class="clearfix">
              <div style="text-align: left;">
                <span>设置自动回复</span>
                <el-button size="mini" style="float: right; padding: 3px 0" type="text">关闭</el-button>
              </div>
            </div>
            <div class="elCardContentDetail">
              <div style="">
                <div style="clear: both; height: inherit; overflow: hidden; margin-bottom: 12px;">
                  <div style="float: right;">
                    <el-button size="mini" @click="visibleStatus.sidebar = true">任务讲解</el-button>
                    <el-button size="mini">已完成</el-button>
                  </div>
                  被关注自动回复
                  <div style="font-size: 12px; color: #bfbfbf;">已有8940个学员完成此任务</div>
                </div>
                <div style="clear: both; height: inherit; overflow: hidden; margin-bottom: 12px;">
                  <div style="float: right;">
                    <el-button size="mini" @click="visibleStatus.sidebar = true">任务讲解</el-button>
                    <el-button size="mini">已完成</el-button>
                  </div>
                  收到消息自动回复
                  <div style="font-size: 12px; color: #bfbfbf;">已有7940个学员完成此任务</div>
                </div>
                <div style="clear: both; height: inherit; overflow: hidden;">
                  <div style="float: right;">
                    <el-button size="mini" @click="visibleStatus.sidebar = true">任务讲解</el-button>
                    <el-button size="mini">已完成</el-button>
                  </div>
                  关键词自动回复
                  <div style="font-size: 12px; color: #bfbfbf;">已有5940个学员完成此任务</div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover">
            <div class="elCardContent">
              发布一篇文章
            </div>
          </el-card>
          <el-card shadow="hover">
            <div class="elCardContent">
              开启赞赏功能
            </div>
          </el-card>
        </div>
        <div style="margin: 0 auto 24px; padding: 48px 0; width: 80%; text-align: center;">
          <el-button type="primary" plain @click="submit">完成任务</el-button>
        </div>
      </div>
    </el-main>
  </el-container>

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
.chrome-plugin-insertPage {
    text-align: left;
    .el-header{
      padding-top: 61px;
      .el-header-content{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        background: #fff;
      }
    }
    .cardlist {
        text-align: center;

        .elCardContent {
            height: 180px;
            width: 180px;
            line-height: 180px;
            font-size: 24px;
        }
        .elCardContentDetail {
            min-width: 400px;
            text-align: left;
            // min-height: 200px;
        }
        .el-card {
            display: inline-block;
            margin: 0 12px;
        }
    }

}
</style>
