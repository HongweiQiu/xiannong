<template>
	<view class="order">
		<view class="order_top">
			<view class="account_info">
				<view class="" style="padding:0 90rpx;">
					<my-s-tabs effect slot-title @change="changeFirst" v-model="activeTab" class="custom-tabs"
						lineHeight='6'>
						<my-s-tab v-for="(item, index) of tabList" :key="index">{{ item.name }}</my-s-tab>
					</my-s-tabs>
				</view>
			</view>
		</view>
		<view style="height:80rpx;"></view>
		<view class="order_info">
			<view class="content" v-if="orderList.length">
				<view v-for="(item, index) in orderList" :key="index">
					<view class="top border fs-13">
						<view>{{$fomartDate(item.createtime)}}</view>
						<view :class="item.status==3?'gray_font':'red-font'">
						<text v-if="item.status==1">退款中</text>
						<text v-if="item.status==2">退款完成</text>
						<text v-if="item.status==3">退款失败</text>
						<text v-if="item.status==4">退款被拒</text>
						</view>
					</view>
					<view @click="orderDetailPage(item,index)">
						<view class="flex detail" v-for="(second,sIndex) in item.goods" :key="sIndex">
							<image class="order_img" :src="imgRemote+second.goods_img" mode="aspectFit" />
							<view class="order_oneline">
								<view class="flex-column flex-full" style="justify-content: space-between;">
									<view class="bold two-line" style="height: 80rpx;">{{second.goods_name}}</view>
									<view class="fs-13 gray_font" style="margin-top:10rpx;">x{{second.buy_num}}</view>
									<view class="fs-13 red-font" style="margin-top:10rpx;">
										￥{{second.market_price*second.buy_num}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="order_option">
						<text class=" cancel_order" @click="orderDetailPage(item,index)">查看详情</text>
					</view>
				</view>
			</view>
			<view class="bitmap" v-else>
				<image src="../../static/img/after-order.svg" mode="aspectFit"></image>
				<view class="gray_font">
					没有订单信息哦~
				</view>
			</view>
		</view>

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
				imgRemote: imgRemote,
				tabList: [{
					name: '申请售后'
				}, {
					name: '全部售后'
				}],
				activeTab: 1,
				page: 1,
				orderList: [],
				status: 2
			};
		},
		methods: {
			orderDetailPage(item, index) {
				uni.navigateTo({
					url: './refunddetail?id=' + item.id
				})
			},
			changeFirst(e) {
				this.activeTab = e;
				this.status = e + Number(1);
				this.orderList = [];
				this.page = 1;
				this.getList()
			},
			getList() {
				let params = {
					token: uni.getStorageSync('userToken'),
					page: this.page,
					status: this.status
				}
				this.$get(this.$api.orderRefund_list, params, (res) => {
					let data = res.data;
					if (data.code == 1) {

						this.orderList = this.orderList.concat(data.data);
					}
				}, true);
			},
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++;
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
	.order .select_account {
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 65rpx;
		padding-right: 18rpx;
	}

	.order .select_account text {
		color: grey;
		display: inline-block;
		margin-left: 10rpx;
	}

	.order .select_account .uni-icons {
		color: grey !important;
	}

	.order .account_info {
		background: white;
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	.order .s-tabs-nav-wrap .s-tab-nav-view {
		height: 100%;
		display: flex;
		justify-content: space-around;
	}

	.order .order_option {
		border-top: 1px solid #efefef;
		height: 96rpx;
		line-height: 96rpx;
		text-align: right;
		padding-right: 20rpx;
	}

	.order .order_option text {
		border-radius: 23rpx;
		width: 140rpx;
		display: inline-block;
		height: 46rpx;
		line-height: 46rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		text-align: center;
	}

	.order .another_order {
		background: white;
		color: #FF3333;
		border: 1px solid #F33;
	}

	.order .look_logist {
		background: rgb(2, 177, 228);
		color: white;
	}

	.order .cancel_order {
		background: white;
		color: #333;
		border: 1px solid #333;
	}

	.confirm_good {
		background: red;
		color: white;
		// border: 1px solid red;
	}

	.order .order_img {
		width: 208rpx;
		height: 208rpx;
		margin-right: 30rpx;
	}

	.order .order_info .content>view {
		background: white;
		margin: 30rpx 30rpx 0;

		border-radius: 10rpx;
	}

	.order .order_info .content .top {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
	}

	.order .order_info .content .detail {
		padding: 20rpx;
		border-top: 1px solid #efefef;
	}

	.order .order_statu .mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}

	.order .order_statu .operate {
		margin-top: 10rpx;
		padding: 2px 0 0;
		z-index: 9999;
		border-radius: 2px;
		position: fixed;
		right: 20rpx;
		color: #1ea55a;
		background: #fff;
		width: 25%;
	}

	.order .order_statu .operate>view {
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
	}

	.order .order_statu .operate .all_order {
		border-bottom: 1px solid #efefef;
	}

	.order .custom-tabs {
		/deep/.s-tab-nav-view {
			display: flex;
			justify-content: space-between;
		}
	}

	.order .bitmap {
		text-align: center;
	}

	.order .bitmap image {
		width: 100%;
		height: 500rpx;
		margin: 252rpx 0 60rpx;
	}

	.order .order_oneline {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/deep/ .s-tabs .s-tab-line {
		bottom: 1rpx;
		border-radius: 10rpx;
	}

	/deep/ .s-tab-nav {
		color: #000;
	}
</style>
