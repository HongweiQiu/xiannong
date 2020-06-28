<template>
	<view class="invest_record">
		<uni-nav-bar left-icon="arrowleft" title="充值信息" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="tip">如出现下单端账号与支付账号不一样，请到个人中心更改绑定微信</view>
		<view class="info">
			<view>
				<text>充值编号</text>
				<text class="gray_font">CZ2020030200000002</text>
			</view>
			<view>
				<text>充值金额</text>
				<text class="red_font">CZ2020030200000002</text>
			</view>
		</view>
		<view class="notice">
			<view>注：</view>
			<view>平台不会以订单异常，系统升级等理由要求您点击任何链接进行退款操作，请提高警惕谨防受骗！</view>
		</view>
		<view class="select">
			<view class="determine">确认充值</view>
			<view class="cancel">返回首页</view>
		</view>
	</view>
</template>

<script>
const app = getApp().globalData;
let { navBar } = app;
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

<style>
	page{background:#f8f6f9 ;}
.invest_record .tip {
	color: red;
	background: #f9d1cb;
	font-size: 24rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
}
.invest_record .info > view {
	height: 80rpx;
	background: white;
	font-size: 24rpx;
	line-height: 80rpx;
	padding: 0 20rpx;

	display: flex;
	justify-content: space-between;
}
.invest_record .info > view:first-child {
	border-bottom: 1px solid #efefef;
}
.invest_record .notice {
	font-size: 20rpx;
	color: #808080;
	display: flex;
	padding: 20rpx 20rpx 80rpx;
}

.invest_record .select > view {
	width: 329rpx;
	height: 64rpx;
	color: white;margin:0 auto;
	border-radius: 12rpx;
	text-align: center;
	line-height: 64rpx;
	margin-top:20rpx;
}
.invest_record .select .determine {
	background: #009a44;
}
.invest_record .select .cancel {
	background: #808080;
}
</style>
