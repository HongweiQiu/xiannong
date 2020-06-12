<template>
	<view class="order_detail">
		<uni-nav-bar left-icon="arrowleft" title="订单详情" :status-bar="navBar" fixed="true" @clickLeft="LeftClick"></uni-nav-bar>

		<view class="order_info">
			<!-- 支付信息 -->
			<view class="pay_info">
				<view>
					<view class="title">支付信息</view>
					<view>sadf</view>
				</view>
				<view>
					<view>下单时间</view>
					<view>df</view>
				</view>
				<view>
					<view>配送时间</view>
					<view>sdf</view>
				</view>
				<view>
					<view>订单编号</view>
					<view>三大法师</view>
				</view>
				<view>
					<view>联系电话</view>
					<view></view>
				</view>
				<view>
					<view>送货地址</view>
					<view>撒旦法</view>
				</view>
				<view>
					<view>备注</view>
					<view>撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法</view>
				</view>
			</view>
			<!-- 金额信息 -->
			<view class="money_info">
				<view>
					<view class="title">金额信息</view>
					<view>sdf </view>
				</view>
				<view>
					<view>下单金额</view>
					<view class="red_font">df </view>
				</view>
				<view>
					<view>退货金额</view>
					<view class="red_font">dsfa </view>
				</view>
				<view>
					<view>运费</view>
					<view>sdfa </view>
				</view>
				<view>
					<view>应付金额</view>
					<view class="red_font">sdfa </view>
				</view>
				<view>
					<view>送货地址</view>
					<view></view>
				</view>
			</view>

			<!-- 商品信息 -->
			<view class="good_info">
				<view class="title">商品信息</view>
				<view class="single_good">
					<view class="flex_left_right">
						<text>澳洲极品牛肉</text>
						<text>¥54.20/斤</text>
					</view>

					<view class="flex_left_right gray_font">
						<text>下单数量 : 5.00</text>
						<text>下单数量 : 5.00</text>
					</view>
				</view>
			</view>
		</view>
		<image class="contact_phone" src="../../static/img/service.png" mode=""></image>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		data() {
			return {
				navBar: navBar
			};
		},
		methods: {

		}, 
		onShow() {
			app.aData.show = true;
			var that = this
			that.orderInfo()
		},
	};
</script>

<style>
	.order_detail .order_info>view {
		margin-top: 10rpx;
		background: white;
		padding: 0rpx 20rpx;
		font-size: 24rpx;
	}

	.order_detail .order_info .pay_info>view,
	.order_detail .order_info .money_info>view {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 0;
	}

	.order_detail .pay_info>view>view:last-child,
	.order_detail .money_info>view>view:last-child {
		color: #808080;
		width: 74%;
		text-align: right;
	}

	.order_detail .pay_info>view:nth-child(n + 2)>view:first-child,
	.order_detail .money_info>view:nth-child(n + 2)>view:first-child {
		width: 100rpx;
		text-align: right;
	}

	.order_detail .contact_phone {
		width: 80rpx;
		height: 80rpx;
		position: fixed;
		bottom: 60rpx;
		right: 20rpx;
	}

	.order_detail .title {
		font-size: 28rpx;
		font-weight: 700;
		width: 150rpx;
	}

	.order_detail .good_info {
		padding: 10rpx 20rpx !important;
	}

	.order_detail .good_info .single_good {
		margin-top: 10rpx !important;
	}

	.order_detail .good_info .single_good>view {
		height: 40rpx;
	}
</style>
