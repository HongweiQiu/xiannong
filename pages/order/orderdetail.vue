<template>
	<view class="order-detail">
		<view>
			<view class="bold order-statu padding-15">
				{{info.order_status_msg}}
			</view>
			<view class="white_b padding-15 delivery-address align_center">
				<view class="">
					<text class="iconfont iconshouhuodizhi fs-24 gray_font"></text>
				</view>
				<view class="flex-full ">
					<view class="flex_left_right">
						<text class="bold">{{info.shou_name}}</text>
						<text class="right">{{info.shou_phone}}</text>
					</view>
					<view style="margin-top: 20rpx;">{{info.province+info.city+info.area+info.address}}</view>
				</view>
			</view>
			<view class="white_b" style="margin-bottom: 30rpx;padding:30rpx 0;"
				v-if="/2|3|4|5|6/.test(info.order_status)">
				<view class="explain flex-column flex-j-c">
					<!-- <block v-if="info.order_status==1">
						<view class="flex">
							<text class="bold">剩余支付时间为&nbsp;</text>
							<my-countdown time="100" bgC="none" lineC="#F33"></my-countdown>

						</view>
						<text class="fs-11 gray_font">5分钟之内未支付，订单将自动取消</text>
					</block> -->
					<view class="bold">
						<text v-if="info.order_status==6">您取消了订单，退款预计1-5个工作日原路退回 你的账户中</text>
						<!-- <text v-if="info.order_status==2">订单未支付，已自动取消</text> -->
						<text v-if="/2|3/.test(info.order_status)">等待商家发货</text>
						<text v-if="info.order_status==4"> 商家已发货，请你耐心等待快递</text>
						<text v-if="info.order_status==5">订单完成，感谢你的支持</text>
					</view>
				</view>
			</view>
		</view>

		<view>
			<view class="white_b good ">
				<view class="border title bold">商品信息</view>
				<view v-for="(item,index) in info.goods" :key="index" class="sign-good">
					<view class=" ">
						<!-- <view class="photo">
							<image :src="imgRemote+item.goods_img" mode="aspectFill" class="r-5"></image>
						</view> -->
						<view class="flex-full flex-column flex-space-between">
							<view class="flex_left_right">
								<text>{{item.goods_name}}</text>
								<text class="red-font">￥{{item.market_price}}</text>
							</view>


							<view class="flex_left_right">
								<!-- <text>￥{{item.market_price}}</text> -->
								<text class="gray_font fs-11 buy-num">下单数量：X{{item.init_num}}</text>
								<text class="gray_font fs-11 buy-num">配送数量：X{{item.fenjian_num }}</text>
							</view>
						</view>
						<view class="flex-end fs-13 return-button" v-if="/3|4/.test(info.order_status)"
							style="margin-top: 30rpx;">

							<text class=" align_center gray_font" @click="applyReturnMoney(index)"
								v-if="/0|3|4/.test(item.is_refund)">申请退货</text>
							<view @click="refundDetail">
								<text class="align_center" v-if="item.is_refund==1">退款中</text>
								<text class="align_center" v-if="item.is_refund==2">退款成功</text>
								<text class="align_center" v-if="item.is_refund==3">退款失败</text>
								<text class="align_center" v-if="item.is_refund==4">退款被拒</text>
							</view>

						</view>
					</view>

				</view>
			</view>
			<view class="white_b good " style="margin-top: 30rpx;">

				<view class="border title bold">
					金额信息
				</view>
				<view class="total-fee">
					<text>商品总价</text>
					<text>￥{{info.total_price}}</text>
				</view>
				<view class="total-fee">
					<text>基础运费</text>
					<text>￥{{info.freight}}</text>
				</view>
				<view class="total-fee">
					<text>实付款：</text>
					<text class="red-font">￥{{(Number(info.total_price)+Number(info.freight)).toFixed(2)}}</text>
				</view>
			</view>

		</view>

		<view class="white_b fs-13 gray_font order-number flex-column">
			<view class="border bold fs-18 title">支付信息</view>
			<view>
				订单编号：{{info.order_num}}
			</view>
			<view>下单时间：{{$fomartDate(info.createtime).substr(0,10)}}</view>
			<view v-if="info.delivery_time">配送时间：{{($fomartDate(info.delivery_time)).substr(0,10)}}</view>
			<!-- <view v-if="info.pay_type">支付方式：
				<text v-if="info.pay_type=='wxpay'">微信支付</text>
				<text v-if="info.pay_type=='money'">余额支付</text>
				<text v-if="info.pay_type=='offline'">线下支付</text>
			</view> -->
			<view class="">
				支付状态：
				<text v-if="info.pay_status==1">未支付</text>
				<text v-if="info.pay_status==2">已支付</text>
			</view>
			<view v-if="info.refund_time">申请退款：{{$fomartDate(info.refund_time)}}</view>
		</view>
		<view style="height: 96rpx;" v-if="info.order_status!=6"></view>
		<view class="fixed-buttons">
			<view class="button align_center">
				<text class="cancel" @click="$refs.popup.open()" v-if="info.order_status==1">取消订单</text>

				<text class="go-pay" v-if="/4|5/.test(info.order_status)&&info.pay_status==1" @click="nowPay">去支付</text>
				<!-- <text class="cancel" @click="ckwl" v-if="/4|5/.test(info.order_status)">查看物流</text> -->
				<text class="confirm-receipt" @click="confirmReceipt(info.id)" v-if="info.order_status==4">确认收货</text>
				<block v-if="/3|4/.test(info.order_status)">
					<text class="return-good" @click="applyReturnMoney(-1)" v-if="showAllRefund">整单退货</text>
				</block>


			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="white_b cancel-order">
				<view class="bold center title">取消订单</view>
				<view class="bold " style="margin-bottom: 59rpx;">选择取消订单原因，帮助我们改进</view>
				<radio-group class="radio-pay" @change="selectReson">
					<view class="flex_left_right align_center desc-reason" v-for="(item,index) in returnReason"
						:key="index">
						<text>{{item.reason}}</text>
						<radio :value="item.reason" style="transform:scale(0.7)" />
					</view>
				</radio-group>
				<view class="submit" @click="cancelOrder(info.id)">确定提交</view>
			</view>
		</uni-popup>
		<uni-popup ref="select" type="bottom">
			<view class="white_b pay-method ">
				<view class="way flex_left_right">
					<text class="bold">支付方式</text>
					<text class="iconfont iconguanbi" @click="$refs.select.close()"></text>
				</view>
				<radio-group class="radio-pay" @change="payWay">
					<view class="flex_left_right">
						<view class="align_center">
							<text class="iconfont iconweixinzhifu" style="color:#09BB07;"> </text>
							<text class="bold fs-13">微信支付</text>
						</view>
						<radio value="wxpay" checked="true" style="transform:scale(0.7)" />
					</view>
					<view class="border-color">

					</view>
					<view class="flex_left_right remain-money">
						<view class="align_center">
							<text class="iconfont iconfeiyong" style="color:#FFB92C;"> </text>
							<text class="bold fs-13">余额支付</text>
							<text class="fs-11 gray_font"
								style="margin-left:4rpx;">(可用￥{{fixed(addressInfo.money)}})</text>
						</view>

						<radio value="money" style="transform:scale(0.7)"
							:disabled="(parseFloat(totalPrice)+parseFloat(freight))>addressInfo.money?true:false" />
					</view>
					<view class="border-color">

					</view>
					<!-- <view class="flex_left_right remain-money">
						<view class="align_center">
							<text class="iconfont iconfeiyong" style="color:#FFB92C;"> </text>
							<text class="bold fs-13">线下支付</text>

						</view>
						<radio value="offline" style="transform:scale(0.7)" />
					</view> -->
				</radio-group>
				<view class="submit-order" @click="confirmPay">提交</view>
			</view>
		</uni-popup>
		<passkeyborad :show="show" @complte="moneyPay" @close="show=false" :price="price"></passkeyborad>
	</view>
</template>
<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	export default {
		components: {
			passkeyborad
		},
		data() {
			return {
				imgRemote: getApp().globalData.imgRemote,
				time: 1222,
				id: '',
				info: [],
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

				],
				reason: '',
				orderIndex: '',
				addressInfo: '',
				totalPrice: 0,
				feeInfo: {},
				freight: 0,
				pay_type: 'wxpay',
				showAllRefund: true,
				show: false,
				showPay: 0,
				pay_password: '',
				price:''
			}
		},
		methods: {
			moneyPay(e) {
				this.pay_password = e;
				this.orderPay();
			
			},
			confirmPay(){
			
				if (this.pay_type == 'wxpay') {
					this.orderPay();
				} else {
					if (this.showPay = 1) {
						this.price=parseFloat(this.totalPrice)+parseFloat(this.freight);
						this.$refs.select.close();
						this.show = true;
					} else {
						this.$showModal('是否设置支付密码', (res) => {
							uni.navigateTo({
								url: '/pages/user/setPay'
							})
						})
					}
				}
			},
			refundDetail() {
				uni.navigateTo({
					// url:'refunddetail?id='+this.id
				})
			},
			nowPay(item) {
				this.totalPrice = this.info.total_price;
				this.freight = this.totalPrice > this.feeInfo.over ? 0 : this.feeInfo.freight;
				this.$refs.select.open()
			},
			orderPay() {
				let _ = this;
				uni.login({
					provider: 'weixin',
					success(res) {
						let params = {
							token: uni.getStorageSync('userToken'),
							order_id: _.id,
							pay_type: _.pay_type,
							code: res.code
						};
						if (_.pay_type == 'money') {
							params.pay_password = _.pay_password;
						}
						_.$get(_.$api.orderPay, params, (res1) => {
							let {
								data
							} = res1;
							if (data.code == 1) {
								if (data.data == null) {
									_.$Toast('支付成功');
									_.getAddress();
									_.getOrderDetail(_.id);
								} else {
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: data.data.timeStamp,
										nonceStr: data.data.nonceStr,
										package: data.data.package,
										signType: data.data.signType,
										paySign: data.data.paySign,
										success: function(res) {
											_.$Toast('支付成功');
											_.getAddress();
											_.getOrderDetail(_.id);
										},
										fail: function(err) {
											_.$Toast('支付取消');
										}
									});
								}
							} else {
								if(_.pay_type=='money'&&data.msg=="支付密码错误"){
									uni.showModal({
										title: '',
										content: '支付密码错误,请重试',
										cancelText: '忘记密码',
										confirmColor: '#009943',
										success(res) {
											if (res.confirm) {
												_.show = true;
											} else if (res.cancel) {
												uni.navigateTo({
													url: '/pages/user/forgetPay'
												})
											}
										}
									})
								}
							}
							_.$refs.select.close();
						})
					}
				})

			},
			payWay(e) {
				this.pay_type = e.detail.value;
			},
			fixed(val) {
				return Number(val).toFixed(2);
			},
			applyReturnMoney(index) {
				uni.navigateTo({
					url: 'applyAfterSale?id=' + this.id + '&returnIndex=' + index
				})
			},
			selectReson(e) {
				this.reason = e.detail;
			},
			cancelOrder(id) {
				if (!this.reason) {
					return this.$Toast('请选择退款原因');
				}
				this.$showModal('确认取消订单?', () => {
					let params = {
						token: uni.getStorageSync('userToken'),
						order_id: id,
						shenhe_remark: this.reason
					};
					this.$get(this.$api.orderCancel, params, (res) => {
						let {
							data
						} = res;
						if (data.code == 1) {
							this.$Toast('取消订单成功');
							getApp().globalData.orderIndex = this.orderIndex;
							this.getOrderDetail(id);
							this.$refs.popup.close()
						} else {
							this.$Toast(data.msg);
						}
					})
				})
			},
			confirmReceipt(id) {
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
							this.getOrderDetail(id);
							getApp().globalData.orderIndex = this.orderIndex;
						} else {
							this.$Toast(data.msg);
						}
					})
				})
			},
			getOrderDetail(id) {
				this.$get(this.$api.orderDetail, {
					token: uni.getStorageSync('userToken'),
					order_id: id
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.info = data.data;
						this.showAllRefund = !this.info.goods.some((item) => {
							return item.is_refund == 1 || item.is_refund == 2;
						})

					} else {
						this.$Toast(data.msg);
					}
				})
			},
			getAddress() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.addressInfo = data.data;

					}
				})
			},
			// 邮费
			getFreight() {
				this.$get(this.$api.mainFreight, {}, (res) => {
					let data = res.data;
					if (data.code == 1) {

						this.feeInfo = data.data;
					}
				});
			},

		},
		onLoad(e) {
			this.id = e.id;
			this.orderIndex = e.index;
			this.getOrderDetail(e.id);
			this.getAddress();
			this.getFreight()
		}
	}
</script>
<style scoped lang="scss">
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
				font-size: 36rpx;
			}

			.sign-good {
				margin: 30rpx 0;

				.buy-num {
					margin-top: 20rpx;
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
				margin: 20rpx 0;
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

			.title {
				height: 70rpx;
				line-height: 70rpx;
				color: black;
			}

			&>view:nth-child(n+2) {
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
