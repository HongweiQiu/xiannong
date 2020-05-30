<template>
	<view class="myinfo">
		<uni-nav-bar v-if="showtitle" left-icon="arrowleft" title="个人信息" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>
		<uni-nav-bar v-else title="裁剪" :status-bar="navBar" fixed="true" color="white" background-color="black"></uni-nav-bar>

		<view class="get_info">
			<view class="flex_left_right avator">
				<text>头像</text>
				<view class="align_center" @tap="upload">
					<image :src="cropFilePath" mode="aspectFit" style="width: 100%;"></image>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
			<view>
				<text>单位名称</text>
				<input type="text" value="" placeholder="请输入单位名称" placeholder-class="place_style" />
			</view>
			<view class="flex_left_right" @click="bindPhonePage">
				<text>绑定手机号</text>
				<view>
					<text>未绑定</text>
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
				</view>
			</view>
			<view>
				<text>密码</text>
				<input type="number" value="" placeholder="请输入六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input type="number" value="" placeholder="请再次确认登录密码" placeholder-class="place_style" />
			</view>
		</view>
		<view class="submit_button button_style">保存</view>
		<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
	</view>
</template>

<script>
import ImageCropper from '@/components/ling-imgcropper/ling-imgcropper.vue';
const app = getApp().globalData;
const { navBar } = app;
export default {
	components: {
		ImageCropper
	},
	data() {
		return {
			tempFilePath: '',
			cropFilePath: '',
			showtitle: true,
			navBar: navBar
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		bindPhonePage(){
			uni.navigateTo({
				url:'bindphone'
			})
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
			this.cropFilePath = e.detail.tempFilePath;
		},
		cancel() {
			this.showtitle = true;
		}
	}
};
</script>

<style>
.myinfo .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.myinfo .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.myinfo .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.myinfo .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
.myinfo .get_info .avator {
	height: 120rpx;
}
.myinfo .avator image {
	width: 80rpx !important;
	height: 80rpx;
	border-radius: 50%;
}
</style>
