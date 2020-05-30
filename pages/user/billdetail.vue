<template>
	<view class="bill_detail">
		<uni-nav-bar left-icon="arrowleft" title="账单详情" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<!-- 转账方式 -->
		<view class="method_way">
			<view class="way">转账</view>
			<view class="ten gray_font">账单编号 : SK2019102952574949</view>
			<view class="ten gray_font">账单创建时间 : 2019-10-29 12:12</view>
		</view>
		<!-- 订单数量 -->
		<view class="order_num">
			<view>订单数量 (2)</view>
			<view v-for="(item, index) in 3" :key="index" class="twelve flex_left_right">
				<text >订单编号 : DD2019102952574949</text>
				<text class="red_font">¥12345677.00</text>
			</view>
			<view class="twelve text_right">总额 : <text class="red_font">¥12345678.00</text></view>
		</view>
		<!-- 收款金额 -->
		<view class="pay_money twelve">
			<view class="flex_left_right">
				<text>实收 </text>
				<text class="red_font">¥12345678.00</text>
			</view>
			<view class="flex_left_right">
				<text>差额 </text>
				<text class="red_font">¥12345678.00</text>
			</view>
			<view class="flex_left_right">
				<text>应收 </text>
				<text class="red_font">¥12345678.00</text>
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

<style lang="less">
	.bill_detail{
		.method_way,.order_num,.pay_money{background:white;padding:15rpx 20rpx;margin-top:10rpx;}
	} 
	.bill_detail{
		.method_way>view,.order_num>view,.pay_money>view{margin: 10rpx 0;}
	}
	.bill_detail .way{font-size: 32rpx;margin-bottom: 10rpx;}
	.bill_detail .text_right{text-align: right;}
</style>
