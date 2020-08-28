<template>
<div class="chrome-plugin-insertPage">
  <el-container v-if="visibleStatus.defaultPage">
    <el-header>
      <headerContent :userInfo="userInfo" />
    </el-header>
    
    <el-main>

      <div style="margin: 0 auto;" v-show="Object.keys(sideBarData).length">
        <!-- <div>
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
          
        </div> -->
        
        <div v-show="visibleStatus.mainbar">

          <!-- <div style="margin: 0 auto 24px; padding: 48px 0 24px;">
            <el-steps :active="2" align-center finish-status="success">
              <el-step title="新手任务"></el-step>
              <el-step title="青铜任务"></el-step>
              <el-step title="白银任务"></el-step>
              <el-step title="黄金任务"></el-step>
            </el-steps>
          </div> -->
          <div style="height: 104px;">
             <div style="position: relative; padding: 0 40px;">
              <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(item,index) in taskList" :key="index">
                  <div class="mySwiperItem" @click.stop="swiperSlideTo(item,index,false)" style="cursor: pointer; width: 100%;">
                    <div>
                      <div :class="{mySwiperItemHeader: 1, mySwiperItemHeaderSuccess: item.status == '2'}">{{index + 1}}.{{[item.name].join('')}}</div>
                      <div style="height: 44px; line-height: 44px; border-top: 1px solid #efefef;" class="mySwiperItemContent">
                        <div v-if="item.id == sideBarData.id && diffUrl(item)">
                          <el-button type="text" icon="el-icon-warning-outline" @click.stop="showSideBar(item,index)">查看讲解</el-button>
                          <span style="display: inline-block; width: 1px; background: #efefef; height: 14px; vertical-align: middle;margin: 0 8px;"></span>
                          <el-button type="text" icon="el-icon-circle-check" @click.stop="submit(item,index)" :disabled="/2/gi.test(item.status)">{{/2/gi.test(item.status)?'已完成':'完成任务'}}</el-button>
                        </div>
                        <div v-else>
                          <el-button type="text" @click.stop="swiperSlideTo(item,index, true)">执行任务</el-button>
                        </div>
                        
                      </div>
                    </div>
                    
                  </div>
                </swiper-slide>              
              </swiper>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
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
import headerContent from "./components/header.vue";
import {sendRequest,searchParse,getCookie} from "./utils.js"
import 'swiper/css/swiper.css'

import logo from './images/@1x/logo.png'
import prev from './images/@1x/prev.png'
import next from './images/@1x/next.png'
import success from './images/@1x/success.png'

var defaultThis;
export default {
  data() {
    return {
      logo,
      prev,
      next,
      success,
      swiperOptions: {
        slidesPerView: 7,
        spaceBetween : 0,
        centeredSlides: true,
        observer:true,
        observeParents:true,
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
            defaultThis.swiperSlideTo(defaultThis.taskList[this.activeIndex], this.activeIndex, false)
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
    headerContent,
    sideBar,
    Swiper,
    SwiperSlide
  },
  methods: {
    diffUrl(v){
      var _href = window.location.origin + window.location.pathname;
      var _reg = new RegExp('^' + _href, 'gi');
      return _reg.test(v.url);
    },
    showHideMainBar(){
      var that = this;
      this.visibleStatus.mainbar = !this.visibleStatus.mainbar;
    },
    swiperSlideTo(r,i, s){

      if(s && r.url.length){
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
                return;
            }else{ }
            
        }); 
        return;
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

          return;
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

      if (/2/gi.test(r.status)) {
        return;
      }

      that.$confirm('须完成所有操作步骤,并输出实训结果,如检测发现未完成,该任务将扣除得分', '确认完成该任务', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirmButtonClass',
        cancelButtonClass: 'cancelButtonClass',
        type: 'warning'
      }).then(() => {

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

      }).catch(() => {});
            
    }
  }
};
</script>
<style lang="scss">
.confirmButtonClass{
  color: rgb(255, 255, 255)!important;
  background: rgb(102, 177, 255)!important;
  border-color: rgb(102, 177, 255)!important;
}
.cancelButtonClass{
  color: rgb(64, 158, 255)!important;
  background-color: rgb(236, 245, 255)!important;
  border-color: rgb(198, 226, 255)!important;
}
.swiper-button-prev{
  &::after{
    content: '';
    background: url('./images/@1x/prev.png') no-repeat 0 0;
    width: 13px;
    height: 22px;
  }
}
.swiper-button-next{
  &::after{
    content: '';
    background: url('./images/@1x/next.png') no-repeat 0 0;
    width: 13px;
    height: 22px;
  }
}
</style>
<style lang="scss" scoped>
.chrome-plugin-insertPage {
    text-align: left;
    .swiper-slide{
      &:hover{
        transition: none;
        margin-top: -4px;
      }
    }
    .swiper-slide-active{
      .mySwiperItem{
        background: #fff;
        
        .mySwiperItemContent{
          display: block;;
        }
      }
    }
    .mySwiperItem{
      border: 1px solid #ECECF4;
      background: #F8F8FC;
      .mySwiperItemHeader{
          font-size: 18px; color: #252631; line-height: 64px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding: 0 12px;

      }
      .mySwiperItemHeaderSuccess{
        background: url('./images/@1x/success.png') no-repeat right center;
      }
      .mySwiperItemContent{
        display: none;
      }
      &:hover{
        background: #fff;
        .mySwiperItemContent{
          display: block;
        }
      }
    }
    .swiper-slide-active{
      transform: scale(0.8)!important;
      margin-top: -4px;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next,
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
      top: 0;
      margin-top: 12px!important;
    }
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
