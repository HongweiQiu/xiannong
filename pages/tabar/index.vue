<template>
	<view class="home">
		<my-search></my-search>
		<!-- banner图 -->
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" duration="2000" circular="true">
				<swiper-item v-for="(item, index) in 3" :key="index"><image src="http://load.caidj.cn/web/images/nav4.png"></image></swiper-item>
			</swiper>
		</view>

		<!-- 公告 -->
		<view class="notice align_center">
			<image src="../../static/img/gcaidj_pic4.png" mode=""></image>
			<swiper autoplay="true" duration="2000" circular="true" interval="3000"><swiper-item v-for="(item, index) in 3" :key="index">菜东家庄主</swiper-item></swiper>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view v-for="(item, index) in 8" :key="index">
				<image src="../../static/img/gcaidj_pic4.png" mode=""></image>
				<text>我的</text>
			</view>
		</view>
		<!-- banner4 -->
		<view class="banner4"><image src="../../static/img/gcaidj_pic4.png" mode=""></image></view>
		<!-- 限时抢购 -->
		<view class="limit_buy">
			<view class="head">
				<view class="title">
					<view class="line_border"></view>
					<text class="name">限时抢购</text>
					<uni-countdown :hour="1" :minute="12" :second="40"></uni-countdown>
				</view>
				<view class="align_center more">
					更多
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>

			<view class="whole">
				<view class="body" v-for="(item, index) in 6" :key="index">
					<view><image class="good_img" src="../../static/img/gcaidj_pic4.png" mode=""></image></view>
					<view>
						<view>
							<view>西红柿</view>
							<view><text class="red_tag">限时</text></view>
						</view>
						<view class="price">
							<view>
								<view class="red_font">¥18.98-1...</view>
								<view class="line_through">¥18.98-1...</view>
							</view>
							<view class="addcart"><image src="../../static/img/addcart.png"></image></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 为你推荐 -->

		<view class="recomend" @click="shopDetailPage">
			<view class="title">
				<view class="line_border"></view>
				<text class="name" >为你推荐</text>
			</view>
			<view class="body"><my-recomend v-for="(item, index) in 4" :key="index"  @showCart="openCart"></my-recomend></view>
			<my-loading :loading="load"></my-loading>
		</view>
		<view class="support">
			由
			<text>菜东家</text>
			提供技术支持
		</view>
		
		<uni-popup ref="popup" type="bottom"><my-addcart @onClose="onClose"></my-addcart></uni-popup>
		<!-- <my-tabar tabarIndex=0></my-tabar> -->
	</view>
</template>

<script>

export default {
	data() {
		return {
			load: true
		};
	},
	methods: {
		openCart(){
			uni.hideTabBar()
			this.$refs.popup.open();
		},
		onClose() {
			this.$refs.popup.close();
				uni.showTabBar()
		},
		shopDetailPage(){
			uni.navigateTo({
				url:'/pages/index/shopdetail'
			})
		}
	}
};
</script>

<style>
.notice {
	height: 60rpx;
	line-height: 60rpx;
}
.notice swiper {
	width: 100%;
	height: 60rpx;
}
.notice image {
	width: 32rpx;
	height: 32rpx;
}
.nav {
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 20rpx;
	justify-content: space-between;
}
.nav > view {
	margin-top: 20rpx;
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.nav > view text {
	margin-top: 10rpx;
}
.banner image {
	height: 100%;
}
.nav > view image {
	width: 100rpx;
	height: 100rpx;
}
.banner4 image {
	width: 100%;
	height: 200rpx;
}
.home .limit_buy .head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.home .limit_buy .title {
	display: flex;
	align-items: center;
	align-items: center;
	height: 80rpx;
	line-height: 80rpx;
}
.home .limit_buy .name {
	margin: 0 12rpx;
	font-size: 32rpx;
	font-weight: 600;
}

.home .limit_buy .body .good_img {
	width: 240rpx;
	height: 200rpx;
}
.home .limit_buy .body .price {
	display: flex;
	justify-content: space-between;
}
.home .limit_buy .whole {
	overflow-x: scroll;
	display: flex;
}
.home .limit_buy .more {
	color: #009a44;
}
.home .limit_buy .head {
	padding: 0 20rpx;
}
,
.home .limit_buy .whole {
	padding: 0 0 20rpx 20rpx;
}

.home .limit_buy .icon-jiantou {
	font-size: 20rpx;
	height: 32rpx;
	line-height: 32rpx;
}
.whole::-webkit-scrollbar {
	width: 0;
	display: none;
}
.recomend .title {
	display: flex;
	align-items: center;
	height: 80rpx;
	line-height: 80rpx;
	background-image: linear-gradient(180deg, #fff, #f7f7f7);
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.recomend .title .name {
	margin: 0 12rpx;
	font-size: 32rpx;
	font-weight: 600;
}
.recomend .body {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
}
.nav,
.limit_buy {
	background: white;
	/* padding: 0 20rpx; */
	margin-top: 10rpx;
}
.banner,
.notice {
	background: white;
	padding: 0 20rpx;
}
.support {
	text-align: center;
	color: #808080;
}
.support text {
	color: rgb(157, 212, 127);
}
</style>
