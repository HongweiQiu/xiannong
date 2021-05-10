<template>
	<view class="user">
		<image src="../../static/img/user_back.png" mode="aspectFill"
			style="height:452rpx;width:100%;margin-top:-158rpx;"></image>
		<view class="author">
			<view class="flex-column flex-space-between img">
				<view class="align_center" v-if="token">
					<image v-if="memberInfoData.logo" :src='memberInfoData.logo' class="avator"></image>
					<text v-if="memberInfoData.nickname != ''">{{memberInfoData.nickname}}</text>
					<text v-if="memberInfoData.nickname == ''">请设置昵称</text>
				</view>
				<view class="align_center" v-else>
					<image v-if="memberInfoData.logo" :src='memberInfoData.logo' class="avator"></image>
					<image v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
					<text>请先登录</text>
				</view>
				<navigator url="../user/remainder">
					<view class="flex_left_right remain-money">
						<text>我的余额</text>
						<view class="">
							<text>0.00</text>
							<text class="iconfont iconfanhui t-180 white-font"></text>
						</view>
					</view>
				</navigator>

			</view>

		</view>

		<view class="order-info">
			<view class="my-order flex_left_right" @click="orderPage(0)">
				<text class="bold">我的订单</text>
				<text class="iconfont iconfanhui t-180 gray_font"></text>
			</view>
			<view class="order-statu flex_left_right">
				<view v-for="(item,index) in orderStatu" @click="orderPage(item)">
					<view class="center">
						<image :src="'../../static/img/'+item.path+'.png'" mode="aspectFit"
							:class="index==1?'scale':''"></image>
						<text class="to-be-paid" v-if="index==0">2</text>
					</view>
					<view class="fs-13 center">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="select_operate">
			<view @click="pageUrl(item)" v-for="(item, index) in userList" :key="index"
				class="flex_left_right align_center">
				<view class="align_center">
					<text :class="'iconfont ' + item.icon" style="font-size: 50rpx;width: 50rpx;"></text>
					<text class="name">{{ item.name }}</text>
				</view>
				<view>
					<text class="iconfont iconfanhui t-180 gray_font"></text>
				</view>
			</view>
		</view>
		<!-- <my-tabar tabarIndex=3></my-tabar> -->
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		data() {
			return {
				userList: [{
						icon: 'iconshouhuodizhi',
						name: '地址管理',
						color: '#3DABFF',
						url: 'delivery'
					},
					{
						icon: 'iconkefu',
						name: '联系客服',
						color: '#FF9C00',
						url: 'receipt'
					},
					{
						icon: 'iconxuqiu',
						name: '新品需求',
						color: '#FFF000',
						url: 'newProductDemand'
					},
					{
						color: '#ffab9a',
						icon: 'iconxinxi',
						name: '意见反馈',
						url: 'feedback'
					},
					{
						icon: 'iconshezhi',
						name: '设置',
						color: '#2DC4B4',
						url: 'myinfo'
					}
				],
				orderStatu: [{
					path: 'to_be_paid',
					name: '待付款'
				}, {
					path: 'to_be_delivered',
					name: '待发货'
				}, {
					path: 'to_be_received',
					name: '待收货'
				}, {
					path: 'completed',
					name: '已完成'
				}, {
					path: 'after_sales',
					name: '售后/退款'
				}, ],
				count: 0,
				token: '',
				imgRemote: imgRemote,
				memberInfoData: '',
				member_default: '',
			};
		},
		methods: {
			memberInfo() {

				var that = this;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.getRequests("memberInfo", data, (res) => {
					// console.log(res)
					if (res.data.code == 200) {
						this.memberInfoData = res.data.data.info;
						this.member_default = res.data.data.member_default;
					}
				});

			},
			myinfoPage() {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 500)
				if (!this.token) {
					uni.navigateTo({
						url: '/pages/account/login'
					})
				} else {
					uni.navigateTo({
						url: "/pages/user/myinfo"
					})
				}

			},
			pageUrl(item) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 500)

				if (this.token) {
					getApp().globalData.isReload = true;
					let path = item.url == 'delivery' ? 'shopcart' : 'user';
					uni.navigateTo({
						url: `/pages/${path}/${item.url}`
					});
				} else {
					uni.reLaunch({
						url: '/pages/account/login'
					});
				}
			},
			threePage(data) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 500)
				if (this.token) {
					switch (data) {
						case 'recomend':
							uni.navigateTo({
								url: '/pages/index/recommed'
							});
							break;
						case 'address':
							uni.navigateTo({
								url: '/pages/user/userAddress'
							});
							break;
						case 'password':
							uni.navigateTo({
								url: '/pages/user/modifypwd'
							});
							break;
					}
				} else {
					uni.reLaunch({
						url: '/pages/account/login'
					});
				}
			},
			orderPage(data) {
				if (data.path == 'after_sales') {
					uni.navigateTo({
						url: '../order/orderAfterSale'
					})
				} else {
					uni.navigateTo({
						url: './order'
					})
				}

			},
		},
		onLoad() {

		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			that.memberInfo();
		},

	};
</script>

<style lang="scss">
	page,
	.user {
		background: white;
		/* height: 100%; */
	}

	.user .author>view image {
		width: 110rpx;
		height: 110rpx;
		margin: 0rpx 20rpx 0 0;
		border-radius: 50%;
	}

	.user .author {
		position: absolute;
		top: 0;
		height: 300rpx;
		color: white;
		padding: 0 30rpx;
		width: 690rpx;

		.img {
			height: 294rpx;

			&>view:first-child {
				margin-top: 20rpx;
			}
		}
	}

	.user .back_green {
		background: #094;
		height: 80rpx;
		width: 100%;
	}

	.user .select_operate {
		padding: 0 20rpx;
	}

	.user .select_operate>view {
		height: 98rpx;
		border-bottom: 1px solid #EEE;
		box-sizing: border-box;

	}

	.user .select_operate>view .name {
		margin-left: 10rpx;
	}


	.user {
		.remain-money {
			border-radius: 10rpx 10rpx 0 0;
			background: linear-gradient(to right, #FF9044, #FFB92C);
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
		}

		.order-info {
			border-radius: 10rpx;
			margin: 30rpx 30rpx 0rpx;
			padding: 0 30rpx 30rpx 30rpx;
			box-shadow: 3rpx 4rpx 6px rgba(0, 0, 0, 0.1);
		}

		.order-info .my-order {
			height: 91.8rpx;
			line-height: 91.8rpx;
			border-bottom: 1px solid #eee;
		}

		.order-statu {

			flex-basis: 20%;
			margin-top: 30rpx;

			image {
				width: 80rpx;
				height: 60rpx;

			}

			.to-be-paid {
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				background: #FF3333;
				color: white;
				border-radius: 50%;
				margin: -10rpx 0 0 -25rpx;
				line-height: 32rpx;
				font-size: 16rpx;
			}

			.scale {
				width: 50rpx;
			}
		}

	}
</style>
