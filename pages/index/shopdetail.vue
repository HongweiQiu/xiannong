<template>
	<view class="shop_detail">
		<!-- <uni-nav-bar left-icon="more-filled"   status-bar="true" fixed="true" @clickLeft="LeftClick"></uni-nav-bar>
		
		 -->
		
		 <view class="" style="background: white;position: fixed;width: 100%;z-index: 2;">
			 <view class="status_bar"></view>
		 	<uni-icons type="arrowleft" size="24" color="#1a1a1a" style="margin-left: 5rpx;"></uni-icons>
		 	
		 </view>
		<!-- 商品详情 -->
		<view class="good_info">
			<view>
				<image src="../../static/img/classify_green.png" mode=""></image>
				<view class="active_time">
					正在抢购
					<uni-countdown :hour="1" :minute="12" :second="40"></uni-countdown>
					结束

					<view class="remain_num">剩余:2000件</view>
				</view>
			</view>
			<view class="info">
				<view class="">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
				<view class="gray_font">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
				<view class="align_center">
					<view v-for="(item, index) in 3" :key="index" class="red_tag">爆品</view>
					<view class="gift_info" style="">
						<view class="hidden">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
						<uni-icons type="arrowdown" size="28rpx" color="white" v-if="arrowDirect" @click="arrowDirect = false"></uni-icons>
						<uni-icons type="arrowup" size="28rpx" color="white" v-else @click="arrowDirect = true"></uni-icons>
					</view>
				</view>

				<!-- 满赠 -->
				<view class="gift_label" v-if="arrowDirect">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
				<!-- 满减 -->
				<view class=""><text v-for="(item, index) in 3" :key="index" class="full_reduction">满三四减30</text></view>

				<view class="judge_price"><text class="red_font">¥54.26/个</text></view>
				<view class="cart_num">
					<view class="select_spec">
						<view class="spec_name">选择规格</view>
						<view><text v-for="(item, index) in 4" :class="kind == index ? 'active_spec' : 'inactive_spec'" @click="selectSpec(index)">小樱桃</text></view>
					</view>
					<view class="flex_left_right buy_num">
						<text>购买数量</text>
						<my-stepper></my-stepper>
					</view>
				</view>
			</view>
			<view></view>
			<view></view>
		</view>
		<!-- 相似商品 -->
		<view class="simary">
			<view class="title">
				<icon class="line_border"></icon>
				<text>相似商品</text>
			</view>
			<view class="all_good">
				<view v-for="(item, index) in 6" :key="index">
					<view class=""><image src="../../static/img/addcart.png" mode="" class="good_img"></image></view>
					<view>
						<view>大葡萄大葡葡萄 大葡萄500g</view>
						<view>
							<view class=""><text v-for="(item, index) in 3" :key="index" class="red_tag">爆品</text></view>
							<view class="red_font">¥54.26/个</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="picture_text_detail">
			<view class="title">
				<icon class="line_border"></icon>
				<text>图文详情</text>
			</view>
			<view class="">
				<view class="bitmap"><image src="../../static/img/no_content.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<!-- 加入购物车 -->
		<view class="is_add_cart">
			<view class="operateing">
				<view class="collect ">
					<!-- <uni-icons type="star" color="gray"></uni-icons> -->
					<uni-icons type="star-filled" color="orange"></uni-icons>

					<text>收藏</text>
					
				</view>
				<view class="addcart_method">
					<view class="self_buy">加入购物车</view>
					<view class="other_buy">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			kind: 0,
			arrowDirect: false
		};
	},
	methods: {
		selectSpec(index) {
			this.kind = index;
		}
	}
};
</script>

<style>
.shop_detail .good_info .active_time {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f7c0b7;
	color: white;
}

.shop_detail .good_info .gift_info {
	background: red;
	width: 50%;
	display: flex;
	font-size: 10px;
	color: white;
	border-radius: 6rpx;
	padding: 0 1px;
}

.shop_detail .good_info .gift_label {
	font-size: 18rpx;
	color: #808080;
}
.shop_detail .good_info .judge_price {
	padding: 5rpx 0 20rpx;
}
.shop_detail .info {
	padding: 0 20rpx;
}
.shop_detail .info .full_reduction {
	color: #808080;
	border: 1px solid red;
	font-size: 20rpx;
	border-radius: 2px;
	margin-right: 10rpx;
	height: 10rpx;
	padding: 0 1px;
}
.shop_detail .select_spec .spec_name {
	height: 80rpx;
	line-height: 80rpx;
}
.shop_detail .select_spec text {
	border-radius: 10rpx;
	padding: 0 4rpx;
	margin-right: 10rpx;
}
.shop_detail .select_spec .active_spec {
	background: #87cd7c;
	color: white;
	border: #87cd7c 1px solid;
}
.shop_detail .select_spec .inactive_spec {
	background: ;
	color: #87cd7c;
	border: #87cd7c 1px solid;
}
.shop_detail .info .cart_num {
	border-top: 1px solid #f7f6f6;
}
.shop_detail .info .buy_num {
	height: 80rpx;
}
.shop_detail .good_info .remain_num {
	position: absolute;
	right: 20rpx;
	margin-top: 15rpx;
	font-size: 20rpx;
}
.shop_detail .simary .good_img {
	width: 140rpx;
	height: 120rpx;
}
.shop_detail .picture_text_detail {
	padding: 0 20rpx;
}
.shop_detail .simary {
	padding: 0 0 20rpx 20rpx;
}
.shop_detail .simary,
.shop_detail .picture_text_detail {
	margin-top: 10rpx;
}
.shop_detail .simary .title,
.shop_detail .picture_text_detail .title {
	display: flex;
	font-size: 28rpx;
	align-items: center;
	font-weight: 700;
	height: 80rpx;
}
.shop_detail .simary .title text,
.shop_detail .picture_text_detail .title text {
	margin-left: 10rpx;
}
.shop_detail .simary .all_good {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: scroll;
}
.shop_detail .simary .all_good > view {
	width: 30%;
	flex-shrink: 0;
}
.shop_detail .simary .all_good::-webkit-scrollbar {
	display: none;
}
.shop_detail > view {
	background: white;
}
.shop_detail .bitmap {
	text-align: center;
	padding: 25% 0 50%;
}
.shop_detail .bitmap image {
	width: 50%;
}
.shop_detail .is_add_cart {
	position: fixed;
	bottom: 0;

	width: 100%;
	background: white;
	border-top: 1px solid #e7f6f6;
	height: 50px;
}
.shop_detail .is_add_cart .operateing {
	display: flex;
	padding: 0 20rpx 0 35rpx;
	justify-content: space-between;
	align-items: center;
	height: 50px;
}
.shop_detail .is_add_cart .addcart_method {
	display: flex;
	color: white;
}
.shop_detail .is_add_cart .addcart_method > view {
	height: 30px;
	padding: 0 20rpx;
	line-height: 30px;
}
.shop_detail .is_add_cart .addcart_method .self_buy {
	background: #addb8c;
	border-radius: 10rpx 0 0 10rpx;
}
.shop_detail .is_add_cart .collect{display: flex;flex-direction: column;color: #808080;}
.shop_detail .is_add_cart .addcart_method .other_buy {
	background: #009a44;
	border-radius: 0 12rpx 12rpx 0;
}
</style>
