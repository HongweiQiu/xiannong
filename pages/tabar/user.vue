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
			<view class="" @click="pageUrl(item)" v-for="(item, index) in userList" :key="index" class="flex_left_right">
				<view class="">
					<icon :class="'iconfont ' + item.icon" :style="{ color: item.color }"></icon>
					<text class="name">{{ item.name }}</text>
				</view>
				<view>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
			<view class="" class="flex_left_right" @click="exit">
				<view class="">
					<icon class="iconfont  icon-tuichu" style="color:#ADDB8C"></icon>
					<text class="name">退出登录</text>
				</view>
				<view>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="确定要退出账号吗？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
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
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniIcons from '../../components/uni-icons/uni-icons.vue';
	export default {
		components: {
			uniIcons,
			uniPopupDialog
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
						name: '微信改绑',
						color: '#26DD5B'
					}
				],
				is_bind: '',
				is_child: '',
				token: '',
				imgRemote: imgRemote,
				memberInfoData: '',
				member_default: '',
				code: ''
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
				uni.navigateTo({
					url: "/pages/user/myinfo"
				})
			},
			pageUrl(item) {
				uni.navigateTo({
					url: `/pages/user/${item.url}`
				});
			},
			threePage(data) {
				if (!this.token) {
					switch (data) {
						case 'recomend':
							uni.navigateTo({
								url: '/pages/index/recomendlist'
							});
							break;
						case 'address':
							uni.navigateTo({
								url: '/pages/shopcart/delivery'
							});
							break;
						case 'password':
							uni.navigateTo({
								url: '/pages/user/modifypwd'
							});
							break;
					}
				} else {}
			},
			exit() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			confirm() {
				uni.showTabBar();
				uni.reLaunch({
					url: '/pages/account/login'
				});
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
			that.is_bind = uni.getStorageSync('is_bind');
			that.is_child = uni.getStorageSync("is_child");
			that.token = uni.getStorageSync("token");
		
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
</style>
