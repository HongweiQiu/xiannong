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
						<text class="fs-23 pink bold" v-if="ware.sku.length==1">￥{{ware.sku[0].market_price}}</text>
						<text class="fs-23 pink bold" v-else>￥{{minPrice}}-{{maxPrice}}</text>
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
				
				<view class="align_center flex-column">
					<text class="iconfont iconkefu-copy"></text>
					<text class="fs-13">售前咨询</text>
				</view>
				<view class="align_center flex-column">
					<text class="iconfont icongouwuche21-copy"></text>
					<text class="fs-13">购物车</text>
				</view>
				<view class="submit">
					<!-- <my-n-stepper val="12" ></my-n-steper> -->
					<view class="add fs-15" @click="buyGood">
						加入购物车
					</view>
				</view>
			</view>

		</view>
		<uni-popup ref="popup" type="bottom">
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
		<uni-popup ref="poster">
			<view class="share-friend-info r-5">
				<view class="r-5 poster-back">
					<image src="../../static/img/share_friends.png" mode=""></image>
				</view>
				<view class="right close-share"><text class="iconfont iconguanbi" @click="$refs.poster.close()"></text>
				</view>
				<view class="white_b detail r-5">

					<view class="good-img align_center">
						<image :src="imgRemote+ware.main_image" mode="widthFix">
						</image>
					</view>
					<view class="product">
						<view class="bold name two-line">{{ware.name}}</view>
						<view class="flex about-qr">
							<view class="price-qr">
								<view class="red-font rmb">
									<text class="fs-11">￥</text>
									<text class="fs-15 bold"
										v-if="ware.sku.length==1">{{ware.sku[0].market_price}}</text>
									<text class="fs-15 bold" v-else>{{minPrice}}-{{maxPrice}}</text>
								</view>
								<view class="fs-11 mp">
									长按识别小程序
								</view>
							</view>

							<image class="qr-code" src="../../static/img/404.png" mode="aspectFit"
								style="background: gray;"></image>

						</view>
					</view>
				</view>

			</view>
			<view class="save-photo" >
				保存图片
			</view>

		</uni-popup>
		<uni-popup ref="addcart" type="bottom">
			<my-addcart :ware="ware" @close="close"></my-addcart>
		</uni-popup>

		<canvas style="width: 540rpx; height: 760rpx;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	</view>
</template>
<script>
	const app = getApp().globalData;
	const {

		imgRemote
	} = app;
	export default {
		data() {
			return {
				imgRemote: imgRemote,
				ware: [],
				maxPrice: '',
				minPrice: '',
				explain: '',
				currentIndex: 0, //当前默认选中
			};
		},
		methods: {
			goodDetail(id) {
				this.$get(this.$api.goodDetail, {
					id: id
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						data.data.content = data.data.content.replace('<img src="',
							'<img style="max-width:100%;height:auto" src="' + getApp().globalData.imgRemote);
						this.ware = data.data;
						let market_prices = [];
						for (let i of data.data.sku) {
							market_prices.push(i.market_price)
						}
						this.maxPrice = Math.max(...market_prices).toFixed(2);
						this.minPrice = Math.min(...market_prices).toFixed(2);

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
			buyGood(){
				this.$needLogin(()=>{
					this.$refs.addcart.open()
				})
			},
			close() {
				this.$refs.addcart.close();
			}
		},
		onShow() {
			// this.$refs.poster.open()
			var canvas = uni.createCanvasContext('firstCanvas')
			let that = this;
			canvas.drawImage('../../static/img/share_friends.png', 0, 0, 270, 380);
			canvas.save();
			canvas.beginPath();
			canvas.rect(21, 30, 228, 318);
			canvas.fillStyle = "#fff";
			canvas.shadowBlur = 20;
			canvas.shadowOffsetX = "1",
				canvas.shadowOffBlue = "4";
			canvas.shadowColor = "rgba(51, 51, 51, 0.15)";
			canvas.fill();
			canvas.restore();
			canvas.drawImage('../../static/img/404.png', 66, 53, 134, 116);
			canvas.drawImage('../../static/img/404.png', 160, 258, 75, 75);
			canvas.beginPath();
			canvas.moveTo(35, 206);
			canvas.lineTo(235, 206);
			canvas.strokeStyle = '#eee';
			canvas.stroke();
			canvas.setFontSize(15);
			canvas.setFillStyle("black");
			canvas.fillText('新鲜大白菜干净新鲜大白菜干', 35, 240);
			canvas.fillText('净新鲜大白菜...', 35, 260);
			canvas.setFillStyle("red")
			canvas.fillText('￥', 30, 298);
			canvas.setFontSize(23);
			canvas.fillText('19.9', 44, 298);
			canvas.beginPath();
			canvas.rect(21, 310, 100, 18);
			canvas.fillStyle = "#E1FFE3";
			canvas.fill();
			canvas.beginPath();
			canvas.fillStyle = "#E1FFE3";
			canvas.arc(120, 319, 8, 1.5 * Math.PI, 0.5 * Math.PI);
			canvas.fill();
			canvas.setFontSize(11);
			canvas.fillStyle = "#008909";
			canvas.fillText('长按识别小程序', 35, 323);
			canvas.draw()
			setTimeout(function() {
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						console.log(res)
						// return
						//将图片保存到相册       
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showModal({
									title: '保存成功',
									content: '图片成功保存到相册了，快去分享朋友圈吧',
									showCancel: false,
									confirmText: '好的',
									confirmColor: '#818FFB',
									success: function(res) {
										if (res.confirm) {
											
										}
									
									}
								})
							}
						})


					},
					fail: function(res) {}
				})
			}, 500)

		},
		onLoad(e) {

			let {
				id
			} = e;
			this.goodDetail(id)
		}
	}
</script>
<style scoped lang="scss">
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
			.iconfont {font-size: 40rpx;}
		}

		.submit {
			width: 308rpx;
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
		width: 540rpx;
		margin: -48rpx auto 0;
		height: 850rpx;

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
			.name {
				margin: 0 29rpx;
				padding: 30rpx 0 9rpx;
				border-top: 1px solid #eee;
				text-align: left;
			}

		}

		.good-img {

			// height: 350rpx;
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

	canvas {
		width: 100px;
		height: 200px;
	}
</style>
