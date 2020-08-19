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

      <div style="width: 80%; margin: 0 auto;" v-show="Object.keys(sideBarData).length">
        <div>
          <div style="float: right;">
            <el-button type="text" @click="visibleStatus.sidebar = true">查看任务讲解</el-button>
            <el-button type="text" @click="showHideMainBar">{{visibleStatus.mainbar? '收起': '展开'}}任务面板</el-button>
          </div>
          <div style="padding-top: 12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>当前任务</el-breadcrumb-item>
              <el-breadcrumb-item v-if="Object.keys(sideBarData).length">{{sideBarData.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
        </div>
        
        <div v-show="visibleStatus.mainbar">

          <!-- <div style="margin: 0 auto 24px; padding: 48px 0 24px;">
            <el-steps :active="2" align-center finish-status="success">
              <el-step title="新手任务"></el-step>
              <el-step title="青铜任务"></el-step>
              <el-step title="白银任务"></el-step>
              <el-step title="黄金任务"></el-step>
            </el-steps>
          </div> -->

          <div style="position: relative; padding: 40px;">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="(item,index) in taskList" :key="index">
                <div @click="swiperSlideTo(item,index)" style="margin: 24px auto 12px;">
                  <div style="font-size: 14px;">{{[item.name].join('-')}}</div>
                  <div>
                    <el-button type="text" @click.stop="showSideBar(item,index)">查看讲解</el-button>
                    <el-button type="text" @click.stop="submit(item,index)" :disabled="/2/gi.test(item.status)">{{/2/gi.test(item.status)?'已完成':'完成任务'}}</el-button>
                  </div>
                </div>
              </swiper-slide>              
            </swiper>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
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
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import {baseUrl} from './request.js'
import sideBar from "./components/sideBar.vue";
import {sendRequest,searchParse,getCookie} from "./utils.js"
import 'swiper/css/swiper.css'

var defaultThis;
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 40,
        centeredSlides: true,
        height: 240,
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on:{
          slideChangeTransitionEnd:function(){
            console.log(defaultThis,this.activeIndex);
            defaultThis.swiperSlideTo(defaultThis.taskList[this.activeIndex], this.activeIndex)
          },
        }
      },
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
      sideBarDataIndex: 0,
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
  computed:{
    swiper: function () {
      return this.$refs.mySwiper.$swiper
    },
  },
  created(){
    defaultThis = this;
    console.log(defaultThis)
    this.refresh();
    this.listener();
  },
  components: {
    sideBar,
    Swiper,
    SwiperSlide
  },
  methods: {
    showHideMainBar(){
      var that = this;
      this.visibleStatus.mainbar = !this.visibleStatus.mainbar;
    },
    swiperSlideTo(r,i){
      
      if(this.sideBarData.id == r.id){
        return;
      }

      if(r.url.length){
        window.location.href = r.url;
      }
      this.sideBarData = r;
      this.sideBarDataIndex = i;
      this.swiper.slideTo(i);
    },
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

        // 微信公众平台
        if (/https:\/\/mp\.weixin\.qq\.com/gi.test(window.location.origin)) {
          var _box = document.getElementsByClassName('weui-desktop-account__info'),
              _fromHostAvatar = _box[0].getElementsByClassName('weui-desktop-account__thumb')[0].src,
              _fromHostNick = _box[0].getElementsByClassName('weui-desktop-account__nickname')[0].innerText;
       
          this.headers['fromHostAvatar'] = _fromHostAvatar? encodeURIComponent(_fromHostAvatar): '';
          this.headers['fromHostNick'] = _fromHostNick? encodeURIComponent(_fromHostNick): '';
        }
      }
    },
    sideBarCloseHandler(obj){
      this.visibleStatus.sidebar = !!0
      // this.sideBarData = {};
    },
    showSideBar(r,i){
      this.swiperSlideTo(r,i);
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

              if (res.first_time) {
                that.$message({
                  message: res.msg,
                  type: 'success'
                });
              }
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
        var _reg = new RegExp('^' + _href, 'gi');
        that.sideBarDataIndex = 0;
        res.data.forEach(function(v,i){
          
          if(_reg.test(v.url)){
            console.log(_reg.test(v.url),_href,v.url)
            that.sideBarDataIndex = i;
            that.sideBarData = v;
          }
        })

        console.log(that.sideBarData.url)
        if(Object.keys(that.sideBarData).length == 0){
          that.sideBarDataIndex = 0;
          that.sideBarData = that.taskList[0]
        }

        that.swiper.slideTo(that.sideBarDataIndex);
      });

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submit(r,i) {
      var that = this;

      this.swiperSlideTo(r,i);

      if (/2/gi.test(r.status)) {
        return;
      }

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

    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	  transition: 300ms;
	  transform: scale(0.8);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}

    
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
            height: 80px;
            width: 80px;
            line-height: 80px;
            font-size: 14px;
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
