<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="top" v-if="is_child != 1" @click="userInfoPage">
			<view class="user_info">
				<view class="avator flex" v-if="token">
					<image class="goods_img" v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
					<image class="goods_img" v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
					<view class="nickname" v-if="memberInfoData.nickname != ''">{{memberInfoData.nickname}}</view>
					<view class="nickname" v-if="memberInfoData.nickname == ''">请设置昵称</view>
				</view>
				<view class="avator flex" v-if="!token">
					<image class="goods_img" v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
					<image class="goods_img" v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
					<view class="nickname">请先登录</view>
				</view>
				<view>
					<van-icon name="arrow" color="white" />
				</view>
			</view>
		</view>

		<view class="top" v-if="is_child == 1">
			<view class="user_info">
				<view class="avator flex" v-if="token">
					<image class="goods_img" v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
					<image class="goods_img" v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
					<view class="nickname" v-if="memberInfoData.nickname != ''">{{memberInfoData.nickname}}</view>
					<view class="nickname" v-if="memberInfoData.nickname == ''">请设置昵称</view>
				</view>
				<view class="avator flex" v-if="!token">
					<image class="goods_img" v-if="memberInfoData.logo" :src='memberInfoData.logo'></image>
					<image class="goods_img" v-if="!memberInfoData.logo" :src='imgRemote+member_default'></image>
					<view class="nickname">请先登录</view>
				</view>
			</view>
		</view>

		<view class="back_bottom"></view>
		<view class="flex middle">
			<view @click="pageSelect('recomd')">
				<image src="../../static/img/recommand.png"></image>
				<text>推荐</text>
			</view>
			<view @click="pageSelect('address')">
				<view class="border"></view>
				<view class="address">
					<image src="../../static/img/address.png" style="width:16px;"></image>
					<text>地址</text>
				</view>
				<view class="border"></view>
			</view>
			<view @click="pageSelect('pwd')">
				<image src="../../static/img/password.png"></image>
				<text>密码</text>
			</view>
		</view>
		<view class="select">
			<view v-if="is_child != 1" v-for="(item, index) in list" :key="index" class="flex option" @click="urlPage(item.url)">
				<view>
					<text class="iconfont" v-html="item.icon" :style="{ color: item.color }"></text>
					<text class="operate">{{ item.name }}</text>
				</view>
				<view>
					<van-icon name="arrow" color="gray" />
				</view>
			</view>
			<view @click="bindWeChat" class="flex option" v-if="is_child != 1">
				<view>
					<text class="iconfont" style=" color:#26DD5B; ">&#xe637;</text>
					<text class="operate">改绑微信{{is_bind}}</text>
				</view>
				<view>
					<van-icon name="arrow" color="gray" />
				</view>
			</view>
			<view @click="exit" class="flex option">
				<view>
					<text class="iconfont" style=" color:#ADDB8C; ">&#xe69e;</text>
					<text class="operate">退出登录</text>
				</view>
				<view>
					<van-icon name="arrow" color="gray" />
				</view>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	//引入组件
	let app = getApp().globalData
	const md5 = require('../../components/md5.js');
	const rs = require('../../components/request.js')
	let {
		appid,
		appsecret,
		imgRemote
	} = app;
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {

				list: [{
						color: '#3DABFF',
						icon: '&#xe630;',
						name: '账号管理',
						url: 'accountmange'
					},
					{
						color: '#FF9C00',
						icon: '&#xe65d;',
						name: '开具发票',
						url: 'receipt'
					},
					{
						color: '#FFF000',
						icon: '&#xe720;',
						name: '账单记录',
						url: 'bill'
					},
					{
						color: '#ffab9a',
						icon: '&#xe64c;',
						name: '购买记录',
						url: 'purchase_record'
					},
					{
						color: '#2DC4B4',
						icon: '&#xe604;',
						name: '充值',
						url: 'invest'
					},
					{
						color: '#F8632F',
						icon: "&#xe64b;",
						name: '现金劵',
						url: 'cash'
					},
				],
				is_bind: '',
				is_child: '',
				token: '',
				imgRemote: imgRemote,
				memberInfoData: '',
				member_default: '',
				code: ''
			}
		},
		methods: {
			urlPage(url) {
				if (this.token) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: '/pages/logn/logn'
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
									Toast('退出成功');
									uni.clearStorage({
										success: function(reg) {
											uni.navigateTo({
												url: '/pages/logn/logn'
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
			pageSelect(data) {
				if (this.token) {
					switch (data) {
						case 'recomd':
							uni.navigateTo({
								url: '../index/recomd',
							});
							break;
						case 'address':
							uni.navigateTo({
								url: '../shippingAddress/shippingAddress',
							});
							break;
						case 'pwd':
							uni.navigateTo({
								url: 'modifypwd',
							});
							break;
					}
				} else {
					uni.navigateTo({
						url: '/pages/logn/logn'
					});
				}
			},
			userInfoPage() {
				if (this.token) {
					uni.navigateTo({
						url: 'userinfo',
					});

				} else {
					uni.navigateTo({
						url: '/pages/logn/logn'
					});
				}

			},
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
			bindWeChat() {
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
					content: "改绑微信?",
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
									Toast('绑定微信成功')
									uni.setStorageSync('is_miniBind', 1)
									that.is_miniBind = uni.getStorageSync("is_miniBind")
								} else {
									Toast(res.data.msg)
								}
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			that.memberInfo();
			that.is_bind = uni.getStorageSync('is_bind');
			that.is_child = uni.getStorageSync("is_child");
			that.token = uni.getStorageSync("token");

		},
	};
</script>

<style>
	.flex {
		display: flex;
	}

	.flex_left_right {
		display: flex;
		justify-content: space-between;
	}

	.status_bar {
		background: #094;
		height: var(--status-bar-height);
	}

	.top {
		background: #094;
	}

	.avator .nickname {
		margin-left: 10px;
		color: white;
	}

	.back_bottom {
		position: absolute;
		height: 40px;
		background: #094;
		width: 100%;
		z-index: -1;
	}

	.avator {
		align-items: center;
	}

	.avator image {
		width: 70px;
		height: 70px;
		border-radius: 50%;
	}

	.user_info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 10px;
		padding: 20px 0;
	}

	.middle {
		display: flex;
		margin: 0 10px;
		justify-content: space-around;
		border-radius: 6px;
		height: 80px;
		line-height: 80px;
		box-shadow: 1px 1px 4px #e0e0e0;
		font-size: 16px;
		background: #fff;
	}

	.middle image {
		width: 20px;
		height: 20px;
		object-fit: contain;
		margin-right: 5px;
	}

	.address {
		display: flex;
		align-items: center;
	}

	.middle>view {
		display: flex;
		align-items: center;
		flex-basis: 33%;
		justify-content: center;
	}

	.middle>view:nth-child(2) {
		display: flex;
		justify-content: space-between;
	}

	.middle .border {
		width: 1px;
		height: 15px;
		background: #000;
	}

	.select .option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
		height: 40px;
		line-height: 40px;
	}

	.select .option .operate {
		margin-left: 10px;
	}
</style>
