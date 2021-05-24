<template>
	<view class="remainder">
		<view class="money-info">
			<view class="account-money r-5 flex">
				<view class="first-ellipse"></view>
				<view class="two-ellipse"></view>
				<view class="three-ellipse"></view>
				<view class="bold  flex-column flex-full align_center flex-space-between" style="margin:72rpx 0;">
					<text>账号余额(元）</text>
					<text class="money">{{personInfo.money}}</text>
				</view>
			</view>
			<my-s-tabs effect slot-title @change="changeFirst" v-model="activeTab" class="custom-tabs" lineHeight='6'>
				<my-s-tab v-for="(item, index) of tabList" :key="index">{{ item.name }}</my-s-tab>
			</my-s-tabs>
		</view>
		<view style="height: 360rpx;"></view>
		<view>
			<view class="all-money" v-if="list.length">
				<view v-for="(item,index) in list" :key="index" class="border white_b sign">
					<view class="flex_left_right">
						<text>{{item.msg}}</text>
						<view>
							<text v-if="direct==1">-{{item.money}}</text>
							<view v-else class="align_center" style="color: orange;">
								<text>+</text>
								<text>{{item.money}}</text>
							</view>
						</view>

					</view>
					<view class="fs-11 gray_font">{{$fomartDate(item.createtime)}}</view>
				</view>
			</view>
			<view v-else class="bitmap flex-column align_center">
			
				<image src="../../static/img/remain_record.svg" mode="aspectFit"></image>
				<text class="fs-13 gray_font">没有明细记录哦~</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					name: '支出明细'
				}, {
					name: '收入明细'
				}],
				direct: 1,
				page: 1,
				list: [],
				personInfo: {}
			}
		},
		methods: {
			changeFirst(e) {
				this.direct = e + 1;
				this.list = [];
				this.page = 1;
				this.getList();
			},
			getList() {
				let params = {
					token: uni.getStorageSync('userToken'),
					direct: this.direct,
					page: this.page
				};
				this.$get(this.$api.userMoney_log, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.list = this.list.concat(data.data);
					} else {
						this.$Toast(data.msg);
					}
				}, true)
			},
			memberInfo() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.personInfo = data.data;
					}
				})
			}
		},
		onLoad() {
			this.memberInfo()
			this.getList()
		},
		onReachBottom() {
			this.page++;
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.remainder {
		height: 100vh;
		background: white;
		box-sizing: border-box;

		.money-info {
			position: fixed;
			width: 100%;
			background: white;
			padding-top: 30rpx;
		}

		.bitmap image {
			margin: 200rpx 0 0;
			width: 593rpx;
			height: 300rpx;
		}

		.account-money {
			margin: 0rpx 30rpx 10rpx;
			height: 240rpx;
			color: white;
			background: linear-gradient(90deg, #65BE35, #8AEB56);
			box-shadow: 8rpx 0 24rpx rgba(72, 161, 25, 0.2);

			.money {
				font-size: 40rpx;
			}
		}

		.first-ellipse {
			width: 111rpx;
			height: 90rpx;
			background: radial-gradient(rgba(131, 203, 92, 0.1), #91D16F);
			border-radius: 50rpx 100rpx 0 10rpx;
			position: absolute;
			margin-top: 150rpx;

		}

		.two-ellipse {
			width: 111.9rpx;
			height: 68.8rpx;
			background: linear-gradient(#7CC854, #92D270);
			border-radius: 0 0 400rpx 400rpx;
			position: absolute;
			margin-left: 136rpx;

		}

		.three-ellipse {
			width: 62.2rpx;
			height: 110.8rpx;
			background: linear-gradient(rgba(147, 237, 100, 0.1), #A9F083);
			border-radius: 400rpx 0 0 400rpx;
			position: absolute;
			right: 30rpx;
			margin-top: 53rpx;
		}
	}

	.custom-tabs {
		/deep/.s-tab-nav-view {
			margin: 0 90rpx;
			display: flex;
			justify-content: space-between;
			font-weight: bold;
		}

		/deep/ .s-tabs .s-tab-line {
			bottom: 8rpx;
			border-radius: 10rpx;
		}


	}

	.all-money .sign {
		padding: 30rpx;

		&:nth-child(1) {
			padding-top: 18rpx;
		}
	}
</style>
