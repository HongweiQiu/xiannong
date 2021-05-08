<template>
	<view class="order-detail">
		<view>
			<view class="bold order-statu fs-24">
				<text>待支付</text>
				<text>已取消</text>
				<text>已完成</text>
				<text>待发货</text>
			</view>
			<view class="white_b r-5">
				<view class="explain flex-column flex-j-c border">
					<view class="flex">
						<text class="bold">剩余支付时间为&nbsp;</text>
						<my-countdown time="100" bgC="none" lineC="#F33"></my-countdown>

					</view>
					<text class="fs-11 gray_font">5分钟之内未支付，订单将自动取消</text>
					<view class="bold">
						<!-- 	<text >您取消了订单，退款预计1-5个工作日原路退回 你的账户中</text>
							<text >订单未支付，已自动取消</text>
							<text>支付成功，等待商家发货</text>
							<text>	商家已发货，请你耐心等待快递</text>
							<text>订单完成，感谢你的支持</text> -->
					</view>

				</view>
				<view class="button align_center">
					<text class="cancel" @click="$refs.popup.open()">取消订单</text>
					<text class="go-pay">去支付</text>
				</view>
			</view>
		</view>
		<view class="white_b padding-15 delivery-address r-5">
			<view class="flex_left_right border way">
				<text class="gray_font">配送方式</text>
				<text class="fs-13">商家配送，请你耐心等待</text>
			</view>
			<view class="flex-space-between desc">
				<text class="gray_font">收货地址</text>
				<view class="fs-13 flex-column more-address">
					<text>青山湖区128街道80好便利店</text>
					<text class="right">张三 12456786943</text>
				</view>

			</view>
		</view>
		<view class="bold white_b good r-5">
			<view>
				<view v-for="item in 2" class="sign-good">
					<view class="flex ">
						<view class="photo">
							<image src="../../static/img/404.png" mode="aspectFit"></image>
						</view>
						<view class="flex-space-between flex-full">
							<view class="flex-column">
								<text>新鲜草莓</text>
								<text class="gray_font fs-11 buy-num">x120</text>
							</view>
							<view class="align_center">
								￥93.4
							</view>
						</view>
					</view>
					<view class="flex-end fs-13 return-button">
						<text class=" align_center gray_font" @click="applyReturnMoney">申请退款</text>
						<text class="align_center">退款成功</text>
						<text class="align_center">退款失败</text>
						<text class="align_center">退款中</text>
					</view>
				</view>
			</view>
			<view class="border">
				<view class="total-fee">
					<text>商品总价</text>
					<text>￥180</text>
				</view>
				<view class="total-fee">
					<text>基础运费</text>
					<text>￥0.00</text>
				</view>
			</view>
			<view class="right paid-in">
				<text>实付：</text>
				<text class="red-font">￥180.99</text>
			</view>
		</view>
		<view class="white_b fs-13 gray_font r-5 order-number flex-column">
			<view>
				订单编号：365739475629845
			</view>
			<view>下单时间：2021-03-22 23：22</view>
			<view>支付方式：微信支付</view>
			<view>申请退款：2021-04-01 12：11</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="white_b cancel-order">
				<view class="bold center title">取消订单</view>
				<view class="bold " style="margin-bottom: 59rpx;">选择取消订单原因，帮助我们改进</view>
				<radio-group class="radio-pay">
					<view class="flex_left_right align_center desc-reason" v-for="(item,index) in returnReason">
						<text>{{item.reason}}</text>
						<radio value="r1" checked="true" style="transform:scale(0.7)" />
					</view>
				</radio-group>
				<view class="submit">确定提交</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				time: 1222,
				second: '',
				returnReason: [{
						reason: '不想买了'
					},
					{
						reason: '送达时间选错了'
					},
					{
						reason: '商品选多了/选错了/选漏了'
					},
					{
						reason: '地址错误'
					},
					{
						reason: '无理由'
					},
				]
			}
		},
		methods: {

			applyReturnMoney() {
				uni.navigateTo({
					url: 'applyAfterSale'
				})
			}
		},
		onShow() {
			this.countdown()
		}
	}
</script>
<style scoped lang="scss">
	.order-detail {
		margin: 0 30rpx;

		.order-statu {
			margin: 40rpx 0 29rpx;
		}

		.explain {
			margin: 0 30rpx;
			height: 120rpx;
			// line-height: 120rpx;
		}

		.button {
			justify-content: flex-end;
			height: 96rpx;
			margin-right: 30rpx;

			text {
				width: 140rpx;
				height: 46rpx;
				line-height: 46rpx;
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
			margin: 30rpx 0;

			.way {
				height: 88rpx;
				line-height: 88rpx;
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
			padding: 30rpx 30rpx 0;

			.sign-good {
				margin-bottom: 30rpx;

				.buy-num {
					margin-top: 20rpx;
					font-weight: normal;
				}



				.photo {
					width: 180rpx;
					height: 120rpx;
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
	}
</style>
