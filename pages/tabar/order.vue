<template>
	<view class="order">
		<view class="order_top">
			<view class="account_info">
				<view class="padding-15">
					<my-s-tabs effect slot-title @change="changeFirst" v-model="activeTab" class="custom-tabs"
						lineHeight='6'>
						<my-s-tab v-for="(item, index) of tabList" :key="index">{{ item.name }}</my-s-tab>
					</my-s-tabs>
				</view>
			</view>
		</view>
		<view style="height:80rpx;"></view>
		<view class="order_info" style="margin-bottom: 30rpx;">
			<view class="content" v-if="list.length">
				<view v-for="(item, index) in list" :key="index">
					<view class="top border fs-13">
						<view>{{$fomartDate(item.createtime)}}</view>
						<view :class="item.order_status==6?'gray_font':(item.order_status==5?'':'red-font')">
							{{item.order_status_msg}}
						</view>
					</view>
					<view @click="orderDetailPage(item,index)">
						<view class="flex detail" v-for="(second,sIndex) in item.details" :key="sIndex">
							<image class="order_img" :src="imgRemote+second.goods_img" mode="aspectFit" />
							<view class="order_oneline">
								<view class="">
									<view class="bold two-line" style="height: 80rpx;">{{second.goods_name}}</view>
									<view class="fs-13 gray_font" style="margin-top:10rpx;">x{{second.buy_num}}</view>
								</view>
							</view>
						</view>
						<view class="time" style="text-align: right;">
							<text class="fs-11">共计{{item.details.length}}件商品 合计：</text>
							<text class="red-font bold">￥{{fixed(Number(item.total_price)+Number(item.freight))}}</text>
						</view>
					</view>
					<view class="order_option">
						<text class=" cancel_order" @click="orderDetailPage(item,index)">查看详情</text>
						<!-- <text class="cancel_order" @click="ckwl" v-if="item.order_status==4">查看物流</text> -->
						<text class="another_order" @click="confirmReceipt(item.id,index)"
							v-if="item.order_status==4">确认收货</text>
						<text class="another_order" v-if="item.order_status==1">立即支付</text>
						<text class="cancel_order" v-if="item.order_status==1"
							@click="cancelOrder(item.id,index)">取消订单</text>
					</view>
				</view>

			</view>
			<view class="bitmap" v-else>
				<image src="../../static/img/no_content.png" mode="aspectFit"></image>
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
		imgRemote,
	} = app;
	export default {
		data() {
			return {
				imgRemote: imgRemote,
				tabList: [{
						name: '全部',
						id: ''
					}, {
						name: '待审核',
						id: '1'
					}, {
						name: '待发货',
						id: '2'
					}, {
						name: '待收货',
						id: '3'
					}, {
						name: '已完成',
						id: '4'
					},
					{
						name: '已取消',
						id: '5'
					}
				],
				activeTab: 0,
				search_default: true,
				list: [],
				page: 1,
				id: ''
			};
		},
		methods: {
			fixed(val) {
				return Number(val).toFixed(2);
			},

			orderDetailPage(item, index) {
				uni.navigateTo({
					url: '/pages/order/orderdetail?id=' + item.id + '&index=' + index
				})

			},
			//初始订单请求
			orderList(id) {
				let params = {
					token: uni.getStorageSync('userToken'),
					order_status: id,
					page: this.page
				};
				this.$get(this.$api.orderIndex, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.list = this.list.concat(data.data);
					} else {
						this.$Toast(data.msg);
					}

				}, true)
			},
			changeFirst(e) {
				this.page = 1;
				this.list = [];
				this.id = e;
				this.orderList(e);
			},
			cancelOrder(id, index) {
				this.$showModal('确认取消订单?', () => {
					let params = {
						token: uni.getStorageSync('userToken'),
						order_id: id
					};
					this.$get(this.$api.orderCancel, params, (res) => {
						let {
							data
						} = res;
						if (data.code == 1) {
							this.$Toast('取消订单成功');
							this.list.splice(index, 1);
						} else {
							this.$Toast(data.msg);
						}
					})
				})

			},
			confirmReceipt(id, index) {
				this.$showModal('确认收货?', () => {
					let params = {
						token: uni.getStorageSync('userToken'),
						order_id: id
					};
					this.$get(this.$api.orderReceipt, params, (res) => {
						let {
							data
						} = res;
						if (data.code == 1) {
							this.$Toast('收货成功');
							this.list.splice(index, 1);
						} else {
							this.$Toast(data.msg);
						}
					})
				})
			},
		},
		onLoad(e) {
			this.activeTab = e.id ? e.id : 0;
			this.id = e.id;
			this.orderList(e.id);

		},
		onReachBottom() {
			this.page++;
			this.orderList(this.id);
		},
		onShow() {
			setTimeout(() => {
				let {
					orderIndex
				} = getApp().globalData;
				if (orderIndex) {
					this.list.splice(orderIndex, 1)
				}
			}, 1000)
		},
		onHide() {
			getApp().globalData.orderIndex = null;
		},
		onUnload() {
			getApp().globalData.orderIndex = null;
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
		border-radius: 10rpx;
	}

	.time {
		padding: 0 30rpx 28rpx;
		margin-top: -46rpx;
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
		padding: 20rpx 20rpx 0;
		// border-top: 1px solid #efefef;
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

		// padding: 0 30rpx;
		/deep/.s-tab-nav-view {
			display: flex;
			justify-content: space-between;
		}

		/deep/ .s-tab-nav {
			padding: 0;
		}
	}

	.order .bitmap {
		text-align: center;
	}

	.order .bitmap image {
		width: 445rpx;
		height: 335rpx;
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
