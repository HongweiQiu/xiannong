<template>
	<view class="register" :style="{height:height+'px'}">
		<view>
			<form @submit="formSubmit">
				<view class="get_info">
					<view>
						<text class="iconfont icondianpu"></text>
						<input type="text" v-model="form.company" placeholder="请输入单位名称"
							placeholder-class="place_style" />
					</view>
					<view>
						<text class="iconfont iconshouji1"></text>
						<input type="number" v-model="form.mobile" placeholder="请输入手机号"
							placeholder-class="place_style" />
					</view>
					<view class="flex">
						<text class="iconfont iconyanzhengma"></text>
						<view class="flex_left_right" style="width:79%;">
							<input type="number" v-model="form.code" placeholder="请输入验证码"
								placeholder-class="place_style" @focus="back=false" />
							<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
						</view>
					</view>
					<view>
						<text class="iconfont iconmima"></text>
						<input password v-model="form.password" placeholder="请输入密码" placeholder-class="place_style" />
					</view>
					<view>
						<text class="iconfont iconmima"></text>
						<input password v-model="form.repassword" placeholder="请再次确认登录密码"
							placeholder-class="place_style" />
					</view>
				</view>
				<button form-type="submit" class="submit_button button_style">注册</button>
			</form>
			<view class="now_login">
				<text>已有账号?</text>
				<text style="color: #009a44;" @click="pageUrl('login')">去登陆</text>
			</view>
		</view>
		<view class="agree">
			<view class="align_center flex-j-c">
				<text class="iconfont fs-18" :class="check?'icondanxuanfuxuan':'iconico2'" @click="check=!check"></text>
				<text>点击注册代表你同意</text>
				<text @click="pageUrl('treaty')" class="protocol">《注册协议》</text>
			</view>

		</view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		rootUrl
	} = app;
	export default {
		data() {
			return {

				form: {
					company: '',
					mobile: '',
					code: '',
					password: '',
					repassword: '',
				},
				check: true,
			};
		},
		methods: {
			pageUrl(data) {
				uni.navigateTo({
					url: data
				})
			},
			// 获取短信验证码
			getCode() {
				let that = this;
				let {
					mobile
				} = that.form;

				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!reg.test(mobile)) {
					that.$Toast('请输入正确的电话号码', );
					return;
				}
			
				that.$get(that.$api.mainSend_sms, {
					phone: mobile
				}, (res) => {
					if (res.data.code == 1) {
						that.$refs.code.sendCode();
						that.$Toast('验证码已发送到你手机中，请注意查收');
					} else {
						that.$Toast(res.data.msg);
					}
				})
			},
			formSubmit(e) {
				let that = this;

				let {
					company,
					password,
					repassword,
					mobile,
					code
				} = that.form;
				if (!company) {
					that.$Toast('单位名称不能为空');
					return;
				}
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!reg.test(mobile)) {
					that.$Toast('请输入正确的电话号码', );
					return;
				}

				if (!code) {
					that.$Toast('请输入正确的短信验证码');
					return;
				}
				if (!password || !repassword) {
					that.$Toast('密码不能为空');
					return;
				}
				if (password != repassword) {
					that.$Toast('两次输入的密码不一致');
					return;
				}

				that.$get(that.$api.userRegister, that.form, (res) => {
					if (res.data.code == 1) {
						this.$Toast('登录成功，将跳转到我的页面');
						uni.setStorageSync('userInfo', data.data.userinfo);
						uni.setStorageSync('userToken', data.data.userinfo.token);
						setTimeout(() => {
							uni.switchTab({
								url: '../tabar/user'
							})
						}, 1500)
					} else {
						that.$Toast(res.data.msg);
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: white;
	}

	.register {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.register .get_info {
		background: white;
		padding: 0 20rpx;
		margin-top: 10rpx;
	}

	.register .get_info>view {
		display: flex;
		height: 100rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;
	}

	.register .get_info>view>text {
		width: 100rpx;

		font-size: 50rpx;
	}

	.register .button_style {
		// font-size: 30rpx;
		width: 580rpx;
		// height: 78rpx;
		// line-height: 78rpx;
		// border-radius: 12rpx;
		// background: #009a44;
		background: #009a44;
		height: 80rpx;
		color: white;
		border-radius: 12rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 32rpx;
		margin: 60rpx auto;

	}

	.register .now_login {
		color: #a1a1a1;
		text-align: center;
		font-size: 28rpx;
	}

	.register .agree {
		position: fixed;
		width: 100%;
		bottom: 20rpx;

		text-align: center;
		font-size: 28rpx;

		.icondanxuanfuxuan {
			color: #57B127;

		}

		.iconfont {
			margin-right: 10rpx;
		}

		.protocol {
			color: #009a44;
		}
	}
</style>
