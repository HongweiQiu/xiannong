<template>
	<view class="back_top" v-if="showTop"><text @click="top" class="iconfont icon-huidaodingbu" :style="{bottom:bottom+'px'}"></text></view>
</template>

<script>
	export default{
		props:['bottom','showTop'],
		methods:{
			top() { //回到顶部
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				}
		}
	}
</script>

<style>
.back_top .icon-huidaodingbu{background:#C6C6C6;color:white;border-radius: 50%;padding:10rpx;position: fixed;right:20rpx;}
</style>
