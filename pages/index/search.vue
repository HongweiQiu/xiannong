<template>
	<view class="search_list">
		<!-- #ifdef APP-PLUS |H5 -->
		<view class="status_bar"><!-- 这里是状态栏 --></view>

		<!-- #endif -->
		<view class="input_key">
			<view class="arrow_left" @click="back"><uni-icons type="arrowleft" size="25"></uni-icons></view>
			<view class="flex_left_right right_area">
				<view class="select_key align_center">
					<icon type="search" size="30rpx" />
					<input type="text" placeholder="请输入商品名称" placeholder-class="place_style" class="keyword" />
					<uni-icons type="mic-filled" size="20" color="#808080"></uni-icons>
				</view>
				<view style="color:#009B44;">搜索</view>
			</view>
		</view>
		<view style="height:108rpx;"></view>
		<!-- 热门搜索 -->
		<!-- <view class="hot_search">
			<view class="title">热门搜索</view>
			<view class="key_tag"><text v-for="(item, index) in 25">西红柿</text></view>
		</view> -->
		<!-- 搜索结果 -->
		<view class="search_result">
			<my-profile v-for="(item,index) in 5" :key="index"></my-profile>
		</view>
		<!-- 占位图 -->
		<!-- <view class="search_bitmap"><image class="bitmap" src="../../static/img/no_content.png" mode="aspectFit"></image></view> -->
	</view>
</template>

<script>
	export default{
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	} 
</script>

<style>
.search_list .input_key {
	position: fixed;
	width: 98%;
	background: white;
	height: 68rpx;
	padding: 20rpx 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 20rpx;
}
.search_list .input_key .select_key {
	padding: 0 10rpx 0 20rpx;
	border-radius: 40rpx;
	background: #f7f6f6;
	width: 84%;
	height: 68rpx;
}
.search_list .input_key .arrow_left {
	width: 14%;
}
.search_list .input_key .right_area {
	width: 85%;
}
.search_list .input_key .select_key .keyword {
	width: 100%;
}
.search_list .hot_search {
	position: fixed;
	height: calc(100vh - 108rpx);
	background: white;
	width: 100%;
	padding: 0 20rpx;
}
.search_list .hot_search .title {
}
.search_list .hot_search .key_tag {
	display: flex;
	flex-wrap: wrap;
}
.search_list .hot_search .key_tag text {
	border-radius: 3px;
	color: grey;
	padding: 0 6rpx;
	background: #f2f2f2;
	margin: 20rpx 20rpx 0 0;
}
.search_list .search_bitmap {
	margin-top: 25%;
	text-align: center;
}
.search_list .search_bitmap .bitmap {
	width: 47%;
}
.search_list .search_result .my_profile{margin-bottom: 10rpx;}
</style>
