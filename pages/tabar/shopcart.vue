<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar white_b" style="position: fixed;z-index: 9999;">
			<!-- 这里是状态栏 -->
		</view>
		<view class="status_bar white_b"></view>
		<!-- #endif -->
		<view class=" white_b  car-nav">
			<view class="padding-15 flex_left_right"><text class="fs-15 bold">购物车</text>
				<text class="fs-13 gray_font">编辑</text>
			</view>
		</view>
		<view style="height: 88rpx;"></view>
		<!-- <view class="shopcart" v-if="cartInfo.countNum!=0"> -->
		<view class="shopcart" v-if="true">
			<view class="good-num white_b">
				<view>
					<view v-for="(item,index) in itemList" :key="index" class="align_center sign-good">

						<!-- <uni-icons class="check-button" :type="item.check?'checkbox-filled':'circle'"
							:color="item.check?'#57B127':'#999'" size="20" @click="selectCheck(index)" />
						 --><my-profile :wares="item" :config="config" class="single_good" @showCart="openCart(item)"
							@showKey="showKey(item,index)"></my-profile>
					</view>
				</view>
				<view class="flex_left_right go-bill fs-11">
					<view> 实付满99元免运费，还差<text class="red-font">78.8</text>元</view>
					<navigator url="/pages/shopcart/goodbill">
						<view class="red-font">
							去凑单
							<!-- <uni-icons type="arrowright" size="11" color="#F01D1D" class="bold" /> -->
						</view>
					</navigator>


				</view>
			</view>
			<view class="new-order">
				<view class="flex_left_right submit white_b">
					<view class="align_center">
						<uni-icons class="check-button" :type="allCheck?'checkbox-filled':'circle'"
							:color="allCheck?'#57B127':'#999'" size="20" @click="allCheckGood" />

						<text class="fs-15" style="margin-left:30rpx;">全选</text>
					</view>
					<view class="align_center">
						<text class="fs-13 gray_font">不含运费 合计：</text>
						<text class="fs-18 red-font">￥0</text>
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
				<view class="go-shopping">去逛一逛</view>
			</view>
			<view class="recomend">
				<view class="title">

					<text class="name align_center">猜你喜欢</text>
				</view>
				<view class="body">
					<my-recomend v-for="(item, index) in itemList" :key="index" :ware="item" :config="config"
						@showCart="openCart(item)" class="myc_recomend"></my-recomend>
				</view>
				<my-loading :loading="loading"></my-loading>
			</view>
			<my-backtop bottom="60" :showTop="showTop"></my-backtop>


		</view>
		<!-- 	<my-tabar tabarIndex=2 v-if="display"></my-tabar> -->
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	import md5 from '../../static/js/md5.js';

	import rs from '../../static/js/request.js';
	
	let {
		log
	} = console;
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;

	export default {
		components: {
			wPicker
		},
		data() {
			return {

				display: true,
				page: 1,
				num: 10,
				loading: true,
				showTop: false,
				config: [],
				cartware: [],
				itemList: [],
				settlement: true,
				allCheck: true
			};
		},

		methods: {
			selectCheck(index) {
				if (index >= 0) {
					this.itemList[index].check = !this.itemList[index].check;
				}

				this.settlement = this.itemList.some((item) => {
					return item.check == true;
				})
				this.allCheck = this.itemList.every((item) => {
					return item.check == true;
				})
			},
			allCheckGood() {
				this.allCheck = !this.allCheck;
				this.itemList.map((item) => {
					item.check = this.allCheck;
					return item;
				})
				this.selectCheck();
			},
			shoplist() {
				if (this.settlement) {
					uni.navigateTo({
						url: "/pages/shopcart/shoplist"
					})
				} else {
					rs.Toast('没有选中商品哦')
				}

			},
			deliveryPage() {
				uni.navigateTo({
					url: '/pages/shopcart/delivery?childzid=' + this.childzid
				});
			},
			collectBill() {
				uni.switchTab({
					url: '/pages/tabar/index'
				})
			},
			childInfo() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("childInfo", params, (res) => {
					let data = res.data;
					if (data.code == 200) {
						this.childList.push(...data.data)
					}
				})
			},
			newArr(arr) {
				return arr.map(function(val, ind) {
					return {
						id: val.id,
						txt: '',
					}
				});
			},
			addInfo() {

				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("addInfo", params, (res) => {
					let {
						data
					} = res;
					this.cartInfo = data.data;
					let {
						userInfo,
						activity_rule,
						totalPrice,
						activity_type
					} = data.data;
					this.contact = userInfo.contact;
					this.mobile = userInfo.phone;
					this.address = userInfo.address;

					// 判断购物车是否有数量
					// if (data.data.countNum == 0 && app.isReload == true) {
					this.indexItem()
					// }
					// 配送时间
					this.deliveryList.push(...data.data.delivery_time_list);

					// 现金券
					if (data.data.couponsList.length != 0) {
						let nrr = this.newArr(data.data.couponsList)
						for (let i = 0; i < data.data.couponsList.length; i++) {
							nrr[i].txt =
								`${data.data.couponsList[i].coupons_title}(余额${data.data.couponsList[i].residue}元)`
						}
						this.couponsList.push(...nrr);
					}
					// 满赠
					if (activity_type == 2) {
						if (data.data.fullPrice >= activity_rule[0].price) {
							this.gift = 1
						} else {
							this.gift = 0;
						}
					}
					// 满减
					let length = activity_rule.length - 1;
					if (activity_type == 1) {
						if (activity_rule[length].price <= totalPrice) {
							this.reduce = parseHtml(
								`已享受满<span style='color: #FF3E1E;'>${activity_rule[length].price}元</span>减<span style='color: #FF3E1E;'>${activity_rule[length].reduce}元<span>`
							);
						} else {
							for (let i of activity_rule) {
								if (totalPrice < i.price) {
									this.reduce = parseHtml(
										`再满<span style='color: #FF3E1E;'>${i.price - totalPrice}元</span>减<span style='color: #FF3E1E;'>${i.reduce}元</span>`
									);
									return;
								}
							}
						}
					}
				});

			},
			// 显示子账号
			selectAccount() {
				this.$refs.account.show();
			},
			onConfirmAccount(e) {

				if (!e.value) {
					let {
						userInfo
					} = this.cartInfo;
					this.address = userInfo.address;
					this.contact = userInfo.contact;
					this.mobile = userInfo.mobile;
				} else {
					this.address = e.obj.address;
					this.contact = e.obj.contact;
					this.mobile = e.obj.mobile;
				}
				this.childzid = e.value;
				this.account = e.result;
			},
			// 显示配送日期
			selectDate() {
				this.$refs.date.show();

			},
			onConfirmDate(e) {
				let {
					year,
					month,
					day
				} = e.obj;

				this.sendDate = `${year}-${month}-${day}`;
			},
			// 显示配送时间
			selectTime() {
				this.$refs.delivery.show();
			},
			onConfirmDelivery(e) {
				log(e);
				this.deliveryTime = e.result;
				this.deliveryId = e.value;
			},
			// 显示现金券
			selectCash() {
				this.$refs.cash.show();
			},
			onConfirmCash(e) {
				this.cash = e.result;
				this.couponsId = e.value;
				this.juanPrice = 0;
				log(e)
				if (e.obj.id != '') {
					let timeStamp = Math.round(new Date().getTime() / 1000);
					let obj = {
						appid: appid,
						timeStamp: timeStamp,
						id: e.obj.id
					};

					let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					let params = Object.assign({
						sign: sign,
					}, obj)
					rs.getRequests("useCouponsPrice", params, (res) => {
						if (res.data.code == 200) {
							this.juanPrice = res.data.data.couponsPrice;
						} else {
							rs.Toast(res.data.msg)
						}
					})
				}
			},
			//确认下单
			confirmOrder() {
				if (!this.contact || !this.mobile || !this.address) {
					rs.Toast('请先填写收货信息');
					setTimeout(() => {
						uni.navigateTo({
							url: '../shopcart/delivery'
						})
					}, 1000)
					return;
				}
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0;
				}, 500)
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					send_time: this.sendDate
				};

				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign,
				}, obj)
				var that = this;
				rs.getRequests("testOrder", params, (res) => {
					let code = res.data.code;
					let data = res.data.data;
					if (data.on_delivery == 1) {
						switch (code) {
							case 101:
								uni.showModal({
									title: '提示',
									content: '直接下单？',
									success: function(res) {
										if (res.confirm) {
											that.order();
										}
									}
								});
								break;
							case 300:

								uni.showModal({
									title: '提示',
									content: '信用金即将用完，请及时结账（可以直接下单）？',
									success: function(res) {
										if (res.confirm) {
											that.order();
										}
									}
								});

								break;
							case 301:
								uni.showModal({
									title: '提示',
									content: '信用金即将用完，请及时结账（可以合并订单）？',
									success: function(res) {
										if (res.confirm) {
											that.mergeOrder();
										} else if (res.cancel) {
											uni.showModal({
												title: '提示',
												content: '直接下单？',
												success: function(res) {
													if (res.confirm) {
														that.order();
													}
												}
											});
										}
									}
								});
								break;

							case 500:
								rs.Toast({
									message: '信用金已用完，不能下单',
									duration: 1200
								});
								break;

							case 200:

								uni.showModal({
									title: '提示',
									content: '可以合并订单？',
									success: function(res) {
										if (res.confirm) {
											that.mergeOrder();
										} else if (res.cancel) {
											uni.showModal({
												title: '提示',
												content: '直接下单？',
												success: function(res) {
													if (res.confirm) {
														that.order();
													}
												}
											});
										}
									}
								});
								break;
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '直接下单？',
							success: function(res) {
								if (res.confirm) {
									that.order();
								}
							}
						});
					}
				})
			},
			// 合拼下单
			mergeOrder() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				var date = this.sendDate;
				// way 1公众号 2App 3小程序 下单方式
				// #ifdef H5
				let way = 1;
				// #endif
				// #ifdef APP-PLUS
				let way = 2;
				// #endif
				// #ifdef MP-WEIXIN | MP-ALIPAY
				let way = 3;
				// #endif
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					send_time: date,
					way: way
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign,
				}, obj)
				rs.postRequests('mergeOrder', params, (res) => {
					if (res.data.code != 200) {
						rs.Toast(res.data.msg)
					} else {
						rs.Toast('合拼订单成功');
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabar/order',
							})
						}, 1000)

					}
				})
			},
			// 直接下单
			order() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				var date = this.sendDate;
				var select_zid = this.childzid;
				var timearea = this.deliveryTime;
				var timeId = this.deliveryId;
				var remark = this.remark.replace(/\s/g, '');
				let timeInfo = '';
				if (timearea == "不限") {
					timeInfo = '';
				} else {
					timeInfo = timearea;
				}
				// #ifdef H5
				let way = 1;
				// #endif
				// #ifdef APP-PLUS
				let way = 2;
				// #endif
				// #ifdef MP-WEIXIN | MP-ALIPAY
				let way = 3;
				// #endif
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					send_time: date,
					way: way
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				// console.log(this.cashId)
				let params = Object.assign({
					delivery_time_id: timeId,
					delivery_time_info: timeInfo,
					sign: sign,
					remark: remark,
					coupons_member_id: this.cartInfo.on_delivery == 0 ? this.couponsId : 0,
					select_zid: select_zid
				}, obj);

				rs.postRequests('addOrder', params, (res) => {
					let data = res.data;

					if (data.code == 104) {
						rs.Toast('超出下单时间，不能下单');
						return false;
					} else if (data.code == 200) {
						if (data.data.on_delivery == 0) {
							let id = data.data.orderId;
							uni.navigateTo({
								url: `/pages/shopcart/pay?id=${id}`,
							})
							return;
						}
						rs.Toast('下单成功');
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabar/order',
							})
						}, 1000)

					} else if (data.code == 500) {
						rs.Toast('服务器内部错误,请稍候再试')
					} else if (data.code == 407) {
						rs.Toast('超出活动限制,请删除部分商品');
					} else {
						rs.Toast(data.msg)
					}
				})
			},
			indexItem() {
				this.itemList = [];
				this.page = 1;
				this.loading = true;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let {
					num,
					page
				} = this;

				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						page: 1,
						sign: sign,
						num: num
					},
					obj
				);

				rs.getRequests('indexItem', params, res => {
					let data = res.data;
					if (data.code == 200) {
						data.data.list.map((item) => {
							item.check = true;
							return item;
						})
						this.itemList = data.data.list;
						this.config = data.data;
						if (data.data.total <= 10) {
							this.loading = false;
						} else {
							this.loading = true;
						}
					}
				});
			},
			openCart(item) {
				this.$refs.popup.open();
				this.cartware = item;
			},
			onClose() {
				this.$refs.popup.close();
			},
			getSendTime() {
				var date = new Date();
				let n = date.getTime() + 24 * 3600000;
				date.setTime(n);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				this.startyear = year;
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}
				this.sendDate = `${year}-${month}-${day}`;
			},
			onShow() {
				if (!uni.getStorageSync("cdj_token")) {
					uni.navigateTo({
						url: '/pages/account/login'
					});
					return;
				}
				if (uni.getStorageSync("is_child") != 1) {
					this.childInfo();
				}

				this.getSendTime();
				this.addInfo();
			

			},
			onHide() {
		
			},
			onLoad() {
				app.isReload = true;
			}
		},

		onReachBottom() {
			//页面上拉触底事件的处理函数
			var that = this;
			var timeStamp = Math.round(new Date().getTime() / 1000);
			let {
				num,
				page
			} = that;
			var obj = {
				appid: appid,
				timeStamp: timeStamp
			};

			var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			var data = {
				appid: appid,
				num: num,
				page: page + 1,
				timeStamp: timeStamp,
				sign: sign
			};
			rs.getRequests('indexItem', data, res => {
				let {
					data
				} = res;
				if ((data.code = 200)) {
					if (data.data != '') {
						this.itemList.push(...data.data.list);
						this.page += 1;
						this.loading = true;
					} else {
						this.loading = false;
					}
				}
			});
		},
		onPageScroll(e) {
			if (e.scrollTop == 0) {
				this.showTop = false;
			} else {
				this.showTop = true;
			}
		}
	};
</script>

<style scoped lang="scss">
	page {
		background: #f8f8f8;
	}

	.car-nav {
		height: 88rpx;
		line-height: 88rpx;
		position: fixed;
		top: 0;
		width: 100%;
	}

	.good-num {
		border-radius: 10rpx;
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding-bottom: 30rpx;

		.check-button {
			margin: 0 20rpx 0 0;
		}

		.sign-good {

			padding: 30rpx 0;

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
</style>
