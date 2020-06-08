<template>
	<view class="register">
		<uni-nav-bar left-icon="arrowleft" title="忘记密码" :status-bar="navBar" fixed="true" @clickLeft="leftClick" ></uni-nav-bar>

		<view class="get_info">
			<view>
				<text>手机号</text>
				<input type="text" value="" placeholder="请输入手机号" placeholder-class="place_style" />
			</view>
			
			<view>
				<text>密码</text>
				<input type="number" value="" placeholder="请输入六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input type="number" value="" placeholder="请再次确认登录密码" placeholder-class="place_style" />
			</view>
			<move-verify @result="verifyResult" ref="verifyElement"></move-verify>
			<view class="flex">
				<text>验证码</text>
				<view class="flex_left_right" style="width:79%;"><input type="number" value="" placeholder="请输入验证码" placeholder-class="place_style" />
				<my-identifyingcode :showcode="showcode" @getCode="getCode"></my-identifyingcode>
			</view>
				</view>
			
		</view>
		<view class="submit_button button_style">保存</view>
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
			address: '',
			navBar: navBar
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		}
		}
};
</script>

<style>
	page{background: white;}
.register .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.register .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.register .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.register .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
.register .now_login{
	color:#A1A1A1;
	text-align: center;
	font-size: 24rpx;
}
.register .agree{position:fixed;width: 100%;bottom:20rpx;text-align: center;font-size: 24rpx;color:#418d5f;}
</style>
