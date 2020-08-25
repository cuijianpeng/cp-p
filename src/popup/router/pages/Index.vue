<template>
  <div class="boxIndex">
    <el-alert
      title="您的插件不最新版本"
      type="warning"
      @close="closeEvtClickHandler"
      close-text="立即更新">
    </el-alert>
    <div v-if="cmsCookies['mtk']">
      <div style="margin: 12px;" v-if="Object.keys(userInfo).length">
        <div style="margin-bottom: 48px;">
          <el-row>
            <el-col :span="4">
              <div class="block"><el-avatar :size="50"></el-avatar></div>
            </el-col>
            <el-col :span="16">
              <div style="margin-left: 12px; font-size: 14px; line-height: 1.8;">
                <div>新希望职业教育学院</div>
                <div>学员：{{userInfo.username}}</div>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="text-align: right;">
                <span style="font-size: 24px; line-height: 48px;" class="el-icon-arrow-right"></span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-bottom: 8px;">
          <el-row>
            <el-col :span="20">
              <div style="font-size: 12px; color: #333;">已绑定的新媒体号</div>
            </el-col>
            <el-col :span="4">
              <div style="text-align: right; font-size: 12px; color: #333;">
                管理
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="padding-bottom: 12px;" v-for="(item,index) in accountList" :key="index">
          <el-row>
            <el-col :span="4">
              <div class="block"><el-avatar :size="50"></el-avatar></div>
            </el-col>
            <el-col :span="16">
              <div style="margin-left: 12px; font-size: 14px; line-height: 1.8;">
                <div>{{item.hostName}}</div>
                <div>学员：{{item.fromHostNick}}</div>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="text-align: right;">
                <span style="font-size: 24px; line-height: 48px;" class="el-icon-check"></span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin: 12px;" v-else>
        <el-row>
          <el-col :span="24">
            <div style="text-align: center; padding-bottom: 12px;">
              <div style="margin: 24px; color: #333;">您的微信账号尚未绑定实训平台</div>
              <el-button type="primary" plain @click="bindEvtClickHandler">立即绑定</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="text-align: center;" v-else>
      <div style="padding-bottom: 12px;">
        <div style="margin: 24px; font-size: 14px; color: #333;">新媒体实训平台简介</div>
        <el-button type="primary" plain @click="loginEvtClickHandler">立即登陆</el-button>
      </div>
    </div>
    
  </div>
  
</template>

<script>
import {baseUrl} from './../../../content/request.js'
import {sendRequest,searchParse,getCookie} from "./../../../content/utils.js"

var defaultThis;
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
      accountList: []
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
      var that = this;
      sendRequest({
        type: 'api',
        info: {
          url: 'backend/Plugin/check',
          method: 'post',
          data: {
            version: '1.0.0'
          }
        }
      },function(res) {
        console.log(res)
      });
    },
    closeEvtClickHandler(){
      window.open('http://45.63.123.94/backend/Moodle/login');
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
</style>