<template>
	<view class="my_profile flex" @click="$doubleClick(detail)">
		<view class="photo" >

			<image class="good_img" :src="ware.main_image==''?imgRemote+config.item_default:imgRemote+ware.main_image"
				mode="widthFix"></image>
		</view>

		<block v-if="ware==undefined"></block>
		<block v-else>
			<view class="info">
				<view class="operate flex">
					<view style="width:86%;" @click="$doubleClick(detail)">
						<view class="fs-13  two-line">{{ware.name}}</view>
						<!-- <view v-if="ware.desc" class="hidden gray_font fs-11">{{ware.desc}}</view> -->
					</view>

				</view>
				<view class="flex_left_right">
					<view style="width:82%;" @click="$doubleClick(detail)">
						<view class="hidden">
							<text class="red_font fs-18 bold">¥{{ware.sku[0].market_price}}</text>
							<text class="gray_font">/{{ware.sku[0].unit}}</text>
						</view>
					</view>

					<view class="align_center">
						<block v-if="ware.attr.length">
							<image class="add_cart" src="../../static/img/addcart.png" @click="showCart"></image>
						</block>
						<block v-else>

							<my-stepper @showKey="showKey" :val="ware.cart_num" @minus="minus(ware.cart_num-1)"
								@plus="plus(ware.cart_num+1)" v-if="ware.cart_num"></my-stepper>
							<text v-else class="iconfont add_cart" @click="plusCart"> &#xe600;</text>
						</block>
					</view>
				</view>
			</view>

		</block>


	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;
	let {
		log
	} = console;
	export default {
		props: ['wares', 'config', 'url'],
		watch: {
			wares(newvalue) {
				this.ware = newvalue;
			}
		},
		data() {
			return {
				apliyShow: false,
				ware: this.wares,
				imgRemote: imgRemote,
				token: uni.getStorageSync('cdj_token'),
				count: 0,
				addcount: 0,
				message: ''
			}
		},
		methods: {
			showCart() {
				// #ifdef MP-WEIXIN
				uni.hideTabBar();
				// #endif
				this.$emit('showCart')
			},
			addcart(url, num, message = '成功加入购物车') {
				getApp().globalData.aplipay = false;
				let item = this.ware;
				if (item.is_float == 1 && !Number.isInteger(Number(num))) {
					rs.Toast('购买数量不能为小数');
					return;
				}
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					item_id: item.id,
					attr_id: 0,
					item_num: num
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests(url, params, res => {
					let data = res.data;
					if (data.code == 200) {
						// #ifndef MP-ALIPAY
						rs.Toast(message);
						// #endif


						if (num <= 0) {
							this.ware.cart_num = 0;
						} else {

							this.ware.cart_num = num;

						}
					} else if (data.code == 407 || data.code == 406) {
						rs.Toast("购买数量不能超过活动数量");
					} else {
						rs.Toast(res.data.msg);
					}
				});
			},
			minus(e) {
				if (e == 0) {
					this.addcart('deleteCart', e, '成功删除商品');
				} else {
					this.addcart('changeNum', e);
				}
			},
			plus(e) {
				this.addcart('changeNum', e);
			},
			plusCart() {

				this.addcart('changeNum', 1);
			},
			showKey() {
				this.$emit('showKey')
			},
			detail() {
				uni.navigateTo({
					url: `/pages/index/shopdetail?id=${this.ware.id}`
				})
			},
			cancelCollect() {
				this.$emit('cancelCollect')
			}
		}
	}
</script>

<style>
	.my_profile {
		/* padding: 0 0 30rpx 0; */
		background: white;
		border-bottom: 1px solid #eee;
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
