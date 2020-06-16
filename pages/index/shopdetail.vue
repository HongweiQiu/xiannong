<template>
	<view class="shop_detail">
		<!-- <uni-nav-bar left-icon="arrowleft" status-bar="true" fixed="true" @clickLeft="leftClick"></uni-nav-bar> -->


		<view class="nab_title" :class="nav?'nab_title1':'nab_title2'">
			<view class="status_bar"></view>

			<view style="height:80rpx;line-height: 80rpx;" @click="leftClick">
				<uni-icons type="arrowleft" size="24" color="#1a1a1a" style="margin-left: 5rpx;"></uni-icons>
			</view>


		</view>
		<!-- 商品详情 -->
		<view class="good_info">
			<view style="display: flex;flex-direction: column;">
				<image class="good_img" :src="ware.img==''?imgRemote+ware.item_default:ware.img" mode="aspectFit"></image>
				<view class="active_time" v-if="ware.is_activity==1||attrspec.is_activity == 1">
					正在抢购
					<uni-countdown :hour="hours" :minute="minu" :second="second" :show-day="false" background-color="#f7c0b7" color="white"
					 splitor-color="white"></uni-countdown>
					结束
					<view class="remain_num">
						<block v-if="spec">
							<text v-if="attrspec.activity_num > attrspec.cart_num">剩余:{{ attrspec.activity_num - attrspec.cart_num }}件</text>
							<text v-else>剩余:0件</text>
						</block>
						<block v-else>
							<text v-if="ware.activity_num > ware.cart_num">剩余:{{ ware.activity_num - ware.cart_num }}件</text>
							<text v-else>剩余:0件</text>
						</block>
					</view>
				</view>
			</view>
			<view class="info">
				<view class="" >{{ware.title}}</view>
				<view class="gray_font" v-if="ware.desribe" >{{ware.desribe}}</view>
				<view class="align_center">
					<view v-for="(item, index) in ware.label" :key="index" class="red_tag">{{item}}</view>
					<view class="gift_info" style="">
						<view class="hidden">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
						<uni-icons type="arrowdown" size="28rpx" color="white" v-if="arrowDirect" @click="arrowDirect = false"></uni-icons>
						<uni-icons type="arrowup" size="28rpx" color="white" v-else @click="arrowDirect = true"></uni-icons>
					</view>
				</view>

				<!-- 满赠 -->
				<view class="gift_label" v-if="arrowDirect">新鲜的樱桃的樱桃的樱桃的樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱 桃</view>
				<!-- 满减 -->
				<view class="" v-if="ware.is_activity==2||attrspec.is_activity == 2">
					<text v-for="(item, index) in ware.activity_rule" :key="index" class="full_reduction">满{{item.price}}减{{item.reduce}}</text></view>

				<view class="judge_price twelve">
					<block v-if="token">
						<block v-if="ware.is_look==1">
							<block v-if="spec">
								<block v-if="attrspec.is_activity == 1">
									<view>
										<text class="red_font">￥{{attrspec.activity_price}}/{{attrspec.unit}}</text>
										<text class="line_through gray_font add_leftpx">{{attrspec.attr_price}}</text>
									</view>
								</block>
								<block v-else>
									<view class="red_font">
										￥{{attrspec.attr_price}}/{{attrspec.unit}}
									</view>
								</block>
							</block>
							<block v-else>
								<block v-if="ware.is_activity==1">
									<view>
										<text class="red_font">￥{{ware.activity_price}}/{{ware.unit}}</text>
										<text class="line_through gray_font add_leftpx">{{ware.price}}</text>
									</view>
								</block>
								<block v-else>
									<view class="red_font">
										￥{{ware.price}}/{{ware.unit}}
									</view>
								</block>
							</block>
						</block>
						<block v-else>
							<view class="red_font">
								￥***
							</view>
						</block>
					</block>
					<block v-else>
						<view class="red_font" v-if="spec">
							￥{{attrspec.attr_price}}/{{attrspec.unit}}
						</view>
						<view class="red_font" v-else>
							￥{{ware.price}}/{{ware.unit}}
						</view>
					</block>
				</view>
				<view class="cart_num">
					<view class="select_spec" v-if="spec">
						<view class="spec_name">选择规格</view>
						<view><text v-for="(item, index) in ware.attr" :class="kind == index ? 'active_spec' : 'inactive_spec'" @click="selectSpec(index)">{{item.attr_title}}</text></view>
					</view>
					<view class="flex_left_right buy_num">
						<text>购买数量</text>
						<my-stepper :val="value" min="1" @showKey="showKey"></my-stepper>
					</view>
				</view>
			</view>
			<view></view>
			<view></view>
		</view>
		<!-- 相似商品 -->
		<view class="simary" v-if="recommendLength">
			<view class="title">
				<text class="line_border"></text>
				<text>相似商品</text>
			</view>
			<view class="all_good">
				<view v-for="(item, index) in recommend.list" :key="index" @click="detailPage(item.id)" class="column">
					<view>
						<view class="column_img">
							<image :src="recommend.logo" mode="aspectFit" class="shuiyin1" v-if="recommend.logo&&recommend.shuiyin==1"></image>
							<image class="good_img" :src="item.img==''?imgRemote+recommend.item_default:item.img" mode="aspectFit"></image>
						</view>
						<view class="twelve">{{item.title}}</view>
					</view>

					<view>

						<view>
							<view class=""><text v-for="(item, index) in item.label" :key="index" class="red_tag">{{item}}</text></view>
							<view class="red_font twelve">
								<block v-if="token">
									<block v-if="recommend.is_look==1">
										￥{{item.price}}/{{item.unit}}
									</block>
									<block v-else>￥***</block>
								</block>
								<block v-else>
									￥{{item.price}}/{{item.unit}}
								</block>

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="picture_text_detail">
			<view class="title">
				<text class="line_border"></text>
				<text>图文详情</text>
			</view>
			<view class="">
				<view class="bitmap" v-if="!ware.info">
					<image src="../../static/img/no_content.png" mode="aspectFit"></image>
				</view>

				<view v-else v-html="ware.info"></view>
			</view>
		</view>
		<view style="height:50px;"></view>
		<!-- 加入购物车 -->
		<view class="is_add_cart">
			<view class="operateing">
				<view class="collect ">
					<!-- <text class="iconfont icon-alreadystar" style="color:orange;"></text> -->
					<text class="iconfont icon-xing center"></text>
					<text>收藏</text>

				</view>
				<view class="addcart_method">
					<view class="self_buy" @click="addCart">加入购物车</view>
					<view class="other_buy">立即购买</view>
				</view>
			</view>
		</view>
	<uni-popup ref="popup" type="bottom">
		<my-keyboard @cancelKey="$refs.popup.close()" :arrObj="ware" @toParent="toParent"></my-keyboard>
	</uni-popup>
	</view>
</template>

<script>
	// import uniNumberBox from "/components/uni-number-box/uni-number-box.vue
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
	export default {
		 // components: {uniNumberBox},
		data() {
			return {
				token: uni.getStorageSync('cdj_token'),
				kind: 0,
				arrowDirect: false,
				ware: [],
				recommend: [],
				recommendLength: '',
				value:1,
				id: '',
				hours: '0',
				minu: 0,
				second: 0,
				attrspec: '',
				spec: '',
				nav: false,
				imgRemote: imgRemote
			};
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				})
			},
			showKey() {
				this.$refs.popup.open();
			},
			selectSpec(index) {
				this.kind = index;
				this.attrspec = this.ware.attr[index];
				console.log(index)
			},
			getItem() {
				let {
					id
				} = this;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					id: id,
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				//单个商品详情
				rs.getRequests('getItemById', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.info = data.data.info;
						this.ware = data.data;
						if (data.data.attr.length > 0) {
							this.spec = true;
							this.attrspec = data.data.attr[0];
						} else {
							this.spec = false;
						}
						this.collect = data.data.collect_status;
						this.hours = data.data.panicActivity.timeRemain / 3600;
					}
				});
				// 推荐列表
				rs.getRequests('itemRecommend', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.recommend = data.data;
						if (data.data.list.length) {
							this.recommendLength = true;
						}
					} 
				});
			},
			detailPage(id) {
				uni.navigateTo({
					url: 'shopdetail?id=' + id
				});
			},
			addCart(){
		
			},
			toParent(e){
			
				log(this.value)
				this.value=e.val;
			}
			
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
		},
		onShow() {
			this.getItem();
		},
		onPageScroll(e) {
			if (e.scrollTop == 0) {
				this.nav = false;
			} else {
				this.nav = true;
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
		height: 60rpx;
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

	.shop_detail .good_info .good_img {
		width: 100%;
		height: 458rpx;
		margin-top: 20rpx;
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
		width: 180rpx;
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
		margin-right: 10rpx;
	}

	.shop_detail .simary .all_good {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: scroll;
	}
.shop_detail .simary .all_good .column{display: flex;flex-direction: column;justify-content: space-between;}
.shop_detail .simary .all_good .column .column_img{display: flex;flex-direction: column;}
	.shop_detail .simary .all_good .shuiyin1 {
		width: 60rpx;
		height: 20rpx;
	}

	.shop_detail .simary .all_good>view {
		width: 30%;
		flex-shrink: 0;
	}

	.shop_detail .simary .all_good::-webkit-scrollbar {
		display: none;
	}

	.shop_detail>view {
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

	.shop_detail .is_add_cart .addcart_method>view {
		height: 30px;
		padding: 0 20rpx;
		line-height: 30px;
	}

	.shop_detail .is_add_cart .addcart_method .self_buy {
		background: #addb8c;
		border-radius: 10rpx 0 0 10rpx;
	}

	.shop_detail .is_add_cart .collect {
		display: flex;
		flex-direction: column;
		color: #808080;

	}

	.shop_detail .is_add_cart .addcart_method .other_buy {
		background: #009a44;
		border-radius: 0 12rpx 12rpx 0;
	}

	.shop_detail .judge_price .add_leftpx {
		margin-left: 10rpx;
	}

	.shop_detail .nab_title {
		position: fixed;
		width: 100%;
		z-index: 2;
	}

	.shop_detail .nab_title1 {
		background: white !important;
		border-bottom: 1px solid #efefef;
	}

	.shop_detail .nab_title2 {
		background: transparent !important;
	}
</style>
