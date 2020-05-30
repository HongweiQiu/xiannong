<template>
	<view class="my_addcart">
		<view class="top">
			<view class="info">
				<view class="detail">
					<view><image class="good_img" src="../../static/img/address.png"></image></view>
					<view>
						<view>湿哒哒1232132132132131</view>
						<view class="hidden describe">湿哒哒123213213213213123213213213213fdsgfds</view>
						<view><text class="red_tag">限时</text></view>
						<view>￥2.00/斤</view>
					</view>
				</view>

				<text class="iconfont icon-X" @click="onClose"></text>
			</view>
			<view class="spec">
				<view class="title">选择规格</view>
				<view class="select">
					<view  class="label" v-for="(item, index) in 7" :key="index"
					:class="index == kind? 'active' : ''" @click="selectSpec(index)">小樱桃</view>
					
				</view>
				</view>
			<view class="buy_num">
				<view>购买数量</view>
				<view><my-stepper></my-stepper></view>
			</view>
		</view>
		<view class="determine">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			kind:0
		}
	},
	methods:{
		selectSpec(e){
			// console.log(e)
			this.kind=e;
		},
		onClose(){
			this.$emit('onClose')
		}
	}
};
</script>
<style>
.my_addcart .top {
	padding: 20rpx 20rpx 0;
}
.my_addcart {
	background: white;
	border-radius: 10rpx 10rpx 0 0;
}
.my_addcart .good_img {
	width: 200rpx;
	height: 200rpx;
}
.my_addcart .info,
.my_addcart .detail {
	display: flex;
}
.my_addcart .info,
.my_addcart .spec {
	border-bottom: 1px solid #f7f6f6;
}
.my_addcart .describe {
	width: 60%;
	color: #808080;
}
.my_addcart .detail {
	width: 60%;
}
.my_addcart .info {
	justify-content: space-between;
}
.my_addcart .title {
	font-size: 26rpx;
	font-weight: 600;
	height: 80rpx;
	line-height: 80rpx;
}
.my_addcart .select {
	display: flex;
	flex-wrap: wrap;
}
.my_addcart .label{border-radius: 10rpx;
	padding: 0 8rpx;
	color: #009a44;
	border: 1px solid #009a44;
	margin-right: 10rpx;
	margin-bottom: 20rpx;}
.my_addcart .select .active {
	background: #009a44;
	color: white;
}
.my_addcart .buy_num{display: flex;justify-content: space-between;height:80rpx;align-items: center;}
.my_addcart .determine{background:#009a44 ;color: white;text-align: center;height: 80rpx;line-height: 80rpx;font-size: 36rpx;}
</style>
