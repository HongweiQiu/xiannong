<template>
	<view class="user">
		<!-- #ifdef APP-PLUS -->
		<uni-status-bar></uni-status-bar>
		<!-- #endif -->

		<view class="flex_left_right author" v-if="is_child != 1" @click="myinfoPage">
			<view class="align_center" v-if="token">
				<image v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
				<image v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
				<text v-if="memberInfoData.nickname != ''">{{memberInfoData.nickname}}</text>
				<text v-if="memberInfoData.nickname == ''">请设置昵称</text>
			</view>
			<view class="align_center" v-if="!token">
				<image v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
				<image v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
				<text>请先登录</text>
			</view>
			<uni-icons type="arrowright" size="20" color="white"></uni-icons>
		</view>
		<view class="flex_left_right author" v-if="is_child == 1">
			<view class="align_center" v-if="token">
				<image v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
				<image v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
				<text v-if="memberInfoData.nickname != ''">{{memberInfoData.nickname}}</text>
				<text v-if="memberInfoData.nickname == ''">请设置昵称</text>
			</view>
			<view class="align_center" v-if="!token">
				<image v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
				<image v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
				<text>请先登录</text>
			</view>
			<uni-icons type="arrowright" size="20" color="white"></uni-icons>
		</view>

		<view class="back_green"></view>
		<view class="middle">
			<view class="" @click="threePage('recomend')">
				<image src="../../static/img/recommand.png" mode=""></image>
				<text>推荐</text>
			</view>
			<view class="modify_address" @click="threePage('address')">
				<icon></icon>
				<view class="address">
					<image src="../../static/img/address.png" mode=""></image>
					<text>地址</text>
				</view>
				<icon></icon>
			</view>
			<view class="" @click="threePage('password')">
				<image src="../../static/img/password.png" mode=""></image>
				<text>密码</text>
			</view>
		</view>
		<view class="select_operate">
			<view v-if="is_child != 1" @click="pageUrl(item)" v-for="(item, index) in userList" :key="index" class="flex_left_right">
				<view class="">
					<icon :class="'iconfont ' + item.icon" :style="{ color: item.color }"></icon>
					<text class="name">{{ item.name }}</text>
				</view>
				<view>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN --><button open-type="share">
			<view v-if="is_child != 1" @click="share"  class="flex_left_right">
				<view class="">
					<icon class="'iconfont icon-fenxiang" style="color: #26DD5B;"></icon>
					<text class="name">分享小程序</text>
				</view>
				<view>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view></button>
			<!-- #endif -->
			
			<view class="flex_left_right" @click="exit">
				<view class="">
					<icon class="iconfont  icon-tuichu" style="color:#ADDB8C"></icon>
					<text class="name">退出登录</text>
				</view>
				<view>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
		</view>
		<my-tabar tabarIndex=4></my-tabar>
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
	// #ifdef H5
	var wx = require('jweixin-module');
	// #endif
	import uniIcons from '../../components/uni-icons/uni-icons.vue';
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				userList: [{
						icon: 'icon-08_zizhanghaoguanli',
						name: '账号管理',
						color: '#3DABFF',
						url: 'accountmange'
					},
					{
						icon: 'icon-fapiao',
						name: '开具发票',
						color: '#FF9C00',
						url: 'receipt'
					},
					{
						icon: 'icon-tianchongxing--',
						name: '账单记录',
						color: '#FFF000',
						url: 'bill'
					},
					{
						color: '#ffab9a',
						icon: 'icon-buy-fill',
						name: '购买记录',
						url: 'purchase_record'
					},
					{
						icon: 'icon-qianbao',
						name: '充值',
						color: '#2DC4B4',
						url: 'invest'
					},
					{
						icon: 'icon-juan',
						name: '现金劵',
						color: '#F8632F',
						url: 'cash'
					},
					{
						icon: 'icon-weixin',
						name: '绑定微信',
						color: '#26DD5B',
						url: 'bindWeChat'
					},
					// #ifdef H5
					{
						icon: 'icon-fenxiang',
						name: '分享公众号',
						color: '#26DD5B',
						url: 'share'
					}
					// #endif
				],
				is_bind: '',
				is_child: '',
				token: '',
				imgRemote: imgRemote,
				memberInfoData: '',
				member_default: '',
				code: '',
				// #ifdef H5
				userinfo: '',
				// #endif
			};
		},
		methods: {
			memberInfo() {
				var that = this
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
				rs.getRequests("memberInfo", data, (res) => {
					// console.log(res)
					if (res.data.code == 200) {
						this.memberInfoData = res.data.data.info;
						this.member_default = res.data.data.member_default;
					}
				})
			},
			myinfoPage() {
				if (!this.token) {
					uni.navigateTo({
						url: '/pages/account/login'
					})
				} else {
					uni.navigateTo({
						url: "/pages/user/myinfo"
					})
				}

			},
			pageUrl(item) {
				if (item.url == 'bindWeChat') {

					// #ifdef H5
					this.adminisus_weixin()
					// #endif
					
					// #ifdef APP-PLUS
					this.bindWeChat()
					// #endif

					// #ifdef MP-WEIXIN
					this.wxbindWeChat()
					// #endif

				} else if (item.url == 'share') {
				wx.onMenuShareAppMessage({
				  title: '123', // 分享标题
				  desc: '123', // 分享描述
				  link: app.rootUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				  imgUrl: '', // 分享图标
				  type: '', // 分享类型,music、video或link，不填默认为link
				  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				  success: function () {
				    // 用户点击了分享后执行的回调函数
					alert(45)
				  }
				});
				} else {
					uni.navigateTo({
						url: `/pages/user/${item.url}`
					});
				}

			},
			//小程序绑定
			wxbindWeChat(e) {
				console.log("小程序绑定")
				var that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success(infoRes) {
						let {
							encryptedData,
							iv
						} = infoRes;
						console.log(infoRes);
						uni.login({
							provider: 'weixin',
							success(res) {
								console.log(res.code)
								that.wxbindWeChata(res.code)
							}

						})
					}
				})
			},
			wxbindWeChata(code) {
				var that = this;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					code: code,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					code: code,
					type: "mini",
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("bindWeChat", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('绑定微信成功')
						uni.setStorageSync('is_miniBind', 1)
						that.is_bind = uni.getStorageSync("is_miniBind")
					} else {
						rs.Toast(res.data.msg)
					}
				})
			},
			// h5绑定微信
			adminisus_weixin() {
				console.log("H5绑定")
				var that = this;
				uni.showModal({
					content: this.is_bind == 1 ? '是否微信改绑' : '是否绑定微信',
					cancelText: "我再想想",
					cancelColor: "#999",
					confirmText: "确认",
					confirmColor: "#DEC17C",
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync('isWeixin', true)
							let code = location.search;
							let getCode =    code.substring(code.indexOf('=') + 1, code.lastIndexOf('&'));
							if (!getCode) {
								let url = window.location.href;
								let redirect_uri = encodeURIComponent(url);
								let a = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
									"appid=" + that.userinfo.appId + "&redirect_uri=" + redirect_uri +
									"&response_type=code&scope=snsapi_userinfo#wechat_redirect"
								window.location.href = a;
							}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			//APP绑定
			bindWeChat() {
				console.log("APP绑定")
				var that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//res.provider  检测手机上是否安装微信、QQ、新浪微博等
						if (~res.provider.indexOf('weixin')) {
							//手机安装了微信
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									// console.log('-------获取openid(unionid)-----');
									// console.log(JSON.stringify(loginRes));
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											that.code = infoRes.userInfo.openId;
											that.bindWeChata()
										}
									});

								}
							});
						} else {
							uni.showToast({
								title: '手机上还没安装微信,请安装微信后重试',
								duration: 2000,
								icon: "none"
							});
						}

					}
				});
			},
			bindWeChata() {
				var that = this;
				uni.showModal({
					content: this.is_bind == 1 ? '是否微信改绑' : '是否绑定微信',
					cancelText: "我再想想",
					cancelColor: "#999",
					confirmText: "确认",
					confirmColor: "#DEC17C",
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							var app_openid = that.code;
							var timeStamp = Math.round(new Date().getTime() / 1000);
							var obj = {
								appid: appid,
								timeStamp: timeStamp,
							}
							var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							var data = {
								appid: appid,
								app_openid: app_openid,
								type: "app",
								timeStamp: timeStamp,
								sign: sign,
							}
							rs.postRequests("saveMemberInfo", data, (res) => {
								// console.log(res)
								if (res.data.code == 200) {
									rs.Toast('绑定微信成功')
									uni.setStorageSync('is_miniBind', 1)
									that.is_bind = uni.getStorageSync("is_miniBind")
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
			threePage(data) {
				if (this.token) {
					switch (data) {
						case 'recomend':
							uni.navigateTo({
								url: '/pages/index/recommed'
							});
							break;
						case 'address':
							uni.navigateTo({
								url: '/pages/user/userAddress'
							});
							break;
						case 'password':
							uni.navigateTo({
								url: '/pages/user/modifypwd'
							});
							break;
					}
				} else {
					uni.reLaunch({
						url: '/pages/account/login'
					});
				}
			},
			exit() {
				uni.showModal({
					title: '提示',
					content: '是否退出登录？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							var that = this
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
							rs.getRequests("logout", data, (res) => {
								if (res.data.code == 200) {
									uni.showToast({
										title: "退出成功",
										icon: 'none'
									})
									uni.clearStorage({
										success: function(reg) {
											uni.navigateTo({
												url: '/pages/account/login'
											});
										}
									})
								}
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			wxConfig() {

				if (this.token) {

					var that = this
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
					rs.getRequests("wxConfig", data, (res) => {
						if (res.data.code == 200) {
							this.userinfo = res.data.data;
							wx.config({
								debug: false, // 开启调试模式
								appId: res.data.data.appId, // 必填，公众号的唯一标识
								timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
								signature: res.data.data.signature, // 必填，签名，见附录1
								jsApiList: [
									'updateAppMessageShareData','onMenuShareAppMessage'
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
						}
					})
				}

			}


		},
		onLoad() {
			uni.hideTabBar();
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			that.memberInfo();
			that.is_bind = uni.getStorageSync('is_miniBind');
			that.is_child = uni.getStorageSync("is_child");
			that.token = uni.getStorageSync("cdj_token");
			// console.log(that.is_bind)
			//H5
			// #ifdef H5
			that.wxConfig()
			let code = location.search;
			let getCode = code.substring(code.indexOf('=') + 1, code.lastIndexOf('&'));
			let isWeixin = uni.getStorageSync('isWeixin');
			if (isWeixin && getCode) {
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
					code: getCode,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					code: getCode,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("bindWeChat", data, (res) => {
					uni.clearStorageSync('isWeixin')
					getCode = '';
					// console.log(res)
					if (res.data.code == 200) {
						rs.Toast('绑定微信成功')
						uni.setStorageSync('is_miniBind', 1)
						that.is_bind = uni.getStorageSync("is_miniBind")
					} else {
						rs.Toast(res.data.msg)
					}
				})
			
			}
			// #endif
		},
	};
</script>

<style>
	page {
		background: white;
	}

	.user .author image {
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
		border-radius: 50%;
	}

	.user .author {
		background: #094;
		height: 230rpx;
		color: white;
		padding: 0 20rpx;
	}

	.user .back_green {
		background: #094;
		height: 80rpx;
		width: 100%;
	}

	.user .middle {
		display: flex;
		margin: 0 20rpx;
		position: relative;
		margin-top: -80rpx;
		justify-content: space-around;
		line-height: 160rpx;
		border-radius: 6px;
		height: 160rpx;
		box-shadow: 1px 1px 4px #e0e0e0;
		background: #fff;
	}

	.user .middle image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;

	}

	.user .middle>view {
		display: flex;
		align-items: center;
		width: 33%;
		justify-content: center;
	}

	.user .middle>view text {
		margin-left: 10rpx;
	}

	.user .middle .modify_address {
		display: flex;
		justify-content: space-between;
	}

	.user .middle .modify_address .address {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user .middle .modify_address .address image {
		width: 32rpx;
	}

	.user .middle .modify_address icon {
		border: 0.5px solid black;
		height: 25rpx;
	}

	.user .select_operate {
		padding: 0 20rpx;
	}

	.user .select_operate>view {
		height: 80rpx;
	}

	.user .select_operate>view .name {
		margin-left: 10rpx;
	}
	.user button{position:static;padding:0;background: none;font-size: 28rpx;}
</style>
