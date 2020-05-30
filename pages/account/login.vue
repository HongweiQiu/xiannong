<template>
	<view class="login">
		<view>
			<uni-nav-bar left-icon="arrowleft" :status-bar="navBar" fixed="true" @clickLeft="LeftClick"></uni-nav-bar>

			<view class="logo_width"><image class="login_logo" src="../../static/img/addcart.png" mode=""></image></view>
		</view>
		<view class="login_method">
			<!-- 手机登录 -->
			<view class="mobilelogin">
				<view class="phone align_center">
					<text class="iconfont icon-yonghu"></text>
					<input type="number" placeholder="请输入手机号码" placeholder-class="place_style"/>
				</view>
				<view class="password align_center">
					<text class="iconfont icon-mima"></text>
					<input password="true" placeholder="请输入密码" placeholder-class="place_style"/>
				</view>
				<view class="determine_mobile">登录</view>

				<view class="flex_left_right">
					<view class="">立即注册</view>
					<view class="">忘记密码</view>
				</view>
			</view>
			<!-- 微信登录 -->
			<view class="wechat_login">
				<view class="">
					<view class="divider gray_font">其他登录</view>
					<view class="weixin_button">
						<image class="weixin_img" src="../../static/img/wechat.png" mode=""></image>
						<text>微信登录</text>
					</view>
					<view class="read_treaty">
						已阅读并同意
						<text>注册协议</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return {
			// #ifdef APP-PLUS
			navBar:true
			// #endif
			// #ifdef MP-WEIXIN
			navBar:false
			// #endif
		}
	},
	methods: {
		clickLeft() {}
	}
};
</script>

<style>
page {
	background: #fff;
}
.logo_width {
	text-align: center;
	margin: 60rpx 0 80rpx;
}
.login .login_logo {
	width: 300rpx;
	height: 92rpx;
}
.login .login_method {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.login .phone,
.login .password {
	display: flex;
}
.login .mobilelogin {
	width: 580rpx;
	margin: 0 auto;
}
.login .determine_mobile {
	background: #009a44;
	height: 80rpx;
	color: white;
	border-radius: 12rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 32rpx;
	margin: 60rpx 0 20rpx;
}
.login .phone,
.login .password {
	border-bottom: 1px solid #c2c2c2;
	margin-top: 50rpx;
}
.login .phone .iconfont,
.login .password .iconfont{color:#46C68A; margin-right:5rpx;}
.login .password .iconfont {margin-top: 2rpx;font-size: 35rpx;}
.wechat_login {
	position: fixed;
	bottom: 20rpx;
	width: 100%;
	text-align: center;
	font-size: 24rpx;
}
.wechat_login .divider{display: flex;align-items: center;margin: 0 20rpx;}
.wechat_login .divider:before {
	content: '';
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: #eaeaea;
    border-style: solid;
    border-width: 1px 0 0;
	margin-right:20rpx;
}
.wechat_login .divider:after {
	margin-left:20rpx;
	content: '';
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: #eaeaea;
    border-style: solid;
    border-width: 1px 0 0;
}
.wechat_login .weixin_img {
	width: 90rpx;
	height: 90rpx;
	margin-bottom: 5rpx;
}
.login .weixin_button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 41rpx 0 89rpx;
	align-items: center;
}
.wechat_login .read_treaty{font-size: 20rpx;} 
.wechat_login .read_treaty text{color:#1ea55a;} 
.login .place_style{font-size:28rpx;color:#c2c2c2;}
</style>
