<template>
	<view class="login flex-column" style="height:100vh;">
		<view style="margin-top:100rpx;" class="flex-j-c">

			<view class="logo_width">
				<image class="login_logo" src="../../static/img/login-logo.jpg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="login_method flex-full">

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
						<button @click="wechatLogin">
							<text class="iconfont iconweixin weixin_img"></text>
						</button>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
			};
		},
		methods: {
			pageUrl(data) {
				uni.navigateTo({
					url: data
				}), 300
			},
			// 手机登录
			mobileLogin() {
				let {
					mobile,
					password
				} = this;
				if (!mobile) {
					this.$Toast('手机号码不能为空，请输入手机号');
					return;
				}
				if (!password) {
					this.$Toast('密码不能为空，请输入密码');
					return;
				}

				let params = {
					account: mobile,
					password: password,
				};

				this.$get(this.$api.userLogin, params, res => {
					let data = res.data;
					if (data.code == 1) {
						this.$Toast('登录成功，将跳转到首页');
						getApp().globalData.isReload = true;
						uni.setStorageSync('userInfo', data.data.userinfo);
						uni.setStorageSync('userToken', data.data.userinfo.token);
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabar/index'
							});
						}, 1000)
					} else {
						this.$Toast(data.msg);
					}
				});
			},

			// 微信端微信登录
			// #ifdef MP-WEIXIN
			wechatLogin(e) {
				let _ = this;
				uni.getUserProfile({
					desc: '授权确认',
					success(res1) {
						uni.login({
							provider: 'weixin',
							success(res) {
								_.$get(_.$api.userWx_login, {
									code: res.code
								}, (result) => {

									let {
										data
									} = result;
									if (data.code == 1) {
										if (typeof data.data == 'string') {
											uni.navigateTo({
												url: './bind?openId=' + data.data
											})
										} else {
											_.$Toast('登录成功，将跳转到首页');
											getApp().globalData.isReload = true;
											uni.setStorageSync('userInfo', data.data);
											uni.setStorageSync('userToken', data.data.token);
											setTimeout(() => {
												uni.reLaunch({
													url: '/pages/tabar/index'
												});
											}, 1000)
										}
									} else {
										_.$Toast(data.msg)
									}
								})
							}
						})
					}
				})

			}
			// #endif
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

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


	.login .weixin_button {
		display: flex;
		flex-direction: column;
		justify-content: center;
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

	.login {
		.weixin_img {
			font-size: 200rpx;
			color: #009a44;
		}
	}
</style>
