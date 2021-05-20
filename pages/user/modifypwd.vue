<template>
	<view class="modifypwd">
		<view class="get_info">
			<view>
				<text>原密码</text>
				<input type="password" v-model="old_pwd" placeholder="请输入原密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>新密码</text>
				<input password v-model="password" placeholder="请填写六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input password v-model="password_confirmation" placeholder="请再次确认密码" placeholder-class="place_style" />

			</view>
		</view>
		<view class="submit_button button_style" @click="formSubmit">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_pwd: '', //旧密码
				password: '', //旧密码
				password_confirmation: '', //旧密码
				navBar: navBar,
				count: 0
			};
		},
		methods: {
			formSubmit() {}
		},

	};
</script>

<style>
	.modifypwd .get_info {
		background: white;
		padding: 0 20rpx;

	}

	.modifypwd .get_info>view {
		display: flex;
		height: 89rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;
	}

	.modifypwd .get_info>view>text {
		width: 150rpx;
		color: #333;
	}

	.modifypwd .button_style {
		font-size: 36rpx;
		margin: 60rpx 30rpx 0;
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #57B127;
	}
</style>
