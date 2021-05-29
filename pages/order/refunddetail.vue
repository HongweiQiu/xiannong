<template>
	<view class="order-detail">
		<view>
			<view class="bold order-statu padding-15">
				<text class="align_center" v-if="info.status==1">请等待商家处理</text>
				<text class="align_center" v-if="info.status==2">退款成功</text>
				<text class="align_center" v-if="info.status==3">退款失败</text>
				<text class="align_center" v-if="info.status==4">退款被拒</text>
			</view>
			<view class="white_b padding-15 delivery-address align_center">
				<view class="">
					<text class="iconfont iconshouhuodizhi fs-24 gray_font"></text>
				</view>
				<view class="flex-full ">
					<view class="flex_left_right">
						<text class="bold">{{info.order.shou_name}}</text>
						<text class="right">{{info.order.shou_phone}}</text>
					</view>
					<view style="margin-top: 20rpx;">
						{{info.order.province+info.order.city+info.order.area+info.order.address}}
					</view>
				</view>
			</view>
			<view class="white_b" style="margin-bottom: 30rpx;padding:30rpx 0;" v-if="/2|3|4|1/.test(info.status)">
				<view class="explain flex-column flex-j-c">
					<view>
						<view v-if="info.status==1" class="flex-column">
							<text class="bold">你已成功发起退款申请，请耐心等待商家处理</text>
							<text class="fs-13 gray_font yuan">如商家拒绝，且对订单有疑问,可联系客服进行沟通</text>
							<text class="fs-13 gray_font yuan">如商家超时未处理，订单将自动退款成功</text>
						</view>

						<text v-if="info.status==2" class="bold">退款成功，退款预计1-5个工作日原路退回你的账户中</text>
						<text v-if="info.status==3" class="bold">退款失败，如有疑问，请联系客服进行沟通</text>
						<!-- <text v-if="info.status==2">退款成功，退款预计1-5个工作日原路退回你的账户中</text> -->
					</view>
				</view>
			</view>
		</view>

		<view class="white_b good ">
			<view>
				<view class="border title">商品信息</view>
				<view v-for="(item,index) in info.goods" :key="index" class="sign-good">
					<view class="flex ">
						<view class="photo">
							<image :src="imgRemote+item.goods_img" mode="aspectFill" class="r-5"></image>
						</view>
						<view class="flex-full flex-column flex-space-between">
							<view class="flex-column">
								<text>{{item.goods_name}}</text>
							</view>

							<view class="flex_left_right">
								<text>￥{{item.market_price}}</text>
								<text class="gray_font fs-11 buy-num">X{{item.buy_num}}</text>
							</view>
							<view class="flex-end fs-13 return-button gray_font">
								<text class="align_center" v-if="item.is_refund==1">取消退款</text>
								<text class="align_center" v-if="item.is_refund==2">退款成功</text>
								<text class="align_center" v-if="item.is_refund==3">退款失败</text>
								<text class="align_center" v-if="item.is_refund==3">退款被拒</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="total-fee">
					<text>商品总价</text>
					<text>￥{{info.order.total_price}}</text>
				</view>
				<view class="total-fee">
					<text>基础运费</text>
					<text>￥{{info.order.freight}}</text>
				</view>
				<view class="total-fee">
					<text>实付款：</text>
					<text
						class="red-font">￥{{(Number(info.order.total_price)+Number(info.order.freight)).toFixed(2)}}</text>
				</view>
			</view>

		</view>
		<view class="white_b fs-13 gray_font order-number flex-column">
			<view>
				订单编号：{{info.order.order_num}}
			</view>
			<view>下单时间：{{$fomartDate(info.order.createtime)}}</view>
			<!-- <view v-if="info.pay_type">支付方式：
				<text v-if="info.pay_type=='wxpay'">微信支付</text>
				<text v-if="info.pay_type=='money'">余额支付</text>
				<text v-if="info.pay_type=='offline'">线下支付</text>
			</view> -->
			<view class="">
				支付状态：
				<text v-if="info.order.pay_status==1">未支付</text>
				<text v-if="info.order.pay_status==2">已支付</text>
			</view>
			<view v-if="info.refund_time">申请退款：{{$fomartDate(info.refund_time)}}</view>
			<!-- <view>申请退款：{{$fomartDate(info.order.refund_time)}}</view> -->
			<!-- <view>退款时间：{{$fomartDate(info.refund_time)}}</view> -->
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgRemote: getApp().globalData.imgRemote,
				time: 1222,
				id: '',
				info: [],

				reason: '',
				orderIndex: '',
				addressInfo: '',
				totalPrice: 0,
				feeInfo: {},

			}
		},
		methods: {

			getOrderDetail(id) {
				this.$get(this.$api.orderRefund_detail, {
					token: uni.getStorageSync('userToken'),
					refund_id: id
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.info = data.data;
					} else {
						this.$Toast(data.msg);
					}
				})
			},
		},
		onLoad(e) {
			this.id = e.id;
			this.orderIndex = e.index;
			this.getOrderDetail(e.id);
		}
	}
</script>
<style scoped lang="scss">
	.yuan::before {
		content: ' ';
		width: 10rpx;
		height: 10rpx;
		background: #eee;
		display: inline-block;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.order-detail .pay-method {
		padding: 0 20rpx 30rpx;

		.way {
			height: 80rpx;
			line-height: 80rpx;
		}

		.iconfont {
			font-size: 50rpx;
		}

		.submit-order {
			background: #009943;
			width: 200rpx;
			color: white;
			text-align: center;
			height: 60rpx;
			border-radius: 10rpx;
			line-height: 60rpx;
			margin: 0 auto;
		}
	}

	.order-detail {

		.order-statu {
			height: 100rpx;
			color: white;
			line-height: 100rpx;
			background: #57B127;
		}

		.explain {
			padding: 0 30rpx;
			// height: 120rpx;
			// line-height: 120rpx;
		}

		.button {
			justify-content: flex-end;
			height: 96rpx;
			margin-right: 30rpx;

			text {
				width: 140rpx;
				height: 46rpx;
				line-height: 42rpx;
				border-radius: 23rpx;
				font-size: 26rpx;
				display: inline-block;
				text-align: center;
				box-sizing: border-box;
				margin-left: 33rpx;
			}

			.cancel {
				border: 1px solid #333;
			}

			.go-pay {
				background: #FF3333;
				color: white;
			}

		}

		.delivery-address {
			margin: 0rpx 0 30rpx;
			height: 160rpx;

			&>view:first-child {
				margin-right: 20rpx;
			}
		}

		.desc {
			padding: 30rpx 0 20rpx;

			.more-address text {
				height: 44rpx;
				line-height: 44rpx;
			}
		}

		.good {
			// margin-top: 30rpx;
			padding: 0rpx 30rpx 1rpx;

			.title {
				padding: 15rpx 0;
			}

			.sign-good {
				margin: 30rpx 0;

				.buy-num {

					font-weight: normal;
				}



				.photo {
					width: 180rpx;
					height: 180rpx;
					margin-right: 30rpx;

					image {
						width: inherit;
						height: inherit;
					}
				}

				.return-button text {
					border-radius: 23rpx;
					border: 1px solid #999;
					font-weight: normal;
					width: 140rpx;
					height: 46rpx;
					justify-content: center;
					box-sizing: border-box;
				}
			}

			.total-fee {
				margin-bottom: 25rpx;
				display: flex;
				justify-content: space-between;
			}

			.paid-in {
				height: 90rpx;
				line-height: 90rpx;
			}
		}

		.order-number {
			padding: 0 30rpx 30rpx;
			margin: 29rpx 0;
			justify-content: space-between;
			box-sizing: border-box;

			&>view {
				padding-top: 30rpx;
			}
		}

		.cancel-order {
			border-radius: 20rpx 20rpx 0 0;
			padding: 40rpx 30rpx 30rpx;

			.title {
				margin-bottom: 40rpx;
			}

			.desc-reason {
				margin-bottom: 60rpx;
			}

			.submit {
				background: #57B127;
				color: white;
				border-radius: 39rpx;
				height: 78rpx;
				line-height: 78rpx;
				text-align: center;
			}
		}

		.fixed-buttons {
			position: fixed;
			bottom: 0;
			background: white;
			width: 100%;

			.return-good {
				color: #999;
				border: 1px solid #999;
			}

			.confirm-receipt {
				border: 1px solid #f33;
				color: #f33;
			}
		}
	}
</style>
