<template>
	<view class="my_addcart" >
		<view class="top">
			<view class="info">
				<view class="detail">
					<view>
						<image :src="config.logo" mode="aspectFit" class="shuiyin" v-if="config.logo&&config.shuiyin==1"></image>
						<image class="good_img" :src="cartware.img==''?imgRemote+config.item_default:cartware.img"></image>
					</view>
					<view class="cart_ware_info">
						<view>
							<view>{{cartware.title}}</view>
							<view class="hidden describe" v-if="cartware.describe">{{cartware.describe}}</view>
						</view>
						<view>
							<view><text class="red_tag" v-for="(item,index) in cartware.label" :key="index">{{item}}</text></view>
							<block v-if="token">
								<block v-if="config.is_look==1">
									<view v-if="cartware.attr.length" class="red_font">￥{{cartware.attr[kind].attr_price}}/{{cartware.attr[kind].unit}}</view>
									<view v-else class="red_font">
										￥{{cartware.price}}/{{cartware.unit}}
									</view>
								</block>
								<block v-else>
									<view class="red_font">￥***</view>
								</block>
							</block>
							<block v-else>
								<view v-if="cartware.attr.length" class="red_font">￥{{cartware.attr[kind].attr_price}}/{{cartware.attr[kind].unit}}</view>
								<view v-else class="red_font">
									￥{{cartware.price}}/{{cartware.unit}}
								</view>
							</block>
						</view>


					</view>
				</view>

				<text class="iconfont icon-X" @click="onClose"></text>
			</view>
			<view class="spec" v-if="cartware.attr.length">
				<view class="title">选择规格</view>
				<view class="select">
					<view class="label" v-for="(item, index) in cartware.attr" :key="index" :class="index == kind? 'active' : ''"
					 @click="selectSpec(index)">{{item.attr_title}}</view>

				</view>
			</view>
			<view class="buy_num">
				<view>购买数量</view>
				<view>
					<my-stepper :val="value" @showKey="showKey"></my-stepper>
				</view>
			</view>
		</view>
		<view class="determine" @click="determine">确定</view>
		<my-keyboard v-if="isTop" @cancelKey="isTop=false" @toParent="toParent" :arrObj="arrObj"></my-keyboard>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;
	export default {
		props: ['cartware', 'config'],
		data() {
			return {
				token: uni.getStorageSync('cdj_token'),
				imgRemote: imgRemote,
				kind: 0,
				value: 20,
				isTop:false,
				arrObj:{}
			}
		},
		methods: {
			selectSpec(e) {
				this.kind = e;
			},
			onClose() {
				this.$emit('onClose')
			},
			showKey(){
				this.isTop=true;
				this.arrObj=this.cartware;
			},
			toParent(e){
					this.isTop=false;
					this.value=5;
				   
			},
			determine() {
			
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
.is_top{margin-bottom: 540rpx;}
	.my_addcart .info,
	.my_addcart .spec {
		border-bottom: 1px solid #f7f6f6;
	}

	.my_addcart .describe {

		color: #808080;
	}

	.my_addcart .detail {}

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

	.my_addcart .label {
		border-radius: 10rpx;
		padding: 0 8rpx;
		color: #009a44;
		border: 1px solid #009a44;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
	}

	.my_addcart .select .active {
		background: #009a44;
		color: white;
	}

	.my_addcart .buy_num {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
	}

	.my_addcart .determine {
		background: #009a44;
		color: white;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
	}
	.my_addcart .cart_ware_info{width:450rpx;margin-left:20rpx;display: flex;flex-direction: column;justify-content: space-around;}
</style>
