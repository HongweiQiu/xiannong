<template>
	<view class="classify">
		<my-search></my-search>
		<view class="classify_good">
			<view class="left_area">
				<view class="second_name" v-for="(item, index) in secondCate" :key="index" :class="kind == index ? 'is_active' : ''"
				 @click="changeSecond(index)">
					<view class="left_border" v-if="kind == index"></view>
					<view class="hidden">{{item.name}}</view>
				</view>
			</view>
			<view class="right_area">
				<view class="first_name">
					<my-s-tabs effect slot-title @change="changeFirst" class="mp_tab_width" activeColor="#009a44" lineColor="none"
					 v-model="activeTab">
						<my-s-tab v-for="(item,index) of firstCate" :key="index">{{item.name}}</my-s-tab>
					</my-s-tabs>
					<uni-icons type="more-filled" size="18" color="#009a44" @click="showDraw"></uni-icons>
				</view>
				<view style="height: 99rpx;"></view>
				<view v-if="list.length">
					<my-profile v-for="(item,index) in list" :key="index" :ware="item" :config="config" class="single_good" @showCart="openCart(item)"
					 @showKey="showKey"></my-profile>
					<my-loading :loading="loading"></my-loading>
				</view>
				<view v-else class="bitmap">
					<view style="height:150rpx;"></view>
					<image src="../../static/img/no_content.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<uni-popup ref="cart" type="bottom">
			<my-addcart :config="config" :cartware="cartware" @onClose="onClose"></my-addcart>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<my-keyboard @cancelKey="$refs.popup.close()"></my-keyboard>
		</uni-popup>
		<uni-drawer ref="drawer" mode="right">
			<!-- #ifdef APP-PLUS |H5 -->
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>

			<!-- #endif -->
			<view class="all_title">全部分类</view>
			<view class="show_all_sort">
				<text v-for="(item,index) in firstCate" @click="selectSort(index)" :class="active==index?'select_back':''">{{item.name}}</text>
			</view>
			<view class="option">
				<view class="cancel" @click="cancelSort">取消</view>
				<view class="determine" @click="deterSort">确定</view>
			</view>
		</uni-drawer>
		<my-tabar tabarIndex=1></my-tabar>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;

	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				kind: 0,
				active: -1,
				activeTab: 0,
				loading: true,
				firstId: '',
				secondId: '',
				page: 1,
				num: 10,
				firstCate: [],
				secondCate: [],
				list: [],
				config: [],
				cartware: []
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
						this.list = data.data.list;
						if (data.data.list.length < 10) {
							this.loading = false;
						} else {
							this.loading = true;
						}
					}
				});
			},
			// 切换一级分类
			changeFirst(index) {
				this.firstId = this.firstCate[index].id;
				this.secondId = "";
				this.kind = 0;
				this.mpItem();
			},
			// 切换二级分类
			changeSecond(index) {
				this.secondId = this.secondCate[index].id;
				this.kind = index;
				this.mpItem();
			},
			openCart(item) {
				this.cartware = item;
				this.$refs.cart.open();
				uni.hideTabBar()
			},
			onClose() {
				this.$refs.cart.close();
				uni.showTabBar();
			},
			// 显示键盘
			showKey() {
				this.$refs.popup.open();
				uni.hideTabBar()
			},
			showDraw() {
				uni.hideTabBar();
				this.$refs.drawer.open()
			},
			selectSort(index) {
				this.active = index;
			},
			cancelSort() {
				this.active = -1;
				this.$refs.drawer.close();
				uni.showTabBar();
			},
			deterSort() {
				if (this.active == -1) {
					uni.showToast({
						title: '请先选择分类',
						icon: 'none'

					})
					return;
				}
				this.firstId = this.firstCate[this.active].id;
				this.activeTab = this.active;
				this.secondId = "";
				this.kind = 0;
				this.mpItem();
				this.cancelSort();
			}
		},
		onShow() {
			this.mpItem();
		},
		onLoad() {
			uni.hideTabBar();
		}
	};
</script>

<style>
	page {
		background: #F7F7F7;
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
		height: calc(100vh - 104rpx - 50px);
		/* #endif */
		/* #ifdef APP-PLUS */
		height: calc(100vh - 104rpx);
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
		/* padding-right: 20rpx; */
	}

	/* #endif */
	.classify .bitmap {
		text-align: center;
		/* #ifdef H5 */
		height: calc(100vh - 308rpx);
		/* #endif */
		/* #ifdef APP-PLUS */
		height: calc(100vh - 175rpx);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 205rpx);
		/* #endif */
		background: white;

	}

	.classify .bitmap image {
		width: 50%;
	}

	.classify .option {
		position: fixed;
		bottom: 20rpx;
		right: 20rpx;
		display: flex;
	}

	.classify .option>view {
		color: white;
		line-height: 60rpx;
		width: 120rpx;
		height: 60rpx;
		text-align: center;
	}

	.classify .cancel {

		background: #addb8c;
		border-radius: 10rpx 0 0 10rpx;
	}

	.classify .determine {

		background: #009A44;
		border-radius: 0 10rpx 10rpx 0;
	}

	.classify .all_title {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.classify .show_all_sort {
		display: flex;
		flex-wrap: wrap;
		margin-left: 10rpx;
	}

	.classify .select_back {
		background: #cceadc !important;
	}

	.classify .show_all_sort text {
		color: #009a44;
		border: 1px solid #009b44;
		border-radius: 6rpx;
		margin: 2%;
		padding: 2rpx 14rpx;
	}
</style>
