<template>
	<view>
		<view class="my_search">
			<!-- #ifdef APP-PLUS |H5 -->
			<view class="status_bar"><!-- 这里是状态栏 --></view>

			<!-- #endif -->
			<view class="my_search_content">
				<icon type="search" size="26rpx" />
				<text>请输入商品名称</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS |H5 -->
		<view class="status_bar"><!-- 这里是状态栏 --></view>
	
		<!-- #endif -->
			<view style="height:54px;"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style>
.my_search {
	background: white;
	padding: 20rpx 0;
	width: 100%;
	position: fixed;
	z-index: 3;
}
.my_search_content {
	background: #f7f6f6;
	height: 68rpx;
	margin: 0 20rpx;
	display: flex;
	border-radius: 50rpx;
	justify-content: center;
	align-items: center;
}
.my_search_content text {
	color: #d6cdd2;
}

</style>
