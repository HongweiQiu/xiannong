<template>
	<view class="user">
		<image src="../../static/img/user_back.png" mode="aspectFill"
			style="height:452rpx;width:100%;margin-top:-158rpx;"></image>
		<view class="author">
			<view class="flex-column flex-space-between img">
				<view class="flex_left_right" v-if="userInfo.token" @click="updateAvatar">
					<view class="align_center ">
						<image :src='userInfo.avatar' class="avator" v-if="userInfo.avatar"></image>
						<image src="../../static/img/avatar.png" class="avator" v-else></image>
						<view>
							<view>{{userInfo.company}}</view>
							<view class="user-level">
								<text>{{personInfo.level}}</text>
							</view>
						</view>

					</view>
					<text class="iconfont iconfanhui t-180 white-font"></text>

				</view>

				<view class="align_center" v-else @click="$needLogin">
					<image src="../../static/img/avatar.png" class="avator"></image>
					<text>登录/注册</text>
				</view>
				<navigator url="../user/remainder">
					<view class="flex_left_right remain-money">
						<text>我的余额</text>
						<view class="">
							<text>{{personInfo.money}}</text>
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
				<view v-for="(item,index) in orderStatu" @click="orderPage(item)" :key="index">
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
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote,
	} = app;
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
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
					name: '待审核'
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
				personInfo: '',
				imgRemote: imgRemote,
			};
		},
		methods: {
			updateAvatar() {
				uni.navigateTo({
					url: '../user/updateavatar'
				})

			},
			pageUrl(item) {
				this.$needLogin(() => {
					let path = item.url == 'delivery' ? 'shopcart' : 'user';
					uni.navigateTo({
						url: `/pages/${path}/${item.url}`
					});
				})
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
			memberInfo() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.personInfo = data.data;
					}
				})
			}
		},

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
		.user-level text {
			background: linear-gradient(to right, #FF7D24, #FFB92C);
			color: white;
			border-radius: 6rpx;
			padding: 0rpx 15rpx 2rpx;
			font-size: 22rpx;
		}

		position: absolute;
		top: 0;
		height: 300rpx;
		color: white;
		padding: 0 30rpx;
		width: 690rpx;

		.un-login {
			display: inline-block;
			font-size: 45px;
			background: rgba(0, 0, 0, 0.2);
			width: 110rpx;
			height: 110rpx;
			margin: 0rpx 20rpx 0 0;
			border-radius: 50%;

			line-height: 110rpx;
			text-align: center;
		}

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
