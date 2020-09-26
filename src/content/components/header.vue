<template>
    <div class="header-wrapper">
        <div class="header-content">
            <div>
                <div class="header-content-right" style="float: right; margin-right: 20px;">
                    <ul class="list-inline">
                    <li>
                        <el-badge :value="4" class="hasDot">
                            通知中心
                        </el-badge>
                    </li>
                    <li>帮助中心</li>
                    <li v-if="Object.keys(userInfo).length">
                        <el-dropdown>
                            <span style="color: #D8D8D8;">
                                <el-avatar style="vertical-align: middle; margin-right: 4px;" size="medium" src=""></el-avatar>
                                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
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
                        <a target="_blank" href="http://45.63.123.94/backend/moodle/login">首页</a>
                    </li>
                    <li class="nav-item">
                        <a target="_blank" href="http://45.63.123.94/backend/moodle/mainPage" class="active">任务中心</a>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0)" class="hasSubMenu">实用工具</a>
                    </li>
                    <li class="nav-item">
                        <a target="_blank" href="http://45.63.123.94/backend/moodle/login">实训记录</a>
                    </li>
                    <li class="nav-item">
                        <a target="_blank" href="http://lincoursema.1xzhengshu.com/">课程平台</a>
                    </li>
                </ul>
            </div>
            <div class="header-content-dropdown">
                <div class="container">
                    <div class="row">
                        <ul class="list-inline">
                            <li>
                                <div>
                                    <div>热点趋势</div>
                                    <ul>
                                        <li><a target="_blank" href="https://tophub.today/">今日热榜</a></li>
                                        <li><a target="_blank" href="http://index.baidu.com/v2/index.html#/">百度指数</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>排版工具</div>
                                    <ul>
                                        <li><a target="_blank" href="https://www.135editor.com/">135编辑器</a></li>
                                        <li><a target="_blank" href="https://xiumi.us/#/">秀米</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>在线做图</div>
                                    <ul>
                                        <li><a target="_blank" href="https://www.chuangkit.com/?dontjump=1">创客贴</a></li>
                                        <li><a target="_blank" href="https://www.canva.cn/zh_cn/">canva</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>数据分析</div>
                                    <ul>
                                        <li><a target="_blank" href="https://www.newrank.cn/">新榜</a></li>
                                        <li><a target="_blank" href="https://www.feigua.cn/?chl=baidu-dy">飞瓜数据</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
  props:['userInfo'],
  methods:{
  },
  mounted(){
      $(document).ready(function() {
        console.log('ready')



        // 导航下拉菜单
        var timer = null,
            headerWrapper = $('.header-wrapper'),
            headerContentDropdown = headerWrapper.find('.header-content-dropdown');
        
        headerContentDropdown.mouseover(function() {
            clearTimeout(timer)
        }).mouseout(function(evt) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                headerContentDropdown.fadeOut('fast')
            }, 400)
        });

        headerWrapper.find('.hasSubMenu').mouseover(function(evt) {
            headerContentDropdown.fadeIn('fast')
        }).mouseout(function(evt) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                headerContentDropdown.fadeOut('fast')
            }, 400)
        })

    })
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
.header-wrapper {
    padding-top: 60px;
    // white mode
    &.header-wrapper-white {
        padding-top: 0;
        .header-content-dropdown {
            width: 640px;
            margin-left: 298px;
            position: fixed;
            z-index: 999;
            .container,
            .row {
                width: 100%;
            }
            .list-inline {
                height: inherit;
                overflow: hidden;
                >li {
                    width: 20%;
                    padding: 0;
                    float: left;
                    margin: 0;
                    >div {
                        margin: 48px 0 48px 48px;
                        font-size: 14px;
                        line-height: 2;
                        >div {
                            // font-weight: bold;
                            font-size: 16px;
                            color: #333;
                        }
                        ul {
                            a {
                                color: #888;
                            }
                        }
                    }
                }
            }
        }
        .header-content {
            background: none;
            position: inherit;
            &-right {
                color: #fff;
                a {
                    color: #fff;
                }
                .list-inline li {
                    color: #fff;
                    .dropdown-toggle {
                        color: #fff;
                    }
                }
            }
            .nav {
                .nav-item {
                    &.logo {
                        div {
                            width: 233px;
                            height: 26px;
                            // background: url('./images/logo-black.png') no-repeat 0 0;
                        }
                    }
                    a {
                        color: #999999;
                        &:hover,
                        &.active {
                            color: #252631;
                        }
                    }
                }
            }
        }
    }
    .badge {
        vertical-align: text-top;
        background: #F9204A;
        color: #fff;
        position: relative;
        right: 12px;
        top: -10px;
    }
    .header-content {
        position: fixed;
        height: 60px;
        line-height: 60px;
        vertical-align: middle;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        background: #12223E;
        &-right {
            color: #D8D8D8;
            .list-inline li {
                color: #D8D8D8;
                .dropdown-toggle {
                    color: #D8D8D8;
                }
            }
        }
        .nav {
            .nav-item {
                position: inherit!important;
                vertical-align: middle;
                &.logo {
                    font-size: 0;
                    padding: 0;
                    margin-left: 20px!important;
                    img {
                        vertical-align: middle;
                        padding: 0;
                        margin: 0;
                    }
                    div {
                        width: 233px;
                        height: 26px;
                        // background: url('./images/logo.png') no-repeat 0 0;
                    }
                }
                a {
                    color: #D8D8D8;
                    font-size: 16px;
                    display: block;
                    padding: 0!important;
                    &:hover,
                    &.active {
                        font-size: 16px;
                        color: #4F8DFF;
                        position: relative;
                        background: none;
                        &::after {
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
        .dropdown-menu {
            left: auto!important;
            right: -8px;
            >li a {
                line-height: 32px;
            }
        }
        .dropdown-toggle {
            padding: 0!important;
        }
        .list-inline {
            >li {
                display: inline-block;
                margin-left: 40px;
                color: #D8D8D8;
                font-size: 16px;
                padding-right: 0!important;
            }
        }
    }
    .header-content-dropdown {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
        display: none;
        .container{
            margin: 0 208px;
        }
        .list-inline {
            height: inherit;
            overflow: hidden;
            >li {
                width: 20%;
                padding: 0;
                float: left;
                >div {
                    margin: 48px 0 48px 48px;
                    font-size: 14px;
                    line-height: 2;
                    >div {
                        // font-weight: bold;
                        font-size: 16px;
                        color: #333;
                    }
                    ul {
                        a {
                            color: #888;
                        }
                    }
                }
            }
        }
    }
}
</style>
