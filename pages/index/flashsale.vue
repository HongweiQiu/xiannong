<template>
	<view class="flash_sale">
		<uni-nav-bar left-icon="arrowleft" title="限时抢购" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="time_stage">
			<image src="../../static/img/secondsha.png"></image>
			<view class="single_stage">
				<view v-for="(item, index) in 4" :class="index == kind ? 'active_back' : ''" @click="selectStage(index)">
					<view class="twelve">
						<text v-if="index == 1">距离结束</text>
						<text v-else>即将开始</text>
					</view>
					<view v-if="index == 1">
						<uni-countdown :hour="1" :minute="12" :second="40" :show-day="false" background-color="none" splitor-color="white"></uni-countdown>
					</view>
					<view v-else class="ten" style="hieght:42rpx;line-height: 42rpx;">01: 52 : 23</view>
				</view>
			</view>
		    <view   class="square">
				
				<view class="" v-for="(item,index) in 4" >
					<view :class="index==kind?'show_square':''"></view>
				</view>
			</view>
		</view>

		<view class="all_things">
			<view v-for="(item, index) in 30" class="flex single_good">
				<view class="photo" style="width:25%;"><image class="good_img" src="../../static/img/addcart.png" mode="aspectFit"></image></view>
				<view style="width:50%;">
					<view>
						<view >红色山东苹果红色山东约500g红 色山东约500g红色山东约500g</view>
						<view class="ten gray_font hidden" >红色山东苹果红色山东约500g红 色山东约500g红色山东约500g</view>
					</view>
					<view>
						<view>
							<text class="red_tag">爆品</text>
							<text class="red_tag">省</text>
							<text class="red_font">3元</text>
							<text class="gray_font ten">剩余:5个</text>
						</view>
						<view>
							<text class="red_font">¥54.26/个</text>
							<text class="line_through ten">¥54.26/个</text>
						</view>
					</view>
				</view>
				<view style="width:25%;" class="good_num">
					<!-- <my-stepper></my-stepper> -->
					<view class="no_num"><text>已抢完</text></view>
					</view>
			</view>
		    <my-loading></my-loading>
			
		</view>
		<my-backtop bottom="10"></my-backtop>
	</view>
</template>

<script>
const app = getApp().globalData;
const { navBar } = app;
export default {
	data() {
		return {
			kind: 0,
			navBar: navBar
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		selectStage(index) {
			this.kind = index;
		}
	}
};
</script>

<style>
.flash_sale .time_stage {
	position: fixed;
	width: 100%;
	display: flex;
	z-index: 3;
	flex-direction: column;
}
.flash_sale .time_stage image {
	width: 100%;
	height: 188rpx;
}
.flash_sale .time_stage .single_stage {
	display: flex;
	flex: 1;
}
.flash_sale .time_stage .single_stage > view {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #999;
	flex: 1;
	color: #fff;
	padding: 2% 0;
}
.flash_sale .all_things {
	margin-top: 320rpx;
}
.flash_sale .photo .good_img {
	width: 200rpx;
	height: 150rpx;
}
.flash_sale .active_back {
	background: #009b44 !important;
}

.flash_sale .single_good {
	padding:10rpx 20rpx;
	
	background: white;
}
.flash_sale .single_good:nth-last-child(n+3){
	margin-bottom: 10rpx;
}
.flash_sale .time_stage .square{display: flex;}
.flash_sale .time_stage .square>view{flex:1;}
.flash_sale .time_stage .square .show_square{width: 0!important;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    height: 0;
    margin: 0 auto;
    bottom: 12px;
    border: 8px solid transparent;
    border-top-color: #009a44;}
	.flash_sale .good_num .no_num{justify-content: flex-end;
    height: 100%;
    display: flex;align-items: center;}
	.flash_sale .good_num text{background: #808080;color:white;border-radius: 12rpx;padding:0 10rpx;font-size: 20rpx;}
</style>
