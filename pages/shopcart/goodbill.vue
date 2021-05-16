<template>
	<view class="search_list">
		<view class="fixed">
			<view class="input_key">
				<view class="flex_left_right fs-15 sort">
					<view @click="sortIndex=1" :class="sortIndex==1?'m-color':''"><text>综合</text></view>
					<view @click="sortIndex=2" :class="sortIndex==2?'m-color':''"><text>销量</text></view>
					<view @click="sortIndex=3" :class="sortIndex==3?'m-color':''" class="flex">
						<view style="padding-right:5rpx;">价格</view>
						<view class="flex-column">
							<text class="iconfont jiantou"
								style="transform: rotate(180deg);margin-top:6rpx;">&#xf36c;</text>
							<text class="iconfont jiantou" style="margin-top:-12rpx;">&#xf36c;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:110rpx;"></view>
		<view class="search_result">
			<view class="recomend" style="margin-top:20rpx;">
				<view class="body">
					<my-recomend v-for="(item, index) in recommendList" :key="index" :ware="item" :config="config"
						@showCart="openCart(item)" class="myc_recomend"></my-recomend>
				</view>
			</view>
		</view>
		<view class="fixed-addcart white_b">
			<view class="flex_left_right padding-15 align_center total">
				<view>
					<view class="fs-13 bold">小计：￥79.00</view>
					<view class="fs-11 gray_font">再买￥10.00 即可享受免运费</view>
				</view>
				<navigator open-type="switchTab" url="../tabar/shopcart">
					<view class="go-car pay-button fs-15">去购物车</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;
	export default {
		data() {
			return {
				sortIndex: 1,
				recommendList: [],
				bitmap: false,
			}
		},
		methods: {
			getGood() {
				let {
					num,
					page
				} = this;
				this.$get(this.$api.mainRecommend, {}, res => {
					let data = res.data;
					if (data.code == 1) {
						this.recommendList = data.data;

					}
				});
			}
		},
		onShow() {
			this.getGood();

		}
	}
</script>

<style scoped lang="scss">
	.search_list .input_key {
		position: fixed;
		width: 100%;
		z-index: 9;
		background: white;

	}

	.search_list .search_result .my_profile {
		margin-bottom: 10rpx;
	}

	.m-color {
		color: #57B127;
	}

	.sort {
		padding: 30rpx 60rpx;
	}

	.jiantou {
		font-size: 20rpx;
	}

	.fixed-addcart {
		position: fixed;
		width: 100%;
		bottom: 0;

		.total {
			height: 98rpx;
		}

		.go-car {
			background: #57B127;
			color: white;
		}
	}
</style>
