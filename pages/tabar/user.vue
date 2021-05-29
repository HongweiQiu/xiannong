<template>
	<view class="user">
		<image src="../../static/img/user_back.png" mode="aspectFill" class="user-back"></image>
		<view class="author">
			<view class="flex-column flex-space-between img">
				<view class="flex_left_right" v-if="userToken" @click="$doubleClick(updateAvatar)">
					<view class="align_center ">
						<image :src='personInfo.avatar' class="avator" v-if="personInfo.avatar" mode="aspectFill">
						</image>
						<image src="../../static/img/avatar.png" class="avator" v-else></image>
						<view>
							<view>{{personInfo.company}}</view>
							<view class="user-level" v-if="personInfo.level">
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

				<view class="flex_left_right remain-money" @click="$doubleClick(remainPage)">
					<text>我的余额</text>
					<view class="">
						<text>{{personInfo.money?personInfo.money:'0.00'}}</text>
						<text class="iconfont iconfanhui t-180 white-font"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="order-info">
			<view class="my-order flex_left_right" @click="orderPage({id:''})">
				<text class="bold">我的订单</text>
				<text class="iconfont iconfanhui t-180 gray_font"></text>
			</view>
			<view class="order-statu flex_left_right">
				<view v-for="(item,index) in orderStatu" @click="orderPage(item)" :key="index">
					<view class="center">
						<image :src="'../../static/img/'+item.path+'.svg'" mode="aspectFit"></image>
						<text class="to-be-paid" v-if="index==0&&statusNum.shenhe>0">{{statusNum.shenhe}}</text>
						<text class="to-be-paid" v-if="index==1&&statusNum.fahuo>0">{{statusNum.fahuo}}</text>
					</view>
					<view class="fs-13 center name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="select_operate">
			<view @click="pageUrl(userList[0])" class="flex_left_right">
				<view class="align_center">
					<text :class="'iconfont first-arrow ' + userList[0].icon"></text>
					<text class="name">{{ userList[0].name }}</text>
				</view>
				<text class="iconfont iconfanhui t-180 gray_font"></text>
			</view>
			<view @click="pageUrl(userList[1])" class="flex_left_right" v-if="!userToken">
				<view class="align_center">
					<text :class="'iconfont first-arrow ' + userList[1].icon"></text>
					<text class="name">{{ userList[1].name }}</text>
				</view>
				<text class="iconfont iconfanhui t-180 gray_font"></text>
			</view>
			<view v-else>
				<button open-type="contact" style="height: 100%;" class="align_center">
					<view class="flex_left_right flex-full fs-15">
						<view class="align_center">
							<text :class="'iconfont first-arrow ' + userList[1].icon"></text>
							<text class="name">{{ userList[1].name }}</text>
						</view>
						<text class="iconfont iconfanhui t-180 gray_font"></text>
					</view>
				</button>
			</view>

			<view @click="pageUrl(item)" v-for="(item, index) in userList" :key="index" v-if="index>1"
				class="flex_left_right">
				<view class="align_center">
					<text :class="'iconfont first-arrow ' + item.icon"></text>
					<text class="name">{{ item.name }}</text>
				</view>
				<text class="iconfont iconfanhui t-180 gray_font"></text>
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
				userToken: uni.getStorageSync('userToken'),
				statusNum:{},
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
						url: 'kefu'
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
					name: '待审核',
					id: 1
				}, {
					path: 'to_be_delivered',
					name: '待发货',
					id: 2
				}, {
					path: 'to_be_received',
					name: '待收货',
					id: 3
				}, {
					path: 'completed',
					name: '已完成',
					id: 4
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
			remainPage() {
				this.$needLogin(() => {
					uni.navigateTo({
						url: '../user/remainder'
					})
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
				this.$needLogin(() => {
					if (data.path == 'after_sales') {
						uni.navigateTo({
							url: '../order/orderAfterSale'
						})
					} else {
						uni.navigateTo({
							url: './order?id=' + data.id
						})
					}
				})
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
			},
			auditOrder() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.orderNo_shenhe_order, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.statusNum = data.data;
					}
				})
			}
		},
		onShow: function() {
			var that = this;
			if (uni.getStorageSync('userToken')) {
				that.memberInfo();
				that.auditOrder()
			}
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

	.user .user-back {
		height: 452rpx;
		width: 100%;
		margin-top: -158rpx;
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

		.first-arrow {
			font-size: 50rpx;
			width: 50rpx;
		}

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
			margin-top: 10rpx;

			image {
				width: 100rpx;
				height: 100rpx;

			}
			.name{margin-top: -20rpx;}

			.to-be-paid {
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				// background: #FF3333;
				color: orange;
				border: 1px solid orange;
				border-radius: 50%;
				margin: 4rpx 0 0 -20rpx;
				line-height: 32rpx;
				font-size: 16rpx;
			}

			.scale {
				width: 50rpx;
			}
		}

	}
</style>
