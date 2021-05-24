<template>
	<view class="company">
		<view class="border">
			<my-s-tabs effect slot-title @change="changeSecond" class="mp_tab_width border" activeColor="#57B127"
				v-model="activeTab" color="#999">
				<my-s-tab>公司简介</my-s-tab>
				<my-s-tab>公司资质</my-s-tab>
			</my-s-tabs>
		</view>
		<view v-if="activeTab==0"></view>
		<view v-else class="flex qualifications">
			<view @click="preImage" v-for="item in 2" class="flex-column">
				<image src="../../static/img/after-order.svg" mode="aspectFit"></image>
				<text>sdfd</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 1
			}
		},
		methods: {
			changeSecond(e) {
				this.activeTab = e;
			},
			preImage() {
				uni.previewImage({
					current: 0,
					urls: ['https://xntcps.jxsxkeji.com/uploads/20210517/a00384ad477784c0998b66b0dd19c343.jpg',
						'https://xntcps.jxsxkeji.com/uploads/20210517/49eebc8dd60cd69b2b776c4a3fc34230.jpg'
					]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.company {
		/deep/ .s-tab-nav-view {
			display: flex;
			justify-content: space-around;
		}

		/deep/ .s-tabs .s-tab-line {
			bottom: 0rpx;
		}

		.qualifications {
			margin: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			&>view {
				border-radius: 10rpx;
				background: white;
				padding: 20rpx;
				box-sizing: border-box;
				// flex-basis: 40%;
				display: flex;

				image {
					width: 270rpx;
					height: 270rpx;
				}
			}
		}


	}
</style>
