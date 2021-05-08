<template>
	<view class="shoplist">
		<view class="white_b customer-info r-15">
			<view class="align_center select-address" @click="modifyAddress">
				<view class="">
					<image src="../../static/img/shoplistadd.png"></image>
				</view>
				<view class="detail-address">
					<view class="bold ">江西省南昌市青山湖区128街道809号 你好便利店</view>
					<view class="fs-13" style="margin-top: 10rpx;">
						<text>张三</text>
						<text style="margin-left:20rpx;">17689764358</text>
					</view>
				</view>
				<view>
					<uni-icons type="arrowright" size="15" color="#ccc" class="bold" />

				</view>
			</view>
			<view class="flex_left_right align_center" style="margin-top:30rpx;">
				<view class="bold">配送时间</view>
				<view class="gray_font" @click="$refs.picker.show()">
					<text class="fs-13" style="margin-right:21rpx;"> 请选择配送时间</text>

					<uni-icons type="arrowright" size="15" color="#ccc" class="bold" />
				</view>
			</view>
		</view>
		<view class="shop white_b r-15 all-good">
			<view v-for="(item,index) in shop" :key="index">
				<view class=" ">

					<view v-for="(list,second) in item.list" class="single_good" :key="second">
						<view class="flex">
							<view class="good_img">
								<image :src="config.logo" mode="aspectFit" class="shuiyin"
									v-if="config.logo&&config.shuiyin==1"></image>
								<image class="have_img" :src="list.img==''?imgRemote+config.item_default:list.img"
									mode="aspectFit"></image>
							</view>
							<view class="include_delete  flex_left_right flex-full">
								<view class="info">
									<view style="width:100%;">
										<view class="bold">{{list.title}}</view>
										<view class="gray_font fs-11">
											￥93.4/盒（25kg）x1
										</view>
									</view>

								</view>


								<view class="bold" style="margin-top:20rpx;">
									￥93.4
								</view>

							</view>

						</view>

					</view>
				</view>
			</view>
			<view class="flex_left_right bold">
				<text>基础运费</text>
				<text>￥10</text>
			</view>
			<view class="gray_font fs-11">商品需实付满99元免运费</view>
			<view class="total-price">
				<text class="fs-11">合计：</text>
				<text class="red-font bold">￥3562</text>
			</view>
		</view>
		<view class="flex_left_right order-remark white_b padding-15 r-15">
			<text class="bold">订单备注</text>
			<uni-icons type="arrowright" size="15" color="#ccc" class="bold" />
		</view>
		<view class="white_b pay-method ">
			<view class="way bold padding-15">支付方式</view>
			<radio-group class="radio-pay">
				<view class="flex_left_right align_center">
					<view class="align_center">
						<text class="iconfont iconweixinzhifu" style="color:#09BB07;"> </text>
						<text class="bold fs-13">微信支付</text>
					</view>
					<radio value="r1" checked="true" style="transform:scale(0.7)" />
				</view>
				<view class="border-color">

				</view>
				<view class="flex_left_right remain-money">
					<view class="align_center">
						<text class="iconfont iconfeiyong" style="color:#FFB92C;"> </text>
						<text class="bold fs-13">余额支付</text>
						<text class="fs-11 gray_font" style="margin-left:4rpx;">(可用￥200)</text>
					</view>
					<radio value="r2" style="transform:scale(0.7)" />
				</view>
			</radio-group>
		</view>
		<view style="height:60px;">

		</view>
		<view class="fixed-bottom white_b width">

			<view class="align_center price-info">
				<view>
					<text class="fs-13">合计：</text>
					<text class="bold red-font">￥3562</text>
				</view>
				<view class="pay-button" @click="pay">支付</view>
			</view>

		</view>
		<w-picker :visible.sync="visible" mode="selector" @confirm="onConfirm" ref="picker">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	let {
		log
	} = console;
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				token: uni.getStorageSync('cdj_token'),
				imgRemote: imgRemote,
				shop: [],
				config: [],
				visible: false
			}
		},
		methods: {
			openCart() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("openCart", params, (res) => {
					let {
						data
					} = res;
					if (data.code == 200) {
						this.config = data.data;
						this.shop = data.data.shop;
					}
				})
			},
			onConfirm() {

			},
			modifyAddress(){
				uni.navigateTo({
					url:'./delivery'
				})
			},
			pay(){
				uni.navigateTo({
					url:'./paySuccess'
				})
			}
		},
		onShow() {
			this.openCart();
		}
	}
</script>

<style scoped lang="scss">
	.customer-info {
		image {
			width: 34rpx;
			height: 58rpx;
		}

		.select-address {
			border-bottom: 2px dashed #eee;
			padding-bottom: 30rpx
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

			image {
				width: 100%;
				height: 100%;

			}
		}
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
		margin: 30rpx;
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
