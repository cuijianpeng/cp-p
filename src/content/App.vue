<template>
<div class="chrome-plugin-insertPage">
  <el-container v-if="visibleStatus.defaultPage">
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
              <el-avatar size="medium" shape="square" slot="reference">{{userInfo.username}}</el-avatar>
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

      <div style="width: 80%; margin: 0 auto;">
        <div>
          <div style="float: right;">
            <el-button type="text" @click="visibleStatus.sidebar = true">查看任务讲解</el-button>
            <el-button type="text" @click="visibleStatus.mainbar = !visibleStatus.mainbar">{{visibleStatus.mainbar? '收起': '展开'}}任务面板</el-button>
          </div>
          <div style="padding-top: 12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>当前任务</el-breadcrumb-item>
              <el-breadcrumb-item>青铜任务</el-breadcrumb-item>
              <el-breadcrumb-item>设置自动回复</el-breadcrumb-item>
              <el-breadcrumb-item>收到消息自回复</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
        </div>
        
        
        <div v-if="visibleStatus.mainbar">

          <!-- <div style="margin: 0 auto 24px; padding: 48px 0 24px;">
            <el-steps :active="2" align-center finish-status="success">
              <el-step title="新手任务"></el-step>
              <el-step title="青铜任务"></el-step>
              <el-step title="白银任务"></el-step>
              <el-step title="黄金任务"></el-step>
            </el-steps>
          </div> -->
          <div class="cardlist">
            <el-card shadow="hover" v-for="(item,index) in taskList" :key="index">
              <div :class="['elCardContent','elCardContent-' + item.status, Object.keys(sideBarData).length && sideBarData.id == item.id?'elCardContent-active':'']" @click="showSideBar(item)">
                {{item.name}}
              </div>
            </el-card>
            <!-- <el-card shadow="hover">
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
            </el-card> -->
          </div>
          <div style="margin: 0 auto 24px; padding: 48px 0; width: 80%; text-align: center;" v-if="Object.keys(sideBarData).length">
            <el-button type="primary" plain @click="submit">完成任务</el-button>
          </div>
        </div>
      </div>
      
    </el-main>
  </el-container>

  <sideBar 
    :visibleStatus="visibleStatus" 
    :sideBarData="sideBarData" 
    @sideBarCloseHandler="sideBarCloseHandler"
    v-if="visibleStatus.sidebar" />
</div>
</template>

<script>
import {baseUrl} from './request.js'
import sideBar from "./components/sideBar.vue";
import {sendRequest,searchParse,getCookie} from "./utils.js"

export default {
  data() {
    return {
      // start
      cmsCookies:{},
      fromHostCookies:{},
      headers:{
        mtk: '',
        fromHost: '',
        fromHostKey: '',
        fromHostEmail: '',
        fromHostAvatar: '',
        fromHostNick: '',
        fromHostBroken: 0,
        fromHostToken: '',
      },
      userInfo:{},
      taskList: [],
      sideBarData: {},
      // end
      activeIndex: "1",
      visibleStatus: {
        defaultPage: false,
        sidebar: false,
        mainbar: true,
      }
    };
  },
  created(){
    this.refresh();
    this.listener();
  },
  components: {
    sideBar
  },
  methods: {
    initHeaders(){
      if (Object.keys(this.cmsCookies).length) {
        this.headers['mtk'] = this.cmsCookies['mtk']
      }
      if (Object.keys(this.fromHostCookies).length) {
        this.headers['fromHost'] = window.location.origin
        this.headers['fromHostKey'] = this.fromHostCookies['slave_user']
        this.headers['fromHostEmail'] = ''
        this.headers['fromHostAvatar'] = ''
        this.headers['fromHostNick'] = ''
        this.headers['fromHostBroken'] = 0
      }
    },
    sideBarCloseHandler(obj){
      this.visibleStatus.sidebar = !!0
      this.sideBarData = {};
    },
    showSideBar(r){

      if (/2/gi.test(r.status)) {

        this.$alert('该任务已完成.', "消息", {
          confirmButtonText: "确定",
          callback: action => {}
        });

        return;
      }
      this.sideBarData = r;
      this.visibleStatus.sidebar = true;
    },
    listener(){
      var that = this,
          _portName = [window.location.origin],
          port;

      if (that.headers['fromHostToken']) {
        _portName.push(that.headers['fromHostToken'])
      }
      _portName.push(new Date().valueOf())

      port = chrome.extension.connect({
        name: _portName.join('-')
      });

      port.onMessage.addListener(function(msg) {
        if (/explicit|overwrite/gi.test(msg.cause)) {
            if (/mtk/gi.test(msg.cookie.name)) {
              that.refresh()
            }
        }
      });
    },
    refresh(){
      var that = this,
          _query = searchParse();
      if (_query.token && _query.token.length) {
        that.headers['fromHostToken'] = _query.token;
        getCookie({
            type: 'cookie',
            method: 'get',
            info: {
              url: baseUrl + 'backend/moodle',
              // name: 'mtk'
            }
          },function(res) {
            
            if (res && res.length) {
              res.forEach(function(v,i){
                that.cmsCookies[v.name] = v.value;
              })
            }
            that.initHeaders();
            if (that.cmsCookies['mtk']) {
                that.checkUser()
            }
            
        }); 
      }
    },
    checkUser(res){

      var that = this;

      getCookie({
        type: 'cookie',
        method: 'get',
        info: {
          url: window.location.href,
          // name: 'slave_user'
        }
      },function(res) {
        
        if (res && res.length) {
          res.forEach(function(v,i){
            that.fromHostCookies[v.name] = v.value;
          })
        }
        that.initHeaders()
        if (that.fromHostCookies['slave_user']) {

          sendRequest({
            type: 'api',
            info: {
              url: 'backend/Moodle/checkMTK',
              method: 'get',
              headers: that.headers,
              data: {}
            }
          },function(res) {

            if (/^0$/gi.test(res.code)) {
              that.getTaskList();
              that.userInfo = res.info;
              that.visibleStatus.defaultPage = !!1
              return;
            }

            that.$alert(res.msg, "消息", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            
          });

        }

      });       
    },
    getTaskList(){
      var that = this;

      sendRequest({
        type: 'api',
        info: {
          url: 'backend/task/get_list',
          method: 'get',
          headers: that.headers,
          params: {
            plat_account_id: that.fromHostCookies['slave_user']
          }
        }
      },function(res) {
        that.taskList = res.data;
        console.log(res)
        var _href = window.location.origin + window.location.pathname;
        var _reg = new RegExp('^' + _href, 'gi')
        res.data.forEach(function(v,i){
          if(_reg.test(v.url)){
            that.sideBarData = v;
          }
        })
      });

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submit() {
      var that = this;
      sendRequest({
        type: 'api',
        info: {
          url: 'backend/task/save_user_task',
          method: 'get',
          headers: that.headers,
          params: {
            plat_account_id: that.fromHostCookies['slave_user'],
            task_id: that.sideBarData.id,
            status: 2
          }
        }
      },function(res) {

        if (/^0$/gi.test(res.code)) {
          that.getTaskList();
          that.sideBarCloseHandler();
          that.$alert("完成任务", "消息", {
            confirmButtonText: "确定",
            callback: action => {}
          });

          return;

        }

        that.$alert(res.msg, "消息", {
          confirmButtonText: "确定",
          callback: action => {}
        });

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
        padding-top: 24px;
        .elCardContent {
            height: 180px;
            width: 180px;
            line-height: 180px;
            font-size: 20px;
            cursor: pointer;
            &-0{}
            &-1{
              color: #409EFF;
            }
            &-2{
              color: #67C23A;
            }
            &-active{
              background: rgb(236, 245, 255);
            }
        }
        .elCardContentDetail {
            min-width: 400px;
            text-align: left;
            // min-height: 200px;
        }
        .el-card {
            display: inline-block;
            margin: 12px 12px;
        }
    }

}
</style>
