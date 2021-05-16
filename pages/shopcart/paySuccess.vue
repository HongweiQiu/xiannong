<template>
	<view class="pay-success">

		<view class="desc-text flex-column ac">
			<image src="../../static/img/pay_success.png" mode="aspectFit"></image>
			<text class="fs-13 gray_font">恭喜下单成功，快递将以最快的速度送到你的手里， 期待你下次光临！</text>
		</view>
		<view class="next-page flex-column align_center">
			<navigator url="../tabar/order"><view class="look">查看订单</view></navigator>
			<navigator open-type="switchTab" url="../tabar/index"><view class="back">返回首页</view></navigator>
		</view>
	</view>
</template>

<script>
	export default{
		onHide(){
				getApp().globalData.isReload=true;
		}
	}
</script>

<style  lang="scss">
	page{background: white;}
	.pay-success {

		.desc-text {
			padding-top: 225rpx;
			align-items: center;

			text {
				width: 578rpx;
				text-align: center;
				margin: 60rpx 0 40rpx;
			}
		}

		image {
			width: 383rpx;
			height: 345rpx;
		}


	}

	.next-page view {
		width: 256rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		
		box-sizing: border-box;
		border-radius: 35rpx;

	}
	.look {
		background: #57B127;
		color: white;
	}

	.back {
		color: #57B127;
		border: 1px solid #57B127;
		margin-top: 29rpx ;
	}
</style>
