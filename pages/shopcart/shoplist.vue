<template>
	<view class="shoplist">
		<view class="white_b customer-info r-5">
			<view class="align_center select-address" @click="modifyAddress">
				<view class="">
					<image src="../../static/img/shoplistadd.png"></image>
				</view>
				<view class="detail-address">
					<view class="bold ">{{receiving?receiving:'请先添加收货地址'}}
					</view>
					<view class="fs-13" style="margin-top: 10rpx;">
						<text v-if="addressInfo.shou_name">{{addressInfo.shou_name}}</text>
						<text v-if="addressInfo.shou_phone" style="margin-left:20rpx;">{{addressInfo.shou_phone}}</text>
					</view>
				</view>
				<view>
					<text class="iconfont iconfanhui t-180 gray_font"></text>
				</view>
			</view>
			<view class="flex_left_right align_center" style="margin-top:30rpx;">
				<view class="bold">配送时间</view>
				<!-- <view>
					第三方物流配送，请你耐心等待
				</view> -->
				<view class="align_center gray_font" @click="selectDate">
					<!-- <text class="fs-13" style="margin-right:21rpx;"> 请选择配送时间</text> -->
					<gpp-date-picker @onConfirm="confirmDate" :startDate="startDate" :endDate="endDate"
						:defaultValue="pickerDate" themeColor="#57B127">
						{{pickerDate}}
					</gpp-date-picker>
					<text class="iconfont iconfanhui t-180"></text>
				</view>
			</view>
		</view>
		<view class="shop white_b r-5 all-good">
			<view v-for="(item,index) in shop" :key="index">
				<view class="flex">
					<image class="have_img r-5" :src="imgRemote+item.goods.main_image" mode="aspectFit"></image>
					<view class="include_delete  flex_left_right flex-full">
						<view class="info">
							<view style="width:100%;">
								<view class="bold two-line">{{item.goods.name}}</view>
								<view style="margin-top: 20rpx;" class="flex_left_right">
									<text
										class="gray_font fs-11">￥{{item.sku.market_price}}/{{item.sku.unit}}（{{item.sku.guige}}）x{{item.buy_num}}</text>
									<text class="bold " style="margin-top:-8rpx;">
										￥{{$fixed(item.sku.market_price*item.buy_num)}}
									</text>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="flex_left_right" style="margin-top: 30rpx;">
				<text>商品金额</text>
				<text>￥{{$fixed(totalPrice)}}</text>
			</view>
			<view class="flex_left_right " style="margin-top: 30rpx;">
				<text>配送费</text>
				<text>￥{{$fixed(freight?freight:0)}}</text>
			</view>

			<view class="total-price">
				<text class="fs-11">合计：</text>
				<text class="red-font bold">￥{{$fixed(totalPrice+parseFloat(freight))}}</text>
			</view>
		</view>
		<view class="white_b padding-15 r-5" style="margin:30rpx;">
			<view class="align_center order-remark">
				<text style="width:160rpx;">订单备注</text>
				<input v-model="remark" placeholder="选填" class="flex-full" />
			</view>

			<view class="flex_left_right order-remark">
				<text style="width:160rpx;">开具发票</text>
				<switch color="#57B127" @change="switchChange" style="height:80rpx;" />
			</view>
			<view v-show="showSwitch">
				<view class="align_center order-remark">
					<text style="width:160rpx;">发票抬头</text>
					<input v-model="addressInfo.tax_name" placeholder="请输入发票抬头" class="flex-full" />
				</view>
				<view class="align_center order-remark">
					<text style="width:160rpx;">发票税号</text>
					<input v-model="addressInfo.tax_num" placeholder="请输入发票税号" class="flex-full" />
				</view>
			</view>
		</view>
		<view class="white_b pay-method ">
			<view class="way bold padding-15">支付方式</view>
			<radio-group class="radio-pay" @change="payWay">
				<view class="flex_left_right align_center">
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
						<text class="fs-11 gray_font" style="margin-left:4rpx;">(可用￥{{$fixed(addressInfo.money)}})</text>
					</view>
					<radio value="money" style="transform:scale(0.7)"
						:disabled="(totalPrice+parseFloat(freight))>addressInfo.money?true:false" />
				</view>
				<view class="border-color">

				</view>
				<!-- <view class="flex_left_right remain-money">
					<view class="align_center">
						<text class="iconfont iconxianxiazhifu" style="color:#FFB92C;font-size: 24rpx;margin:0 28rpx 0 8rpx;"> </text>
						<text class="bold fs-13">线下支付</text>

					</view>
					<radio value="offline" style="transform:scale(0.7)" />
				</view> -->
			</radio-group>
		</view>
		<view style="height:60px;">

		</view>
		<view class="fixed-bottom white_b width">
			<view class="align_center price-info">
				<view>
					<text class="fs-13">合计：</text>
					<text class="bold red-font">￥{{$fixed(totalPrice+parseFloat(freight))}}</text>
				</view>
				<view class="pay-button" @click="$doubleClick(pay)">支付</view>
			</view>

		</view>
		<passkeyborad :show="show" @complte="moneyPay" @close="show=false" :price="price"></passkeyborad>
	</view>
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	const app = getApp().globalData;
	const {
		imgRemote,
	} = app;
	export default {
		components: {
			gppDatePicker,
			passkeyborad
		},
		data() {
			return {
				startDate: "2021-05-15",
				endDate: "2022-09-09",
				pickerDate: '2021-05-16',
				visible: false,
				addressInfo: {},
				imgRemote: imgRemote,
				shop: [],
				totalPrice: '',
				visible: false,
				
				freight: '',
				showSwitch: false,
				pay_type: 'wxpay',
				remark: '',
				receiving: '',
				show: false,
				showPay: 0,
				pay_password: '',
				price:''
			}
		},

		methods: {
			getTomorrow() {
				function format(dest) {
					return dest < 10 ? '0' + dest : dest;
				}

				let arg = new Date(new Date() - 0 + 3600000 * 24);
				let year = arg.getFullYear();
				let month = arg.getMonth() + parseInt(1);
				let day = arg.getDate();
				this.startDate = `${year}-${format(month)}-${format(day)}`;
				this.pickerDate = `${year}-${format(month)}-${format(day)}`;
				this.endDate = `${year+2}-12-31`;
			},
			confirmDate(e) {
				this.pickerDate = e.dateValue;
			},
			payWay(e) {
				this.pay_type = e.detail.value;
			},
			confirmPay() {
				let _ = this;
				let ids = '';
				for (let i of _.shop) {
					if (i.checked == true) {
						ids += i.id + ','
					}
				}
				let newId = ids.substring(0, ids.length - 1);
				let {
					province,
					city,
					area,
					address,
					shou_name,
					shou_phone,
					tax_name,
					tax_num
				} = _.addressInfo;
				if (!province) {
					return _.$Toast('请先填写收货地址');
				}
				if (!shou_name &&
					!shou_phone) {
					return _.$Toast('请先填写收货人和收货人电话');
				}
				if (_.showSwitch) {
					if (!tax_name && !tax_num) {
						return _.$Toast('发票信息不能为空');
					}
				} else {
					tax_name = '';
					tax_num = '';
				}


				uni.login({
					provider: 'weixin',
					success(res) {
						let params = {
							token: uni.getStorageSync('userToken'),
							province: province,
							city: city,
							area: area,
							address: address,
							shou_name: shou_name,
							shou_phone: shou_phone,
							tax_name: tax_name,
							tax_num: tax_num,
							cart_ids: newId,
							freight: _.freight,
							pay_type: _.pay_type,
							total: _.totalPrice,
							remark: _.remark,
							delivery_time: _.pickerDate,
							code: res.code
						};
						if (_.pay_type == 'money') {
							params.pay_password = _.pay_password;
						}
						_.$get(_.$api.orderAdd_order, params, (res1) => {
							let data = res1.data;
							if (data.code == 1) {
								if (_.pay_type != 'wxpay') {
									_.$Toast('提交订单成功');
									setTimeout(() => {
										uni.reLaunch({
											url: './paySuccess',
											success() {
												getApp().globalData.isReload = true;
											}
										})
									}, 1000)
								} else {
									if(!uni.getStorageSync('userInfo').openid){
										setTimeout(()=>{
											uni.navigateTo({
												url:'/pages/account/login'
											})
										},1000)
										return _.$Toast('请先登录微信，再绑定');
									}
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: data.data.timeStamp,
										nonceStr: data.data.nonceStr,
										package: data.data.package,
										signType: data.data.signType,
										paySign: data.data.paySign,
										success: function(res) {
											_.$Toast('支付成功');
											setTimeout(() => {
												uni.reLaunch({
													url: './paySuccess',
													success() {
														getApp().globalData
															.isReload = true;
													}
												})
											}, 500)

										},
										fail: function(err) {
											_.$Toast('支付取消');
											setTimeout(() => {
												uni.reLaunch({
													url: './paySuccess',
													success() {
														getApp().globalData
															.isReload = true;
													}
												})
											}, 500)
										}
									});
								}


							} else {
								// _.$Toast(data.msg);
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
						});
					}
				})

			},

			pay() {
				if (this.pay_type == 'wxpay') {
					this.confirmPay();
				} else {
					if (this.showPay = 1) {
						this.show = true;
						this.price=this.totalPrice+parseFloat(this.freight)
					} else {
						this.$showModal('是否设置支付密码', (res) => {
							uni.navigateTo({
								url: '/pages/user/setPay'
							})
						})
					}
				}

			},
			isSetPwd() {
				let that = this;
				that.$get(that.$api.userIsset_pay_password, {
					token: uni.getStorageSync('userInfo').token
				}, (res) => {
					this.showPay = res.data.code;
				})
			},
			moneyPay(e) {
				this.pay_password = e;
				this.confirmPay();
				
			},
			switchChange(e) {
				this.showSwitch = e.target.value;
			},
			
			modifyAddress() {
				uni.navigateTo({
					url: './delivery'
				})
			},

			// 邮费
			getFreight() {
				this.$get(this.$api.mainFreight, {}, (res) => {
					let data = res.data;
					if (data.code == 1) {
						
						this.freight = this.totalPrice > data.data.over ? 0 : data.data.freight;
					}
				});
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
						this.receiving = data.data.province + data.data.city + data.data.area + data.data.address;
						if (this.receiving.match('null')) {
							this.receiving = '';
						}
					}
				})
			}
		},
		onShow() {
			this.getAddress();
			this.isSetPwd()

		},
		onLoad(e) {
			this.getTomorrow();
			this.shop = uni.getStorageSync('selectGoods');
			let sum = 0;
			for (let i of this.shop) {
				sum += i.buy_num * i.sku.market_price;
			}
			this.totalPrice = sum;
			this.getFreight();
		}
	}
</script>

<style scoped lang="scss">
	input {
		margin-top: 3rpx;
	}

	.customer-info {
		image {
			width: 34rpx;
			height: 58rpx;
		}

		.select-address {
			border-bottom: 2px dashed #eee;
			padding-bottom: 30rpx;
		}

		margin:30rpx;
		padding: 30rpx;
	}

	.detail-address {
		width: 550rpx;
		padding: 0 30rpx;
	}

	.all-good {
		padding: 0 30rpx;
		margin: 0 30rpx;
	}

	.single_good {
		padding-top: 30rpx;

		.good_img {
			width: 180rpx;
			height: 120rpx;
			margin-right: 30rpx;


		}
	}

	.have_img {
		width: 200rpx;
		height: 200rpx;
		margin: 30rpx 30rpx 0 0;
	}

	.total-price {
		border-top: 1px solid #eee;
		margin-top: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
	}

	.order-remark {
		height: 83rpx;


	}

	.pay-method {
		border-radius: 10rpx;
		padding-bottom: 20rpx;

		.radio-pay {
			padding: 0 16rpx 0 20rpx;
		}

		margin:0 30rpx;

		.way {
			height: 82rpx;
			line-height: 82rpx;
		}

		.iconfont {
			margin-right: 19rpx;
			font-size: 40rpx;
		}

		.border-color {
			border-top: 1px solid #EEE;
			margin: 20rpx 12rpx 20rpx 8rpx;
		}


	}

	.fixed-bottom {
		position: fixed;
		bottom: 0;

		.price-info {
			justify-content: flex-end;
			height: 49px;


			.pay-button {
				background: #57B127;
				color: white;
				margin: 0 30rpx;
			}
		}
	}
</style>
