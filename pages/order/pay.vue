<template>
	<view class="invest_record">
		<uni-nav-bar left-icon="arrowleft" title="充值信息" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="tip">如出现下单端账号与支付账号不一样，请到个人中心更改绑定微信</view>
		<view class="info">
			<view>
				<text>订单编号</text>
				<text class="gray_font">{{payOrder.order_sn}}</text>
			</view>
			<view>
				<text>配送时间</text>
				<text class="gray_font">{{payOrder.send_time}}</text>
			</view>
			<view>
				<text>订单金额</text>
				<text class="gray_font">{{payOrder.total_fee}}</text>
			</view>
			<view>
				<text>我的余额</text>
				<text class="gray_font">{{payOrder.myBalance}}</text>
			</view>
			<view>
				<text>余额支付</text>
				<text class="gray_font">{{payOrder.payBalance}}</text>
			</view>
			<view>
				<text>微信支付</text>
				<text class="gray_font">{{payOrder.payWx}}</text>
			</view>
		</view>
		<view class="notice">
			<view>注：</view>
			<view>平台不会以订单异常，系统升级等理由要求您点击任何链接进行退款操作，请提高警惕谨防受骗！</view>
		</view>
		<view class="select">
			<view class="determine" v-if="payOrder.payType == 2" @click='querenchongzhi'>确认支付</view>
			<view class="determine" v-if="payOrder.payType == 1" @click='goPay'>确认支付</view>
			<view class="cancel" @click="leftClick">返回订单</view>
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
				navBar: navBar,
				oid: '',
				payOrder: ''
			};
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			/**
			 * 支付信息
			 */
			payOrdera() {
				var that = this
				var oid = that.oid;
				var type = "app";
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					oid: oid,
					type: type,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					oid: oid,
					type: 'app',
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("payOrder", data, (res) => {
					if (res.data.code == 200) {
						that.payOrder = res.data.data;
					} else if (res.data.code == 406) {
						uni.showToast({
							title: "请先绑定微信",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			querenchongzhi() {
				var that = this
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: that.payOrder.wxParams, //微信、支付宝订单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title: '支付成功',
							duration: 2000,
							icon: "none"
						});
						wx.switchTab({
							url: '/pages/index/index',
						})
					},
					fail: function(err) {
						uni.showToast({
							title: err.errMsg,
							duration: 2000,
							icon: "none"
						});
					}
				});
			},
			goPay() {
				var that = this
				var oid = that.oid;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					id: oid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					id: oid,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("balancePay", data, (res) => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '支付成功',
							duration: 2000,
							icon: "none"
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabar/index'
							});
						}, 1000)
					}
					if (res.data.code == 400) {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: "none"
						});
					}
					if (res.data.code == 500) {
						uni.showToast({
							title: '网络错误',
							duration: 2000,
							icon: "none"
						});
					}
				})
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.oid = options.oid
		},
		onShow() {
			this.payOrdera()
			app.aData.show = false;
		}
	};
</script>

<style>
	.invest_record .tip {
		color: red;
		background: #f9d1cb;
		font-size: 24rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
	}

	.invest_record .info>view {
		height: 60rpx;
		background: white;
		font-size: 24rpx;
		line-height: 60rpx;
		padding: 0 20rpx;

		display: flex;
		justify-content: space-between;
	}

	/* 	.invest_record .info>view:first-child {
		border-bottom: 1px solid #efefef;
	} */

	.invest_record .notice {
		font-size: 20rpx;
		color: #808080;
		display: flex;
		padding: 20rpx 20rpx 80rpx;
	}

	.invest_record .select>view {
		width: 329rpx;
		height: 64rpx;
		color: white;
		margin: 0 auto;
		border-radius: 12rpx;
		text-align: center;
		line-height: 64rpx;
		margin-top: 20rpx;
	}

	.invest_record .select .determine {
		background: #009a44;
	}

	.invest_record .select .cancel {
		background: #808080;
	}
</style>
