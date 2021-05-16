<template>
	<view class="my_profile flex">
		<view class="shelf" v-if="ware.status!=1">商品暂时已下架</view>
		<view class="photo">
			<image class="good_img"
				:src="ware.goods.main_image==''?imgRemote+config.item_default:imgRemote+ware.goods.main_image"
				mode="widthFix"></image>
		</view>

		<block v-if="ware==undefined"></block>
		<block v-else>
			<view class="info">
				<view class="operate flex">
					<view style="width:86%;" @click="$doubleClick(detail)">
						<view class="fs-13  two-line">{{ware.goods.name}}</view>
						<!-- <view v-if="ware.desc" class="hidden gray_font fs-11">{{ware.desc}}</view> -->
					</view>

				</view>
				<view class="flex_left_right">
					<view style="width:82%;" @click="$doubleClick(detail)">
						<view class="hidden">
							<text class="red_font fs-18 bold">¥{{ware.sku.market_price}}</text>
							<text class="gray_font">/{{ware.sku.unit}}</text>
						</view>
					</view>

					<view class="align_center">
						<block v-if="ware.attr.length">
							<image class="add_cart" src="../../static/img/addcart.png" @click="showCart"></image>
						</block>
						<block v-else>

							<my-stepper :val="ware.buy_num" :disabled="ware.status==1?false:true" @minus="minus"
								@input="input" @plus="plus" v-if="ware.buy_num"></my-stepper>
							<text v-else class="iconfont add_cart" @click="plusCart"> &#xe600;</text>
						</block>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {

		imgRemote
	} = app;

	export default {
		props: ['wares', 'config', 'url'],
		watch: {
			wares(newvalue) {
				this.ware = newvalue;
			}
		},
		data() {
			return {
				ware: this.wares,
				imgRemote: imgRemote,
				
			}
		},
		methods: {
			plus(val) {
				if (this.ware.status == 1) {
					this.ware.buy_num++;
				}
			},
			input(e) {
				this.ware.buy_num = e;
			},
			minus(val) {
				if (this.ware.status == 1) {
					if (this.ware.buy_num == 1) {
						this.ware.buy_num = 1
					} else {
						this.ware.buy_num--;
					}
				}
			},
			detail() {
				uni.navigateTo({
					url: `/pages/index/shopdetail?id=${this.ware.goods_id}`
				})
			},
			cancelCollect() {
				this.$emit('cancelCollect')
			}
		}
	}
</script>

<style scoped lang="scss">
	.my_profile {

		background: white;

		.shelf {
			position: absolute;
			color: #57B127;
			font-size: 80rpx;
			transform: rotate(-5deg);
			margin: 60rpx 0 0 30rpx;
		}
	}

	.my_profile .photo {

		/* width: 180rpx; */

	}

	.my_profile .good_img {
		margin: 29rpx;
		border-radius: 10rpx;
		width: 180rpx;
		height: 180rpx;
	}

	.my_profile .info {
		flex: 1;
		display: flex;
		padding: 29rpx 0;
		flex-direction: column;
		justify-content: space-between;
	}

	.my_profile .operate {
		height: 100%;
		justify-content: space-between;
	}

	.my_profile .add_cart {
		width: 44.4rpx;
		height: 44.4rpx;
		background: #57B127;
		text-align: center;
		line-height: 44.4rpx;
		border-radius: 50%;
		color: white;
		margin: -20rpx 30rpx 0 0;
	}

	.my_profile .showToast {
		position: fixed;
		margin: auto;
		left: 0;
		right: 0;
		top: 12px;
		bottom: 0;
		width: 200rpx;
		height: 30rpx;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 10rpx;
		padding: 15rpx;
		color: white;
	}
</style>
