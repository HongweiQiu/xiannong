<template>
	<view class="register">

		<view class="get_info">
			<view>
				<text>手机号</text>
				<input type="number" v-model="mobile" placeholder="请输入手机号" placeholder-class="place_style" />
			</view>

			<view>
				<text>密码</text>
				<input password v-model="password" placeholder="请输入六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input password v-model="confirm_pwd" placeholder="请再次确认登录密码" placeholder-class="place_style" />
			</view>
			<move-verify @result="verifyResult" ref="verifyElement"></move-verify>
			<view class="flex">
				<text>验证码</text>
				<view class="flex_left_right" style="width:79%;">
					<input type="number" v-model="verify_code" placeholder="请输入验证码" placeholder-class="place_style"
						@focus="back=false" />
					<my-identifyingcode @getCode="getCode" ref="code"></my-identifyingcode>
				</view>
			</view>

		</view>
		<view class="submit_button button_style" :class="{'gray_b':back}" @click="forget">保存</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				resultData: {},
				mobile: '',
				password: '',
				confirm_pwd: '',
				verify_code: '',
				secret_str: '',
				navBar: navBar,
				back: true,
				count: 0
			};
		},
		methods: {

			forget() {}
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
		font-size: 32rpx;
		width: 384rpx;
		height: 64rpx;
		line-height: 64rpx;
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
