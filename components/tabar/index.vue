<template>
	<view v-if="masktabar">
		<view style="height:50px;"></view>
		<view class="my_tabar">
			<view v-for="(item, index) in tabList" :key="index" class="single_tabar" @click="pageUrl(item)">
				<image class="image" v-if="tabarIndex == index" :src="item.img" mode="aspectFit"></image>
				<image class="image" v-else :src="item.inImg" mode="aspectFit"></image>
				<text :class="tabarIndex==index?'color':'incolor'" class="title">{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	let path = '/pages/tabar/',
		imgPath = '../../static/img/';
	export default {
		props: ['tabarIndex'],
		data() {
			return {
				count: 0,
				masktabar: true,
				tabList: [{
						title: '首页',
						inImg: imgPath + 'index_gray.png',
						img: imgPath + 'index_green.png',
						url: path + 'index'
					},
					{
						title: '分类',
						inImg: imgPath + 'classify_gray.png',
						img: imgPath + 'classify_green.png',
						url: path + 'classify'
					},
					{
						title: '购物车',
						inImg: imgPath + 'shopcart_gray.png',
						img: imgPath + 'shopcart_green.png',
						url: path + 'shopcart'
					},
					// {
					// 	title: '订单',
					// 	inImg: imgPath + 'order_gray.png',
					// 	img: imgPath + 'order_green.png',
					// 	url: path + 'order'
					// },
					{
						title: '我的',
						inImg: imgPath + 'user_gray.png',
						img: imgPath + 'user_green.png',
						url: path + 'user'
					}
				]
			};
		},
		methods: {
			pageUrl(data) {
				getApp().globalData.isReload = true;
				getApp().globalData.aplipay=true;
				if (this.tabarIndex != 1) {
					getApp().globalData.classId = '';
				}
				if (!uni.getStorageSync("cdj_token")) {
					if (data.title == "购物车") {
						uni.navigateTo({
							url: '/pages/account/login'
						})
					} else if (data.title == "订单") {
						uni.navigateTo({
							url: '/pages/account/login'
						})
					} else {
						// #ifdef MP-WEIXIN
						wx.switchTab({
							url: data.url
						});
						// #endif
						// #ifndef MP-WEIXIN
						uni.switchTab({
							url: data.url
						});
						// #endif
					}
				} else {
					// #ifdef MP-WEIXIN
					uni.switchTab({
						url: data.url
					});
					// #endif
					// #ifndef MP-WEIXIN
					uni.switchTab({
						url: data.url
					});
					// #endif

				}

			}
		},
	};
</script>

<style>
	.my_tabar {
		display: flex;
		justify-content: space-around;
		height: 50px;
		background: white;
		position: fixed;
		width: 100%;
		z-index: 2;
		bottom: 0;
		border-top: 1px solid #efefef;
	}

	.my_tabar .single_tabar .image {
		width: 25px;
		height: 25px;
	}

	.my_tabar .single_tabar {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 10px;

	}

	.my_tabar .single_tabar .color {
		color: #57B127;
	}

	.my_tabar .single_tabar .incolor {
		color: #999;
	}

	/* #ifdef MP-ALIPAY */
	.my_tabar .title {
		padding-top: 2px;
	}

	/* #endif */
</style>
