<template>
	<view class="account_mange">
		<uni-nav-bar left-icon="arrowleft" right-text="添加" 
		title="账号管理" :status-bar="navBar" fixed="true" @clickLeft="leftClick"@clickRight="rightClick"></uni-nav-bar>
		<!-- 账号信息 -->
		<view class="all_account">
			<view class="flex_left_right single" v-for="(item,index) in 4" :key="index">
			  <view class="account_info">
				  <view>账号名称 : 123456789</view>
				  <view class="hidden" >收货地址 : 13866666666 江西省南昌市红谷滩绿地双子塔A2座...</view>
			  </view>	
			  <view @click="editPage">
				  <image src="../../static/img/edit.png"></image>
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
	.account_mange .all_account{margin-top: 8rpx;}
	.account_mange .single{padding:20rpx;background:white;margin-top: 2rpx;}
	.account_mange .single image{width:28rpx;height:28rpx;font-size: 24rpx;}
	.account_mange .single .account_info{width:90%;}
	.account_mange .single .account_info>view{height:40rpx;line-height: 40rpx;}
</style>
