<template>
	<view class="recomend_single">
		<view @click="$doubleClick(detail)">
			<view >
				<image class="photo r-5" :src="ware.main_image==''?imgRemote+config.main_image:imgRemote+ware.main_image"
					mode="aspectFill">
				</image>
			</view>
			<view style="height: 80rpx;">
				<view class="name fs-13 two-line">{{ware.name}}</view>
				<!-- <view class="gray_font hidden describe" v-if="ware.desc">
					{{ware.desc}}
				</view> -->
			</view>
		</view>
		<view>
			<view class="price">
				<view style="width:70%;">
					<view class="hidden">
						<text class="red_font fs-18">¥{{ware.sku[0].market_price}}</text>
						<!-- <text class="gray_font line_through" style="font-size: 22rpx;">¥{{ware.market_price}}</text> -->
					</view>
				</view>
				<my-stepper v-if="ware.is_del" :val="ware.is_del"></my-stepper>
				<view class="iconfont plus" v-else @click="plusCart">
					&#xe600;
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
		props: ['ware', 'config'],
		data() {
			return {
				imgRemote: imgRemote,
				token: uni.getStorageSync('cdj_token'),
				count: 0
			}
		},
		methods: {
			showCart() {
				this.$emit('showCart')
			},
			detail() {

				uni.navigateTo({
					url: `/pages/index/shopdetail?id=${this.ware.id}`
				})

			},
			plusCart() {
				this.ware.is_del = 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.recomend_single {
		background: #fff;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		width: 330rpx;
		border-radius: 10rpx;
		padding: 0 20rpx 10rpx;

		.describe {
			width: 100%;
			font-size: 22rpx;
			color: #999;
			margin-top: 20rpx;
		}
	}

	.recomend_single .photo {
		margin: 20rpx 0 10rpx;
		width: 290rpx;
		height: 290rpx;
	}

	.recomend_single .price {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.plus {
		height: 46rpx;
		width: 46rpx;
		background: #57B127;
		color: #fff;
		text-align: center;
		font-size: 36rpx;
		line-height: 46rpx;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}
</style>
