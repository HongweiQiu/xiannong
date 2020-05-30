<template>
	<view class="collect">
		<uni-nav-bar left-icon="arrowleft" right-text="清空" title="收藏列表" :status-bar="navBar" fixed="true" @clickLeft="leftClick" @clickRight="rightClick"></uni-nav-bar>
		<view class="all_collect">
			<my-profile class="single_collect" v-for="(item, index) in 10" :key="index" url="collect"></my-profile>
			<my-loading></my-loading>
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
		},
		rightClick() {}
	}
};
</script>
<style lang="scss">
.collect .all_collect .my_profile {
	background: white;
	margin-top: 10rpx;
}
</style>
