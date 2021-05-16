<template>
	<view class="add-to-cart white_b padding-15">
		<view class="flex">
			<view class="good-img r-5">
				<image class="r-5" :src="imgRemote+ware.main_image" mode="widthFix"></image>
			</view>
			<view class="flex-full">
				<view class="right close-icon" @click="close">
					<text class="iconfont iconguanbi2 fs-18"></text>
				</view>
				<view class="" style="width: 90%;">
					<view class="bold fs-18 two-line">{{ware.name}}</view>
					<view class="red-font" style="margin:20rpx 0;">
						<text class="fs-11">￥</text>
						<text class="fs-23">{{ware.sku[kind].market_price}}</text>
					</view>
					<view>已选：{{ware.sku[kind].guige}}/{{ware.sku[kind].unit}}, {{num}}件</view>
				</view>
			</view>
		</view>
		<view>
			<view class="bold">
				规格
			</view>
			<view class="fs-13 attr">
				<text v-for="(item,index) in ware.sku" :key="index" @click="kind=index"
					:class="kind==index?'active':''">
					{{item.guige}}/{{item.unit}}
				</text>
			</view>
		</view>
		<view class="flex_left_right buy-num">
			<text class="bold">数量</text>
			<my-stepper :val="num" @plus="plus" @minus="minus" @input="input"></my-stepper>
		</view>
		<view class="attr-cart" @click="addCart">
			加入购物车
		</view>
	</view>
</template>
<script>
	const app = getApp().globalData;
	const {

		imgRemote
	} = app;
	export default {
		props: ['ware'],
		data() {
			return {
				kind: 0,
				num: 1,
				imgRemote: imgRemote

			}
		},
		methods: {
			plus(val) {
				this.num++;
				console.log(val)
			},
			input(e) {
				if (e.value) {
					this.num = e.value;
				} else {
					this.num = parseInt(0);
				}

			},
			minus(val) {

				if (this.num == 1) {
					this.num = 1
				} else {
					this.num--;
				}
				console.log(val)
			},
			close() {
				this.kind = 0;
				this.num = 1;
				this.$emit('close')
			},
			addCart() {
				let params = {
					token: uni.getStorageSync('userToken'),
					sku_id: this.ware.sku[this.kind].id,
					goods_id: this.ware.id,
					buy_num: this.num
				}
				this.$get(this.$api.cartAdd_cart, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('加入购物车成功');
						this.close();
					} else {
						this.$Toast(data.msg);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.add-to-cart {
		border-radius: 20rpx 20rpx 0 0;
		padding-bottom: 40rpx;

		.good-img {

			margin-top: -100rpx;
			background: white;

			image {
				width: 240rpx;
				height: 240rpx;
				margin: 20rpx;
				box-sizing: border-box;
			}
		}

		.close-icon {
			margin-top: 30rpx;
		}

		.close {
			border: 4rpx solid #999;
			border-radius: 50%;
			color: #999;
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
		}

		.attr {
			text {
				padding: 10rpx 51rpx;
				border: 1px solid #999;
				display: inline-block;
				margin: 30rpx 30rpx 0 0;
				border-radius: 60rpx;
				box-sizing: border-box;
			}

			.active {
				border: 1px solid #57B127;
				color: #57B127;
			}
		}

		.buy-num {
			margin: 20rpx 0 30rpx;

		}

		.attr-cart {
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			background: #57B127;
			color: white;
			border-radius: 39rpx;

		}

		.my_stepper {
			width: 200px !important;
			height: 100px !important;
			border-radius: 39rpx !important;
			// justify-content: space-between !important;
			// padding: 0 25rpx !important;
			// box-sizing: border-box;

			// .iconfont {
			// 	font-size: 50rpx;
			// }
		}
	}
</style>
