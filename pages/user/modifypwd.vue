<template>
	<view class="modifypwd">
		<uni-nav-bar left-icon="arrowleft" title="修改密码" :status-bar="navBar" fixed="true" @clickLeft="leftClick" ></uni-nav-bar>

		<view class="get_info">
			<view>
				<text>原密码</text>
				<input type="text" value="" placeholder="请输入原密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>新密码</text>
				<input type="number" value="" placeholder="请填写六位及以上的密码" placeholder-class="place_style" /> 
			</view>
			<view>
				<text>确认密码</text>
				<input type="number" value="" placeholder="请再次确认密码" placeholder-class="place_style" />
				
			</view>
		</view>
		<view class="submit_button button_style">保存</view>
	</view>
</template>

<script>
const app = getApp().globalData;
const { navBar } = app;
export default {
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
		},

		mapPage() {
			let that = this;

			uni.chooseLocation({
				success: function(res) {
					that.address = res.address;
				},
				fail: function(err) {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style>
.modifypwd .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.modifypwd .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.modifypwd .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.modifypwd .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
</style>
