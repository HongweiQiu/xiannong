<template>
	<view class="feedback">
		<view>
			<view>
				<textarea v-model="content" placeholder="请在此描述你的建议或反馈，我们会尽快为你处理的哦~(必填)"></textarea>
			</view>
		</view>
		<view class="submit" @click="$doubleClick(submit)">确定提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexType: 0,
				content: ''
			}
		},
		methods: {
			submit() {
				let params = {
					token: uni.getStorageSync('userToken'),
					content: this.content
				};
				this.$get(this.$api.userFankui, params, res => {
					let data = res.data;
					if (data.code == 1) {
						this.$Toast('提交意见成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						this.$Toast(data.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		height: 100vh;
		background: white;
		box-sizing: border-box;
		padding: 30rpx;

		.submit {
			position: fixed;
			bottom: 159rpx;
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
			background: #57B127;
			border-radius: 45rpx;
			color: white;
			text-align: center;
		}

		.type {
			flex-wrap: wrap;

			.active-type {
				border: 1px solid #57B127;
				background: #E8FFDC;
				color: #57B127;
			}
		}

		.type text {
			margin-top: 30rpx;
			flex-basis: 20%;
			border-radius: 25rpx;
			color: #333;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			border: 1px solid #c3c3c3;
		}

		textarea {
			height: 310rpx;
			padding: 24rpx 21rpx 0 29rpx;
			width: 690rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			box-sizing: border-box;
		}
	}
</style>
