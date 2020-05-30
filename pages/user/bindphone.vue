<template>
	<view class="bindphone">
		<uni-nav-bar left-icon="arrowleft" title="个人信息" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="get_info">
			<view><input type="text" value="" placeholder="请输入手机号" placeholder-class="place_style" /></view>
			<move-verify @result="verifyResult" ref="verifyElement"></move-verify>
			<view class="flex_left_right">
				<input type="number" value="" placeholder="请输入验证码" placeholder-class="place_style" />
				<my-identifyingcode :showcode="showcode" @getCode="getCode"></my-identifyingcode>
			</view>
		</view>
		<view class="submit_button button_style" @click="bindSubmit">立即绑定</view>
	</view>
</template>

<script>
import moveVerify from '@/components/helang-moveVerify/helang-moveVerify.vue';
const app = getApp().globalData;
const { navBar } = app;
export default {
	components: {
		moveVerify
	},
	data() {
		return {
			disabled: false,
			navBar: navBar,
			showcode: true,
			strcode: 10
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		bindSubmit() {
		
		},
		getCode() {
			this.showcode = false;
		},
		verifyResult(e) {},
		
	}
};
</script>

<style>
.bindphone .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.bindphone .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.bindphone .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.bindphone .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
uni-movable-area {
	width: 100%;
	height: 80rpx;
}
</style>
