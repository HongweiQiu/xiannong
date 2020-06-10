<template>
	<view class="my_profile flex">
		<view class="photo"><image class="good_img" src="../../static/img/address.png" mode=""></image></view>
		<view class="info">
			<view class="operate flex">
				<view>
					<view>{{list.title}}</view>
					<view>小白菜</view>
				</view>
				<view v-if="url=='collect'">
					<text class="iconfont icon-alreadystar" style="color:orange;"></text>
					<text class="iconfont icon-xing" ></text>
				</view>
				<view v-if="url=='shoplist'">
					<text class="iconfont icon-shanchu" style="color:red;"></text>
					
				</view>
			</view>
			<view class="flex_left_right">
				<view>
					<view><text class="red_tag">显示</text></view>
					<view class="red_font">￥2.00/斤</view>
				</view>
				<view><my-stepper @showKey="keyBoard"></my-stepper></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:['url','list','config'],
	methods: {
		keyBoard() {
			this.$emit('showKey');
		}
	}
};
</script>

<style>
.my_profile {
	padding: 0 20rpx;
	background: white;
}

.my_profile .photo {
	width: 44%;
}
.my_profile .good_img {
	width: 100%;
	height: 160rpx;
}
.my_profile .info {
	width: 56%;
}
.my_profile .operate{justify-content: space-between;}
</style>
