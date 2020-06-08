<template>
	<view class="login">
		<view>
			<uni-nav-bar left-icon="arrowleft" :status-bar="navBar" fixed="true" @clickLeft="clickLeft"></uni-nav-bar>

			<view class="logo_width"><image class="login_logo" :src="logo" mode="aspectFit"></image></view>
		</view>
		<view class="login_method">
			<!-- 手机登录 -->
			<view class="mobilelogin">
				<view class="phone align_center">
					<text class="iconfont icon-yonghu"></text>
					<input type="number" placeholder="请输入手机号码" v-model="mobile" placeholder-class="place_style" />
				</view>
				<view class="password align_center">
					<text class="iconfont icon-mima"></text>
					<input password placeholder="请输入密码" v-model="password" placeholder-class="place_style" />
				</view>
				<view class="determine_mobile" @click="mobileLogin">登录</view>

				<view class="flex_left_right">
					<view class="" @click="pageUrl('register')">立即注册</view>
					<view class="" @click="pageUrl('forget')">忘记密码</view>
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
import md5 from '../../static/js/md5.js';
import rs from '../../static/js/request.js';
const app = getApp().globalData;
const { navBar, appid, appsecret } = app;
export default {
	data() {
		return {
			navBar: navBar,
			logo:'',
			mobile: '',
			password: ''
		};
	},
	methods: {
		clickLeft() {
			uni.switchTab({
				url: '/pages/tabar/index'
			});
		},
		pageUrl(data) {
			uni.navigateTo({
				url: data
			});
		},
		// 手机登录
		mobileLogin() {
			let { mobile, password } = this;
			let timeStamp = Math.round(new Date().getTime() / 1000);
			if (!mobile) {
				uni.showToast({
					title: '手机号码不能为空，请输入手机号',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!password) {
				uni.showToast({
					title: '密码不能为空，请输入密码',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (password.length < 6) {
				uni.showToast({
					title: '密码不能少于六位',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			let obj = {
				mobile: mobile,
				password: password,
				appid: appid,
				timeStamp: timeStamp
			};
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let params = Object.assign(
				{
					sign: sign
				},
				obj
			);
			rs.postRequests('login', params, res => {
				let data = res.data;
				if (data.code == 200) {
					uni.showToast({
						title: '登录成功，将跳转到首页',
						duration: 2000,
						icon: 'none'
					});
					uni.setStorageSync('cdj_token', data.data.token);
					uni.setStorageSync('is_child', data.data.is_child);
					uni.setStorageSync('is_miniBind', data.data.is_appBind);
					uni.reLaunch({
						url: '/pages/tabar/index'
					});
				} else {
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					});
				}
			});
		}
	},
	onShow() {
		let timeStamp = Math.round(new Date().getTime() / 1000);
		let obj = {
			appid: appid,
			timeStamp: timeStamp
		};
		let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
		let params = Object.assign(
			{
				sign: sign
			},
			obj
		);
		rs.getRequests('indexAd', params, res => {
			let data = res.data;
			if (data.code == 200) {
				this.logo = data.data.logo;
			}
		});
	}
};
</script>

<style>
page {
	background: #fff;
}
/* .login{position: fixed;width:100%;height:100%;} */
.logo_width {
	text-align: center;
	margin: 60rpx 0 80rpx;
}
.login .login_logo {
	width: 100%;
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
	height:600rpx;
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
.login .password .iconfont {
	color: #46c68a;
	margin-right: 5rpx;
}
.login .password .iconfont {
	margin-top: 2rpx;
	font-size: 35rpx;
}
.wechat_login {
	position: fixed !important;
	bottom: 20rpx;
	width: 100%;
	z-index: -1;
	text-align: center;
	font-size: 24rpx;
}
.wechat_login .divider {
	display: flex;
	align-items: center;
	margin: 0 20rpx;
}
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
	margin-right: 20rpx;
}
.wechat_login .divider:after {
	margin-left: 20rpx;
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
.wechat_login .read_treaty {
	font-size: 20rpx;
}
.wechat_login .read_treaty text {
	color: #1ea55a;
}
.login .place_style {
	font-size: 28rpx;
	color: #c2c2c2;
}
</style>
