	<template>
	<view class="login flex-column" style="height:100vh;">
		<view style="justify-content: center;display: flex;margin-top:100rpx;">
		
			<view class="logo_width">
				<image class="login_logo" src="../../static/img/login-logo.jpg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="login_method flex-full" >
			
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
					<view class="weixin_button">
						<!-- #ifdef APP-PLUS |H5 -->
						<image class="weixin_img" src="../../static/img/wechat.png" mode="" @click="wechatLogin">
						</image>
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN -->
						<button open-type="getUserInfo" @click="wechatLogin">
							<image class="weixin_img" src="../../static/img/wechat.png" mode=""></image>
						</button>
						<!-- #endif -->
						<!-- #ifdef MP-ALIPAY -->
						<!-- <button open-type="getAuthorize" scope="userInfo" > -->
						<image @click="wechatLogin" class="weixin_img" src="../../static/img/alipay.png"
							mode="aspectFit"></image>
						<!-- </button> -->
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY -->
						<text @click="wechatLogin">微信登录</text>
						<!-- #endif -->
						<!-- #ifdef MP-ALIPAY -->
						<text style="padding-top:4rpx;" @click="wechatLogin">支付宝登录</text>
						<!-- #endif -->

					</view>
					<view class="read_treaty">
						<text style="color: #000;" @click="pageUrl('treaty')">已阅读并同意</text>
						<text @click="pageUrl('treaty')">注册协议</text>
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
				showWechat: false,
				logo: '',
				mobile: '',
				password: '',
				scrollHeight: '',
				newHeight: '',
				count: 0,
				logoHeight: ''
			};
		},
		methods: {
			showTabbar() {
				this.tabbar = true;
			},
			hideTabbar() {
				this.tabbar = false;
			},

			clickLeft() {
				// #ifdef H5
				uni.hideKeyboard();
				// #endif
				uni.reLaunch({
					url: '/pages/tabar/index'
				});
			},
			pageUrl(data) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				// #ifdef H5
				uni.hideKeyboard()
				// #endif
				setTimeout(() => {
					uni.navigateTo({
						url: data
					}), 300
				})

			},
			// 手机登录
			mobileLogin() {
				let {
					mobile,
					password
				} = this;
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
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
						// #ifdef MP-WEIXIN
						uni.setStorageSync('is_miniBind', data.data.is_miniBind);
						// #endif
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabar/index'
							});
						}, 1000)

					} else {
						rs.Toast(data.msg);
					}
				});
			},

			// 微信端微信登录
			// #ifdef MP-WEIXIN
			wechatLogin() {
				console.log('weixin')
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 500)
				uni.getUserInfo({
					provider: 'weixin',
					success(infoRes) {
						let {
							encryptedData,
							iv
						} = infoRes;
						// console.log(infoRes);
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
										setTimeout(function() {
											uni.switchTab({
												url: '../tabar/index'
											})
										}, 1000);
									} else if (data.code == 201) {
										wx.navigateTo({
											url: 'selectway?identifying=' + data.data
												.identifying
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
			this.display = true;
		},
		mounted() {
			let that = this;
			let bodyHeight, titleHeight, imgHeight;
			uni.getSystemInfo({
				success: function(res) { // res - 各种参数
					// that.logoHeight=res.windowHeight; // 屏幕的宽度 
					uni.setStorageSync('scrollHeight', res.windowHeight);
					let info = uni.createSelectorQuery().select('.logo_width');
					info.boundingClientRect(function(data) { //data - 各种参数
						imgHeight = data.height; // 获取元素宽度
						// #ifdef APP-PLUS
						let titleHeight = 70;
						// #endif
						// #ifndef APP-PLUS
						let titleHeight = 44;
						// #endif
						that.logoHeight = res.windowHeight - titleHeight - imgHeight;
					}).exec();

				}
			});
		},
	};
</script>

<style>
	page {
		background: #fff;
	}

	/* 	.login {

		width: 100vw;
		height: 100vh;
	} */

	.logo_width {
		text-align: center;
		/* margin: 60rpx 0 80rpx; */
		height: 300rpx;
		width: 400rpx;
		display: flex;
		align-items: center;
	}

	.login .login_logo {
		width: 100%;
		height: 100%;
	}

	.login .login_method {
		display: flex;
		/* height: 72%; */
		flex-direction: column;
		justify-content: space-between;
	}

	.login .phone,
	.login .password {
		display: flex;
	}

	.login .mobilelogin {
		width: 580rpx;
		/* height: 600rpx; */

		margin: 0 auto;
	}

	.login .mobilelogin input {
		width: 100%;
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
		/* position: absolute; */
		z-index: 0;
		/* bottom: 20rpx; */
		padding-bottom: 20rpx;
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

	.login button {
		border: none;
		background: none;
		line-height: initial;
	}

	.login button::after {
		border: none;
	}
</style>
