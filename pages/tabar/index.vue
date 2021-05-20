<template>
	<view class="home">
		<my-search></my-search>
		<!-- banner图 -->
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" duration="2000" circular="true"
				disable-touch="true">
				<swiper-item v-for="(item, index) in adList" :key="index">
					<image :src="imgRemote+item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="flex padding-15 white_b align_center" style="height: 65rpx;">
			<text class="iconfont icongonggao fs-23" />
			<swiper class="swiper width" autoplay="true" duration="2000" circular="true"
				style="height: 100%;line-height: 65rpx;">
				<swiper-item v-for="(item, index) in noticeList" :key="index">
					{{item.title}}
				</swiper-item>
			</swiper>

		</view>

		<!-- 导航 -->
		<view class="nav">
			<view v-for="(item, index) in navList" :key="index" @click="navUrl(item)" v-if="index<10">
				<image :src="imgRemote + item.image" mode="aspectFit"></image>
				<text class="hidden width center">{{item.name}}</text>
			</view>
		</view>

		<!-- 今日上新 -->
		<view class="recomend" v-if="newList.length">
			<view class="title">
				<image src="../../static/img/radish.png" style="width: 66rpx;height:32rpx;" mode="widthFix"></image>
				<text class="name">今日上新</text>
			</view>
			<view class="body">
				<my-recomend v-for="(item, index) in newList" :key="index" :ware="item" :config="config"
					@showCart="openCart(item)" class="myc_recomend"></my-recomend>
			</view>
		</view>

		<!-- 为你推荐 -->
		<view class="recomend" v-if="recommendList.length">
			<view class="title">
				<image src="../../static/img/cucumber.png" style="width: 66rpx;height:32rpx;" mode="widthFix"></image>
				<text class="name">精选推荐</text>
			</view>
			<view class="body">
				<my-recomend v-for="(item, index) in recommendList" :key="index" :ware="item" :config="config"
					@showCart="openCart(item)" class="myc_recomend"></my-recomend>
			</view>
		</view>
		<view style="height:30rpx;"></view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;
	export default {
		data() {
			return {
				support: false,
				showTop: false,
				token: '',
				imgRemote: imgRemote,
				page: 1,
				adList: [],
				navList: [],
				newList: [],
				recommendList: [],
				noticeList: [],
			};
		},
		methods: {
			//导航页面
			navUrl(e) {
				getApp().globalData.classId = e.id;
				getApp().globalData.isReload = true;
				uni.switchTab({
					url: './classify'
				})
			},
			indexMainAd() {
				this.$get(this.$api.mainAd, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.adList = data.data;
					}
				})
			},
			indexMainCate() {
				this.$get(this.$api.mainCate, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.navList = data.data;
					}
				});
			},
			indexMainRecommend() {
				let {
					num,
					page
				} = this;
				this.$get(this.$api.mainRecommend, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.recommendList = data.data;
					}
				});
			},
			indexMainNew() {
				this.$get(this.$api.mainNew, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.newList = data.data;
					}
				})
			},
			indexMainNotice() {
				this.$get(this.$api.mainNotice, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.noticeList = data.data;
					}
				})
			}
		},
		onLoad() {
			this.indexMainAd();
			this.indexMainCate();
			this.indexMainRecommend();
			this.indexMainNew();
			this.indexMainNotice();
		},
		onReachBottom() {
			//页面上拉触底事件的处理函数
			var that = this;
			that.page++;
			// that.indexItem();
		},
		onShareAppMessage() {
			 
		},
		onShareTimeline() {}
	};
</script>

<style scoped>
	.nav {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 20rpx 30rpx;
		/* justify-content: space-between; */
	}

	.home .icongonggao {
		color: #57B127;
		margin-right: 20rpx;
	}

	.nav>view {
		margin-top: 20rpx;
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav>view text {
		margin-top: 20rpx;
	}

	.banner image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.nav>view image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}

	.banner4 {
		margin: 10rpx 20rpx 0;
		height: 200rpx;
		background: white;
	}

	.banner4 image {

		width: 100%;
		height: 200rpx;
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

	.nav,
	.limit_buy {
		background: white;
		/* padding: 0 20rpx; */
		margin-top: 16rpx;
	}

	.banner,
	.notice {
		background: white;
		padding: 0 30rpx;
	}

	.support {
		text-align: center;
		color: #808080;
		margin-bottom: 20rpx;
		font-size: 28rpx;
	}

	.support text {
		color: rgb(157, 212, 127);
	}

	.home .uni-countdown__number {
		height: 30rpx !important;

		color: white !important;
		border-radius: 4rpx;
		width: 40rpx !important;
	}

	.home .my_loading {
		height: 70rpx;
	}

	.home .limit_buy .whole .body {
		margin-right: 20rpx;
		width: 33%;
	}

	.home .shuiyin1 {
		width: 60rpx;
		height: 20rpx;
	}
</style>
