<template>
  <div class="boxIndex">
    
    <div v-if="cmsCookies['mtk']">
      <div v-if="Object.keys(userInfo).length">
        <div :style="{'height': '120px', 'background-size': '100% 100%','background': 'url(' + bg + ')', 'padding': '0 16px 0'}">
          <div style="padding-top:36px; color: #fff;">
            <el-row>
              <el-col :span="4">
                <div class="block"><el-avatar :size="50"></el-avatar></div>
              </el-col>
              <el-col :span="16">
                <div style="margin-left: 12px; font-size: 14px; line-height: 1.8;">
                  <div style="font-size: 15px;">新希望职业教育学院</div>
                  <div style="font-size: 12px;">学员：{{userInfo.username}}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="text-align: right;">
                  <span style="font-size: 24px; line-height: 48px;" class="el-icon-arrow-right"></span>
                </div>
              </el-col>
            </el-row>
          </div>
          
        </div>
        <div style="margin-bottom: 12px; border-bottom: 1px solid #EDEDED; line-height: 32px; background: #fff; color: #C0C4CC; padding: 0 16px; display: blcok;">
          <el-row>
            <el-col :span="20">
              <div style="font-size: 12px; color: #333;">已绑定的新媒体号</div>
            </el-col>
            <el-col :span="4">
              <div style="text-align: right; font-size: 12px; color: #333;">
                <a href="http://45.63.123.94/backend/moodle/mainPage" target="_blank">管理</a>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-bottom: 12px; padding: 0 16px;" v-for="(item,index) in accountList" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="block">
                <el-avatar :size="50" :src="icon_wx" v-if="/https:\/\/mp\.weixin\.qq\.com/gi.test(item.fromHost)"></el-avatar>
                <el-avatar :size="50" style="margin-left: -25px;" :src="item.fromHostAvatar"></el-avatar>
                </div>
            </el-col>
            <el-col :span="16">
              <div style="margin-left: 12px; font-size: 14px; line-height: 1.8;">
                <div style="font-size: 15px; color: #333;">{{item.fromHostNick}}</div>
                <div style="font-size: 12px; color: #bfbfbf">ID:{{item.fromHostKey}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin: 12px;" v-else>
        <el-row>
          <el-col :span="24">
            <div style="text-align: center; padding-bottom: 12px;">
              <div style="margin-top: 80px; margin-bottom: 18px;">
                <img :src="empty" alt="">
              </div>
              <div style="font-size: 14px; color: #C0C4CC; margin-bottom: 16px;">您的微信账号尚未绑定实训平台</div>
              <el-button style="color: #fff; margin-bottom: 64px; width: 220px; height: 48px; background-color: #1361f0;" type="primary" plain @click="bindEvtClickHandler">立即绑定</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="text-align: center;" v-else>
      <div>
        <div style="margin-top: 80px; margin-bottom: 64px;">
          <img :src="logo" alt="">
        </div>
        <div style="font-size: 14px; color: #C0C4CC; margin-bottom: 16px;">您还没有登录，请先登录再进行操作</div>
        <el-button style="margin-bottom: 64px; width: 220px; height: 48px; background-color: #1361f0;" type="primary" @click="loginEvtClickHandler">立即登陆</el-button>
      </div>
    </div>
    <div>
      <div style="line-height: 40px; background: #fdf6ec; color: #C0C4CC; text-align: center;" v-if="versionInfo.need_update">
        您的插件不最新版本,
        <a href="javascript:void(0)" @click="closeEvtClickHandler" style="">立即更新</a>
      </div>
      <div style="border-top: 1px solid #EDEDED; line-height: 40px; background: #fff; color: #C0C4CC; padding: 0 16px; display: blcok;" v-else>
        <span style="float: right;">当前版本号: {{version}}</span>
        <a href="javascript:void(0)">帮助</a>
      </div>
    </div>
  </div>
  
</template>

<script>
import icon_tt from './../../images/icon-tt.png'
import icon_wx from './../../images/icon-wx.png'
import empty from './../../images/icon-empty.png'
import bg from './../../images/bg.png'
import logo from './../../images/icon-logo.png'
import {baseUrl} from './../../../content/request.js'
import {sendRequest,searchParse,getCookie} from "./../../../content/utils.js"

var defaultThis;
export default {
  data() {
    return {
      icon_wx,
      icon_tt,
      empty,
      bg,
      logo,
      // start
      version: '1.0.0',
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
      accountList: [],
      versionInfo:{
      }
    };
  },
  created(){
    defaultThis = this;
    console.log(defaultThis, window.location)
    this.checkVersion()
    this.refresh();
    this.listener();
    
  },
  components: {
  },
  methods: {
    checkVersion(){
      var that = this,
        _version = this.version;
      sendRequest({
        type: 'api',
        info: {
          url: 'backend/Plugin/check',
          method: 'post',
          data: {
            version: _version
          }
        }
      },function(res) {
        that.versionInfo = res.data;
      });
    },
    closeEvtClickHandler(){
      window.open(this.versionInfo.download_url);
    },
    bindEvtClickHandler(){
      window.open('http://45.63.123.94/backend/moodle/mainPage#');
    },
    loginEvtClickHandler(){
      window.open('http://45.63.123.94/backend/Moodle/login');
    },
    initHeaders(){
      if (Object.keys(this.cmsCookies).length) {
        this.headers['mtk'] = this.cmsCookies['mtk']
      }
      this.headers['fromHost'] = window.location.origin
      this.headers['fromHostKey'] = ''
      this.headers['fromHostEmail'] = ''
      this.headers['fromHostAvatar'] = ''
      this.headers['fromHostNick'] = ''
      this.headers['fromHostBroken'] = 0
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
      var that = this;
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
            that.$forceUpdate();
            that.checkUser()
            return;
        }
        
        chrome.extension.sendRequest({
          type: 'fn',
          method: 'setBadgeText',
          info:{
            text: '?'
          }
        });
          
      }); 

    },
    checkUser(res){

      var that = this;

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

          that.userInfo = res.info;
          that.accountList = res.account_list;

          chrome.extension.sendRequest({
            type: 'fn',
            method: 'setBadgeText',
            info:{
              text: ''
            }
          });
          return;
        }

        chrome.extension.sendRequest({
          type: 'fn',
          method: 'setBadgeText',
          info:{
            text: '!'
          }
        });
        
      });       
    }
  }
};
</script>

<style lang="scss" scoped>
.boxIndex{
  font-size: 14px;
  width: 320px;;
}
a{
  text-decoration: none;
  color: #1361f0;
}
</style>