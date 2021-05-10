<template>
	<view class="home">

		<my-search></my-search>
		<!-- banner图 -->
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" duration="2000" circular="true"
				disable-touch="true">
				<swiper-item v-for="(item, index) in adList.ad" :key="index">
					<image :src="item.banner"></image>
				</swiper-item>
			</swiper>


		</view>

		<!-- 公告 -->
		<view class="" >
			<uni-notice-bar showIcon="true" background-color="white" color="balck" scrollable="true" single="true"
				:text="adList.public_msg+'asdsad'" :speed="speed"></uni-notice-bar>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view v-for="(item, index) in adList" :key="index" @click="navUrl(item)">
				<image :src="imgRemote + item.image" mode="aspectFit"></image>
				<text class="hidden width center">{{item.name}}</text>
			</view>
		</view>

		<!-- 今日上新 -->
		<view class="recomend">
			<view class="title">
				<image src="../../static/img/radish.png" style="width: 66rpx;height:32rpx;" mode="widthFix"></image>
				<text class="name">今日上新</text>
			</view>
			<view class="body">
				<my-recomend v-for="(item, index) in itemList" :key="index" :ware="item" :config="config"
					@showCart="openCart(item)" class="myc_recomend"></my-recomend>
			</view>
		</view>

		<!-- 为你推荐 -->
		<view class="recomend">
			<view class="title">
				<image src="../../static/img/cucumber.png" style="width: 66rpx;height:32rpx;" mode="widthFix"></image>
				<text class="name">精选推荐</text>
			</view>
			<view class="body">
				<my-recomend v-for="(item, index) in itemList" :key="index" :ware="item" :config="config"
					@showCart="openCart(item)" class="myc_recomend"></my-recomend>
			</view>
			<my-loading :loading="loading"></my-loading>
		</view>
		<view class="support" v-if="support&&adList.copyright.is_copyright==0">
			由<text>菜东家</text>提供技术支持
		</view>

		<my-backtop bottom="60" :showTop="showTop"></my-backtop>

		<uni-popup ref="popup" type="bottom" @maskInfo="closeCart">
			<my-addcart @onClose="onClose" :cartware="cartware" :config="config" ref="addcart"></my-addcart>
		</uni-popup>

	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	import {
		api
	} from '../../static/js/api.js';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';

	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {

				showActive: false,
				support: false,
				showTop: false,
				token: '',
				imgRemote: imgRemote,
				speed: 30,
				loading: true,
				page: 1,
				num: 10,
				hours: 1000,
				adList: {},
				activeList: {},
				activeConf: {},
				cartware: {},
				config: {},
				itemList: [],
				count: 0
			};
		},
		methods: {
			closeCart() {
				this.$refs.addcart.onClose();
			},
			//导航页面
			navUrl(e) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				let {
					id,
					cate_id,
					status
				} = e;
				if (status == 0) {
					rs.Toast("该栏目已下架");
					return;
				}
				switch (id) {
					case 1:
						if (this.token) {
							uni.navigateTo({
								url: '/pages/index/collect'
							});
						} else {
							uni.navigateTo({
								url: '/pages/account/login'
							});
						}
						break;
					case 2:
						if (this.token) {
							uni.navigateTo({
								url: '/pages/index/newback'
							});
						} else {
							uni.navigateTo({
								url: '/pages/account/login'
							});
						}

						break;
					case 3:
						if (this.token) {
							uni.navigateTo({
								url: '/pages/index/recommed'
							});
						} else {
							uni.navigateTo({
								url: '/pages/account/login'
							});
						}

						break;
					case 4:
						uni.makePhoneCall({
							phoneNumber: this.adList.phone
						});
						break;
					case 5:
						uni.switchTab({
							url: '/pages/tabar/classify'
						});
						break;
					case 6:
						if (this.token) {
							uni.switchTab({
								url: '/pages/tabar/shopcart'
							});
						} else {
							uni.navigateTo({
								url: '/pages/account/login'
							});
						}

						break;
					case 7:
						if (this.token) {
							uni.switchTab({
								url: '/pages/tabar/order'
							});
						} else {
							uni.navigateTo({
								url: '/pages/account/login'
							});
						}

						break;
					case 8:
						uni.switchTab({
							url: '/pages/tabar/user'
						});
						break;
					default:
						getApp().globalData.classId = cate_id;
						wx.switchTab({
							url: '/pages/tabar/classify'
						});
						break;
				}
			},
			openCart(item) {
				this.$refs.popup.open();
				this.cartware = item;
			},
			onClose() {
				this.$refs.popup.close();
			},
			newPage(url, id) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				if (id) {
					uni.navigateTo({
						url: `/pages/index/${url}?id=${id}`
					});
				} else {
					uni.navigateTo({
						url: `/pages/index/${url}`
					});
				}

			},
			indexAd() {
				rs.getRequests(api.mainCate, {}, res => {
					let data = res.data;

					if (data.code == 1) {
						this.adList = data.data;
					}
				});
			},
			indexItem() {
				this.itemList = [];
				let {
					num,
					page
				} = this;
				rs.getRequests(api.mainRecommend, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.itemList = data.data;
						this.config = data.data;
						// if (data.data.total <= 10) {
						// 	this.loading = false;
						// 	this.support = true;
						// } else {
						// 	this.support = false;
						// 	this.loading = true;
						// }
					}
				});
			},
			newToday() {
				rs.getRequests(api.mainNew, {}, res => {})
			}
		},
		onShow() {
			this.token = uni.getStorageSync('cdj_token');
			// if (app.isReload == true) {
			// 	this.page = 1;
			// 	uni.pageScrollTo({
			// 		scrollTop: 0,
			// 		duration: 0
			// 	});
			// 	
			// }
		},
		onLoad() {
			app.isReload = true;
			this.indexAd();
			this.indexItem();
			this.newToday()
		},
		onReachBottom() {
			//页面上拉触底事件的处理函数
			var that = this;
			that.page++;
			that.indexItem();
		},
		onPageScroll(e) {
			if (e.scrollTop == 0) {

				this.showTop = false;
			} else {
				this.showTop = true;
			}
		}
	};
</script>

<style>
	.nav {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 20rpx 30rpx;
		/* justify-content: space-between; */
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

	.home .limit_buy .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.home .limit_buy .title {
		justify-content: center;
		display: flex;
		align-items: center;
		align-items: center;
		height: 94rpx;
		line-height: 94rpx;
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


	/* #ifdef H5 */
	a {
		text-decoration: none;
		color: gray;
	}

	/* #endif */
</style>
