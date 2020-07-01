<template>
	<view class="login">
		<view>
			<uni-nav-bar left-icon="arrowleft" :status-bar="navBar" fixed="true" @clickLeft="clickLeft"></uni-nav-bar>

			<view class="logo_width">
				<image class="login_logo" :src="logo" mode="aspectFit"></image>
			</view>
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
			<view class="wechat_login" v-if="display">
				<view class="">
					<view class="divider gray_font">其他登录</view>
					<view class="weixin_button" @click="wechatLogin">
						<!-- #ifdef APP-PLUS |H5 -->
						<image class="weixin_img" src="../../static/img/wechat.png" mode=""></image>
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN -->
						<button open-type="getUserInfo">
							<image class="weixin_img" src="../../static/img/wechat.png" mode=""></image>
						</button>
						<!-- #endif -->

						<text>微信登录</text>
					</view>
					<view class="read_treaty" @click="pageUrl('treaty')">
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
	const {
		navBar,
		appid,
		appsecret,
		isWeixin
	} = app;
	export default {
		data() {
			return {
				display: true,
				navBar: navBar,
				logo: '',
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
				let {
					mobile,
					password
				} = this;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				if (!mobile) {
					rs.Toast('手机号码不能为空，请输入手机号');
					return;
				}
				if (!password) {
					rs.Toast('密码不能为空，请输入密码');
					return;
				}
				if (password.length < 6) {
					rs.Toast('密码不能少于六位');
					return;
				}
				let obj = {
					mobile: mobile,
					password: password,
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests('login', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('登录成功，将跳转到首页');
						uni.setStorageSync('cdj_token', data.data.token);
						uni.setStorageSync('is_child', data.data.is_child);

						// #ifdef APP-PLUS
						uni.setStorageSync('is_miniBind', data.data.is_appBind);
						// #endif

						// #ifdef H5
						uni.setStorageSync('is_miniBind', data.data.is_bind);
						// #endif

						// #ifdef MP-WEIXIN
						uni.setStorageSync('is_miniBind', data.data.is_miniBind);
						// #endif

						uni.switchTab({
							url: '/pages/tabar/index'
						});
					} else {
						rs.Toast(data.msg);
					}
				});
			},
			// app端微信登录
			// #ifdef APP-PLUS
			wechatLogin() {
				console.log('app')
				uni.login({
					provider: 'weixin',
					success(res) {
						uni.getUserInfo({
							provider: 'weixin',
							success(infoRes) {
								let timeStamp = Math.round(new Date().getTime() / 1000);
								let obj = {
									appid: appid,
									timeStamp: timeStamp,
								};
								let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
								let params = Object.assign({
									sign: sign,
									type: 'app',
									openid: infoRes.userInfo.openId,
									headimgurl: infoRes.userInfo.avatarUrl
								}, obj);

								rs.postRequests('wxLogin', params, (res) => {
									let data = res.data;

									if (data.code == 200) {
										rs.Toast('登录成功，将跳转到首页');
										uni.setStorageSync("cdj_token", data.data.token);
										uni.setStorageSync("is_child", data.data.is_child);
										uni.setStorageSync("is_miniBind", data.data.is_appBind);
										uni.switchTab({
											url: '../tabar/index'
										})
									} else if (data.code == 201) {
										uni.navigateTo({
											url: 'selectway?identifying=' + data.data.identifying
										})
									} else {
										rs.Toast(data.msg);
									}
								})
							}

						})
					},
					fail() {
						console.log('fail')
					}
				})
			}
			// #endif

			// H5端微信登录
			// #ifdef H5
			wechatLogin() {

				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj);

				rs.getRequests('wxConfig', params, (res) => {
					let {
						data
					} = res;
					if (data.code == 200) {

						uni.setStorageSync('isWeixin', true)
						let url = app.rootUrl + "/#/pages/account/login";
						let redirect_uri = encodeURIComponent(url);
						let a = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
							"appid=" + data.data.appId + "&redirect_uri=" + redirect_uri +
							"&response_type=code&scope=snsapi_userinfo#wechat_redirect"
						window.location.href = a;

					} else if (data.code == 500) {
						rs.Toast('微信服务器出错');
					} else {
						rs.Toast(data.msg);
					}
				})
			}
			// #endif

			// 微信端微信登录
			// #ifdef MP-WEIXIN
			wechatLogin() {
				console.log('weixin');
				uni.getUserInfo({
					provider: 'weixin',
					success(infoRes) {
						let {
							encryptedData,
							iv
						} = infoRes;
						console.log(infoRes);
						uni.login({
							provider: 'weixin',
							success(res) {
								let timeStamp = Math.round(new Date().getTime() / 1000);
								let obj = {
									appid: appid,
									timeStamp: timeStamp,
									code: res.code
								};
								let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
								let params = Object.assign({
									type: 'mini',
									sign: sign,
									code: res.code,
									encryptedData: encryptedData,
									iv: iv
								}, obj);
								rs.postRequests('wxLogin', params, (result) => {
									let data = result.data;
									if (data.code == 200) {
										rs.Toast('登录成功，将跳转到首页');
										wx.setStorageSync("cdj_token", data.data.token);
										wx.setStorageSync("is_child", data.data.is_child);
										wx.setStorageSync("is_miniBind", data.data.is_miniBind);
										wx.switchTab({
											url: '../tabar/index'
										})
									} else if (data.code == 201) {
										wx.navigateTo({
											url: 'selectway?identifying=' + data.data.identifying
										})
									} else {
										rs.Toast(data.msg);
									}
								})
							}

						})
					}
				})
			}

			// #endif
		},
		onShow() {

			let timeStamp = Math.round(new Date().getTime() / 1000);
			let obj = {
				appid: appid,
				timeStamp: timeStamp
			};
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let params = Object.assign({
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

			//H5微信登录
			// #ifdef H5
			let code = location.search;
			let getCode = code.substring(code.indexOf('=') + 1, code.lastIndexOf('&'));
			let isWeixin = uni.getStorageSync('isWeixin');
			if (isWeixin && getCode) {

				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					code: getCode
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj);
				rs.postRequests('wxLogin', params, (res) => {
					let {
						data
					} = res;
					uni.clearStorageSync('isWeixin')
					if (data.code == 200) {
						uni.setStorageSync('cdj_token', data.data.token);
						uni.setStorageSync('is_miniBind', data.data.is_bind);
						uni.setStorageSync('is_child', data.data.is_child);
						window.location.href = app.rootUrl;
					} else if (data.code == 201) {
						wx.navigateTo({
							url: 'selectway?identifying=' + data.data.identifying
						})
					} else {
						rs.Toast(data.msg);
						setTimeout(() => {
							window.location.href = app.rootUrl + "/#/pages/account/login";
						}, 1000)

					}
				})
			}
			// #endif
		},
		onReady() {
			// #ifdef H5
			window.onresize = () => {
				this.display = !this.display;
			}
			// #endif
		},
		onHide() {
			// #ifdef H5
			//
			// #endif

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
		height: 600rpx;
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
		z-index: 0;
		bottom: 20rpx;
		width: 100%;
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
	.login button{background: none;line-height: initial;}
	.login button::after{border: none;}
</style>
