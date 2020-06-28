<template>
	<view class="collect">
		<uni-nav-bar left-icon="arrowleft" right-text="清空" title="收藏列表" :status-bar="navBar" fixed="true" @clickLeft="leftClick"
		 @clickRight="rightClick"></uni-nav-bar>
		<view class="all_collect" v-if="list.length!=0">
			<my-profile class="single_collect" v-for="(item, index) in list" :wares="item" :config="config" :key="index" url="collect"
			 @showCart="openCart(item)" @showKey="showKey" @cancelCollect="cancelCollect(item,index)"></my-profile>
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
			rightClick(){
			
				if(this.list.length){
					uni.showModal({
									content: '确定将收藏商品全部清空吗？',
									success: function(res) {
										if (res.confirm) {
											let timeStamp = Math.round(new Date().getTime() / 1000);
											let obj = {
												appid: appid,
												timeStamp: timeStamp
											};
											let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
											let params = Object.assign(
												{
													sign: sign
												},
												obj
											);
											rs.getRequests('deleteCollect', params, res => {
												let data = res.data;
												if (data.code == 200) {
													rs.Toast('成功清空收藏列表');
													setTimeout(() => {
														uni.navigateBack({
															delta: 1
														});
													}, 1000);
												} else {
													rs.Toast(res.data.msg);
												}
											});
										}
									}
								});
				}else{
					rs.Toast('没有可以清空的商品')
				}
			},
			cancelCollect(item,index){
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					item_id: item.id,
					appid: appid,
					timeStamp: timeStamp,
					status: 1
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.getRequests('changeCollect', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.list.splice(index,1)
						rs.Toast('取消收藏');
					} else {
						rs.Toast(data.msg);
					}
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
				rs.getRequests('getIndexSelect', params, res => {
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
		onHide(){
			uni.setStorageSync('collect',this.list);
		},
		onShow() {
                  if(this.page==1){
						this.getIndexSelect();  
				  }else{
					  this.list=uni.getStorageSync('collect');
				  }
		
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
			rs.getRequests('getIndexSelect', params, res => {
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
