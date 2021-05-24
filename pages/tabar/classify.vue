<template>
	<view class="classify">
		<my-search :show="false"></my-search>
		<view class="classify_good">
			<!-- <view class="left_area">
				<view class="second_name" v-for="(item, index) in firstCate" :key="index"
					:class="kind == index ? 'is_active' : ''" @click="changeFirst(index)">
					<view class="left_border" v-if="kind == index"></view>
					<view class="hidden fs-13">{{item.name}}</view>
				</view>
			</view> -->
			<view class="right_area">
				<view class="first_name" v-if="secondCate.length!=1">
					<view class="second-cate ">
						<my-s-tabs effect slot-title @change="changeSecond" class="mp_tab_width border"
							activeColor="#57B127" lineColor="none" v-model="activeTab" color="#999">
							<my-s-tab v-for="(item,index) of secondCate" :key="index">{{item.name}}</my-s-tab>
						</my-s-tabs>
						<text @click="moreSecond=!moreSecond" class="iconfont iconfanhui" style="margin:0 0 15rpx 15rpx;"
							:style="{'transform':moreSecond?'rotate(270deg)':'rotate(90deg)'}"></text>

					</view>

				</view>
				<view style="height: 58rpx;" v-if="secondCate.length!=1"></view>

				<view v-show="!moreSecond" class="second-mask" @click="moreSecond=!moreSecond">
					<view class="all-second">
						<text v-for="(item,index) of secondCate" :key="index"
							:class="activeTab== index ? 'second_active' : ''"
							@click="changeSecond(index)">{{item.name}}</text>
					</view>

				</view>
				<!-- <view v-if="bitmap" class="all-good">
					<my-profile v-for="(item,index) in list" :key="index" :wares="item" class="single_good">
					</my-profile>
				</view>
				<view v-else class="bitmap">
					<view style="height:150rpx;"></view>
					<image src="../../static/img/no_content.png" mode="aspectFit"></image>
					<view class="center gray_font">暂时没有商品，请耐心等候</view>
				</view> -->
			</view>
		</view>

		<v-tabs-column :tabs="firstCate" v-model="kind" field="name" @change="changeFirst" position="left">
			<view v-if="bitmap" class="all-good">
				<my-profile v-for="(item,index) in list" :key="index" :wares="item" class="single_good"></my-profile>
			</view>
			<view v-else class="bitmap">
				<view style="height:150rpx;"></view>
				<image src="../../static/img/no_content.svg" mode="aspectFit"></image>
				<view class="center gray_font">暂时没有商品，请耐心等候</view>
			</view>
		</v-tabs-column>



	</view>
</template>

<script>
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;
	import tabs2 from '../../components/v-tabs-column/v-tabs-column.vue';
	
	export default {
		components: {
			tabs2
		},
		data() {
			return {
				kind:0,
				cateId: '',
				page: 1,
				firstCate: [],
				secondCate: [],
				moreSecond: true,
				bitmap: true,
				activeTab: 0,
				list: [],
				cartware: [],
				index: '',
			};
		},
		methods: {
			//查找索引
			findIndex(obj, dest) {
				for (let i in obj) {
					if (obj[i].id == dest) {
						return i
					}
				}
			},
			//一级分类
			goodCate() {
				let {
					classId
				} = getApp().globalData;
				this.$get(this.$api.goodCate, {}, (res) => {
					let {
						data
					} = res;

					if (data.code == 1) {
						//返回索引
						let index = this.findIndex(data.data, classId);
						this.kind = index ? index : 0;
						this.firstCate = data.data;
						this.cateId = classId ? classId : data.data[0].id;
						this.goodSecondCate();
						this.getGood();
					}
				})
			},
			//二级分类
			goodSecondCate() {
				this.activeTab = 0;
				this.$get(this.$api.goodChild_cate, {
					cate_id: this.cateId
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						let arr = [{
							name: '全部',
							id: this.firstCate[this.kind].id
						}]
						arr.push(...data.data);
						this.secondCate = arr;
					}
				})
			},
			//分类商品
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
						this.list = this.list.concat(data.data);
						if (this.page == 1) {
							this.bitmap = data.data.length ? true : false;
						}
					}

				}, true)
			},

			// 切换一级分类
			changeFirst(index) {
				this.page = 1;
				this.list = [];
				this.cateId = this.firstCate[index].id;
				this.kind = index;
				this.moreSecond = true;
				this.goodSecondCate();
				this.getGood();
			},
			// 切换二级分类
			changeSecond(index) {
				this.page = 1;
				this.list = [];
				this.activeTab = index;
				this.cateId = this.secondCate[index].id;
				this.getGood();
			},
		},
		onShow() {
			if (app.isReload) {
				this.page=1;
				this.list = [];
				this.firstCate=[];
				this.goodCate();
			}
		},
		onHide() {
			getApp().globalData.isReload = false;
			getApp().globalData.classId="";
		},
		onReachBottom() {
			this.page++;
			this.getGood();
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

	}

	.classify .first_name {
		position: fixed;
		z-index: 5;
		/* padding-right: 20rpx; */
		width: 73.5%;
		background: white;

		.second-cate {
			margin-right: 40rpx;
			display: flex;

			flex: 1;
			align-items: center;
		}
	}

	.classify .left_area {
		width: 24.5%;
		position: fixed;
		overflow-x: scroll;
		background: #eee;
		height: 100vh;
	}

	.classify .left_area::-webkit-scrollbar {
		display: none;
	}

	.classify .right_area {
		width: 72%;
		margin-left: 26.8%;

		.second-mask {
			position: fixed;
			width: 73.5%;
			right: 0;
			background: rgba(0, 0, 0, 0.4);
			height: 100vh;
			z-index: 999;
		}
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
		width: 8rpx;
		height: 100rpx;
		position: absolute;
		left: 0;
		border-radius: 2rpx;
	}

	.mp_tab_width {
		width: 96%;
		height: 50rpx;
		padding-bottom: 6rpx;
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
		width: 100%;
		height: 500rpx;
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



	.classify .all-second {
		padding-bottom: 20rpx;
		background: white;



		text {
			background: #eee;
			border-radius: 10rpx;
			color: #999;
			margin-left: 10rpx;
			padding: 8rpx 23rpx;
			font-size: 22rpx;
			margin-top: 10rpx;
			display: inline-block;

		}

		.second_active {
			background: #E9FFDD;
			color: #57B127;
		}
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
		border-radius: 10rpx;
		color: #999;
		margin-left: 10rpx;
		padding: 2rpx 23rpx;
		font-size: 22rpx;
	}

	/deep/ .is-active {
		background: #E9FFDD;
		// border: 1px solid #57B127;
	}

	/deep/ .s-tabs-nav-wrap .s-tab-nav-view {
		height: 40rpx;
	}
</style>
