<template>
	<view class="my_profile flex" >
		<view class="photo"><image class="good_img" src="../../static/img/address.png" mode=""></image></view>
		<view class="info">
			<view>
				<view>小白菜</view>
				<view>小白菜</view>
			</view>
			<view class="flex_left_right">
				<view>
					<view><text class="red_tag">显示</text></view>
					<view class="red_font">￥2.00/斤</view>
					
				</view>
				<view>
										<my-stepper @showKey="keyBoard" ></my-stepper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			keyBoard(){
				this.$emit('showKey')
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	.my_profile{padding-right:20rpx ;}
	/* #endif */
	.my_profile .photo {width:44%;}
	.my_profile .good_img{width:100%;height:160rpx;}
	.my_profile .info{width:56%;}
</style>
