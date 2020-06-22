<template>
	<view class="">
		<uni-nav-bar left-icon="back" left-text=""title="购买记录" status-bar="true" fixed="true" @clickLeft="urlPage"></uni-nav-bar>
		<!-- <uni-search-bar :radius="100" @="search" cancelButton="none" placeholder="请选择日期"></uni-search-bar> -->
		<view class="bill_search" @click="open">
			<view class="search_date">
				<van-icon name="search" color="gray" />
				<text v-if="!date">请选择日期</text>
				<text v-else>{{date}}</text>
				
			</view>
			<view class="total_box">
				合计：<text>¥1000.00</text>
			</view>
			
		</view>

		<view style="height:50px;">   

		</view>
		<view class="bill" v-if="bitmap">
			<view v-for="(item, index) in list" class="bill_record" @click="billdetail(item.id)">
				<view class="record_box">
					<view class="img">
						<image :src="imgUrl+'img/nullcart.png'" alt=""></image>
						<!-- <van-image use-error-slot :src="item.item_img==''?imgRemote+orderInfo.item_default:item.item_img" width="100px"
						 height="80px" fit="contain">
							<van-image width="100px" height="80px" fit="contain" slot="error" :src="imgRemote+orderInfo.item_default"></van-image>
						</van-image> -->
					</view>
					<view class="record_detail">
						<view class="top">
							<view class="left">
								<view class="title">
									红色山东苹果红色山东约500g红  
								</view>
								<view class="txt">
									描述描述描述描述描述描述描述描述描
									描述描述描述描述描述描述描述描述描                         
								</view>
							</view>
						</view>
						<view class="bottom">
                                共:100.20个 小计:120.20元 
						</view>
					</view>
				</view>
			</view>
			<view class="loading__text" v-if="loading != '空'">
				<van-loading size="20rpx" text-size="20rpx" v-if="loading==true">正在加载...</van-loading>
				<view v-if="loading==false">已经到底了！</view>
			</view>
		</view>
		<view v-else class="bitmap">
			<image src="../../static/img/no_record.png" mode="aspectFit"></image>
		</view>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" :range="true" @confirm="confirm"></uni-calendar>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	//引入组件
	let app = getApp().globalData
	const md5 = require('../../components/md5.js');
	const rs = require('../../components/request.js')
	let {
		appid,
		appsecret,
		imgRemote
	} = app;
	import Toast from '../../wxcomponents/vant/toast/toast';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				imgUrl: app.imgUrl,
				imgRemote:imgRemote,
				date: '',
				dateArr: '',
				bitmap: true,
				list: [],
				page: 1,
				loading: false,
			};
		},
		methods: {
			urlPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			billdetail(id) {
				uni.navigateTo({
					url: 'purchase_detail?id='+id
				});
			},
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				if (!e.range.before || !e.range.after) {
					Toast("请选择正确的日期区间")
				}else{
					this.date = e.range.before + ',' + e.range.after;
					this.dateArr = e.range.before + ',' + e.range.after;
					this.list = [];
					this.moneyList()
				}
				
			},
			/**
			 * 账单列表
			 */
			moneyList() {
				var that = this;
				var time = JSON.stringify(that.dateArr);
				if (time == "请选择日期") {
					time = '';
				} else {
					time = JSON.stringify(that.dateArr);
				}
				var page = 1;
				var num = 20
				var date = time;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				var data = {
					appid: appid,
					timeStamp: timeStamp,
					sign: sign,
					page: 1,
					date_str: date,
					num: 20,
				}
				// let params = Object.assign({
				// 	dateArr: date,
				// 	sign: sign,
				// 	page: this.page
				// }, obj)
				that.list = [];
				rs.getRequest("moneyListPaginate", data, (res) => {
					
					if (res.data.code == 200) {
						if (res.data.data.list != '') {
							that.bitmap = true;
							for(var i=0;i<res.data.data.list.length;i++){
								that.list.push(res.data.data.list[i]);
							}
							if (that.list.length < 20) {
								this.loading = false;
							} else {
								this.loading = true;
							}
						} else {
							this.loading = '空';
							that.bitmap = false;
						}
					} else {
						this.loading = '空';
						Toast(res.data.msg)
					}
				})
			},
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
			var that = this;
			that.moneyList()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			var that = this;
			var time = that.dateArr;
			if (time == "请选择日期") {
				time = '';
			} else {
				time = that.dateArr;
			}
			var page = that.page;
			var num = 20;
			var date = time;
			var timeStamp = Math.round(new Date().getTime() / 1000);
			var obj = {
				appid: appid,
				timeStamp: timeStamp,
			}
			var sign = md5.hexMD5(rs.objKeySort(obj) + app.globalData.appsecret);
			var data = {
				appid: appid,
				timeStamp: timeStamp,
				sign: sign,
				page: page + 1,
				date: date,
				num: 20
			}
			rs.getRequest("moneyListPaginate", data, (res) => {
				if (res.data.code == 200) {
					var moneyList = that.data.moneyList;
					if (res.data.data.moneyList != '') {
						for(var i=0;i<res.data.data.moneyList.length;i++){
							this.list.push(res.data.data.moneyList[i]);
						}
						this.page = page + 1;
						this.loading = true;
					}else{
						this.loading = false;
					}
				}
			})

		},
	};
</script>

<style>
	body {
		background: #f7f7f7;
	}

	.uni-searchbar__box {
		border-style: none !important;
	}

	.uni-searchbar {
		padding: 0 10px 20px;
		position: fixed !important;
		width: 94%;
	}
	.total_box{
		background: #FFFFFF;
		text-align: end;
		padding: 10px 0 0 0;
	}
	.total_box text{ 
		color: #FF3E1E;
	}
	.bill {
		margin-top: 25px;
	}
	
	.bill .bill_record {
		background: #FFFFFF;
		padding: 10px 15px;
		margin: 10px 0;
	}
	
	.bill .bill_record .record_box {
		display: flex;
		align-items: center;
	}
	.bill .bill_record .record_box .img{
		width: 100px;
		height: 80px;
		margin-right: 10px;
	}
	.bill .bill_record .record_box .img image{
		width: 100px;
		height: 80px;
	}
	.bill .bill_record .record_box .record_detail .top{
		display: flex;
		justify-content: space-between;
	}
	.bill .bill_record .record_box .record_detail .top .left{
		width: 90%;
	}
	.bill .bill_record .record_box .record_detail .top .right{
		font-size: 12px;
	}
	.bill .bill_record .record_box .record_detail .top .title{
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10px;
	}
	.bill .bill_record .record_box .record_detail .top .txt{
		font-size: 12px;
		color: #808080;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
	}
	.bill .bill_record .record_box .record_detail .bottom{
		color: #808080;
		margin-top: 10px;
		text-align: end;
		font-size: 12px;
	}
	

	.bitmap {
		text-align: center;
		margin-top: 20%;
	}

	.bitmap image {
		width: 50%;
	}

	.bill_search {
		position: fixed;
		padding: 0 14px;
		background: white;
		height: 70px;
		width: 93%;
	}

	.search_date {
		border-radius: 40px;
		background: #f7f6f5;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		line-height: 40px;
	}

	.loading__text {
		padding: 10px 0;
	}
</style>
