<template>
	<view class="shoplist">
		<uni-nav-bar left-icon="arrowleft" right-text="清空" title="商品列表" :status-bar="navBar" fixed="true" @clickLeft="leftClick"
		 @clickRight="rightClick"></uni-nav-bar>
	<view class="shop">
			<view v-for="(item,index) in shop" :key="index">
				<view class="">
					<view class="class_name">
						<text class="class_tag">类别</text>
						<text> {{item.p_name}}({{item.count}})</text>
					</view>
					<view v-for="list in item.list"  class="single_good" :key="list.id">
						<view class="flex">
							<view class="good_img">
								<image :src="config.logo" mode="aspectFit" class="shuiyin" v-if="config.logo&&config.shuiyin==1"></image>
								<image class="have_img" :src="list.img==''?imgRemote+config.item_default:list.img" mode="aspectFit"></image>
							</view>
							<view class="include_delete">
								<view class="info">
									<view>
										<view>{{list.title}}</view>
										<view v-if="list.describe">{{list.describe}}</view>
									</view>
									<view>
										<text class="iconfont icon-shanchu"></text>
									</view>
								</view>
								<view class="flex_left_right">
									<view>
										<view><text class="red_tag" v-for="label in list.label" :key="label">{{label}}</text></view>
										<block v-if="token">
											<block v-if="config.is_look==1">
												<view v-if="list.attr.length!=0">
													<text class="red_font">￥{{list.attr.attr_price}}/{{list.attr.unit}}</text>
													<text class="gray_font">已选({{list.attr.attr_title}})</text>
												</view>
												<view v-else> <text class="red_font">￥{{list.price}}/{{list.unit}}</text></view>
											</block>
											<view v-else class="red_font">
												￥***
											</view>
										</block>
										<block v-else>
											<view v-if="list.attr.length">
												<text class="red_font">￥{{list.attr.attr_price}}/{{list.attr.unit}}</text>
												<text class="gray_font">已选(list.attr.attr_title)</text>
											</view>
											<view v-else> <text class="red_font">￥{{list.price}}/{{list.unit}}</text></view>
										</block>
									</view>
									<view>
										<my-stepper></my-stepper>
									</view>
								</view>
							</view>

						</view>
						<view class="flex">备注:<input type="text" value="" placeholder="请告诉我们需要注意的地方" placeholder-class="place_style" /></view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	let {
		log
	} = console;
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		data() {
			return {
				token: uni.getStorageSync('cdj_token'),
				imgRemote: imgRemote,
				navBar: navBar,
				shop: [],
				config: []
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				})
			},
			openCart() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("openCart", params, (res) => {
					let {
						data
					} = res;
					if (data.code == 200) {
						this.config = data.data;
						this.shop = data.data.shop;
					}

				})
			}
		},
		onShow() {
			this.openCart();
		}
	}
</script>

<style>
	.shoplist .icon-shanchu {
		color: red;
		font-weight: 700;
	}

	.shoplist .class_name {
		padding-top: 10rpx;
	}

	.shoplist .shop {
		background: white;
		margin-top: 10rpx;
		padding: 0 20rpx;
	}

	.shoplist .single_good {
		padding: 10rpx 0;
		border-bottom: 1px solid #f7f6f6;
	}

	.shoplist .class_tag {
		background: #009a44;
		color: #fff;
		padding: 0 8rpx;
		margin-right: 10rpx;
		border-radius: 6rpx;
	}

	.shoplist .good_img {
		width: 30%;
	}

	.shoplist .good_img .have_img {
		width: 100%;
		height: 160rpx;
	}

	.shoplist .include_delete {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 70%;
	}

	.shoplist .include_delete .info {
		display: flex;
		justify-content: space-between;
	}
</style>
