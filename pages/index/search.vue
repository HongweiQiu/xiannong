<template>
	<view class="search_list">
		<view class="fixed">
			<view class="input_key">
				<view class="right_area align_center">
					<view class="select_key align_center">
						<text class="iconfont new-icon fs-18">&#xe615;</text>
						<input v-model="keyword" placeholder="搜索你想知道的" @focus="focus" placeholder-class="place_style"
							class="keyword" />
						<text class="iconfont iconyuyin" style="width: 60rpx;" @click="$refs.speech.open()"></text>
					</view>
					<view style="color:#333;text-align: center;" class="bold" @click="submit">搜索</view>
				</view>
				<!-- 	<view class="flex_left_right fs-15 sort" v-show="!showSearch&&list.length">
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
				</view> -->
			</view>
		</view>


		<view :style="{'height':showSearch?'110rpx':'130rpx'}"></view>
		<!-- 热门搜索 -->
		<view class="hot_search" v-if="showSearch">
			<view v-if="historyList.length">
				<view class="title flex_left_right">
					<text class="fs-13 bold"> 历史记录</text>
					<text class="iconfont delete" @click="deleteHistory">&#xe626;</text>
				</view>
				<view class="key_tag">
					<text v-for="(item, index) in historyList" :key="index" @click="searchList(item)">{{item}}</text>
				</view>
			</view>
			<view style="padding:15rpx 0;" class=" fs-13 " v-if="keyList.length">
				<view class="title bold">热门搜索</view>
				<view class="key_tag"><text v-for="(item, index) in keyList" :key="index"
						@click="searchList(item)">{{item}}</text></view>
			</view>
		</view>

		<!-- 搜索结果 -->
		<view class="search_result" v-else>
			<view class="recomend" style="margin-top:20rpx;">
				<view class="body">
					<my-recomend v-for="(item, index) in list" :key="index" :ware="item" class="myc_recomend">
					</my-recomend>
				</view>
			</view>

			<view class="search_bitmap" v-if="bitmap">
				<image class="bitmap" src="../../static/img/searchbitmap.svg" mode="aspectFit"></image>
				<view class="gray_font fs-15">抱歉，没有相关商品哦~</view>
			</view>
		</view>

		<uni-popup ref="speech" type="bottom">
			<view class="lang_search">
				<text class="iconfont icon-X" @click="$refs.speech.close()"></text>

				<view style="display: flex;justify-content: center;align-items: center;height: 371rpx;">
					<!-- <view v-if="startSpeech" class="correct">
						<view>正在倾听</view>
						<view>请说出你想要的的内容</view>
					</view> -->
					<view class="error_txt" @touchstart="touchStart" @touchend="touchEnd">
						<!-- <view>没有听清,请重试</view>
						<view>点击说话</view>
						<view style="height: 40rpx;line-height: 14rpx;">
						</view> -->
						<view style="margin-top:10rpx;" class="flex-column">
							<text class="iconfont iconyuyin" :class="langStatu?'start-recorder':''"
								style="font-size: 90rpx;"></text>
							<text>长按识别语音</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var plugin = requirePlugin("WechatSI")
	let manager = plugin.getRecordRecognitionManager();
	const app = getApp().globalData;
	const {
		imgRemote
	} = app;

	export default {
		data() {
			return {
				sortIndex: 1,
				keyList: [],
				list: [],
				keyword: '',
				page: 1,
				showSearch: true,
				startSpeech: true,
				bitmap: false,
				historyList: [],
				langStatu: false
			}
		},
		methods: {
			deleteHistory() {
				this.$showModal('清空历史记录?', () => {
					this.$get(this.$api.goodsClear_history, {
						token: uni.getStorageSync('userToken')
					}, (res) => {
						let {
							data
						} = res;
						if (data.code == 1) {
							this.historyList = data.data
						}
					})
				})
			},
			submit() {
				this.searchList(this.keyword);
			},
			focus() {
				this.keyword = '',
					this.showSearch = true;
				this.searchHistory();
			},
			// 搜索列表
			searchList(key) {
				this.keyword = key;
				this.searchHistory();
				let params = {
					keyword: key,
					page: this.page
				}
				this.$get(this.$api.goodsList, params, res => {
					let data = res.data;
					if (data.code == 1) {

						this.showSearch = false;
						this.list = data.data;
						if (data.data.length == 0 && this.page == 1) {
							this.list = [];
							this.bitmap = true;
						} else {
							this.bitmap = false;
						}
					}
				});
			},
			hotSearch() {
				this.$get(this.$api.mainHotSearch, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.keyList = data.data
					}
				})
			},
			searchHistory() {
				this.$get(this.$api.goodsSearch_history, {
					token: uni.getStorageSync('userToken')
				}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						let newArr=new Set(data.data)
						this.historyList = Array.from(newArr);
					}
				})
			},
			touchStart: function() {
				this.langStatu = true;
				manager.start({
					duration: 60000,
					lang: "zh_CN"
				});
			},
			touchEnd: function() {
				manager.stop();
				this.langStatu = false;
				this.$refs.speech.close();
				manager.onStop = (res) => {
					this.keyword = res.result.replace(/。/g, '');
					this.searchList(this.keyword);
				}
			},
		},
		onShow() {
			this.hotSearch();
			this.searchHistory();
		},
		onLoad() {}
	}
</script>

<style scoped>
	.start-recorder {
		-webkit-animation: twinkling 1s infinite ease-in-out
	}

	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both
	}

	@-webkit-keyframes twinkling {
		0% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes twinkling {
		0% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}

	.search_list .input_key {
		position: fixed;
		width: 100%;
		z-index: 9;
		background: white;
	}

	.search_result {
		margin-bottom: 30rpx;
	}

	.search_list .input_key .select_key {
		padding: 0 10rpx 0 0rpx;
		border-radius: 30rpx;
		background: #eee;
		width: 600rpx;
		height: 60rpx;
		margin: 0 30rpx;
	}

	.search_list .input_key .arrow_left {
		width: 14%;
	}

	.search_list .input_key .right_area {
		padding: 30rpx 0;
	}

	.search_list .input_key .select_key .keyword {
		width: 100%;
		background: #eee;
	}

	.search_list .hot_search {
		/* position: fixed; */
		height: calc(100vh - 120rpx);
		background: white;
		/* width: 100%; */
		padding: 0 20rpx 0 30rpx;
	}


	.search_list .hot_search .key_tag {
		display: flex;
		flex-wrap: wrap;
	}

	.search_list .hot_search .key_tag text {
		border-radius: 20rpx;
		color: #333;
		padding: 2rpx 20rpx;
		background: #eee;
		font-size: 26rpx;
		margin: 16rpx 38rpx 10rpx 0;
	}

	.search_list .search_bitmap {
		margin-top: 10%;
		text-align: center;
	}

	.search_list .search_bitmap .bitmap {
		width: 69%;
	}

	.search_list .search_result .my_profile {
		margin-bottom: 10rpx;
	}

	.search_list .lang_search {
		background: white;
		border-radius: 10rpx 10rpx 0 0;
		height: 371rpx;
		color: #009943;
	}


	.search_list .lang_search .icon-X {
		position: absolute;
		right: 20rpx;
		text-align: right;
		color: gray;
		margin-top: 20rpx;

	}

	.search_list .lang_search .correct>view {
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.search_list .lang_search .error_txt>view {
		/* 	height: 50rpx;
		line-height: 50rpx;*/
		text-align: center;
	}


	.new-icon {
		padding: 0 9rpx 0 33rpx;
	}

	.delete {
		font-size: 44rpx;
		color: #999;
	}

	.sort {
		padding: 0rpx 60rpx 30rpx 60rpx;
	}

	.jiantou {
		font-size: 20rpx;
	}
</style>
