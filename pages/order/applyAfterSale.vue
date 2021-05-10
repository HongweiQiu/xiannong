<template>
	<view class="apply-return">
		<view class="return-good">
			<view class="border padding-15 order-num align_center">
			<!-- 	<uni-icons class="check-button" :type="allCheck?'checkbox-filled':'circle'"
					:color="allCheck?'#57B127':'#999'" size="20" @click="allCheckGood" /> -->
				<text class="fs-13" style="margin-left: 20rpx;">订单编号：2375647384983426</text>
			</view>
			<view class="padding-15">
				<view class="" v-for="item in 2" class="flex sign-good ">
					<view class="align_center">
						<uni-icons class="check-button" :type="allCheck?'checkbox-filled':'circle'"
							:color="allCheck?'#57B127':'#999'" size="20" @click="allCheckGood" />
					</view>
					<view class="flex">
						<view class="img">
							<image src="../../static/img/404.png" mode="aspectFit"></image>
						</view>
						<view class="info flex-column ">
							<view class="bold" style="line-height: 1;">
								新鲜大白菜干净新鲜大白菜干净新鲜大白菜...
							</view>
							<view>
								<text class="fs-11 gray_font">购买数量：</text>
								<text class="fs-13 bold">20</text>
							</view>
							<view>
								<text class="fs-11 gray_font">退款总额：</text>
								<text class="fs-13 bold red-font">￥1800</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="explain" style="margin:30rpx;">
			<view class="flex_left_right bold return-money border">
				<text>退款金额：</text>
				<text class="red-font">￥1800</text>
			</view>
			<view class="more-reason flex">
				<text class="bold">退款说明：</text>
				<textarea v-model="reason" maxlength=50 placeholder="选填" />
			</view>
			<view class="right gray_font">{{reason.length}}/50</view>
		</view>
		<view>
			<view class="bold" style="padding: 30rpx 0;">上传凭证：</view>
			<view>
				<view class="flex-column camera align_center" @click="showUpload('open')">
					<text class="iconfont iconpaizhao"></text>
					<text class="fs-11 gray_font">上传图片</text>
				</view>
			</view>
		</view>
		<view class="submit"> 提交</view>
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
	export default {
		data() {
			return {
				reason: ''

			}
		},
		methods: {
			showUpload(way) {
				if (way == 'open') {
					this.$refs.popup.open();
				} else {
					this.$refs.popup.close();
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.apply-return>view {
		background-color: white;
		border-radius: 10rpx;
		margin: 0 30rpx;

		&:nth-child(1) {
			margin-top: 30rpx;
		}

		&:nth-child(2),
		&:nth-child(3) {
			padding: 0 20rpx 30rpx;
		}

		&:nth-child(4) {
			margin-bottom: 20rpx;
		}

	}

	.apply-return {
		.order-num {
			height: 60rpx;
		}

		.sign-good {
			padding: 30rpx;
		}

		.return-good {
			.img {
				margin: 0 30rpx 0 20rpx;
				width: 168rpx;
				height: 168rpx;
				padding: 30rpx 0;

				image {
					width: inherit;
					height: inherit;
				}
			}

			.info {
				padding: 30rpx 0;
				padding-bottom: 30rpx;
				justify-content: space-between;
			}

			.sign-good:nth-last-child(2) .info {
				border-bottom: 1px solid #eee;
			}
		}

		.return-money {
			height: 88rpx;
		}

		.more-reason {
			padding-top: 30rpx;
		}

		textarea {
			width: 450rpx;
			height: 150rpx;
		}

		.camera {
			.iconfont {
				font-size: 60rpx;
			}

			justify-content: center;
			width:130rpx;
			height:130rpx;
			border: 1px dashed #eee;
		}

		.submit {
			background: #57B127;
			color: white;
			border-radius: 39rpx;
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			margin-top: 21rpx;
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
	}
</style>
