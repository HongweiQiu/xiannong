<template>
	<view class="detail">
		<view>
			<view>
				<imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
			</view>
			<view class="white_b">
				<view class="fs-18 bold title">新鲜大白菜干净新鲜大白菜干净新鲜大白菜新鲜大白菜...</view>
				<view class="flex_left_right">
					<view class="fs-13 gray_font desc">
						<text>新鲜草莓，为炎热的夏天带来一丝甜腻</text>
					</view>
					<view class="share-info align_center" @click="openShare">
						<text class="iconfont bold" style="margin-top: 2rpx;">&#xe6a3;</text>
						<text class="fs-11">分享</text>
					</view>

				</view>
				<view class="price flex_left_right">
					<view>
						<text class="fs-11 pink bold">￥</text>
						<text class="pink fs-23 bold">19.9</text>
						<text class="fs-11">/盒</text>
						<text class="fs-11 gray_font line_through" style="margin-left: 10rpx;">￥25.8</text>
					</view>
					<view class="fs-11 gray_font">月销97件</view>
				</view>
			</view>
		</view>
		<view class="delivery white_b align_center">
			<image src="../../static/img/car.png" style="width: 60rpx;height:32rpx;margin-right: 20rpx;"></image>
			<text class="fs-13">16：00前下单，最快次日达，商品满99元免运费</text>
		</view>
		<view>
			<view class="flex align_center flex-column more-info white_b">
				<text class="fs-15 bold">商品详情</text>
				<text class="line-bottom"></text>
			</view>
		</view>
		<view class="addcart align_center">
			<view class="align_center">
				<text class="iconfont fiveteen" style="padding:0 6rpx 0 20rpx;">&#xe658;</text>
				<text class="fs-15">售前咨询</text>
			</view>
			<view class="align_center">
				<text class="iconfont fiveteen" style="padding:0 6rpx 0 20rpx;">&#xe611;</text>
				<text class="fs-15">购物车</text>
			</view>
			<view class="submit">
				<!-- <my-n-stepper val="12" ></my-n-steper> -->
				<view class="add fs-15">
					加入购物车
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="white_b share-option">
				<view class="flex_left_right select">
					<button open-type="share">
						<view>
							<image src="../../static/img/wechat.png"></image>
							<view>分享好友</view>
						</view>
					</button>

					<view>
						<image src="../../static/img/sharefriend.png"></image>
						<view>生成海报</view>
					</view>
				</view>
				<view @click="$refs.popup.close()" class="cancel fs-15">取消</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue';
	export default {
		components: {
			imgsBanner
		},
		data() {
			return {
				imgList: [
					'../../static/img/404.png', '../../static/img/404.png'
				],
				currentImg: 0, //当前默认选中
			};
		},
		methods: {
			openShare() {
				this.$refs.popup.open()
			}
		}
	}
</script>
<style scoped lang="scss">
	.detail .title {
		padding: 30rpx 32rpx 20rpx 30rpx;
		;
	}

	.share-info {
		color: #F01D1D;
		background: #FFE2E2;
		width: 122rpx;
		height: 34rpx;
		line-height: 34rpx;
		border-radius: 17rpx 0 0 17rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.detail {
		.desc {
			padding-left: 30rpx;
		}

		.price {
			padding: 29rpx 30rpx 25rpx;
		}

		.delivery {
			margin: 16rpx 0;
			padding: 0 30rpx;
			color: #333;
			height: 100rpx;
			line-height: 100rpx;


		}

		.more-info {
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.pink {
		color: #F01D1D;
	}

	.line-bottom {
		width: 130rpx;
		background-color: #57B127;
		height: 8rpx;
		border-radius: 4rpx;
		position: absolute;
		margin-top: 50rpx;
		opacity: 0.4;
	}

	.addcart {
		height: 98rpx;
		position: fixed;
		bottom: 0;
		background: white;
		width: 100%;

		.submit {
			width: 308rpx;
			height: 78rpx;
			margin-left: 30rpx;
		}
	}

	.add {
		background: #57B127;
		text-align: center;
		line-height: 78rpx;
		color: white;
	}

	/deep/ .my_stepper,
	.add {
		width: 100% !important;
		height: 100% !important;
		border-radius: 39rpx !important;
		justify-content: space-between !important;
		padding: 0 25rpx !important;
		box-sizing: border-box;

		.iconfont {
			font-size: 50rpx;
		}
	}

	.share-option {
		button {
			background: none;
			margin: 0;
			padding: 0;
		border: none;
			font-size: 30rpx;
			line-height: normal;
			&::after{border:none;}
		}

		.select {
			padding: 40rpx 140rpx;
		}

		image {
			width: 99rpx;
			height: 99rpx;
		}

		.cancel {
			padding: 40rpx 0;
			text-align: center;
			border-top: 1px solid #eee;
		}
	}
</style>
