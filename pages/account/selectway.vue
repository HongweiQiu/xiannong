<template>
	<view class="select_way">
		<uni-nav-bar left-text="关闭" color="#009A44" :status-bar="navBar" fixed="true" @clickLeft="LeftClick"></uni-nav-bar>
		<view class="select_option">
			<view class="new_count">
				创建新账号
			</view>
			<view class="bind_count">
				绑定已有账号
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page{background: white;}
	.select_way .select_option{width:420rpx;margin:0 auto;margin-top:400rpx;}
	.select_way .select_option>view{height:65rpx;text-align: center;line-height: 65rpx;font-size: 32rpx;border-radius: 8rpx;}
	.select_way .new_count{background:#009A44;color: white;margin-bottom:40rpx;border:1px solid #009A44}
	.select_way .bind_count{border:1px solid #009A44;color: #009A44;}
	
</style>
