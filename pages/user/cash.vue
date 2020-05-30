<template>
	<view class="cash">
		<uni-nav-bar left-icon="arrowleft" title="现金劵" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<my-s-tabs slot-title :nav-per-view="5" v-model="activeTab" class="custom-tabs">
			<my-s-tab v-for="(item, index) in cashList" :key="index">{{ item.name }}</my-s-tab>
		</my-s-tabs>

		<view>
			<view class="flex single_cash" v-for="(item, index) in 5" :key="index"
			 @click="detailPage"
			:class="{cash2:index==2,cash1:index==1,cash3:index==3,cash4:index==4}">
				<view class="price_cash">
					<view class="color">余额</view>
					<view class="color">
						￥
						<text class="fiveteen">{{ price }}</text>
					</view>
					<view>面值100元</view>
				</view>
				<view class="info_cash">
					<view class="detail">
						<view class="flex_left_right">
							<text class="fourteen">分宜县扶贫现金劵</text>
							<text class="ten">正常</text>
						</view>
						<view class=" all_tag">
							<view class="tag_cash"><text v-for="(item, index) in 4" :key="index">扶贫</text></view>

							<uni-icons type="arrowright" size="18" color="black"></uni-icons>
						</view>
					</view>
					<view class="date gray_font ten">2020-4-20 12:20 过期</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp().globalData;
const { navBar } = app;
export default {
	data() {
		return {
			navBar: navBar,
			cashList: [
				{
					name: '正常',
					id: '2'
				},
				{
					name: '未开始',
					id: '1'
				},
				{
					name: '已使用',
					id: '3'
				},
				{
					name: '已过期',
					id: '4'
				}
			],
			activeTab: 0,
			price: '1200.00'
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		detailPage(){
			uni.navigateTo({
				url:'cashdetail'
			})
		}
	}
};
</script>

<style lang="scss">
.cash .s-tabs-nav-wrap .s-tab-nav-view {
	display: flex !important;
	justify-content: space-around !important;
}
.cash .custom-tabs {
	/deep/.s-tab-nav-view {
		display: flex;
		justify-content: space-between;
	}
}
.cash .s-tab-nav {
	width: 100% !important;
}
.cash .single_cash {
	margin: 0 20rpx;
	border-radius: 10rpx;
	height: 200rpx;
	
}
.cash .single_cash:nth-child(n+2){margin-top:10rpx;}
.cash .price_cash {width:50%;
	padding: 11px 0 11rpx 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.cash .info_cash {
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.cash .info_cash .detail {
	padding: 10rpx 5rpx 15rpx 0;
}
.cash .date {
	border-top: 1px solid #efefef;
	height: 50rpx;
	line-height: 50rpx;
}
.cash .tag_cash {
	display: flex;
	flex-wrap: wrap;
	width: 140rpx;
}
.cash .tag_cash > text {
	margin-right: 10rpx;
	font-size: 20rpx;
	border: 1px solid red;
	padding: 0 2rpx;
	border-radius: 4rpx;
}
.cash .tag_cash > text:nth-child(n + 3) {
	margin-top: 10rpx;
}
.cash .all_tag {
	margin-top: 10rpx;
	display: flex;
	justify-content: space-between;
}
.cash .cash2{background: url(../../static/img/cash_green.png);background-size: cover;}
.cash .cash1{background: url(../../static/img/cash_blue.png);background-size: cover;}
.cash .cash3{background:url(../../static/img/cash_red.png);background-size: cover;}
.cash .cash4{background:url(../../static/img/cash_grey.png);background-size: cover;}
.cash .cash2 .tag_cash > uni-text{border:1px solid #009a44;}
.cash .cash1 .tag_cash > uni-text{border:1px solid#3d98ff;}
.cash .cash3 .tag_cash > uni-text{border:1px solid#CD2D44;}
.cash .cash4 .tag_cash > uni-text{border:1px solid#808080;}
.cash .cash2 .color{color:#009a44;}
.cash .cash1 .color{color:#3d98ff;}
.cash .cash3 .color{color:#CD2D44;}
.cash .cash4 .color{color:#808080;}
</style>
