<template>
	<view class="invest_record">
		<uni-nav-bar left-icon="arrowleft" title="马上支付" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<view class="tip">如出现下单端账号与支付账号不一样，请到个人中心更改绑定微信</view>
		<view class="info">
			<view>
				<text>订单编号</text>
				<text>{{list.order_sn}}</text>
			</view>
			<view>
				<text>配送时间</text>
				<text>{{list.send_time}}</text>
			</view>
			<view>
				<text>订单金额</text>
				<text>{{list.total_fee}}</text>
			</view>
			<view>
				<text>现金券抵扣</text>
				<text>{{list.coupons_price}}</text>
			</view>
			<view>
				<text>我的余额</text>
				<text class="red_font">￥{{list.myBalance}}</text>
			</view>
			<view>
				<text>余额支付</text>
				<text class="red_font">￥{{list.payBalance}}</text>
			</view>
			<view>
				<text>微信支付</text>
				<text class="red_font">￥{{list.payWx}}</text>
			</view>
		</view>
		<view class="notice">
			<view>注：</view>
			<view>平台不会以订单异常，系统升级等理由要求您点击任何链接进行退款操作，请提高警惕谨防受骗！</view>
		</view>
		<view class="select">
			<view class="determine" @click="payOrder">确认支付</view>
			<view class="cancel" @click="cancalPay">取消支付</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	let {
		log
	} = console;
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
				id: '',
				list: []
			};
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			cancelPay() {
				uni.switchTab({
					url: '/pages/tabar/shopcart'
				})
			},
			payOrder() {
				let {
					id
				} = this;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					oid: id,
					type: 'app'
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign,
				}, obj)
				rs.postRequests("payTemOrder", params, (res) => {
					let {
						data
					} = res;
						log(res)
					if (data.code == 200) {
						if (data.data.payType == 1) {
							uni.showToast({
								title: '支付成功',
								duration: 2000,
								icon: "none"
							});
							// app.aData.pageClassify = false;
							wx.switchTab({
								url: '/pages/tabar/order',
							})
						}
						if (res.data.data.payType == 2) {
							let {
								wxParams
							} = res.data.data;
					
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: wxParams, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title: '支付成功',
										duration: 2000,
										icon: "none"
									});
									// app.aData.pageClassify = false;
									wx.switchTab({
										url: '/pages/tabbar/order',
									})
								},
								fail: function(err) {
									console.log(err)
									uni.showToast({
										title: "充值失败",
										duration: 2000,
										icon: "none"
									});
								}
							});

						}
					}
				})
			},
			// 临时订单信息
			temOrder() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					id: this.id
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign,
				}, obj)
				rs.getRequests("temOrderMsg", params, (res) => {
					let {
						data
					} = res;
					if (data.code == 200) {
						this.list = data.data
					} else {
						uni.showToast({
							title: data.msg,
							duration: 2000,
							icon: "none"
						});
					}

				})
			}
		},
		onShow() {
			this.temOrder();
		},
		onLoad(option) {
			this.id = option.id;
		}
	};
</script>

<style>
	.invest_record .tip {
		color: red;
		background: #f9d1cb;
		font-size: 24rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.invest_record .info>view {
		padding: 0 20rpx;
		height: 80rpx;
		background: white;
		font-size: 26rpx;
		line-height: 80rpx;
		padding: 0 20rpx;

		display: flex;
		justify-content: space-between;
	}

	.invest_record .info>view:nth-last-child(n+2) {
		border-bottom: 1px solid #efefef;
	}

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
