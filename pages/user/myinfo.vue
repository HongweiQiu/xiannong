<template>
	<view class="myinfo">
		<view class="get_info">
			<view class="flex_left_right" @click="modifyPwd">
				<text>修改登录密码</text>
				<text class="iconfont iconfanhui t-180"></text>
			</view>
			<view class="flex_left_right" @click="receipt">
				<text>修改发票</text>
				<text class="iconfont iconfanhui t-180"></text>
			</view>
		</view>
		<view class="center button_style" @click="formSubmit">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			modifyPwd() {
				uni.navigateTo({
					url: './modifypwd'
				})
			},
			receipt() {
				uni.navigateTo({
					url: './receipt'
				})
			},
			formSubmit() {
				let that = this;
				that.$showModal('是否退出', () => {
					that.$get(that.$api.userLogout, {
						token: uni.getStorageSync('userInfo').token
					}, (res) => {
						if (res.data.code == 1) {
							that.$Toast("退出成功");
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('userToken');
							getApp().globalData.isReload = true;
							setTimeout(function() {
								uni.reLaunch({
									url: '../account/login'
								})
							}, 1000);

						} else {
							that.$Toast(res.data.msg)
						}
					})
				})
			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			// that.memberInfo();
		},
	};
</script>

<style lang="scss" scoped>
	.myinfo .get_info {
		background: white;
		padding: 0 20rpx;
	}

	.myinfo .get_info>view {
		display: flex;
		height: 88rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;

	}

	.myinfo .get_info>view>text {
		width: 180rpx;
		color: #333;
	}

	.myinfo .button_style {
		margin-top: 16rpx;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: white;
		color: #333;
	}

	</style>
