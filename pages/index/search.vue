<template>
	<view class="search_list">
		<!-- #ifdef APP-PLUS |H5 -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<!-- #endif -->
		<view class="input_key">
			<view class="arrow_left" @click="back">
				<uni-icons type="arrowleft" size="25"></uni-icons>
			</view>
			<view class="flex_left_right right_area">
				<view class="select_key align_center">
					<icon type="search" size="30rpx" />
					<input v-model="keyword" placeholder="请输入商品名称" @focus="focus" placeholder-class="place_style" class="keyword" />
					<uni-icons type="mic-filled" size="20" color="#808080" @click="speed"></uni-icons>
				</view>
				<view style="color:#009B44;" @click="submit">搜索</view>
			</view>
		</view>
		<view style="height:108rpx;"></view>
		<!-- 热门搜索 -->
		<view class="hot_search" v-if="showSearch">
			<view class="title">热门搜索</view>
			<view class="key_tag"><text v-for="(item, index) in keyList" @click="searchList(item.keywords)">{{item.keywords}}</text></view>
		</view>
		<!-- 搜索结果 -->
		<view class="search_result" v-else>
			<my-profile v-for="(item,index) in list" :ware="item" :config="config" :key="index"></my-profile>
			<!-- 占位图 -->
			<view class="search_bitmap" v-if="bitmap"><image class="bitmap" src="../../static/img/no_content.png" mode="aspectFit"></image></view>
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
		imgRemote
	} = app;
	// #ifdef H5
		var wx = require('jweixin-module');
	// #endif
	
	export default {
		data(){
			return {
				keyList:[],
				list:[],
				keyword:'',
				showSearch:true,
				config:[],
				bitmap:false
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			// 热门搜索
			getSearchData() {
			let timeStamp = Math.round(new Date().getTime() / 1000);
			let obj = {
				appid: appid,
				timeStamp: timeStamp
			};
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let params = Object.assign(
				{
					sign: sign
				},
				obj
			);
			rs.getRequests('getSearchData', params, res => {
				let data = res.data;
				if (data.code == 200) {
					this.keyList = data.data;
					
				} else {
					uni.showToast({
						title:data.msg,
						icon:'none',
						duration:2000
					});
				}
			});
		},
		submit(){
			this.searchList(this.keyword);
		},
		focus(){
			this.keyword='',
			this.showSearch=true;
		},
		// 搜索列表
		searchList(key) {
					this.list = [];
					console.log(key)
					let timeStamp = Math.round(new Date().getTime() / 1000);
					let obj = {
						appid: appid,
						timeStamp: timeStamp,
						keyword: key
					};
					let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
					let params = Object.assign(
						{
							sign: sign
						},
						obj
					);
					rs.getRequest('getSearchItem', params, res => {
						let data = res.data;
						if (data.code == 200) {
							this.keyword = key;
							this.showSearch = false;
							if (data.data.length != 0) {
								this.list = data.data.list;
								this.config = data.data;
								this.bitmap = false;
							} else {
								this.bitmap = true;
							}
						} else {
							uni.showToast({
								title:data.msg,
								icon:'none',
								duration:2000
							})
						}
					});
				},
		// #ifdef H5
		speed() {
			
			let that = this;
			
		        wx.startRecord({
		          success: function() {
		            recordTimer = setTimeout(() => {
		              wx.stopRecord({
		                success: function(res) {
		               that.wxuploadVoice(res.localId);
		                               clearTimeout(recordTimer);
		                },
		                fail: function(res) {
		                  alert(JSON.stringify(res));
		                }
		              });
		            }, 5000);
		          },
		          cancel: function() {
		            that.$toast('用户拒绝授权录音');
		          }
		        });
		},
		// #endif
			
		    wxuploadVoice(localId) {
			        var that = this;
			        //调用微信的上传录音接口把本地录音先上传到微信的服务器
			        //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
			        wx.uploadVoice({
			          localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
			          isShowProgressTips: 1, // 默认为1，显示进度提示
			          success: function(res) {
			            wx.downloadVoice({
			              serverId: res.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
			              isShowProgressTips: 1, // 默认为1，显示进度提示
			              success: function(res) {
			                var localId = res.localId; // 返回音频的本地ID
			                wx.translateVoice({
			                  localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
			                  isShowProgressTips: 1, // 默认为1，显示进度提示
			                  success: function(res) {
								  console.log(res)
			                    var transl = res.translateResult
			                    transl = transl.replace(/。/g, "");
			                    that.keyWord = transl;
			                    that.list = [];
			                    that.languagepd = true;
			                    that.searchItem();
			                  }
			                });
			              }
			            });
			          }
			        });
			      },
			wxConfig() {
				var timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("wxConfig", params, (response) => {
					if (response.code == 200) {
						wx.config({
							debug: true, // 开启调试模式
							appId: response.data.appId, // 必填，公众号的唯一标识
							timestamp: response.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
							signature: response.data.signature, // 必填，签名，见附录1
							jsApiList: [
								'checkJsApi',
								'startRecord',
								'stopRecord',
								'translateVoice',
								'downloadVoice',
								'uploadVoice'
							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
					}
				});
			}
		},
		onShow() {
			this.wxConfig();
			this.getSearchData();
		}
	}
</script>

<style>
	.search_list .input_key {
		position: fixed;
		width: 98%;
		background: white;
		height: 68rpx;
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20rpx;
	}

	.search_list .input_key .select_key {
		padding: 0 10rpx 0 20rpx;
		border-radius: 40rpx;
		background: #f7f6f6;
		width: 84%;
		height: 68rpx;
	}

	.search_list .input_key .arrow_left {
		width: 14%;
	}

	.search_list .input_key .right_area {
		width: 85%;
	}

	.search_list .input_key .select_key .keyword {
		width: 100%;
	}

	.search_list .hot_search {
		position: fixed;
		height: calc(100vh - 108rpx);
		background: white;
		width: 100%;
		padding: 0 20rpx;
	}

	.search_list .hot_search .title {}

	.search_list .hot_search .key_tag {
		display: flex;
		flex-wrap: wrap;
	}

	.search_list .hot_search .key_tag text {
		border-radius: 3px;
		color: grey;
		padding: 0 6rpx;
		background: #f2f2f2;
		margin: 20rpx 20rpx 0 0;
	}

	.search_list .search_bitmap {
		margin-top: 25%;
		text-align: center;
	}

	.search_list .search_bitmap .bitmap {
		width: 47%;
	}

	.search_list .search_result .my_profile {
		margin-bottom: 10rpx;
	}
</style>
