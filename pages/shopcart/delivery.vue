<template>
	<view class="delivery">
		<uni-nav-bar left-icon="arrowleft" title="收货地址" :status-bar="navBar" fixed="true" @clickLeft="LeftClick"></uni-nav-bar>

		<view class="get_info">
			<view>
				<text>联系人</text>
				<input type="text" value="" placeholder="联系人姓名" placeholder-class="place_style" />
			</view>
			<view>
				<text>手机号</text>
				<input type="number" value="" placeholder="请输入手机号" placeholder-class="place_style" />
			</view>
			<view @click="mapPage">
				<text>收货地址</text>
				<view class="flex_left_right" style="width: 83%;">
					<text>{{address}}</text>
					<uni-icons type="arrowright" size="18" color="gray"></uni-icons>
				</view>
			</view>
			<view>
				<text>门牌号</text>
				<input type="number" value="" placeholder="例如：5号509室" placeholder-class="place_style" />
			</view>
		</view>
		<view class="submit_button button_style">保存</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			address:'',
			// #ifdef APP-PLUS
			navBar: true
			// #endif
			// #ifdef MP-WEIXIN |H5
			navBar: false
			// #endif
		};
	},
	methods: {
		LeftClick(){
			uni.navigateBack({
				delta:1
			})
		},
		mapPage() {
		
			let that=this;
	   
			uni.chooseLocation({
				success:function(res){
					that.address=res.address;
				},
				fail:function(err){
					console.log(err)
				}
			});
		}
	}
};
</script>

<style>
.delivery .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.delivery .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.delivery .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.delivery .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
</style>
