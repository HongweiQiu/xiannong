<template>
	<view class="collect">
		<uni-nav-bar left-icon="arrowleft"  title="常用推荐" :status-bar="navBar" fixed="true" @clickLeft="leftClick"
		></uni-nav-bar>
		<view class="all_collect" v-if="list.length!=0">
			<my-profile class="single_collect" v-for="(item, index) in list" :ware="item" :config="config" :key="index"
			 @showCart="openCart(item)" @showKey="showKey"></my-profile>
			<my-loading></my-loading>
		</view>
		<view v-else class="bitmap">
			<image src="../../static/img/no_content.png" mode="aspectFit"></image>
		</view>
		<uni-popup ref="cart" type="bottom">
			<my-addcart :config="config" :cartware="cartware" @onClose="onClose"></my-addcart>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<my-keyboard @cancelKey="$refs.popup.close()"></my-keyboard>
		</uni-popup>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	let {
		log
	} = console;
	const {
		navBar,
		imgRemote,
		appid,
		appsecret
	} = app;
	export default {
		data() {
			return {
				navBar: navBar,
				imgRemote: imgRemote,
				config: [],
				list: [],
				page: 1,
				num: 10,
				cartware: []
			};
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			getIndexSelect() {
				let {
					page,
					num,
					list
				} = this;

				if (page != 1) {
					this.list = uni.getStorageSync("collect")
					return;
				}

				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign,
						page: page,
						num: num
					},
					obj
				);
				rs.getRequests('itemCommon', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.config = data.data;

						if (data.data.list.length == 0) {
							this.list = [];
							this.bitmap = true;
						} else {
							this.list = data.data.list;
							if (data.data.list.length < 10) {
								this.loading = false;
							} else {
								this.loading = true;
							}
						}
					}
				});
			},
			openCart(item) {
				this.cartware = item;
				this.$refs.cart.open();
			},
			onClose() {
				this.$refs.cart.close();
			},
			// 显示键盘
			showKey() {
				this.$refs.popup.open();
			},
		},
		onShow() {

			this.getIndexSelect();
		},
		onReachBottom() {
			let {
				page,
				num,
				list
			} = this;
			let timeStamp = Math.round(new Date().getTime() / 1000);
			let obj = {
				appid: appid,
				timeStamp: timeStamp
			};
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let params = Object.assign({
					sign: sign,
					page: page + 1,
					num: num
				},
				obj
			);
			rs.getRequests('itemCommon', params, res => {
				if (res.data.code == 200) {
					if (res.data.data.list.length != 0) {
						this.list.push(...res.data.data.list);
						this.page += 1;
						this.loading = true;
					} else {
						this.loading = false;
					}
				}
			});
		}
	};
</script>
<style lang="scss">
	.collect .all_collect .my_profile {
		background: white;
		margin-top: 10rpx;
	}

	.collect .bitmap {
		text-align: center;
	}

	.collect .bitmap image {
		width: 50%;
		margin-top: 20%;
	}
</style>
