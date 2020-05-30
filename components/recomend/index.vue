<template>
	
	<view class="recomend_single">
		<view>
			<image class="photo" src="../../static/img/addcart.png" mode=""></image>
		</view>
		<view>
			<view>
				<view>小白菜</view>
				<view class="gray_font">湿哒哒</view>
			</view>
			<view class="price">
				<view>
					<view>
						<text class="red_tag">限时</text>
					</view>
					<view class="red_font">￥2.00/斤</view>
				</view>
				<view class="addcart" @click="showCart"><image src="../../static/img/addcart.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			showCart(){
				this.$emit('showCart')
			}
		}
	}
</script>

<style>
	.recomend_single{box-shadow: 1px 1px 6px #d3d3d3;
    background: #fff;
 
    border-radius: 6px;
    padding: 10rpx;
	width: 320rpx;}
	.recomend_single:nth-child(n+3){
		   margin: 30rpx 0 0rpx;
	}
	.recomend_single .photo{width:100%;height: 200rpx;}
	.recomend_single .price {display: flex;align-items: center;justify-content: space-between;}
</style>
