<template>
	<view class="register" :style="{height:height+'px'}">
		<view>
			<form @submit="formSubmit">
				<view class="get_info">

					<view>
						<text class="iconfont iconshouji1"></text>
						<input type="number" v-model="form.mobile" placeholder="请输入手机号"
							placeholder-class="place_style" />
					</view>
					<view class="flex">
						<text class="iconfont iconyanzhengma"></text>
						<view class="flex_left_right flex-full">
							<input type="number" v-model="form.code" placeholder="请输入验证码"
								placeholder-class="place_style" @focus="back=false" />
							<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
						</view>
					</view>
					<view>
						<text class="iconfont iconmima"></text>
						<input password v-model="form.new_pay" placeholder="请输入支付密码" placeholder-class="place_style" />
					</view>
					<view>
						<text class="iconfont iconmima"></text>
						<input password v-model="form.re_new_pay" placeholder="请再次确认支付密码"
							placeholder-class="place_style" />
					</view>
				</view>
				<button form-type="submit" class="submit_button button_style">提交</button>
			</form>

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
					token: uni.getStorageSync('userToken'),
					mobile: '',
					code: '',
					new_pay: '',
					re_new_pay: '',
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
					new_pay,
					re_new_pay,
					mobile,
					code
				} = that.form;

				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!reg.test(mobile)) {
					return that.$Toast('请输入正确的电话号码', );
				}

				if (!code) {
					return that.$Toast('请输入正确的短信验证码');
				}
				if (!new_pay || !re_new_pay) {
					return that.$Toast('密码不能为空');
				}
				if (new_pay != re_new_pay) {
					return that.$Toast('两次输入的密码不一致');
				}

				that.$get(that.$api.userReset_new_pay, that.form, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('重新设置密码成功');
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					} else {
						this.$Toast(data.msg)
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
		width: 60rpx;
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
