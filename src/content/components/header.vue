<template>
    <div class="header-wrapper">
        <div class="header-content">
            <div style="float: right; margin-right: 20px;">
                <ul class="list-inline">
                    <li>
                        <el-badge :value="4" class="hasDot">
                            通知中心
                        </el-badge>
                    </li>
                    <li>帮助中心</li>
                    <li>
                        <el-dropdown>
                            <span>
                                李晓明<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>帐户信息</el-dropdown-item>
                                <el-dropdown-item>登出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>
            <ul class="list-inline nav">
                <li class="nav-item logo">
                    <img :src="logo" alt="">
                </li>
                <li class="nav-item">
                    <a href="" class="active">首页</a>
                </li>
                <li class="nav-item">
                    <a href="">任务中心</a>
                </li>
                <li class="nav-item">
                    <a href="">实用工具</a>
                </li>
                <li class="nav-item">
                    <a href="">素材中心</a>
                </li>
                <li class="nav-item">
                    <a href="">发文记录</a>
                </li>
                <li class="nav-item">
                    <a href="">新媒体帐号管理</a>
                </li>
                <li class="nav-item">
                    <a href="">课程平台</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import logo from './../images/@1x/logo.png'

export default {
  data() {
    return {
        logo
    };
  },
  props:[],
  methods:{
  }
};
</script>
<style lang="scss">
.hasDot{
    .el-badge__content.is-fixed{
        top: 20px;
        border: none!important;
        right: 4px;
    }
}
</style>
<style lang="scss" scoped>
.header-wrapper{
    padding-top: 60px;
    
}
.header-content{
    position: fixed;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background:#12223E;
    .nav{
        .nav-item{
            &.logo{
                font-size: 0;
                padding: 0;
                margin-left: 20px!important;
                img{
                    vertical-align: middle;
                    padding: 0;
                    margin: 0;
                }
            }
            a{
                color: #D8D8D8;
                font-size: 16px;
                display: block;
                &:hover,
                &.active{
                    font-size: 16px;
                    color: #4F8DFF;
                    position: relative;
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 2em;
                        height: 2px;
                        background: #4F8DFF;
                        position: absolute;
                        left: 50%;
                        margin-left: -1em;
                        bottom: 12px;
                        border-radius: 1px;
                    }
                }
            }
        }
    }
    
    
    .list-inline{
        li{
            display: inline-block;
            margin-left: 40px;  
            color: #D8D8D8;
            font-size: 16pxx;          
        }
    }
}
</style>
