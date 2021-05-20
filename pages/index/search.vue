<template>
	<view class="search_list">
		<view class="fixed">
			<view class="input_key">
				<view class="right_area align_center">
					<view class="select_key align_center">
						<text class="iconfont new-icon fs-18">&#xe615;</text>
						<input v-model="keyword" placeholder="搜索你想知道的" @focus="focus" placeholder-class="place_style"
							class="keyword" />
						<text class="iconfont iconyuyin" style="width: 60rpx;" @click="speed"></text>
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


		<view :style="{'height':showSearch?'120rpx':'130rpx'}"></view>
		<!-- 热门搜索 -->
		<view class="hot_search" v-if="showSearch">
			<!-- <view>
				<view class="title flex_left_right">
					<text class="fs-13 bold"> 历史记录</text>
					<text class="iconfont delete" @click="deleteHistory">&#xe626;</text>
				</view>
				<view class="key_tag">
					<text v-for="(item, index) in keyList" :key="index"
						@click="searchList(item.keywords)">{{item.keywords}}</text>
				</view>
			</view> -->
			<view>
				<view class="title fs-13 bold">猜你喜欢</view>
				<view class="key_tag"><text v-for="(item, index) in keyList" :key="index"
						@click="searchList(item)">{{item}}</text></view>
			</view>
		</view>

		<!-- 搜索结果 -->
		<view class="search_result" v-else>
			<view class="recomend" style="margin-top:20rpx;">
				<view class="body">
					<my-recomend v-for="(item, index) in list" :key="index" :ware="item" @showCart="openCart(item)"
						class="myc_recomend"></my-recomend>
				</view>
			</view>

			<view class="search_bitmap" v-if="bitmap">
				<image class="bitmap" src="../../static/img/searchbitmap.png" mode="aspectFit"></image>
				<view class="gray_font fs-15">抱歉，没有相关商品哦~</view>
			</view>
		</view>

		<uni-popup ref="speech" type="bottom">
			<view class="lang_search">
				<text class="iconfont icon-X" @click="$refs.speech.close()"></text>

				<view style="display: flex;justify-content: center;align-items: center;height: 371rpx;">
					<view v-if="startSpeech" class="correct">
						<view>正在倾听</view>
						<view>请说出你想要的的内容</view>
					</view>
					<view v-else class="error_txt">
						<view>没有听清,请重试</view>
						<view>点击说话</view>
						<view style="height: 40rpx;line-height: 14rpx;">
							<!-- <uni-icons type="arrowdown" size="18" color="#009943"></uni-icons> -->
						</view>
						<view style="margin-top:10rpx;" @click="speed">
							<!-- <uni-icons type="mic-filled" size="40" color="white" class="mic_filled"></uni-icons> -->
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
				keyList: [],
				list: [],
				keyword: '',
				page: 1,
				showSearch: true,
				startSpeech: true,
				config: [],
				bitmap: false,
				arrObj: {},
				index: '',
				cartware: {}
			}
		},
		methods: {
			deleteHistory() {
				uni.showModal({
					title: '提示',
					content: '确定清空历史记录吗？',
					confirmColor: '#57B127',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			submit() {
				this.searchList(this.keyword);
			},
			focus() {
				this.keyword = '',
					this.showSearch = true;
			},
			// 搜索列表
			searchList(key) {
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
			speed() {
				var plugin = requirePlugin("WechatSI");
				console.log(plugin)
				let manager = plugin.getRecordRecognitionManager()
				manager.onRecognize = function(res) {
				    console.log("current result", res.result)
				}
				manager.onStop = function(res) {
				    console.log("record file path", res.tempFilePath)
				    console.log("result", res.result)
				}
				manager.onStart = function(res) {
				    console.log("成功开始录音识别", res)
				}
				manager.onError = function(res) {
				    console.error("error msg", res.msg)
				}
				manager.start({duration:30000, lang: "zh_CN"});
				return
				this.$refs.speech.open();
				let that = this;
				that.startSpeech = true;
				const recorderManager = uni.getRecorderManager();

				const options = {
					duration: 3000, //指定录音的时长，单位 ms
					sampleRate: 16000, //采样率
					numberOfChannels: 1, //录音通道数
					encodeBitRate: 96000, //编码码率
					format: 'mp3', //音频格式，有效值 aac/mp3
					frameSize: 50, //指定帧大小，单位 KB
				}

				recorderManager.start(options)

				recorderManager.onStop((res) => {
					
					var audio = res.tempFilePath;
					uni.uploadFile({
						url: app.rootUrl + "/mobileOrder/voiceSearch",
						filePath: audio,
						method: 'POST',
						name: 'audio',
						header: {
							'content-type': 'multipart/form-data',
						},
						formData: {
						
							audio: audio,
						},
						success: function(reg) {
							console.log(JSON.parse(reg.data))
							var reg = JSON.parse(reg.data)

							if (reg.code == 200) {
								that.keyword = reg.data.message.replace(/。/g, '');
								that.showSearch = false;
								that.$refs.speech.close();
								that.searchList(that.keyword);
							}
							if (reg.code == 501) {
								that.startSpeech = false;
							}
						},
						fail: function() {
							that.startSpeech = false;
							console.log("语音识别失败");
						}
					})
				});
			},
		},
		onShow() {
			this.hotSearch()
		}
	}
</script>

<style scoped>
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
		margin: 20rpx 38rpx 0 0;
	}

	.search_list .search_bitmap {
		margin-top: 10%;
		text-align: center;
	}

	.search_list .search_bitmap .bitmap {
		width: 47%;
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
		height: 50rpx;
		line-height: 50rpx;
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
