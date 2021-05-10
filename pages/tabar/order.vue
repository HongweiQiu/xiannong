<template>
	<view class="order">
		<view class="order_top">
		<view class="account_info">
				<view class="">
					<my-s-tabs effect slot-title @change="changeFirst" v-model="activeTab" class="custom-tabs"
						lineHeight='6'>
						<my-s-tab v-for="(item, index) of tabList" :key="index">{{ item.name }}</my-s-tab>
					</my-s-tabs>
				</view>
			</view>
		</view>
		<view style="height:80rpx;"></view>
		<view class="order_info">
			<view class="content" v-if="search_default">
				<view v-for="(item, index) in orderList" :key="index">
					<view class="top">
						<view>订单编号：{{item.order_sn}}</view>
						<view style="color:#1EA55A;" class="right" v-if="item.order_status==0">待审核</view>
						<view style="color:#1EA55A;" class="right" v-if="item.order_status==1">备货中</view>
						<view style="color:#1EA55A;" class="right" v-if="item.order_status==2">配送中</view>
						<view style="color:#1EA55A;" class="right" v-if="item.order_status==3">已收货</view>
						<view style="color:#FF3E1E;" class="right" v-if="item.order_status==4">已取消</view>
					</view>
					<view class="flex detail" @click="orderDetailPage('orderDetail',item)">
						<image class="order_img" :src="item.item_img==''?imgRemote+orderInfo.item_default:item.item_img"
							mode="aspectFit"></image>

						<view class="order_oneline">
							<view class="">
								<text class="bold">新鲜大白菜干净新鲜大白菜干净新鲜大白菜...</text>
								<view class="fs-13 gray_font" style="margin-top:10rpx;">x20</view>
							</view>

							<view class="time" style="text-align: right;">
								<text class="fs-11">共计20件商品 合计：</text>
								<text class="red-font bold">￥19.99</text>
							</view>
						</view>
					</view>
					<view class="order_option">
						<text class=" cancel_order" @click="oneMoreTime(item.id)">查看详情</text>
						<text class="cancel_order" @click="ckwl">查看物流</text>
						<text class="another_order" @click="cancelOrder(item.id,index)">确认收货</text>
						<text class="another_order">付款</text>
						<!-- <text class="confirm_good" @click="play(item.id)">马上支付</text> -->

					</view>
				</view>
				<my-loading :loading="load"></my-loading>
			</view>

			<view class="bitmap" v-else>
				<image src="../../static/img/no_content.png" mode="aspectFit"></image>
				<view class="gray_font" >
					没有订单信息哦~
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		data() {
			return {
				imgRemote: imgRemote,
				load: true,
				navBar: navBar,
				tabList: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				}],
				activeTab: 1,
				lineShow: false,
				isActive: '全部',
				orderTitle: '全部订单',
				type: 1,
				search_default: true,
				is_look: '',
				count: 0,
				orderList: [],
				orderInfo: '',
				page: 1,
				map: false,
			};
		},
		methods: {

			/**
			 * 确认收货
			 */
			receiveOrder(data, index) {
				var that = this;
				let dataId = data;
				let dataIndex = index;
				uni.showModal({
					title: '提示',
					content: '是否确认收货？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							var id = dataId;
							var orderindex = dataIndex;
							var timeStamp = Math.round(new Date().getTime() / 1000);
							var obj = {
								appid: appid,
								id: id,
								timeStamp: timeStamp,
							}
							var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							var data = {
								appid: appid,
								timeStamp: timeStamp,
								id: id,
								sign: sign,
							}
							rs.getRequests("receiveOrder", data, (res) => {
								if (res.data.code == 200) {
									uni.showToast({
										title: "确认收货成功",
										icon: 'none'
									})
									that.orderList.splice(index, 1)
									if (that.orderList.length <= 0) {
										that.orderLista()
									}
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 页面跳转支付
			play(data) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				var oid = data;
				uni.navigateTo({
					url: '/pages/order/pay?oid=' + oid,
				})
			},
			orderDetailPage(url, item) {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				if (url == 'orderDetail') {
					uni.navigateTo({
						url: '/pages/order/orderdetail?orderItem=' + item.id
					})
				} else if (url == 'user') {
					rs.Toast("还未绑定微信,请去我的页面绑定微信")
					uni.navigateTo({
						url: '/pages/tabar/user'
					});
				}

			},
			/**
			 * 取消订单
			 */
			cancelOrder(data, index) {
				var that = this
				let dataId = data;
				let dataIndex = index;
				uni.showModal({
					title: '提示',
					content: '是否取消订单？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							var id = dataId;
							var orderindex = dataIndex;
							var timeStamp = Math.round(new Date().getTime() / 1000);
							var obj = {
								appid: appid,
								id: id,
								timeStamp: timeStamp,
							}
							var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							var data = {
								appid: appid,
								timeStamp: timeStamp,
								id: id,
								sign: sign,
							}
							rs.getRequests("cancelOrder", data, (res) => {
								console.log(res)
								if (res.data.code == 200) {
									uni.showToast({
										title: "取消订单成功",
										icon: 'none'
									})
									that.orderList.splice(index, 1)
									if (that.orderList.length <= 0) {
										that.orderLista()
									}
								} else if (res.data.code == 101) {
									uni.showToast({
										title: "订单已审核，不能取消",
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			/**
			 * 查看物流
			 */
			ckwl(data) {
				uni.showModal({
					title: '提示',
					content: '该商品由商家亲自配送 请你耐心等待！',
					confirmColor: '#57B127',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				return;
				var that = this;
				var id = data;

				if (id <= 0) {
					rs.Toast("无物流信息")
					return;
				}
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					id: id,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					id: id,
					sign: sign,
				}
				rs.postRequests("carPosition", data, (res) => {

					if (res.data.code == 200) {
						if (res.data.data != '') {
							var latitude = res.data.data.latitude;
							var longitude = res.data.data.longitude;
							if (res.data.data.latitude == '' || res.data.data.longitude == '') {
								rs.Toast("无物流信息")
							} else {
								// #ifdef H5
								uni.navigateTo({
									url: '/pages/order/address?data=' + JSON.stringify(res.data.data)
								});

								// #endif


								// #ifdef MP-WEIXIN | APP-PLUS | MP-ALIPAY
								uni.getLocation({
									type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
									success: function(res) {
										that.map = true;
										let mapObj = that.bd_decrypt(longitude, latitude);
										uni.openLocation({
											latitude: mapObj.lat, // 纬度，范围为-90~90，负数表示南纬
											longitude: mapObj.lng, // 经度，范围为-180~180，负数表示西经
											name: ' ',
											address: ' ',
										})
									}
								})
								// #endif
							}
						} else {
							rs.Toast("无物流信息")
						}
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			//百度坐标转高德（传入经度、纬度）
			bd_decrypt(bd_lng, bd_lat) {
				var X_PI = Math.PI * 3000.0 / 180.0;
				var x = bd_lng - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
				var gg_lng = z * Math.cos(theta);
				var gg_lat = z * Math.sin(theta);
				return {
					lng: gg_lng,
					lat: gg_lat
				}
			},
			/**
			 * 再来一单
			 */
			oneMoreTime(data) {
				let dataId = data;
				uni.showModal({
					title: '提示',
					content: '是否再来一单？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							var that = this
							var id = dataId;
							var timeStamp = Math.round(new Date().getTime() / 1000);
							var obj = {
								appid: appid,
								id: id,
								timeStamp: timeStamp,
							}
							var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							var data = {
								appid: appid,
								timeStamp: timeStamp,
								id: id,
								sign: sign,
							}
							rs.getRequests("oneMoreTime", data, (res) => {
								console.log(res)
								if (res.data.code == 200) {
									rs.Toast("再来一单成功");
									setTimeout(function() {
										uni.switchTab({
											url: '/pages/tabar/shopcart'
										})
									}, 1000);

								} else if (res.data.code == 102) {
									rs.Toast("有下架商品")
									setTimeout(function() {
										uni.switchTab({
											url: '/pages/tabar/shopcart'
										})
									}, 1000);
								} else {
									rs.Toast(res.data.msg)
								}
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			/**
			 * 获取子账号信息
			 */
			childInfo() {
				var that = this;
				that.childList = [{
					"zid": "",
					"nickname": "当前账号",
				}]
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.getRequests("childInfo", data, (res) => {
					if (res.data.code == 200) {
						var childInfo = res.data.data;
						var arr = ["当前账号"];
						var num = [""];
						for (var i = 0; i < childInfo.length; i++) {
							that.childList.push(childInfo[i])
						}
					}
				})
			},
			//初始订单请求
			orderListb() {
				let that = this;
				that.orderList = [];
				that.search_default = true;

				var page = that.page;
				var type = that.type;
				if (that.isActive != "全部") {
					var status = that.isActive + 1;
				} else {
					var status = '';
				}
				var num = 10;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					page: page,
					timeStamp: timeStamp,
					type: type
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					page: page,
					timeStamp: timeStamp,
					num: num,
					sign: sign,
					type: type,
					status: status,
				}
				rs.getRequests("orderList", data, (res) => {
					if (res.data.code == 200) {
						if (res.data.data.list.length > 0) {
							that.load = res.data.data.list.length <= 9 ? false : true;
							that.search_default = false;
							that.is_look = res.data.data.is_look;
							that.orderInfo = res.data.data;
							that.orderList = res.data.data.list;
						} else {
							that.search_default = false;
							that.load = '空';
						}
					}
				})
			},
			orderLista() {
				var that = this;
				that.orderList = [];
				that.search_default = true;
				that.load = true;
				var select_zid = that.childzid;
				if (that.isActive != "全部") {
					var status = that.isActive + 1;
				} else {
					var status = '';
				}

				var page = 1;
				var type = that.type;
				var num = 10
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					page: page,
					timeStamp: timeStamp,
					type: type
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					page: page,
					timeStamp: timeStamp,
					num: num,
					sign: sign,
					type: type,
					select_zid: select_zid,
					status: status,
				}
				rs.getRequests("orderList", data, (res) => {
					if (res.data.code == 200) {
						if (res.data.data.list.length > 0) {
							if (res.data.data.list.length <= 9) {
								that.load = false;
							} else {
								that.load = true;
							}
							that.search_default = true;
							that.is_look = res.data.data.is_look;
							that.orderInfo = res.data.data;
							that.orderList = res.data.data.list;
						} else {
							that.search_default = false;
							that.load = true;
						}
					}
				})
			},
			onChild(e) {
				this.childtxt = e.obj.nickname;
				this.childzid = e.obj.zid;
				this.page = 1;
				this.orderLista();
			},
			selectAccount() {
				this.$refs.account.show();
			},
			titleTab(data) {
				// #ifdef MP-WEIXIN
				// uni.showTabBar();
				// #endif
				this.orderTitle = data;
				this.showOrderType = false;
				if (data == "未支付") {
					this.type = 2;
				} else if (data == "全部订单") {
					this.type = 1;
				}
				this.page = 1;
				this.lineShow = false;
				this.activeTab = 6;
				this.isActive = "全部";
				this.orderLista();
			},
			changeFirst(index) {
				this.load = true;
				this.isActive = index;
				this.lineShow = true;
				this.page = 1;
				this.orderLista();
			},
			rightClick() {
				// #ifdef MP-WEIXIN
				uni.hideTabBar();
				// #endif
				this.showOrderType = true;
			},
			// //回到顶部
			goTop() { // 一键回到顶部
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {

			var that = this;
			that.is_child = uni.getStorageSync("is_child");
			that.is_miniBind = uni.getStorageSync("is_miniBind");
			that.childList = [{
				"zid": "",
				"nickname": "当前账号",
			}]
			if (!uni.getStorageSync("cdj_token")) {
				uni.navigateTo({
					url: '/pages/account/login'
				});
			} else {
				let aShow = app.aData.show;
				// console.log(aShow)
				if (aShow == false) {
					that.orderList = [];
					that.childtxt = '当前账号';
					that.childzid = '';
					that.page = 1;
					that.type = 1;
					that.activeTab = 6;
					this.load = true;
					this.lineShow = false;
					that.orderTitle = '全部订单';
					that.isActive = '全部';
					that.orderListb() //订单列表
					that.goTop()
				}
				if (uni.getStorageSync("is_child") == 0) {
					that.childInfo();
					//用户信息
				}
			}


		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {
			if (this.map == true) {
				app.aData.show = true;
			} else {
				app.aData.show = false;
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			//订单列表流加载
			var that = this;
			if (that.isActive != "全部") {
				var status = that.isActive + 1;
			} else {
				var status = '';
			}
			var page = that.page;
			var type = that.type;
			var num = 10
			var timeStamp = Math.round(new Date().getTime() / 1000);
			var obj = {
				appid: appid,
				page: page + 1,
				timeStamp: timeStamp,
				type: type
			}
			var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			var data = {
				appid: appid,
				page: page + 1,
				timeStamp: timeStamp,
				num: num,
				sign: sign,
				type: type,
				status: status
			}
			if (uni.getStorageSync("is_child") == 0) {
				data.select_zid = that.childzid;
			}
			rs.getRequests("orderList", data, (res) => {
				if (res.data.code == 200) {
					if (res.data.data.list != '') {
						for (var i = 0; i < res.data.data.list.length; i++) {
							that.orderList.push(res.data.data.list[i])
						}
						that.is_look = res.data.data.is_look;
						that.page = page + 1;
					} else {
						that.load = false;
					}
				}
			})
		},
		onLoad() {
			app.aData.show = false;

			uni.hideTabBar();
		}
	};
</script>

<style lang="scss" scoped>
	.order .select_account {
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 65rpx;
		padding-right: 18rpx;
	}

	.order .select_account text {
		color: grey;
		display: inline-block;
		margin-left: 10rpx;
	}

	.order .select_account .uni-icons {
		color: grey !important;
	}

	.order .account_info {
		background: white;
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	.order .s-tabs-nav-wrap .s-tab-nav-view {
		height: 100%;
		display: flex;
		justify-content: space-around;
	}

	.order .order_option {
		border-top: 1px solid #efefef;
		height: 96rpx;
		line-height: 96rpx;
		text-align: right;
		padding-right: 20rpx;
	}

	.order .order_option text {
		border-radius: 23rpx;
		width: 140rpx;
		display: inline-block;
		height: 46rpx;
		line-height: 46rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		text-align: center;
	}

	.order .another_order {
		background: white;
		color: #FF3333;
		border: 1px solid #F33;
	}

	.order .look_logist {
		background: rgb(2, 177, 228);
		color: white;
	}

	.order .cancel_order {
		background: white;
		color: #333;
		border: 1px solid #333;
	}

	.confirm_good {
		background: red;
		color: white;
		// border: 1px solid red;
	}

	.order .order_img {
		width: 208rpx;
		height: 208rpx;
		margin-right: 30rpx;
	}

	.order .order_info .content>view {
		background: white;
		margin: 30rpx 30rpx 0;

		border-radius: 10rpx;
	}

	.order .order_info .content .top {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
	}

	.order .order_info .content .detail {
		padding: 20rpx;
		border-top: 1px solid #efefef;
	}

	.order .order_statu .mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}

	.order .order_statu .operate {
		margin-top: 10rpx;
		padding: 2px 0 0;
		z-index: 9999;
		border-radius: 2px;
		position: fixed;
		right: 20rpx;
		color: #1ea55a;
		background: #fff;
		width: 25%;
	}

	.order .order_statu .operate>view {
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
	}

	.order .order_statu .operate .all_order {
		border-bottom: 1px solid #efefef;
	}

	.order .custom-tabs {
		/deep/.s-tab-nav-view {
			display: flex;
			justify-content: space-between;
		}
	}

	.order .bitmap {
		text-align: center;
	}

	.order .bitmap image {
		width: 445rpx;
		height: 335rpx;
		margin: 252rpx 0 60rpx;
	}

	.order .order_oneline {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/deep/ .s-tabs .s-tab-line {
		bottom: 1rpx;
		border-radius: 10rpx;
	}

	/deep/ .s-tab-nav {
		color: #000;
	}
</style>
