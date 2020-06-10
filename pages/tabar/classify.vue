<template>
	<view class="classify">
		<my-search></my-search>
		<view class="classify_good">
			<view class="left_area">
				<view class="second_name" v-for="(item, index) in secondCate" :key="index" :class="kind == index ? 'is_active' : ''" @click="changeSecond(index)">
					<view class="left_border" v-if="kind == index"></view>
					<view class="hidden">{{item.name}}</view>
				</view>
			</view>
			<view class="right_area">
				<view class="first_name">
					<my-s-tabs effect slot-title @change="changeFirst" class="mp_tab_width" activeColor="#009a44" lineColor="none">
						<my-s-tab v-for="(item,index) of firstCate" :key="index">{{item.name}}</my-s-tab>
					</my-s-tabs>
					<uni-icons type="more-filled" size="18"></uni-icons>
				</view>
				<view style="height: 106rpx;"></view>
				<view>
					<my-profile v-for="(item,index) in list" :key="index" :list="item" :config="config" class="single_good" @showKey="showKey"></my-profile>
					<my-loading :loading="loading"></my-loading>
				</view>
			</view>
		</view>
		<uni-popup>
			<my-addcart></my-addcart>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<my-keyboard @keyBoard="$refs.popup.close()"></my-keyboard>
		</uni-popup>
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
		data() {
			return {
				kind: 0,
				activeTab: 2,
				loading: true,
				firstId:'',
				secondId:'',
				page:1,
				num:10,
				firstCate:[],
				secondCate:[],
				list:[],
				config:[]
			};
		},
		methods: {
			mpItem() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let {
					firstId,
					secondId,
					page,
					num
				} = this;

				if (page != 1) {
					this.list = uni.getStorageSync('classify')
					return;
				}
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign,
						firstId: firstId,
						secondId: secondId,
						page: 1,
						num: num
					},
					obj
				);
				rs.getRequest('mpItemList', params, res => {
					let data = res.data;
					if (data.code == 200) {
						// if (!firstId) {
						// 	firstId = data.data.firstCate[0].id;
						// }
						// if (firstId) {
						// 	data.data.firstCate.map((e, index) => {
						// 		if (firstId == e.id) {
						// 			this.active = index;
						// 		}
						// 	});
						// }
						this.config = data.data;
						this.firstCate = data.data.firstCate;

						this.secondCate = data.data.secondCate;
						if (data.data.list.length == 0) {
							this.bitmap = true;
						} else {
							this.list = data.data.list;
							this.bitmap = false;
							if (data.data.list.length < 10) {
								this.loading = false;
							} else {
								this.loading = true;
							}
						}
					}
				});
			},
			// 切换一级分类
			changeFirst(index) {
				this.firstId=this.firstCate[index].id;
				this.secondId="";
				this.kind = 0;
				this.mpItem();
			},
			// 切换二级分类
			changeSecond(index) {
				this.secondId=this.secondCate[index].id;
				this.kind = index;
				this.mpItem();
				
			},
			// 显示键盘
			showKey() {
				this.$refs.popup.open();
				uni.hideTabBar()
			}
		},
		onShow() {
			console.log(45)
			this.mpItem();
		}
	};
</script>

<style>
	page {
		background: white;
	}

	.classify .second_name {

		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		border-bottom: 1px solid;
		border-color: hsla(0, 0%, 59.2%, .1);

	}

	.classify .first_name {
		position: fixed;
		z-index: 5;
		/* padding-right: 20rpx; */
		display: flex;
		width: 75%;
		/* #ifdef APP-PLUS */
		width: 73%;
		/* #endif */
		height: 98rpx;
		background: white;
		align-items: center;
	}

	.classify .left_area {
		width: 25%;
		position: fixed;
		overflow-x: scroll;

		/* #ifdef H5 */
		height: calc(100vh - 104px);
		/* #endif */
		/* #ifdef APP-PLUS */
		height: calc(100vh - 84px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 54px);
		/* #endif */
	}

	.classify .left_area::-webkit-scrollbar {
		display: none;
	}

	.classify .right_area {
		width: 75%;
		margin-left: 25%;
	}

	.classify>.classify_good {
		display: flex;
		/* padding-right: 20rpx; */
	}

	.classify .classify_good .hidden {
		padding: 20rpx;
	}

	.classify .is_active {
		background: white;
	}

	.classify .is_active .left_border {
		background: #009a44;
		width: 12rpx;
		height: 60rpx;
		position: absolute;
		left: 0;
	}

	.mp_tab_width {
		width: 90%;
	}

	/* #ifdef APP-PLUS |H5 */
	.classify .right_area .single_good:nth-last-child(n+3) {
		border-bottom: 1px solid #eaeaea;
	}

	.classify .right_area .single_good {
		border-bottom: 1px solid #eaeaea;
		padding-right: 20rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.classify .right_area .single_good:nth-last-child(n+3) .my_profile {
		border-bottom: 1px solid #eaeaea;
	}

	.classify .right_area .single_good {
		border-bottom: 1px solid #eaeaea;
		padding-right: 20rpx;
	}

	/* #endif */
</style>
