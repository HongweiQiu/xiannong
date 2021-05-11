<template>
	<view class="classify">
		<my-search :show="false"></my-search>
		<view class="classify_good">
			<view class="left_area">
				<view class="second_name" v-for="(item, index) in firstCate" :key="index"
					:class="kind == index ? 'is_active' : ''" @click="changeFirst(index)">
					<view class="left_border" v-if="kind == index"></view>
					<view class="hidden fs-13">{{item.name}}</view>
				</view>
			</view>
			<view class="right_area">
				<!-- <view class="first_name">
					<my-s-tabs effect slot-title @change="changeFirst" class="mp_tab_width" activeColor="#57B127"
						lineColor="none" v-model="activeTab" color="#999">
						<my-s-tab v-for="(item,index) of firstCate" :key="index">{{item.name}}</my-s-tab>
					</my-s-tabs>
				</view>
				<view style="height: 80rpx;"></view> -->
				<view v-if="bitmap" class="all-good">
					<my-profile v-for="(item,index) in list" :key="index" :wares="item" class="single_good"
						@showCart="openCart(item)" @showKey="showKey(item,index)"></my-profile>
				</view>
				<view v-else class="bitmap">
					<view style="height:150rpx;"></view>
					<image src="../../static/img/no_content.png" mode="aspectFit"></image>
					<view class="center gray_font">暂时没有商品，请耐心等候</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @maskInfo="closeKey">
			<my-keyboard @cancelKey="cancelKey" :arrObj="arrObj" @toParent="toParent" ref="keyboard"></my-keyboard>
		</uni-popup>
		<uni-popup ref="cart" type="bottom" @maskInfo="closeCart">
			<my-addcart @onClose="onClose" :cartware="cartware" :config="config" ref="addcart"></my-addcart>
		</uni-popup>
	</view>
</template>

<script>
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

		data() {
			return {
				kind: 0,
				cateId: '',
				page: 1,
				firstCate: [],
				bitmap: true,
				list: [],
				cartware: [],
				arrObj: {},
				index: '',
			};
		},
		methods: {
			goodCate() {
				this.$get(this.$api.goodCate, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.firstCate = data.data;
						this.cateId = data.data[0].id;
						this.getGood()
					}
				})
			},
			getGood() {
				let params = {
					cate_id: this.cateId,
					page: this.page
				}

				this.$get(this.$api.goodCateGood, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.list = data.data;
						if(this.page==1){
							this.bitmap=data.data.length?true:false;
						}
						console.log(data.data)
					}

				})
			},
			toParent(e) {
				let item = e.arrObj;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					item_id: item.id,
					attr_id: 0,
					item_num: e.val
				};

				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests('changeNum', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('加入购物车成功');
						this.list[this.index].cart_num = e.val;
					} else if (data.code == 407 || data.code == 406) {
						rs.Toast("购买数量不能超过活动数量")
					} else {
						rs.Toast(res.data.msg)
					}
				});
				this.$refs.popup.close();
			},
			// 切换一级分类
			changeFirst(index) {
				this.cateId = this.firstCate[index].id;
				this.kind = index;
				this.getGood();
			},
			openCart(item) {
				this.cartware = item;
				this.$refs.cart.open();
			},
			onClose() {
				this.$refs.cart.close();
			},
			// 显示键盘
			showKey(item, index) {
				this.arrObj = item;
				this.index = index;
				this.$refs.popup.open();
			}
		},
		onShow() {},

		onReachBottom() {},
		onLoad(e) {
			app.isReload = true;
			this.goodCate();

		}
	};
</script>

<style scoped lang="scss">
	page {
		background: white;
	}

	.classify {
		height: 100vh;
		background: white;
	}

	.classify .second_name {

		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F8F8F8;

	}

	.classify .first_name {
		position: fixed;
		z-index: 5;
		/* padding-right: 20rpx; */
		display: flex;
		width: 78.5%;
	

		background: white;
		align-items: center;
	}

	.classify .left_area {
		width: 21.5%;
		position: fixed;
		overflow-x: scroll;
		background: #f7f7f7;
		height: 100vh;
	}

	.classify .left_area::-webkit-scrollbar {
		display: none;
	}

	.classify .right_area {
		width: 78%;
		margin-left: 21.5%;

	}

	.classify>.classify_good {
		display: flex;
		/* padding-right: 20rpx; */
	}


	.classify .is_active {
		background: white;
		font-weight: bold;
		color: #57B127;
	}

	.classify .is_active .left_border {
		background: #57B127;
		width: 4rpx;
		height: 100rpx;
		position: absolute;
		left: 0;
		border-radius: 2rpx;
	}

	.mp_tab_width {
		width: 96%;
	}


	/* #ifdef MP-WEIXIN   */
	.classify .right_area .single_good .my_profile {
		border-bottom: 1px solid #eaeaea;
	}

	.classify .right_area .single_good {
		border-bottom: 1px solid #eaeaea;
		/* padding-right: 20rpx; */
	}

	/* #endif */
	.classify .bitmap {
		text-align: center;
		height: calc(100vh - 204rpx - 50px);
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

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading .load_img {
		width: 25rpx;
		height: 25rpx;
		margin-right: 10rpx;
	}


	.classify .my_loading {
		color: #808080;
		font-size: 24rpx !important;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		background: white;
	}

	/deep/ .s-tab-nav {
		background: #eee;
		border-radius: 20rpx;
		color: #999;
		margin-left: 30rpx;
		padding: 2rpx 23rpx;
		font-size: 22rpx;
	}

	/deep/ .is-active {
		background: #E9FFDD;
		border: 1px solid #57B127;
	}

	/deep/ .s-tabs-nav-wrap .s-tab-nav-view {
		height: 40rpx;
	}
</style>
