<template>
	<view class="bind-wechat">
		<view class="center">
			<image class="login_logo" src="../../static/img/login-logo.jpg" mode="aspectFit"></image>
		</view>
		<my-s-tabs effect slot-title @change="changeSecond" class="mp_tab_width border" activeColor="#57B127"
			v-model="activeTab" color="#999" lineScale="1" navPerView="2">
			<my-s-tab>绑定</my-s-tab>
			<my-s-tab>注册</my-s-tab>
		</my-s-tabs>
		<view class="" v-if="activeTab==0">
			<view class="get_info">
				<view>
					<text class="iconfont iconshouji1"></text>
					<input type="number" v-model="form.mobile" placeholder="请输入手机号" placeholder-class="place_style" />
				</view>
				<view class="flex">
					<text class="iconfont iconyanzhengma"></text>
					<view class="flex_left_right flex-full">
						<input type="number" v-model="form.code" placeholder="请输入验证码" placeholder-class="place_style"
							@focus="back=false" />
						<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
					</view>
				</view>

			</view>
			<view class="button_style" @click="$doubleClick(bindWechat)">登录</view>
		</view>
		<view v-else>
			<view class="get_info">
				<view>
					<text class="iconfont icondianpu"></text>
					<input type="text" v-model="form.company" placeholder="请输入单位名称" placeholder-class="place_style" />
				</view>
				<view>
					<text class="iconfont iconshouji1"></text>
					<input type="number" v-model="form.mobile" placeholder="请输入手机号" placeholder-class="place_style" />
				</view>
				<view class="flex">
					<text class="iconfont iconyanzhengma"></text>
					<view class="flex_left_right flex-full">
						<input type="number" v-model="form.code" placeholder="请输入验证码" placeholder-class="place_style"
							@focus="back=false" />
						<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
					</view>
				</view>
				<view>
					<text class="iconfont iconmima"></text>
					<input password v-model="form.password" placeholder="请输入密码" placeholder-class="place_style" />
				</view>
				<view>
					<text class="iconfont iconmima"></text>
					<input password v-model="form.repassword" placeholder="请再次确认登录密码" placeholder-class="place_style" />
				</view>
			</view>
			<view class="button_style" @click="$doubleClick(formSubmit)">注册</view>
		</view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;
	export default {

		data() {
			return {
				imgRemote: imgRemote,
				openId: '',
				activeTab: 0,
				form: {
					company: '',
					mobile: '',
					code: '',
					password: '',
					repassword: '',
					openid: ''
				},
			};
		},
		methods: {
			changeSecond(e) {
				this.activeTab = e;
				this.form.code='';
			},
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
			//登录
			bindWechat() {
				let {
					code,
					mobile
				} = this.form;
				if (!code) {
					return this.$Toast('验证码不能为空')
				}
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!reg.test(mobile)) {
					that.$Toast('请输入正确的电话号码', );
					return;
				}
				let params = {
					code: code,
					openid: this.form.openid,
					mobile: mobile
				};
				this.$get(this.$api.userBind_user, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('登录成功，将跳转到首页');
						getApp().globalData.isReload = true;
						uni.setStorageSync('userInfo', data.data);
						uni.setStorageSync('userToken', data.data.token);
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/tabar/index'
							});
						}, 1000)
					} else {
						this.$Toast(data.msg)
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
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('登录成功，将跳转到首页');
						getApp().globalData.isReload = true;
						uni.setStorageSync('userInfo', data.data);
						uni.setStorageSync('userToken', data.data.token);
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/tabar/index'
							});
						}, 1000)
					} else {
						this.$Toast(data.msg)
					}
				})
			}

		},
		onLoad(options) {
			this.form.openid = options.openId;
		}
	};
</script>

<style lang="scss">
	page {
		background: white;
	}

	.bind-wechat {
		padding: 0 30rpx;

		.login_logo {
			width: 300rpx;
			height: 300rpx;
			margin-top: 30rpx;
		}

		.mp_tab_width .s-tabs {
			width: 50%;
			margin: 0 auto;
			font-weight: bold;

			.s-tab-line {
				bottom: 10rpx;
			}
		}

		.get_info>view {
			height: 100rpx;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;

		}

		.button_style {
			background: #009a44;
			color: white;
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			border-radius: 10rpx;
			margin-top: 40rpx;
		}

		.iconfont {
			font-size: 48rpx;
			width: 60rpx;
		}
	}
</style>
