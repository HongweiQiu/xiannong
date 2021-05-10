<template>
	<view class="recomend_single">
		<view @click="$doubleClick(detail)">
			<view style="width: 100%;height: 230rpx;">
				<image class="photo" :src="ware.main_image==''?imgRemote+config.main_image:imgRemote+ware.main_image"
					mode="aspectFit">
				</image>
			</view>
			<view style="height:110rpx;">
				<view class="name fs-13 bold">{{ware.name}}</view>
				<view class="gray_font hidden describe" v-if="ware.content">
					<rich-text :nodes="ware.content"></rich-text>
				</view>
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
				if (this.config.is_detail == 2) {
					uni.navigateTo({
						url: `/pages/index/shopdetail?id=${this.ware.id}`
					})
				}
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
		// height: 437rpx;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		width: 330rpx;
		border-radius: 10rpx;
		padding: 0 20rpx 30rpx;

		.describe {
			width: 100%;
			font-size: 22rpx;
			color: #999;
			margin-top: 20rpx;
		}
	}

	.recomend_single .photo {
		border-radius: 10rpx 10rpx 0 0;
		width: 100%;
		height: 100%;
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
