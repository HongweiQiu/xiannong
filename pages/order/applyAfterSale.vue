<template>
	<view class="apply-return">
		<view class="return-good">
			<view class="border padding-15 order-num align_center">
				<text class="iconfont" :class="allCheck?'icondanxuanfuxuan':'iconico2'"
					:style="{'color':allCheck?'#57B127':'#999'}" @click="allCheckGood"></text>
				<text class="fs-13" style="margin-left: 20rpx;">订单编号：{{info.order_num}}</text>
			</view>
			<view class="padding-15">
				<view class="" v-for="(item,index) in info.goods" class="flex sign-good " :key="index">
					<view class="align_center">
						<text class="iconfont" :class="item.checked?'icondanxuanfuxuan':'iconico2'"
							:style="{'color':item.checked?'#57B127':'#999'}" @click="selectCheck(index)"></text>
					</view>
					<view class="flex flex-full">
						<view class="img">
							<image :src="imgRemote+item.goods_img" mode="aspectFit" class="r-5"></image>
						</view>
						<view class="info flex-column flex-full ">
							<view class="bold two-line">
								{{item.goods_name}}
							</view>
							<view>
								<text class="fs-11 gray_font">购买数量：</text>
								<text class="fs-13 bold">{{item.buy_num}}</text>
							</view>
							<view>
								<text class="fs-11 gray_font">退款总额：</text>
								<text class="fs-13 bold red-font">￥{{$fixed(item.buy_num*item.market_price)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="explain" style="margin:30rpx;">
			<view class="flex_left_right bold return-money border">
				<text>退款金额：</text>
				<text class="red-font">￥{{totalPrice}}</text>
			</view>
			<view class="more-reason flex">
				<text class="bold">退款说明：</text>
				<textarea v-model="reason" maxlength=50 placeholder="选填" />
			</view>
			<view class="right gray_font">{{reason.length}}/50</view>
		</view>
		<view>
			<view class="bold" style="padding: 30rpx 0;">上传凭证：</view>
			<view class="flex ">
				<view v-for="(item,index) in file" :key="index">
					<image :src="item" mode="aspectFill" class="camera">
					</image>
					<text class="delete-img" @click="file.splice(index,1)">x</text>
				</view>
				<view class="flex-column camera align_center" @click="showUpload('open')">
					<text class="iconfont iconpaizhao"></text>
					<text class="fs-11 gray_font">上传图片</text>
				</view>
			</view>
		</view>
		<view class="submit"> 提交</view>
		<uni-popup ref="popup" type="bottom">
			<view class="upload-img">
				<view class="white_b r-10">
					<view class="border method" @click="chooseImage('album')">本地上传</view>
					<view class="method" @click="chooseImage('camera')">拍照上传</view>
				</view>
				<view class="white_b method r-10 cancel" @click="showUpload('close')">
					取消
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason: '',
				info: [],
				allCheck: true,
				imgRemote: getApp().globalData.imgRemote,
				totalPrice: 0,
				file: []
			}
		},
		methods: {
			showUpload(way) {
				if (way == 'open') {
					this.$refs.popup.open();
				} else {
					this.$refs.popup.close();
				}

			},
			chooseImage(type) {
				let _ = this;
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [type], //从相册选择
					success(res) {
						let file = res.tempFilePaths;

						_.$refs.popup.close();
						for (let i in file) {
							uni.uploadFile({
								url: getApp().globalData.rootUrl + _.$api.mainUpload, //此处换上你的接口地址
								name: 'file',
								filePath: file[i],
								success: function(res1) {
									_.file = _.file.concat(_.imgRemote + JSON.parse(res1.data).data);
								}
							})
						}

					}
				});
			},
			uploadImg() {
				let _ = this;

			},
			allCheckGood() {
				this.allCheck = !this.allCheck;
				this.info.goods.map((item) => {
					item.checked = this.allCheck;
					return item;
				})
				this.selectCheck();
			},
			selectCheck(index) {
				if (index >= 0) {
					this.info.goods[index].checked = !this.info.goods[index].checked;

				}
				this.allCheck = this.info.goods.every((item) => {
					return item.checked == true;
				})
				this.calculate();
			},
			calculate() {
				let sum = 0;
				for (let i of this.info.goods) {
					if (i.checked) {
						sum += i.buy_num * i.market_price;
					}

				}
				this.totalPrice = sum.toFixed(2);
				return this.totalPrice;
			},
		},
		onLoad(e) {
			this.$get(this.$api.orderDetail, {
				token: uni.getStorageSync('userToken'),
				order_id: e.id
			}, (res) => {
				let {
					data
				} = res;
				if (data.code == 1) {
					if (e.returnIndex >= 0) {
						data.data.goods = data.data.goods.filter((item, index) => {
							return index == e.returnIndex;
						})
					}
					data.data.goods.map((item) => {
						item.checked = true;
						return item;
					})
					this.info = data.data;
					this.calculate();
				} else {
					this.$Toast(data.msg);
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.apply-return>view {
		background-color: white;
		border-radius: 10rpx;
		margin: 0 30rpx;

		&:nth-child(1) {
			margin-top: 30rpx;
		}

		&:nth-child(2),
		&:nth-child(3) {
			padding: 0 20rpx 30rpx;
		}

		&:nth-child(4) {
			margin-bottom: 20rpx;
		}

	}

	.apply-return {
		.order-num {
			height: 60rpx;
		}

		.sign-good {
			padding: 30rpx;
		}

		.return-good {
			.img {
				margin: 0 30rpx 0 20rpx;
				width: 168rpx;
				height: 168rpx;
				padding: 30rpx 0;

				image {
					width: inherit;
					height: inherit;
				}
			}

			.info {
				padding: 30rpx 0;
				padding-bottom: 30rpx;
				justify-content: space-between;
			}

			.sign-good:nth-last-child(2) .info {
				border-bottom: 1px solid #eee;
			}
		}

		.return-money {
			height: 88rpx;
		}

		.more-reason {
			padding-top: 30rpx;
		}

		textarea {
			width: 450rpx;
			height: 150rpx;
		}

		.delete-img {
			position: absolute;
			margin-left: -40rpx;
			margin-top: -13rpx;
			background: rgba(0, 0, 0, 0.5);
			width: 40rpx;
			height: 40rpx;
			text-align: center;
			line-height: 32rpx;
			color: white;
			border-radius: 50%;

		}

		.camera {
			.iconfont {
				font-size: 60rpx;
			}

			margin-right: 15rpx;
			justify-content: center;
			width:130rpx;
			height:130rpx;
			border: 1px dashed #eee;
		}

		.submit {
			background: #57B127;
			color: white;
			border-radius: 39rpx;
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			margin-top: 21rpx;
		}

		.upload-img {
			margin: 0 30rpx;

			.method {
				height: 109rpx;
				line-height: 109rpx;
				text-align: center;
			}

			.cancel {
				margin: 30rpx 0;
			}
		}
	}
</style>
