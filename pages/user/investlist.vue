<template>
	<view class="invest_list">
		<uni-nav-bar left-icon="arrowleft" 
		title="充值记录" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<!-- 账号信息 -->
		<view class="all_account">
			<view class="flex_left_right single" v-for="(item,index) in 4" :key="index">
			  <view class="account_info">
				  <view>订单消费 : 123456789</view>
				  <view class="gray_font" >消费时间 : 2019-10-29 12:12:12</view>
			  </view>	
			  <view>
				 -12345678.00
			  </view>	
			</view>
		</view>
		<!-- 无账号 -->
		<view></view>
	</view>
</template>

<script>
	  const app=getApp().globalData
	  let {navBar}=app;
	export default{
		data(){
			return {
				navBar:navBar
			}
		},
		methods:{
			leftClick(){
				uni.navigateBack({
					delta:1
				})
			},
			rightClick(){
				uni.navigateTo({
					url:"/pages/user/accountadd"
				})
			},
			editPage(){
				uni.navigateTo({
					url:"/pages/user/accountedit"
				})
			}
		},
		onShow(){
		}
	}
</script>

<style>
	.invest_list .all_account{margin-top: 8rpx;}
	.invest_list .single{padding:20rpx;background:white;margin-top: 2rpx;}
	.invest_list .single image{width:28rpx;height:28rpx;font-size: 24rpx;}
	.invest_list .single .account_info{width:90%;}
	.invest_list .single .account_info>view{height:40rpx;line-height: 40rpx;}
</style>
