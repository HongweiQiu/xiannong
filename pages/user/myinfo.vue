<template>
	<view class="myinfo">
		<view class="get_info">
			<view class="flex_left_right avator">
				<image class="goods_img" v-if="cropFilePath" :src='cropFilePath' mode='scaleToFill'></image>
				<image class="goods_img" v-if="!cropFilePath" :src='imgRemote+member_default '></image>
				<view class="align_center gray_font" @tap="showUpload('open')">
					<text class="fs-13">修改头像</text>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
			<view class="flex_left_right" @click="modifyPwd">
				<text>修改登录密码</text>
				<uni-icons type="arrowright" size="18" color="black"></uni-icons>
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
				tempFilePath: '',
				cropFilePath: '',
				showtitle: true,
				navBar: navBar,
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
					if (res.data.code == 200) {
						var reg = /^(\d{3})\d*(\d{4})$/;

						that.memberInfoData = res.data.data.info;
						that.cropFilePath = that.memberInfoData.logo;
						that.nickname = that.memberInfoData.nickname;
						that.member_default = res.data.data.member_default;
						that.phone = res.data.data.info.phone.replace(reg, '$1****$2')
					}
				})
			},

			modifyPwd() {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				uni.navigateTo({
					url: './modifypwd'
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
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				var that = this;
				if (that.memberInfoData.is_password == 0) {
					if (!that.password) {
						rs.Toast('密码不能为空');
						return;
					}
					if (!that.confirmPwd) {
						rs.Toast('确认密码不能为空');
						return;
					}
					if (that.password != this.confirmPwd) {
						rs.Toast('密码和确认密码不一致');
						return;
					}
				}

				var nickname = that.nickname.replace(/\s+/g, "");
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					nickname: nickname,
					password: that.password,
					confirm_pwd: that.confirmPwd,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("saveMemberInfo", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast("修改成功")
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);

					} else {
						rs.Toast(res.data.msg)
					}
				})
			},

			cancel() {
				this.showtitle = true;
			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			that.memberInfo();
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
		margin-top:16rpx;
		width: 100%;	
		height: 88rpx;
		line-height: 88rpx;
		background:white;
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
