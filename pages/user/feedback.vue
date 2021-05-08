<template>
	<view class="feedback">
		<view>
			<view class="bold">选择反馈类型</view>
			<view class="type flex_left_right fs-13">
				<text v-for="(item,index) in 8" @click="indexType=index" :class="indexType==index?'active-type':''">服务相关</text>
			</view>
			<view>
				<textarea placeholder="请在此描述你的建议或反馈，我们会尽快为你处理的哦~(必填)"></textarea>
			</view>
		</view>
		<view class="submit">确定提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexType:0

			}
		},
		methods: {

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
			.active-type{
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
			height: 210rpx;
			padding: 24rpx 21rpx 0 29rpx;
			width: 690rpx;
			margin-top: 32rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			box-sizing: border-box;
		}
	}
</style>
