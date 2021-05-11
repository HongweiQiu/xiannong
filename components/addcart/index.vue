<template>
	<view class="add-to-cart white_b padding-15">
		<view class="flex">
			<view class="good-img r-5">
				<image src="../../static/img/completed.png"></image>
			</view>
			<view>
				<view class="right">
					<text class="close">X</text>
				</view>
				<view class="">
					<view>
						<text>￥</text>
						<text>矩形 27</text>
					</view>
					<view>已选：250g/盒, 1件</view>
				</view>
			</view>
		</view>
		<view>
			<view class="">
				规格
			</view>
			<view class="">
				<text v-for="(item,index) in 5" :key="index">250g/盒 </text>
			</view>
		</view>
		<view>
			<text>数量</text>
			<my-stepper></my-stepper>
		</view>
		<view>
			加入购物车
		</view>
	</view>
</template>
<style lang="scss" scoped>
	.add-to-cart {
		border-radius: 20rpx 20rpx 0 0;

		.good-img {
			width: 300rpx;
			height: 300rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.close {
			border:4rpx solid #999;
			border-radius: 50%;
			color: #999;
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
			text-align: center;line-height: 40rpx;
		}
	}
</style>
