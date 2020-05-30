<template>
	<view class="invest">
		<uni-nav-bar left-icon="arrowleft" title="充值" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view style="height: 10rpx;background: #F8F6F9;"></view>
		<view class="self_money">
			<view>账户余额(元)</view>
			<view class="money">464131313</view>
			<view class="record" @click="recordPage">
				充值记录
				<uni-icons type="arrowright" size="18" color="#9e9e9e"></uni-icons>
			</view>
		</view>
		<view class="invest_button" @click="$refs.popup.open()">充值</view>
		<uni-popup ref="popup" type="bottom"><my-keyboard @keyBoard="$refs.popup.close()"></my-keyboard></uni-popup>
		
	</view>
</template>

<script>
const app = getApp().globalData;
const { navBar } = app;
export default {
	data() {
		return { navBar: navBar };
	},
	methods:{
		leftClick(){
			uni.navigateBack({
				delta:1
			})
		},
		recordPage(){
			uni.navigateTo({
				url:'./investlist'
			})
		}
	}
};
</script>

<style>
page {
	background: white;
}
.invest .money {
	font-size: 48rpx;
	margin:25rpx 0;
}
.invest .self_money {
	margin: 90rpx 0 270rpx;
	text-align: center;
}
.invest .self_money .record{
	color:#9e9e9e;
}
.invest .invest_button {
	background-color: #009a44;
	width: 240rpx;
	height: 64rpx;
	color: white;
	margin: 0 auto;
	line-height: 64rpx;
	text-align: center;
	border-radius:4rpx;
}
</style>
