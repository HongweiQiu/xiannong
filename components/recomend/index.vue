<template>

	<view class="recomend_single" :style="{'height':config.logo&&config.shuiyin==1?'437rpx':'437rpx'}">
		<view @click="detail">
			<view style="width: 100%;height: 230rpx;">
			<!-- 	<image :src="config.logo" mode="aspectFit" class="shuiyin" v-if="config.logo&&config.shuiyin==1">
				</image> -->
				<image class="photo" :src="ware.img==''?imgRemote+config.item_default:ware.img" mode="aspectFit">
				</image>
			</view>

			<view style="height:110rpx;">
				<view class="name">{{ware.title}}</view>
				<view class="gray_font hidden describe" v-if="ware.describe">{{ware.describe}}</view>
			</view>
		</view>
		<view>

			<view class="price">
				<view style="width:70%;">
				<!-- 	<view>
						<text class="red_tag" v-for="(item,index) in ware.label" :key="index">{{item}}</text>
					</view> -->
					<view class="hidden" style="padding-left: 20rpx;">
						<text class="red_font" style="font-size: 36rpx;color:#F01D1D;">¥{{ware.area_price}}</text>
						<text class="gray_font line_through" style="font-size: 22rpx;">¥{{ware.price}}</text>
					</view>

					<!-- 	<block v-if="token">
						<block v-if="config.is_look==1">
							<block v-if="ware.attr.length">
								<view class="hidden">
									<text class="red_font">¥{{ware.area_price}}/{{ware.unit}}</text>
									<text class="gray_font">(多规格)</text>
								</view>
							</block>
							<block v-else>

								<view class="red_font" v-if="ware.market_price==1">时价</view>

								<view class="red_font" v-else>¥{{ware.price}}/{{ware.unit}}</view>
							</block>
						</block>
						<block v-else>
							<view class="red_font">
								¥***
							</view>
						</block>
					</block>
					<block v-else>
						<view v-if="ware.attr.length" class="hidden">
							<text class="red_font">¥{{ware.area_price}}/{{ware.unit}}</text>
							<text class="gray_font">(多规格)</text>

						</view>
						<view v-else class="red_font">
							<text v-if="ware.market_price==1">时价</text>
							<text v-else> ¥{{ware.price}}/{{ware.unit}}</text>

						</view>
					</block>
 -->
				</view>
				<!-- <view class="addcart" @click="showCart">
					<image src="../../static/img/addcart.png" mode="aspectFit"></image>
				</view> -->
					<my-n-stepper v-if="ware.is_del" :val="ware.is_del"></my-n-stepper>
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
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				if (this.config.is_detail == 1) {
					uni.navigateTo({
						url: `/pages/index/shopdetail?id=${this.ware.id}`
					})
				}
			},
			plusCart(){
				console.log(34)
					this.ware.is_del = 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.recomend_single {
		/* box-shadow: 1px 1px 6px #d3d3d3; */
		background: #fff;
		height: 437rpx;
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		border-radius: 10px;
		/* padding: 10rpx; */
		width: 330rpx;
		border-radius: 10rpx;

		.name {
			font-size: 26rpx;
			margin: 20rpx 23rpx 20rpx 20rpx;
		}

		.describe {
			width: 100%;
			font-size: 22rpx;
			color: #999;
			margin-left: 20rpx;
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
		margin:0 20rpx 10rpx 0;
	}
</style>
