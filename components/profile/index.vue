<template>
	<view class="my_profile flex">
		<view class="photo" @click="$doubleClick(detail)">
			<image :src="config.logo" mode="aspectFit" class="shuiyin" v-if="config.logo&&config.shuiyin==1"></image>
			<image class="good_img" :src="ware.img==''?imgRemote+config.item_default:ware.img" mode="aspectFit"></image>
		</view>

		<block v-if="ware==undefined"></block>
		<block v-else>
			<view class="info">
				<view class="operate flex">
					<view style="width:86%;" @click="detail">
						<view class="fs-13 bold">{{ware.title}}</view>
						<view v-if="ware.describe" class="hidden gray_font fs-11">{{ware.describe}}</view>
					</view>
					<view v-if="url=='collect'" @click="cancelCollect">
						<text class="iconfont icon-alreadystar" style="color:orange;"></text>

					</view>
				</view>
				<view class="flex_left_right">
					<view style="width:82%;" @click="detail">

						<view><text class="red_tag" v-for="(item,index) in ware.label" :key="index">{{item}}</text>
						</view>

						<block v-if="token">
							<block v-if="config.is_look==1">
								<view v-if="ware.attr.length" class="hidden">
									<text class="red_font">¥{{ware.area_price}}/{{ware.unit}}</text>
									<text class="gray_font">(多规格)</text>
								</view>
								<view v-else>
									<block v-if="ware.activity_num>=ware.cart_num&&ware.is_activity==1">
										¥{{ware.activity_price+'/'+ware.unit}}
									</block>
									<block v-else>
										<view v-if="ware.market_price==1">时价</view>
										<view v-else>
											<text class="red-font fs-18">¥{{ware.price}}</text>
											<text class="fs-11 gray_font">/{{ware.unit}}</text>
										</view>
									</block>

								</view>
							</block>
							<block v-else>
								<view class="red_font">¥***</view>
							</block>
						</block>
						<block v-else>
							<view v-if="wares.attr.length" class="hidden">
								<text class="red_font">¥{{ware.area_price}}/{{ware.unit}}</text>
								<text class="gray_font">(多规格)</text>
							</view>
							<view v-else class="red_font">
								<block v-if="ware.market_price==1">时价</block>
								<block v-else>¥{{ware.price}}/{{ware.unit}}</block>

							</view>
						</block>

					</view>

					<view class="align_center">
						<block v-if="ware.attr.length">
							<image class="add_cart" src="../../static/img/addcart.png" @click="showCart"></image>
						</block>
						<block v-else>

							<my-n-stepper @showKey="showKey" :val="ware.cart_num" @minus="minus(ware.cart_num-1)"
								@plus="plus(ware.cart_num+1)" v-if="ware.cart_num"></my-n-stepper>
							<text v-else class="iconfont add_cart" @click="plusCart"> &#xe600;</text>
						</block>
					</view>
				</view>
			</view>
			<view class="showToast" v-if="apliyShow">
				<view style="width: 100%;text-align: center;">{{message}}</view>
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

						// #ifdef MP-ALIPAY
						this.apliyShow = true;
						this.message = message;
						setTimeout(() => {
							this.apliyShow = false;

						}, 1000)
						// rs.Toast('加入购物车成功');
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
			cancelCollect() {
				this.$emit('cancelCollect')
			}
		}
	}
</script>

<style>
	.my_profile {
		padding: 0 0 30rpx 0;
		background: white;
	}

	.my_profile .photo {
		margin-right: 29rpx;
		width: 180rpx;
	}

	.my_profile .good_img {
		width: 100%;
		height: 140rpx;
	}

	.my_profile .info {
		width: calc(100% - 200rpx);
		display: flex;
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
		margin-right: 30rpx;
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
