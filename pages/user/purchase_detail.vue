<template>
	<view class="">
		<uni-nav-bar left-icon="back" left-text="" title="详细记录" status-bar="true" fixed="true" @clickLeft="urlPage"></uni-nav-bar>
		<view class="bill_record">
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
							<view class="txt">
								【三斤装】                    
							</view>
						</view>
						
					</view>
					<view class="bottom">
		                    合计：<text>¥1000.00</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pur_list">
			<view class="item">
				<view class="left">
					<view class="time">
						2020-01-01
					</view>
					<view class="num">
						<text>数量：99斤</text>
						<text>单价：¥2.00</text>
					</view>
				</view>
				<view class="right">
					小计：¥198.00
				</view>
			</view>
		</view>
		
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
	export default {
		data() {
			return {
				imgUrl: app.imgUrl
			};
		},
		methods: {
			urlPage() {
				uni.navigateBack({
					delta: 1
				});
			},
		
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
			var that = this;
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			
		},
	};
</script>

<style>
	body {
		background: #FFFFFF;
	}

	.uni-searchbar__box {
		border-style: none !important;
	}

	.uni-searchbar {
		padding: 0 10px 20px;
		position: fixed !important;
		width: 94%;
	}
	.bill_record {
		background: #FFFFFF;
		padding: 10px 15px;
		border-top: 10px #F7F6F6 solid;
		border-bottom: 10px #F7F6F6 solid;
	}
	
	.bill_record .record_box {
		display: flex;
		align-items: center;
	}
	.bill_record .record_box .img{
		width: 100px;
		height: 80px;
		margin-right: 10px;
	}
	.bill_record .record_box .img image{
		width: 100px;
		height: 80px;
	}
	.bill_record .record_box .record_detail .top{
		display: flex;
		justify-content: space-between;
	}
	.bill_record .record_box .record_detail .top .left{
		width:80%;
	}
	.bill_record .record_box .record_detail .top .right{
		font-size: 12px;
	}
	.bill_record .record_box .record_detail .top .title{
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10px;
	}
	.bill_record .record_box .record_detail .top .txt{
		font-size: 12px;
		color: #C1C1C1;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
	}
	.bill_record .record_box .record_detail .top .txt:nth-child(2){
		color: #808080;
	}
	.bill_record .record_box .record_detail .bottom{
		margin-top: 10px;
		text-align: end;
		font-size: 14px;
	}
	.bill_record .record_box .record_detail .bottom text{
		color: #FF3E1E;
	}
	.pur_list .item{
		padding: 10px;
		border-bottom: 1px solid #F7F6F6;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.pur_list .item .time{
		margin-bottom: 5px;
	}
	.pur_list .item .num,.pur_list .item .right{
		font-size: 12px;
		color: #808080;
	}
	.pur_list .item .num text{
		margin-right: 10px;
	}
</style>
