<template>
	<view class="receipt">
		<uni-nav-bar left-icon="arrowleft" title="开具发票" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="receipt_select">
			<view class="receipt_type">
				<view class="enterprise" :class="isactive==true?'checked':''" @click="isactive=true">企业发票</view>
				<view class="person" :class="isactive==false?'checked':''" @click="isactive=false">个人单位</view>
			</view>
			<view class="caution">注 : 电子发票和纸质发票具有同等法律效率，可支持报销入账</view>
		</view>
		<view class="get_info">
			<view>
				<text>发票抬头</text>
				<input type="text" value="" placeholder="请填写发票抬头" placeholder-class="place_style" />
			</view>
			<view>
				<text>税号</text>
				<input type="number" value="" placeholder="请填写纳税人识别号" placeholder-class="place_style" />
			</view>
			<view>
				<text>发票内容</text>
				<input type="number" value="" placeholder="请填写发票内容" placeholder-class="place_style" />
			</view>
			<view>
				<text>发票金额</text>
				<input type="number" value="" placeholder="请输入金额" placeholder-class="place_style" style="width: 130rpx;color:red;" />
				<view>元</view>
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
			navBar: navBar,
			isactive:true
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
.receipt .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.receipt .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.receipt .get_info > view > text {
	width: 120rpx;
	text-align: right;
	margin-right: 30rpx;
	color: #808080;
}
.receipt .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
.receipt .receipt_select {
	margin-top: 10rpx;
}
.receipt .receipt_select .caution {
	font-size: 20rpx;
	color: red;
	text-align: center;
	margin-top: 3rpx;
}
.receipt .receipt_type {
	display: flex;
	align-items: center;
	justify-content: center;
}
.receipt .receipt_type > view {
	width: 164rpx;
	height: 46rpx;
	border: 1px solid #009a44;
	text-align: center;
	line-height: 46rpx;
	color:#009A44 ;
}
.receipt .receipt_type .enterprise{border-radius:4rpx 0 0 4rpx;}
.receipt .receipt_type .person{border-radius:0rpx 4rpx 4rpx 0;}
.receipt .checked{background:#009A44 ;color:white!important;}
</style>
