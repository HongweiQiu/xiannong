<template>
	<view class="my_loading">
		
		<view class="loading" v-if="loading">
			
			<image src="../../static/img/loading.gif" mode=""></image>
			<text>正在加载中...</text>
		</view>
	
		<view v-else>已经到底呢!</view>
	</view>
</template>

<script>
	export default{
		props:['loading']
	}
</script>

<style>
	.loading {
		display: flex;align-items: center;justify-content: center;;
	}
	.loading image{width:25rpx;height:25rpx;margin-right: 10rpx;}
	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	.icon-loading {
		font-size: 48rpx;
		animation: rotate 1s infinite;
	}
	.my_loading{color: #808080;font-size: 24rpx!important;text-align: center;height:80rpx;line-height: 80rpx;background:#F8F6F9 ;}
</style>
