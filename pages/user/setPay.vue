<template>
	<view class="set-pay">

		<view class="flex-column align_center">
			<image src="../../static/img/lock.png" class="lock"></image>
			<text style="margin: 30rpx 0 10rpx;">为了你的资金安全，请先设置支付密码</text>
		</view>
		<view>
			<view class="fs-13">请输入密码</view>
			<view>
				<view class="pwd">
					<block v-for="(item,index) in 6" :key="index">
						<view @click="showKey(1)">
							{{ (password[index] && '●') || '' }}
						</view>
					</block>

					<input type="number" v-model="password" :focus="focusOne" />
				</view>
			</view>
		</view>
		<view>
			<view class="fs-13">请再次输入密码</view>
			<view>
				<view class="pwd">
					<block v-for="(item,index) in 6" :key="index">
						<view @click="showKey(2)">
							{{ (rpassword[index] && '●') || '' }}
						</view>
					</block>

					<input type="number" v-model="rpassword" />
				</view>
			</view>
			<view class="fs-11 gray_font" style="margin-top: 10rpx;">设置成功过可前往我的-设置中修改密码</view>
		</view>
		<my-keyboard :show="show" @complete="complete" @close="show=false"></my-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				rpassword: '',
				show: false,
				type: ''
			}
		},
		methods: {
			complete(val) {

				if (this.type == 1) {
					this.password = val;
				} else {
					this.rpassword = val;

				}
				if (this.rpassword != this.password && this.rpassword.length == 6) {
					this.$Toast('两次输入的密码不一致');
					this.password = '';
					this.rpassword = '';
				}
				if (this.rpassword == this.password && this.rpassword.length == 6) {
					let params = {
						pay_password: this.password,
						repay_password: this.rpassword,
						token: uni.getStorageSync('userInfo').token
					}
					this.$get(this.$api.userSet_pay_password, params, (res) => {
						if (res.data.code == 1) {
							this.$Toast('设置支付密码成功');
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						} else {
							this.$Toast(data.msg)
						}
					})
				}
			},
			showKey(type) {
				// complete(val)
				this.show = true;
				this.type = type;
			}
		}
	}
</script>

<style scoped lang="scss">
	.set-pay {
		min-height: 100vh;
		background: white;
		padding: 0 93rpx;

		.lock {
			margin-top: 20rpx;
			width: 70rpx;
			height: 70rpx;

			background: #57B127;
			border-radius: 50%;
			padding: 10rpx;
		}

		input {
			display: none;
			// position: absolute;

		}

		.pwd {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.fs-13 {
			margin: 30rpx 0 20rpx;
		}

		.pwd view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 95rpx;
			height: 80rpx;
			border: 1px solid #999;

			&:nth-child(n+2) {
				border-left: none;
			}
		}

	}
</style>
