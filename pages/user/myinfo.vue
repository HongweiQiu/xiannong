<template>
	<view class="myinfo">
		<view class="get_info">
			<!-- <view class="flex_left_right avator">
				<image class="goods_img"  :src='avatarUrl' mode='scaleToFill'></image>
			
				<view class="align_center gray_font" @tap="showUpload('open')">
					<text class="fs-13">修改头像</text>
					<text class="iconfont iconfanhui t-180"></text>
				</view>
			</view> -->
			<view class="flex_left_right" @click="modifyPwd">
				<text>修改登录密码</text>
				<text class="iconfont iconfanhui t-180"></text>
			</view>
		
				<view class="flex_left_right" @click="receipt">
					
					<text>修改发票</text>
					<text class="iconfont iconfanhui t-180"></text>
					
				</view>
			

		</view>
		<view class="center button_style" @click="formSubmit">退出登录</view>
		<uni-popup ref="popup" type="bottom">
			<view class="upload-img">
				<view class="white_b r-10">
					<view class="border method">本地上传</view>
					<view class="method">拍照上传</view>
				</view>
				<view class="white_b method r-10 cancel" @click="showUpload('close')">
					取消
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote,
	} = app;
	export default {

		data() {
			return {
				tempFilePath: '',
				cropFilePath: '',
				avatarUrl: uni.getStorageSync('userInfo').avatar,
				imgUrl: app.imgUrl,
				imgRemote: imgRemote,
				phone: '',
				memberInfoData: '',
				member_default: '',
				nickname: '',
				password: '',
				confirmPwd: '',
				imgPath: '',
				count: 0
			};
		},
		methods: {
			modifyPwd() {
				uni.navigateTo({
					url: './modifypwd'
				})
			},
			receipt(){
				uni.navigateTo({
					url:'./receipt'
				})
			},
			showUpload(way) {
				if (way == 'open') {
					this.$refs.popup.open();
				} else {
					this.$refs.popup.close();
				}

			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: res => {
						this.showtitle = false;
						this.tempFilePath = res.tempFilePaths.shift();
					}
				});
			},
			confirm(e) {
				this.showtitle = true;
				this.tempFilePath = '';
				var media_id = e.detail.tempFilePath;
				var feed = "avatars";
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					type: feed,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var that = this
				uni.uploadFile({
					method: 'POST',
					url: app.rootUrl + "/mobileOrder/uploadImg", //此处换上你的接口地址
					name: 'img',
					header: {
						'Authorization': uni.getStorageSync('cdj_token'),
					},
					formData: {
						appid: appid,
						timeStamp: timeStamp,
						type: feed,
						img: media_id,
						sign: sign,
					},
					filePath: media_id,
					success: function(res) {
						var imga = JSON.parse(res.data);
						that.imgPath = imga.data.path
						that.cropFilePath = imga.data.src;
						that.uploadAvatar()
					},
				})


			},
			//确认更换头像
			uploadAvatar() {
				var that = this
				var img = that.imgPath;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					img: img,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					img: img,
					timeStamp: timeStamp,
					sign: sign
				}
				rs.postRequests("uploadAvatar", data, (res) => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "更换头像成功",
							icon: 'none'
						})
					}
				})
			},
			formSubmit() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否退出',
					cancelColor: '#999',
					confirmColor: "#59B727",
					success: function(res) {
						if (res.confirm) {
							that.$get(that.$api.userLogout, {
								token: uni.getStorageSync('userInfo').token
							}, (res) => {
								if (res.data.code == 1) {
									that.$Toast("退出成功");
									uni.removeStorageSync('userInfo');
									uni.removeStorageSync('userToken');
									setTimeout(function() {
										uni.reLaunch({
											url: '../account/login'
										})
									}, 1000);

								} else {
									that.$Toast(res.data.msg)
								}
							})
						}
					}
				})


			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			// that.memberInfo();
		},
	};
</script>

<style lang="scss" scoped>
	.myinfo .get_info {
		background: white;
		padding: 0 20rpx;
	}

	.myinfo .get_info>view {
		display: flex;
		height: 88rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;

	}

	.myinfo .get_info>view>text {
		width: 180rpx;
		color: #333;
	}

	.myinfo .button_style {
		margin-top: 16rpx;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: white;
		color: #333;
	}

	.myinfo .get_info .avator {
		height: 182rpx;
	}

	.myinfo .avator image {
		width: 110rpx !important;
		height: 110rpx;
		border-radius: 50%;
	}

	.upload-img {
		margin: 0 30rpx;

		.method {
			height: 109rpx;
			line-height: 109rpx;
			text-align: center;
		}

		.cancel {
			margin: 30rpx 0;
		}
	}
</style>
