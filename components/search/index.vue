<template>
	<view>
		<view class="my_search" @click="searchPage">
			<!-- #ifdef APP-PLUS |H5 -->
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>

			<!-- #endif -->
			<view class="flex new">
				<view class="my_search_content">
					<text class="iconfont newicon-sousuo">&#xe615;</text>
					<text class="text">搜索你想知道的</text>
				</view>

				<text class="iconfont" style="font-size:60rpx;margin-left:20rpx;" v-if="show">&#xe658;</text>
			</view>

		</view>
		<view style="height:118rpx;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				count: 0
			};
		},
		methods: {
			searchPage() {
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 1000)
				uni.navigateTo({
					url: "/pages/index/search"
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.my_search {
		background: white;
		padding: 30rpx 0;
		width: 100%;
		position: fixed;
		z-index: 3;

		.new {
			justify-content: space-around;
			align-items: center;
			line-height: 1;
			padding: 0 20rpx;
		}
	}

	.my_search_content {
		background: #eee;
		height: 60rpx;
		flex: 1;
		display: flex;
		border-radius: 30rpx;
		align-items: center;
	}

	.my_search_content .newicon-sousuo {
		padding: 3rpx 9rpx 0 30rpx;
		color: #999;
		font-size: 40rpx;
	}

	.my_search_content .text {
		color: #999;
		font-size: 24rpx;
	}
</style>
