<template>
	<view class="myinfo">
		<view class="get_info">
			<view class="flex_left_right avator">
				<image class="goods_img" :src='avatarUrl' mode="aspectFill"></image>

				<view class="align_center gray_font" @tap="showUpload('open')">
					<text class="fs-13">修改头像</text>
					<text class="iconfont iconfanhui t-180"></text>
				</view>
			</view>
			<view class="flex_left_right">
				<text>单位名称</text>
				<input type="text" v-model="personInfo.company" class="right gray_font" disabled />
			</view>
			<view class="flex_left_right">
				<text>手机号</text>
				<input type="number" v-model="personInfo.mobile" class="right gray_font" disabled />
			</view>
		</view>
		<view class="center button_style" @click="formSubmit">保存</view>
		<uni-popup ref="popup" type="bottom">
			<view class="upload-img">
				<view class="white_b r-10">
					<view class="border method" @click="chooseImage('album')">本地上传</view>
					<view class="method" @click="chooseImage('camera')">拍照上传</view>
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
				imgRemote: imgRemote,
				avatarUrl: '',
				personInfo: {},
				file: ''
			};
		},
		methods: {
			memberInfo() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.personInfo = data.data;
						if(data.data.avatar.match('xml;base64')){
							this.avatarUrl='../../static/img/avatar.png'
						}else{
							this.avatarUrl = data.data.avatar;
						}
						
					}
				})
			},
			showUpload(way) {
				if (way == 'open') {
					this.$refs.popup.open();
				} else {
					this.$refs.popup.close();
				}
			},
			chooseImage(type) {
				let _ = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [type], //从相册选择
					success(res) {
						_.file = res.tempFilePaths[0];
						_.$refs.popup.close();
						_.uploadImg()
					}
				});
			},
			uploadImg() {
				let _ = this;
				uni.uploadFile({
					url: getApp().globalData.rootUrl + _.$api.mainUpload, //此处换上你的接口地址
					name: 'file',
					filePath: _.file,
					success: function(res1) {
						_.avatarUrl = _.imgRemote + JSON.parse(res1.data).data;
					}
				})
			},
			formSubmit() {
				this.$showModal('确认修改信息', () => {
					let params = {
						avatar: this.avatarUrl
					}
					this.$get(this.$api.userProfile, params, (res) => {
						if (res.data.code == 1) {
							this.$Toast('修改成功');
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						} else {
							this.$Toast(res.data.msg);
						}
					})
				})
			}
		},
		onLoad() {
			var that = this;
			that.memberInfo();
		}
	};
</script>

<style lang="scss" scoped>
	.myinfo {
		height: 100vh;
		background: white;
	}

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
		margin: 119rpx 30rpx 0;
		border-radius: 45rpx;

		height: 90rpx;
		line-height: 90rpx;
		background: #57B127;
		color: #fff;
	}

	.myinfo .get_info .avator {
		height: 182rpx;
	}

	.myinfo .avator image {
		width: 110rpx;
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
