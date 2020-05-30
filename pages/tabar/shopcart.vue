<template>
	<view class="shopcart">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		
		<!-- #endif -->
		
		<view class="cart_buy">
			<view style="height:10px;background-color: #F8F6F9;"></view>
			<!-- 送货地址 -->
			<view class="deliver_address" @click="deliveryPage">
				<view>
					<text class="weight nickname">123</text>
					<text>123456789</text>
				</view>
				<view class="detail_address">
					<view class="align_center dizhi">
						<image src="../../static/img/dizhi.png" mode=""></image>
						<text>红谷滩陆地</text>
					</view>
					<view><uni-icons type="arrowright" size="18" color="gray"></uni-icons></view>
				</view>
			</view>
			<!-- 下单时间段 -->
			<view class="order_time align_center">
				<image src="../../static/img/clock.gif" mode=""></image>
				<text class="red_font">请在( 08:00:00 - 20:00:00 )之间下单</text>
			</view>
			<view class="select_info">
				<view>
					<view class="weight">子账号</view>
					<view class="gray_font">
						当前账号
						<uni-icons type="arrowright" size="18" color="gray"></uni-icons>
					</view>
				</view>
				<view>
					<view class="weight">配送日期</view>
					<view class="gray_font">
						当前账号
					<uni-icons type="arrowright" size="18" color="gray"></uni-icons>
					</view>
				</view>
				<view>
					<view class="weight">配送时间</view>
					<view class="gray_font">
						当前账号
						<uni-icons type="arrowright" size="18" color="gray"></uni-icons>
					</view>
				</view>
				<view>
					<view class="weight">商品列表</view>
					<view class="gray_font">
						单品备注
					<uni-icons type="arrowright" size="18" color="gray"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 价格信息 -->
			<view class="price_info">
				<view>
					<view class="weight">现金劵</view>
					<view class="gray_font">
						当前账号
					<uni-icons type="arrowright" size="18" color="black"></uni-icons>
					</view>
				</view>
				<view>
					<view class="weight">小计</view>
					<view class="weight">50.0</view>
				</view>
				<view>
					<view class="weight">运费</view>
					<view class="weight">45646</view>
				</view>
			</view>
			<!-- 备注 -->
			<view class="remark">
				<text class="weight ">备注</text>
				<textarea placeholder="请告诉我们需要注意的地方" placeholder-style="font-size:28rpx;"></textarea>
			</view>
			<!-- 下单 -->
			<view class="order_method">
				<view class="flex_left_right active_info">
					<view>再满50元减20元</view>
					<view class="red_font">
						去凑单
						<text class="iconfont icon-jiantou"></text>
					</view>
				</view>
				<view class="flex_left_right price_order">
					<view class="flex total_price">
						<view class="cart_num">
							<view class="gray_font">共12345678件</view>
							<view class="gift_num">(含赠品12345件)</view>
						</view>
						<view>
							<view>
								<text class="weight">合计</text>:<text class="red_font"> ¥12345678.00</text></view>
							<view class="real_price">#808080</view>
						</view>
					</view>
					<view class="determine">确认下单</view>
				</view>
			</view>
		</view>
		<view></view>
			<!-- <my-tabar tabarIndex=2></my-tabar> -->
	</view>
</template>

<script>
	export default{
		methods:{
			deliveryPage(){
				uni.navigateTo({
					url:"/pages/shopcart/delivery"
				})
			}
		}
	}
</script>

<style>
.shopcart .cart_buy > view {
	background: white;
}
.shopcart .cart_buy .icon-jiantou {
	font-weight: 800;
	font-size: 20rpx;
}
.shopcart .cart_buy > view:nth-child(n + 3) {
	margin-top: 5px;
}
.shopcart .cart_buy .gray_font {
	display: flex;
}
.deliver_address {
	padding: 10rpx 20rpx;
}

/* #ifdef MP-WEIXIN */
.deliver_address {
	margin-top: 0 !important;
}
/* #endif */
.deliver_address .nickname {
	font-size: 40rpx;
	margin-right: 10rpx;
}
.deliver_address .icon-jiantou {
	font-size: 30rpx !important;
	color: #808080;
}
.deliver_address image {
	width: 38rpx;
	height: 38rpx;
	margin-right: 10rpx;
}
.deliver_address .detail_address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5rpx 0;
}
.deliver_address .dizhi {
	display: flex;
	align-items: center;
}
.order_time {
	padding: 0 !important;
	background: #f8f6f9 !important;
	height: 60rpx;
}
.order_time image {
	width: 60rpx;
	height: 40rpx;
}
.select_info > view,
.price_info > view {
	padding: 0rpx 20rpx;
	display: flex;
	justify-content: space-between;
	height: 68rpx;
	line-height: 58rpx;
}
.remark {
	display: flex;
	padding: 15rpx 20rpx !important;
}

.order_method .active_info {
	padding: 5rpx 20rpx;
	background: rgba(173, 219, 140, 0.2);
}
.order_method .price_order {
	height:90rpx;
}
.order_method .total_price {
	padding-left: 20rpx;
	width: 70%;
}
.order_method .determine {
	height: 100%;
	line-height: 90rpx;
	background: red;
	color: white;
	width: 30%;
	text-align: center;
	font-size:32rpx;
}
.order_method .gift_num{color: #009A44;font-size: 20rpx;}
.order_method .cart_num {margin-right: 20rpx;}
.order_method .real_price{color:#808080;text-decoration: line-through;font-size: 20rpx;text-indent: 70rpx;}
/* #ifdef APP-PLUS |MP-WEIXIN */
.order_method {
	position: fixed;
	bottom: 0px;
	width: 100%;
}
/* #endif */
/* #ifdef H5 */
.order_method {
	position: fixed;
	width:100%;
	bottom:var(--window-bottom);
}
/* #endif */
</style>
