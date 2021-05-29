<template>
	<view class="detail">
		<view>
			<swiper class="imgsBanner_swiper" :current='currentIndex' @change='changCurrent' circular="true">
				<swiper-item v-for="(item,index) in ware.images" :key='index'>
					<image :src="imgRemote+item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<!-- 图片位置 -->
			<view class="imgLength">{{(currentIndex+1)+'/'+(ware.images.length)}}</view>

			<view class="white_b">
				<view class="fs-18 bold title">{{ware.name}}</view>
				<view class="flex_left_right">
					<view class="fs-13 gray_font desc">
						<text v-if="ware.desc">{{ware.desc}}</text>
					</view>
					<view class="share-info align_center" @click="openShare">
						<text class="iconfont bold" style="margin-top: 2rpx;">&#xe6a3;</text>
						<text class="fs-11">分享</text>
					</view>

				</view>
				<view class="price flex_left_right">
					<view>
						<text class="fs-18  pink bold">￥</text>
						<text class="fs-23 pink bold" v-if="ware.sku.length==1">{{ware.sku[0].market_price}}</text>
						<text class="fs-23 pink bold" v-else>{{minPrice}}-{{maxPrice}}</text>
						<!-- <text class="fs-11 pink bold">￥</text>
						<text class="pink fs-23 bold">19.9</text>
						<text class="fs-11">/盒</text>
						<text class="fs-11 gray_font line_through" style="margin-left: 10rpx;">￥25.8</text> -->
					</view>
					<view class="fs-11 gray_font">月销{{ware.sales}}件</view>
				</view>
			</view>
		</view>
		<view class="delivery white_b" v-if="explain">
			<view class=" align_center" v-if="explain.service_top">
				<image src="../../static/img/car.png" class="img-width"></image>
				<text class="fs-13">{{explain.service_top}}</text>
			</view>
			<view style="border-bottom: 1px solid #eee;" v-if="explain.service_bottom&&explain.service_top"></view>
			<view class="align_center" v-if="explain.service_bottom">
				<text class="iconfont iconfuwu1" style="color:#009B44;margin-right: 22rpx;font-size: 62rpx;"></text>
				<text class="fs-13">{{explain.service_bottom}}</text>
			</view>
		</view>

		<view v-if="ware.content">
			<view class="flex align_center flex-column more-info white_b">
				<text class="fs-15 bold">商品详情</text>
				<text class="line-bottom"></text>
				<rich-text :nodes="ware.content"></rich-text>
			</view>
		</view>
		<view style="height: 100rpx;" />
		<view class="addcart">
			<view class="flex_left_right">
				<navigator open-type="switchTab" url="../tabar/index">
					<view class="align_center flex-column">
						<text class="iconfont iconshouye2-copy"></text>
						<text class="fs-13">首页</text>
					</view>
				</navigator>
				<button open-type="contact">
					<view class="align_center flex-column">
						<text class="iconfont iconkefu-copy"></text>
						<text class="fs-13">客服</text>
					</view>
				</button>
				<view class="align_center flex-column" @click="$doubleClick(shopcartPage)">
					<text class="iconfont icongouwuche21-copy"></text>
					<text class="fs-13">购物车</text>
					<text class="cart-count" v-if="cartCount>0">{{cartCount}}</text>
				</view>
				<view class="submit">
					<!-- <my-n-stepper val="12" ></my-n-steper> -->
					<view class="add fs-15" @click="buyGood">
						加入购物车
					</view>
				</view>
			</view>

		</view>
		<uni-popup ref="popup" type="bottom" :maskShow="maskShow">
			<view class="white_b share-option">
				<view class="flex_left_right select">
					<button open-type="share">
						<view class="center">
							<text class="iconfont iconweixin1"></text>
							<view>分享好友</view>
						</view>
					</button>

					<view @click="playBill" class="center">
						<text class="iconfont iconpengyouquan"></text>
						<view>生成海报</view>
					</view>
				</view>
				<view @click="cancelShare" class="cancel fs-15">取消</view>
			</view>
		</uni-popup>
		<uni-popup ref="poster" >
			<view class="share-friend-info r-5">
				<view class="right close-share"><text class="iconfont iconguanbi" @click="$refs.poster.close()"></text>
				</view>
				<view class="white_b detail r-5">
					<view class="good-img align_center">
						<image :src="imgRemote+ware.main_image" mode="widthFix">
						</image>
					</view>
					<view class="product">

						<view class="flex about-qr">
							<view class="price-qr">
								<view class="bold name two-line">{{ware.name}}</view>
								<view class="red-font rmb">
									<text class="fs-11">￥</text>
									<text class="fs-15 bold"
										v-if="ware.sku.length==1">{{ware.sku[0].market_price}}</text>
									<text class="fs-15 bold" v-else>{{minPrice}}-{{maxPrice}}</text>
								</view>
								<view class="fs-11 " style="margin-top:30rpx;">
									<text class="mp">长按识别小程序</text>

								</view>
							</view>

							<image class="qr-code" src="../../static/img/mp.jpg" mode="aspectFit"></image>

						</view>
					</view>
				</view>

			</view>
			<view class="save-photo" @click="canvasToTempFilePath">
				保存图片
			</view>

		</uni-popup>
		<uni-popup ref="addcart" type="bottom" >
			<my-addcart :ware="ware" @close="close"></my-addcart>
		</uni-popup>

		<l-painter :board="base" ref="painter" v-show="false" />
	</view>
</template>
<script>
	import lPainter from '@/uni_modules/lime-painter/components/lime-painter/'
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;
	export default {
		components: {
			lPainter
		},
		data() {
			return {
				maskShow:true,
				showcart: false,
				path: '',
				cartCount: '',
				base: {
					width: '540rpx',
					height: '800rpx',
					views: [{
							type: 'view',
							css: {
								background: '#57B127',
								width: '540rpx',
								height: '800rpx',
							}
						}, {
							type: 'view',
							css: {
								left: '40rpx',
								top: '60rpx',
								background: '#fff',
								radius: '10rpx',
								width: '460rpx',
								height: '680rpx',
								shadow: '0 20rpx 48rpx rgba(0,0,0,.05)'
							}
						},
						{
							type: 'image',
							src: '',
							css: {
								left: '72rpx',
								top: '86rpx',
								width: '400rpx',
								height: '400rpx',
								radius: '10rpx'
							}

						},
						{
							type: 'text',
							text: '1212',
							maxLines: 2,
							css: {
								fontWeight: 'bold',
								left: '72rpx',
								top: '500rpx',
								width: '260rpx',

							}
						},
						{
							type: 'text',
							text: '',
							css: {
								color: '#F01D1D',
								left: '72rpx',
								top: '600rpx',
							}
						},
						{
							type: 'view',
							css: {
								left: '40rpx',
								top: '648rpx',
								background: '#E1FFE3',
								radius: '10rpx',
								width: '245rpx',
								height: '40rpx',
								radius: '0 20rpx 20rpx 0'

							}
						},
						{
							type: 'text',
							text: '长按识别小程序',
							css: {
								color: '#008909',
								left: '72rpx',
								top: '650rpx',
							}
						},
						{
							type: 'image',
							src: '../../static/img/mp.jpg',
							css: {
								left: '330rpx',
								top: '500rpx',
								width: '150rpx',
								height: '150rpx'
							}

						}
					]
				},
				imgRemote: imgRemote,
				ware: [],
				maxPrice: '',
				minPrice: '',
				explain: '',
				currentIndex: 0, //当前默认选中,
				id:'',
			};
		},
		methods: {
			canvasToTempFilePath() {

				const painter = this.$refs.painter;
				painter.render(this.base);
				// 支持通过调用canvasToTempFilePath方法传入参数 调取生成图片
				painter.canvasToTempFilePath().then(res => {
					this.path = res.tempFilePath;
					uni.saveImageToPhotosAlbum({
						filePath: this.path,
						success(res) {
							uni.showModal({
								title: '保存成功',
								content: '图片成功保存到相册了，快去分享朋友圈吧',
								showCancel: false,
								confirmText: '好的',
								confirmColor: '#818FFB'
							})
						}
					})
				})
			},

			goodDetail(id) {
				this.$get(this.$api.goodDetail, {
					id: id
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						data.data.content = data.data.content.replace('<img src="',
							'<img style="max-width:100%;height:auto" src="' + getApp().globalData
							.imgRemote);
						this.ware = data.data;

						let market_prices = [];
						for (let i of data.data.sku) {
							market_prices.push(i.market_price)
						}
						this.maxPrice = Math.max(...market_prices).toFixed(2);
						this.minPrice = Math.min(...market_prices).toFixed(2);

						this.base.views[2].src = this.imgRemote + this.ware.main_image;
						this.base.views[3].text = this.ware.name;
						if (this.ware.sku.length == 1) {
							this.base.views[4].text = '￥' + this.ware.sku[0].market_price
						} else {
							this.base.views[4].text = '￥' + this.minPrice + '-' + this.maxPrice;
						}
						// const painter = this.$refs.painter;
						// painter.render(this.base);
					}
				})
				this.$get(this.$api.mainSevice, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.explain = data.data;
					}
				})
			},
			changCurrent(e) {
				this.currentIndex = e.target.current
			},
			openShare() {
				this.$refs.popup.open();
			},
			cancelShare() {
				this.$refs.popup.close();
			},
			playBill() {
				this.cancelShare();
				this.$refs.poster.open()
			},
			buyGood() {
				this.$needLogin(() => {
					this.$refs.addcart.open()
				})
			},
			close() {
				this.$refs.addcart.close();
				this.getCount();
			},
			getCount() {
				this.$get(this.$api.cart_count, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.cartCount = data.data;
					}
				})
			},
			goodLike(id) {
				this.$get(this.$api.goodsJoin_like, {
					token: uni.getStorageSync('userToken'),
					goods_id: id
				}, () => {})
			},
			shopcartPage() {
				this.$needLogin(() => {
					uni.switchTab({
						url: '../tabar/shopcart'
					})
				})
			}
		},
		onLoad(e) {
			let {
				id
			} = e;
			this.goodDetail(id);
			this.id=e.id;
			this.getCount();
			if (uni.getStorageSync('userToken')) {
				this.goodLike(id);
			}
		},
		onShareAppMessage() {
			this.maskShow=false;
			  return {
			      title: this.ware.name,
			      path: '/pages/index/shopdetail?id='+this.id,
				  imgageUrl:this.imgRemote+this.ware.main_image
			    }

		},
		onShareTimeline() {}
	}
</script>
<style scoped lang="scss">
	.cart-count {
		margin: -5rpx 0 0 36rpx;
		text-align: center;
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 14rpx;
		font-size: bold;
		border-radius: 50%;
		background: #57B127;
		color: white;
		// border: 1px solid orange;
	}

	.imgLength {
		position: absolute;
		top: 660rpx;
		right: 0rpx;
		background: rgba(0, 0, 0, 0.2);
		padding: 0 12rpx;
		line-height: 32rpx;
		font-size: 22rpx;
		border-radius: 15rpx 0 0 15rpx;
		color: #fff;
	}

	.imgsBanner_swiper {
		width: 750rpx;
		height: 750rpx;

		swiper-item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.detail .title {
		padding: 13rpx 32rpx 20rpx 30rpx;
	}

	.share-info {
		color: #F01D1D;
		background: #FFE2E2;
		width: 122rpx;
		height: 34rpx;
		line-height: 34rpx;
		border-radius: 17rpx 0 0 17rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.detail {
		.desc {
			padding-left: 30rpx;
		}

		.price {
			padding: 29rpx 30rpx 25rpx;
		}

		.delivery {
			.img-width {
				width: 60rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}

			margin: 16rpx 0;
			padding: 0 30rpx;
			color: #333;
			line-height: 92rpx;

			.service-bottom {
				border-top: 1px solid #eee;
			}
		}

		.more-info {
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.pink {
		color: #F01D1D;
	}

	.line-bottom {
		width: 130rpx;
		background-color: #57B127;
		height: 8rpx;
		border-radius: 4rpx;
		position: absolute;
		margin-top: 50rpx;
		opacity: 0.4;
	}

	.addcart {

		position: fixed;
		bottom: 0;
		background: white;
		width: 100%;

		&>view {
			height: 98rpx;
			padding: 0 30rpx;

			.iconfont {
				font-size: 40rpx;
			}
		}

		.submit {
			width: 408rpx;
			height: 78rpx;
			margin-left: 30rpx;
		}
	}

	.add {
		background: #57B127;
		text-align: center;
		line-height: 78rpx;
		color: white;
	}

	.add {
		border-radius: 39rpx;
	}

	.share-option {
		button {
			background: none;
			margin: 0;
			padding: 0;
			border: none;
			font-size: 30rpx;
			line-height: normal;

			&::after {
				border: none;
			}
		}

		.select {
			padding: 40rpx 140rpx;

			.iconfont {
				font-size: 100rpx;
				color: #07C160;
				margin-bottom: 8rpx;
				display: block;
			}
		}


		.cancel {
			padding: 33rpx 0;
			text-align: center;
			border-top: 1px solid #eee;
		}
	}

	.share-friend-info {
		background: #57B127;
		width: 540rpx;
		margin: -108rpx auto 0;
		padding-bottom: 1rpx;

		.poster-back {
			width: 540rpx;
			height: 850rpx;
			position: absolute;
			z-index: -1;

			left: 0;

			image {
				width: inherit;
				height: inherit;
				border-radius: 10rpx;
			}
		}

		.close-share {

			height: 60rpx;
			line-height: 60rpx;

			text {
				font-size: 40rpx;
				color: white;
			}
		}

		.detail {
			box-shadow: 2rpx 0 8rpx rgba(0, 0%, 20%, 0.15);
			margin: 0rpx 42rpx 62rpx;
			padding-bottom: 30rpx;
		}

		.product {
			padding-top: 20rpx;

			.name {
				margin: 0 29rpx;

				text-align: left;
			}

		}

		.good-img {

			border-bottom: 1px solid #eee;
			justify-content: center;

			image {
				width: 400rpx;
				height: 234rpx;
				margin: 25rpx 0;
				border-radius: 10rpx;
			}
		}

		.about-qr {
			justify-content: space-between;
			text-align: left;

			.qr-code {
				width: 150rpx;
				height: 150rpx;
				margin-right: 28rpx;
			}

			.price-qr {

				display: flex;
				flex-direction: column;
				width: 60%;

				.rmb {
					padding-left: 28rpx;
				}

				.mp {
					margin-top: 30rpx;
					background: #E1FFE3;
					color: #008909;
					padding: 7rpx 18rpx 8rpx 28rpx;
					border-radius: 0 20rpx 20rpx 0;
				}

			}
		}
	}

	.save-photo {
		width: 460rpx;
		height: 74rpx;
		margin: 30rpx auto 0;
		text-align: center;
		line-height: 74rpx;
		color: white;
		background: #57B127;
		border-radius: 37rpx;
	}
</style>
