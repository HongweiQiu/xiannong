<template>
	<view>
		<view class=" white_b  car-nav">
			<view class="padding-15 flex_left_right align_center">

				<view class="align_center">
					<text class=" bold">购物车</text>
					<text class="fs-11 gray_font"
						style="padding:10rpx 0 0 10rpx;">{{itemList.length?itemList.length+'件商品':''}}</text>
				</view>
				<view class="fs-13 gray_font" style="padding:10rpx 0 0">
					<text v-if="edit" @click="edit=false">编辑</text>
					<text v-else @click="delterGood">删除</text>
				</view>

			</view>
		</view>
		<view style="height: 88rpx;"></view>
		<view class="shopcart" v-if="itemList.length!=0">
			<view class="good-num white_b">
				<view>
					<view v-for="(item,index) in itemList" :key="index" class="align_center sign-good">
						<text class="iconfont" :class="item.checked?'icondanxuanfuxuan':'iconico2'"
							:style="{'color':item.checked?'#57B127':'#999'}" @click="selectCheck(index)"></text>
						<view class="my_profile flex flex-full">
							<view class="shelf" v-if="item.status!=1">商品暂时已下架</view>
							<view class="photo">
								<image class="good_img"
									:src="item.goods.main_image==''?imgRemote+config.item_default:imgRemote+item.goods.main_image"
									mode="widthFix"></image>
							</view>

							<view class="info">
								<view class="operate flex">
									<view style="width:86%;" @click="$doubleClick(detail)">
										<view class="fs-13  two-line">{{item.goods.name}}</view>
										<!-- <view v-if="item.desc" class="hidden gray_font fs-11">{{item.desc}}</view> -->
									</view>
								</view>
								<view class="flex_left_right">
									<view style="width:82%;" @click="$doubleClick(detail)">
										<view class="hidden">
											<text class="red_font fs-18 bold">¥{{item.sku.market_price}}</text>
											<text class="gray_font">/{{item.sku.unit}}</text>
										</view>
									</view>
									<my-stepper :val="item.buy_num" :disabled="item.status==1?false:true"
										@minus="minus(index)" @input="input" :index="index" @plus="plus(index)">
									</my-stepper>
								</view>
							</view>

						</view>

					</view>
				</view>
				<view class="flex_left_right go-bill fs-11" v-if="feeInfo.over>totalPrice">
					<view> 实付满{{feeInfo.over}}元免运费，还差
						<text class="red-font">{{fixed(Math.abs(totalPrice-feeInfo.over))}}</text>元
					</view>
					<navigator open-type="switchTab" url="/pages/tabar/classify">
						<view class="red-font align_center">
							<text>去凑单</text>
							<text class="iconfont iconfanhui t-180 bold"></text>
						</view>
					</navigator>
				</view>
			</view>
			<view class="new-order">
				<view class="flex_left_right submit white_b">
					<view class="align_center">
						<text class="iconfont" :class="allCheck?'icondanxuanfuxuan':'iconico2'"
							:style="{'color':allCheck?'#57B127':'#999'}" @click="allCheckGood"></text>

						<text class="fs-15" style="margin-left:30rpx;">全选</text>
					</view>
					<view class="align_center">
						<text class="fs-13 gray_font">不含运费 合计：</text>
						<text class="fs-18 red-font">￥{{fixed(totalPrice)}}</text>
						<text class="fs-15 gray_font  pay-button" :class="settlement?'go-settle':'in-go-settle'"
							@click="shoplist">去结算</text>

					</view>
				</view>
			</view>
			<view style="height: 130rpx;"></view>
		</view>
		<view v-else class="null_cart">
			<view class="null_img">
				<image src="../../static/img/nullcart.png" mode="aspectFit"></image>
				<view class="fs-15 gray_font" style="margin:61rpx 0 40rpx;">购物车里空空如也~</view>
				<navigator open-type="switchTab" url="/pages/tabar/classify">
					<view class="go-shopping">去逛一逛</view>
				</navigator>
			</view>
			<view class="recomend" v-if="recommendList.length!=0">
				<view class="title">
					<text class="name align_center">猜你喜欢</text>
				</view>
				<view class="body">
					<my-recomend v-for="(item, index) in recommendList" :key="index" :ware="item" class="myc_recomend">
					</my-recomend>
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
		data() {
			return {
				imgRemote: imgRemote,
				edit: true,
				page: 1,
				cartitem: [],
				itemList: [],
				settlement: false,
				allCheck: false,
				recommendList: false,
				totalPrice: '',
				feeInfo: ''
			};
		},
		methods: {
			fixed(val) {
				return val.toFixed(2)
			},
			calculate() {
				let sum = 0;
				for (let i of this.itemList) {
					if (i.checked) {
						sum += i.buy_num * i.sku.market_price;
					}

				}
				this.totalPrice = sum;
				return this.totalPrice;
			},
			delterGood() {
				let that = this;
				if (that.settlement) {
					uni.showModal({
						title: '温馨提醒',
						content: '确定要删除选中商品吗？',

						confirmColor: "#59B727",
						success: function(res) {
							if (res.confirm) {

								let ids = '';

								for (let i of that.itemList) {
									if (i.checked == true) {
										ids += i.id + ','
									}
								}
								let newId = ids.substring(0, ids.length - 1)
								let params = {
									token: uni.getStorageSync('userToken'),
									cart_id: newId
								}
								that.$get(that.$api.cartdel_cart, params, res => {
									let data = res.data;
									if (data.code == 1) {
										that.$Toast('删除成功');
										that.cartIndex();
									} else {
										that.$Toast(data.msg);
									}
								});

							}
						}
					})
				} else {
					that.$Toast('没有选中商品哦');
				}
			},
			selectCheck(index) {
				if (index >= 0) {
					this.itemList[index].checked = !this.itemList[index].checked;
					if (this.itemList[index].status != 1 && this.edit == true) {
						this.itemList[index].checked = false;
					}
				}

				this.settlement = this.itemList.some((item) => {
					return item.checked == true;
				})
				this.allCheck = this.itemList.every((item) => {
					return item.checked == true;
				})
				this.calculate();
			},
			allCheckGood() {
				this.allCheck = !this.allCheck;
				this.itemList.map((item) => {
					if (this.edit == true) {
						if (item.status != 1) {
							item.checked = false;
						} else {
							item.checked = this.allCheck;
						}
					} else {
						item.checked = this.allCheck;
					}
					return item;
				})
				this.selectCheck();
			},
			shoplist() {
				if (this.settlement) {
					let selectGoods = this.itemList.filter((item) => {
						return item.checked == true
					})
					uni.setStorageSync('selectGoods', selectGoods);
					uni.navigateTo({
						url: "/pages/shopcart/shoplist"
					})
				} else {
					this.$Toast('没有选中商品哦')
				}

			},
			cartIndex() {
				this.$get(this.$api.cartIndex, {
					token: uni.getStorageSync('userInfo')
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 0) {
						// data.data.map((item) => {
						// 	// item.checked = true;
						// 	if (item.status != 1) {
						// 		item.checked = false;
						// 	}
						// 	return item;
						// })
						this.itemList = data.data;
						this.calculate();

					}
				})
			},
			//猜你喜欢
			likeGood() {
				let {
					num,
					page
				} = this;
				this.$get(this.$api.goodsUser_like, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.recommendList = data.data;
					}
				});
			},
			updateCart(id, num) {
				let params = {
					token: uni.getStorageSync('userToken'),
					cart_id: id,
					buy_num: num
				};
				this.$get(this.$api.update_cart_num, params, res => {
					let data = res.data;
					if (data.code == 1) {
						this.$Toast('成功更新购物车数量');
						this.calculate();
					} else {
						this.$Toast(data.msg)
					}
				});
			},
			plus(index) {
				if (this.itemList[index].status == 1) {
					this.itemList[index].buy_num++;
				}
				let indexGood = this.itemList[index];
				this.updateCart(indexGood.id, indexGood.buy_num);
			},
			input(e) {
				if (e.value) {
					this.itemList[e.index].buy_num = e.value;
				} else {
					this.itemList[e.index].buy_num = parseFloat(0);
				}

				let indexGood = this.itemList[e.index];
				this.updateCart(indexGood.id, indexGood.buy_num)

			},
			minus(index) {
				if (this.itemList[index].status == 1) {
					if (this.itemList[index].buy_num == 1) {
						this.itemList[index].buy_num = 1
					} else {
						this.itemList[index].buy_num--;
					}
				}
				let indexGood = this.itemList[index];
				this.updateCart(indexGood.id, indexGood.buy_num)

			},

			//邮费
			getFreight() {
				this.$get(this.$api.mainFreight, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.feeInfo = data.data;
					}
				});
			},
		},
		onShow() {
			this.edit = true;
			this.allCheck = false;
			this.settlement = false;
			this.getFreight();
			this.cartIndex();
			this.likeGood();
		},
		onLoad() {

		}
	};
</script>

<style scoped lang="scss">
	page {
		background: #f8f8f8;
	}

	/deep/ .my_stepper {
		margin: 0 !important;
		width: 130rpx !important;
	}

	.car-nav {
		height: 88rpx;
		line-height: 88rpx;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 5;
	}

	.good-num {
		border-radius: 10rpx;
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding-bottom: 30rpx;

		.check-button {
			margin: 0 20rpx 0 0;
		}

		.sign-good {

			// padding: 10rpx 0;

			margin: 0rpx 20rpx;

			&:nth-last-child(n+2) {
				border-bottom: 1px solid #eee;

			}
		}

		.go-bill {
			padding: 20rpx;
			margin: 0 20rpx 0rpx 20rpx;
			background: #eee;
			border-radius: 10rpx;
		}

	}

	.new-order {
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 9;

		.submit {
			padding: 0 30rpx;
			height: 98rpx;
		}

		.in-go-settle {
			background: #eee;
			margin-left: 30rpx;
		}

		.go-settle {
			color: white;
			background: #57B127;
			margin-left: 30rpx;
		}
	}

	.single_good {
		flex: 1;
	}

	/deep/ .my_profile {
		padding: 0;

		.add_cart {
			margin: 0;
		}
	}

	.recomend .title .name {

		&:before {
			content: '';
			display: inline-block;
			width: 150rpx;
			height: 4rpx;
			background: linear-gradient(to right, #FFFFFF, #57B127);
			margin-right: 20rpx;
		}

		&:after {
			content: '';
			display: inline-block;
			width: 150rpx;
			height: 4rpx;
			background: linear-gradient(to left, #FFFFFF, #57B127);
			margin-left: 20rpx;
		}
	}

	.null_img {
		text-align: center;

		image {
			width: 318rpx;
			height: 350rpx;
			margin-top: 60rpx;
		}

		.go-shopping {
			width: 256rpx;
			height: 70rpx;
			line-height: 70rpx;
			color: white;
			background: #57B127;
			border-radius: 35rpx;
			margin: 0 auto 50rpx;
		}
	}

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
