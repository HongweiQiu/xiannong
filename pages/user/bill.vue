<template>
	<view class="bill">
		<uni-nav-bar left-icon="arrowleft" title="账单记录" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="search_style">
			<view class="my_search_content" @click="openCalendar">
				<icon type="search" size="26rpx" />
				<text :style="{'color':(date!='请选择日期'?'black':'#d6cdd2')}">{{date}}</text>
			</view>
		</view>
		<view style="width: 100%; height: 100rpx;position: fixed;background: #f7f6f9;"></view>

		<!-- 账单信息 -->
		<view class="all_account" v-if="bitmap">
			<view class="flex_left_right single" v-for="(item, index) in 20" :key="index" @click="detailPage">
				<view class="account_info">
					<view>转账</view>
					<view class="gray_font">2019-10-29 12:12:12</view>
				</view>
				<view class="red_font">-12345678.00</view>
			</view>
			<my-loading></my-loading>
		</view>
		<!-- 占位图 -->
		<view v-else class="bitmap"><image src="../../static/img/no_record.png" mode="aspectFit"></image></view>
		  <uni-calendar 
		    :insert="false"
		    :lunar="true" 
			ref="calendar"
			:range="true"
		    @confirm="confirm"
		     />
	</view>
</template>

<script>
const app = getApp().globalData;
let { navBar } = app;
export default {
	data() {
		return {
			date:'请选择日期',
			bitmap: true,
			navBar: navBar
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		detailPage() {
			uni.navigateTo({
				url: 'billdetail'
			});
		},
		openCalendar(){
			this.$refs.calendar.open()
		},
		confirm(e){
			const length=e.range.data.length-1;
			this.date=`${e.range.data[0]},${e.range.data[length]}`
		}
	},
	onShow() {}
};
</script>

<style>
.bill .all_account {
	margin-top: 100rpx;
}
.bill .single {
	padding: 20rpx;
	background: white;
	margin-top: 2rpx;
}
.bill .single image {
	width: 28rpx;
	height: 28rpx;
	font-size: 24rpx;
}
.bill .single .account_info {
	width: 90%;
}
.bill .single .account_info > view {
	height: 40rpx;
	line-height: 40rpx;
}
.bill .search_style {
	background: white;
	padding: 0 0 20rpx 0;
	width: 100%;
	position: fixed;
	z-index: 3;
}
.bill .my_search_content {
	background: #f7f6f6;
	height: 68rpx;
	margin: 0 20rpx;
	display: flex;
	border-radius: 50rpx;
	justify-content: center;
	align-items: center;
}
.bill .bitmap {
	text-align: center;
	margin-top: 40%;
}
.bill .bitmap image {
	width: 314rpx;
}

</style>
