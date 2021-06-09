<template>
	<view class="register">

		<view class="get_info">
			<view>
				<text>手机号</text>
				<input type="number" v-model="form.mobile" placeholder="请输入手机号" placeholder-class="place_style" />
			</view>
			<view class="flex">
				<text>验证码</text>
				<view class="flex_left_right" style="width:79%;">
					<input type="number" v-model="form.captcha" placeholder="请输入验证码" placeholder-class="place_style"
						@focus="back=false" />
					<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
				</view>
			</view>
			<view>
				<text>密码</text>
				<input password v-model="form.newpassword" placeholder="请输入登录密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input password v-model="form.rePwd" placeholder="请再次确认登录密码" placeholder-class="place_style" />
			</view>



		</view>
		<view class="submit_button button_style" :class="{'gray_b':back}" @click="forget">保存</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				form: {
					mobile: '',
					newpassword: '',
					rePwd: '',
					captcha: ''

				},
				back: true,
			};
		},
		methods: {
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
			forget() {

				let that = this;
				let {
					mobile,
					newpassword,
					rePwd,
				} = that.form;

				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!reg.test(mobile)) {
					return that.$Toast('请输入正确的电话号码');
				}
				if (newpassword != rePwd) {
					return that.$Toast('两次输入的密码不一致');
				}
				that.$get(that.$api.userResetPwd, this.form, (res) => {
					if (res.data.code == 1) {
						this.$Toast('设置密码成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						that.$Toast(res.data.msg);
					}
				})

			}
		}
	};
</script>

<style>
	page {
		background: white;
	}

	.register .get_info {
		background: white;
		padding: 0 20rpx;
		margin-top: 10rpx;
	}

	.register .get_info>view {
		display: flex;
		height: 80rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;
	}

	.register .get_info>view>text {
		width: 150rpx;
		color: #808080;
	}

	.register .button_style {

		width: 580rpx;

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
		color: #A1A1A1;
		text-align: center;
		font-size: 24rpx;
	}

	.register .agree {
		position: fixed;
		width: 100%;
		bottom: 20rpx;
		text-align: center;
		font-size: 24rpx;
		color: #418d5f;
	}
</style>
