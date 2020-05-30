<template>
	<view class="cash_detail">
		<uni-nav-bar left-icon="arrowleft" title="现金劵信息" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="information">
			<view class="weight fourteen">正常</view>
			<view class="keys_str">
				<view>
					<view>标签</view>
					<view></view>
				</view>
				<view>
					<view>名称</view>
					<view>分宜县扶贫现金劵</view>
				</view>
				<view>
					<view>面值</view>
					<view>分宜县扶贫现金劵</view>
				</view>
				<view>
					<view>余额</view>
					<view>分宜县扶贫现金劵</view>
				</view>
				<view>
					<view>开始时间</view>
					<view>分宜县扶贫现金劵</view>
				</view>
				<view>
					<view>结束时间</view>
					<view></view>
				</view>
				<view>
					<view>描述</view>
					<view>分宜县扶贫现金劵</view>
				</view>
			</view>
		</view>
		<view class="usage_record">
			<view class="record_title">使用记录</view>
			<view>
				<view v-for="(item, index) in 2" class="record_info">
					<text>DD2020040700000029</text>
					<text>100元</text>
					<text>2020-4-31</text>
				</view>
			</view>
			<view class="bitmap">
				<image src="../../static/img/cash_record.png" mode=""></image>
				<text class="ten">无记录</text>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp().globalData;
const { navBar } = app;
export default {
	data() {
		return {
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

<style lang="scss">
.cash_detail {
	.information,.usage_record {
		background: white;
		padding: 20rpx;
		margin-top: 10rpx;
	}
}
.cash_detail .information .keys_str > view {
	display: flex;
	justify-content: space-between;
	padding: 10rpx 0;
	font-size: 24rpx;
}
.cash_detail .information .keys_str > view > view:first-child {
	width: 100rpx;
	text-align: right;
}
.cash_detail .information .keys_str > view > view:last-child {
	color: #808080;
}
.usage_record .record_title{text-align: center;}
.usage_record .record_info{display: flex;justify-content: space-between;font-size: 24rpx;padding:10rpx 0;}
.usage_record .bitmap {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.usage_record .bitmap image {
	width: 44rpx;
	height: 56rpx;
}
</style>
