<template>
	<view class="my_profile flex">
		<view class="photo">
			<image :src="config.logo" mode="aspectFit" class="shuiyin" v-if="config.logo&&config.shuiyin==1"></image>
			<image class="good_img" :src="ware.img==''?imgRemote+config.item_default:ware.img" mode="aspectFit"></image>
		</view>
		<view class="info">
			<view class="operate flex">
				<view style="width:100%;">
					<view>{{ware.title}}</view>
					<view v-if="ware.describe" class="hidden gray_font ten">{{ware.describe}}</view>
				</view>
				<view v-if="url=='collect'">
					<text class="iconfont icon-alreadystar" style="color:orange;"></text>
					<text class="iconfont icon-xing"></text>
				</view>
				<view v-if="url=='shoplist'">
					<text class="iconfont icon-shanchu" style="color:red;"></text>

				</view>
			</view>
			<view class="flex_left_right">
				<view style="width:82%;">
					<view><text class="red_tag" v-for="(item,index) in ware.label">{{item}}</text></view>

					<block v-if="token">
						<block v-if="config.is_look==1">
							<view v-if="ware.attr.length" class="hidden">
								<text class="red_font">￥{{ware.area_price}}</text>
								<text class="gray_font">(多规格)</text>
							</view>
							<view v-else class="red_font">
								￥{{ware.price+'/'+ware.unit}}
							</view>
						</block>
						<block v-else>
							<view class="red_font">￥***</view>
						</block>
					</block>
					<block v-else>
						<view v-if="ware.attr.length">
							<text class="red_font">￥{{ware.area_price}}</text>
							<text class="gray_font">(多规格)</text>

						</view>
						<view v-else class="red_font">
							￥{{ware.price}}/{{ware.unit}}
						</view>
					</block>
				</view>

				<view>
					<block v-if="ware.attr.length">
						<image class="add_cart" src="../../static/img/addcart.png" @click="showCart"></image>
					</block>
					<block v-else>
						
						<my-stepper @showKey="showKey" :val="ware.cart_num" @minus="minus" @plus="plus" v-if="ware.cart_num"></my-stepper>
							<image v-else class="add_cart" src="../../static/img/plus.png" @click="plusCart"></image>
					</block>
				</view>
			</view>
		</view>
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
	let {
		log
	} = console;
	export default {
		props: ['ware', 'config', 'url'],
		data() {
			return {
				imgRemote: imgRemote,
				token: uni.getStorageSync('cdj_token')
			}
		},
		methods: {
			showCart() {
				this.$emit('showCart')
			},
			addcart(url, num, message = '成功加入购物车') {
							let item = this.ware;
							let timeStamp = Math.round(new Date().getTime() / 1000);
							let obj = {
								appid: appid,
								timeStamp: timeStamp,
								item_id: item.id,
								attr_id: 0,
								item_num: num
							};
							let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
							let params = Object.assign({
									sign: sign
								},
								obj
							);
							rs.postRequests(url, params, res => { 
								let data = res.data;
								if (data.code == 200) {
									uni.showToast({
										title:message,
										icon:'none',
										duration:2000
									})
									if (num <= 0) {
										this.ware.cart_num = 0;
									} else {
										this.ware.cart_num = num;
									}
								} else if (data.code == 407 || data.code == 406) {
									Toast("购买数量不能超过活动数量");
									console.log(this.shopList.cart_num)
									console.log(item)
									this.ware.cart_num = item.activity_num;
								} else {
									Toast(res.data.msg);
								}
							});
						},
			minus(e){
				if(e==0){
						this.addcart('deleteCart', e, '成功删除商品');
				}else{
					this.addcart('changeNum', e);
				}
			},
			plus(e){
			this.addcart('changeNum', e);
			},
			plusCart(){
				this.addcart('changeNum', 1);
			},
			showKey() {
				this.$emit('showKey')
			}
		}
	}
</script>

<style>
	.my_profile {
		padding: 20rpx 20rpx 10rpx;
		background: white;
	}

	.my_profile .photo {
		width: 200rpx;
	}

	.my_profile .good_img {
		width: 100%;
		height: 160rpx;
	}

	.my_profile .info {
		width: calc(100% - 200rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.my_profile .operate {
		justify-content: space-between;
	}

	.my_profile .add_cart {
		width: 32rpx;
		height: 32rpx;
	}
</style>
