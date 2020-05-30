<template>
	<view class="order">
		<view class="order_top">
			<uni-nav-bar right-icon="more-filled" right-text="菜单" :title="orderTitle" :status-bar="navBar" fixed="true" @clickRight="rightClick"></uni-nav-bar>
			<view class="account_info">
				<!-- 选择账号 -->
				<view class="select_account">
					<view>选择子账号:</view>
					<view>
						<text>当前账号</text>
						<uni-icons type="arrowright" size="18"></uni-icons>
					</view>
				</view>
				<view class="">
					<my-s-tabs slot-title @change="changeFirst" v-model="activeTab"  class="custom-tabs">
						<my-s-tab v-for="(item, index) of orderList" :key="index">{{ item.name }}</my-s-tab>
					</my-s-tabs>
				</view>
			</view>
			<view class="order_statu" v-if="showOrderType">
				<view class="mask" @click="showOrderType=false"></view>
				<view class="operate">
					<view class="all_order">全部订单</view>
					<view>未支付</view>
				</view>
			</view>
			<view style="height:156rpx;"></view>
		</view>
		<view class="order_info">
			<view class="content">
				<view v-for="(item, index) in 20" :key="index">
					<view>DD订单编号：DD2020011000000001</view>
					<view class="flex detail" @click="orderDetailPage">
						<image class="order_img" src="../../static/img/addcart.png" mode=""></image>
						<view>
							<view class="">
								<text>小白菜</text>
								<text class="gray_font">(dasfadsfsadf)</text>
							</view>
							<view class="">配送时间:45443</view>
							<view class="flex">
								<view>
									实付:
									<text class="red_font">￥7.00</text>
								</view>
								<view>
									应付:
									<text class="red_font">￥7.00</text>
								</view>
							</view>
							<view class="">下单时间:5465413</view>
						</view>
					</view>
					<view class="order_option">
						<text class="another_order">再来一单</text>
						<text class="look_logist">查看物流</text>
						<text class="cancel_order">取消订单</text>
						<text class="confirm_good">确认收货</text>
					</view>
				</view>
				<my-loading :loading="load"></my-loading>
			</view>

			<view class="bitmap"></view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderTitle: '全部订单',
			load:true,
			// #ifdef H5|APP-PLUS
			navBar: true,
			// #endif
			// #ifdef MP-WEIXIN
			navBar: false,
			// #endif
			orderList: [{ name: '待审核' }, { name: '备货中' }, { name: '配送中' }, { name: '已收货' }, { name: '已取消' }],
			activeTab: 6,
			showOrderType:false
		};
	},
	methods: {
		changeFirst() {},
		rightClick(){
		
			this.showOrderType=true;
		},
		orderDetailPage(){
			uni.navigateTo({
				url:'/pages/order/orderdetail'
			})
		}
	}
};
</script>

<style lang="scss">
.order .select_account {
	border-bottom: 1px solid #efefef;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 65rpx;
	padding-right: 18rpx;
}
.order .account_info {
	border-top: 10rpx solid #efefef;
	background: white;
	position: fixed;
	width: 100%;
	z-index: 2;
}
.order .s-tabs-nav-wrap .s-tab-nav-view {
	height: 100%;
	display: flex;
	justify-content: space-around;
}
.order .order_option {
	border-top: 1px solid #efefef;
	height: 60rpx;
	line-height: 60rpx;
	text-align: right;
}
.order .order_option text {
	border-radius: 20rpx;
	padding: 0 12rpx;
	margin-left: 20rpx;
	font-size: 24rpx;
}
.order .another_order {
	background: rgb(173, 219, 140);
	color: white;
}
.order .look_logist {
	background: rgb(2, 177, 228);
	color: white;
}
.order .cancel_order {
	background: white;
	color: rgb(128, 128, 128);
	border: 1px solid rgb(128, 128, 128);
}
.confirm_good {
	background: red;
	color: white;
	border: 1px solid red;
}
.order .order_top {
}
.order .order_img {
	width: 200rpx;
	height: 160rpx;
	margin-right: 20rpx;
}
.order .order_info .content > view:nth-last-child(n + 2) {
	background: white;
	margin-bottom: 10rpx;
	padding: 0 20rpx;
}
.order .order_info .content .detail {
	padding: 20rpx 0 20rpx 20rpx;
	border-top: 1px solid #efefef;
}
.order .order_statu .mask{
	position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 999;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,.5);
}
.order .order_statu .operate{
	margin-top: 10rpx;
	padding: 2px 0 0;
	z-index: 9999;
	border-radius: 2px;
	position: fixed;
	right: 20rpx;
	color: #1ea55a;

	background: #fff;
	width: 25%;
}
.order .order_statu .operate>view{
	height:64rpx;
	line-height: 64rpx;
	text-align: center;
}
.order .order_statu .operate .all_order{border-bottom: 1px solid #efefef;}
 .order .custom-tabs {
    /deep/.s-tab-nav-view {
      display: flex;
      justify-content: space-between;
      
    }
  }
</style>
