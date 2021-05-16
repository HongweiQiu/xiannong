<template>
	<view class="treaty">
		<rich-text :nodes="info"></rich-text>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				info: ''
			};
		},
		methods: {

		},
		onShow() {
			this.$get(this.$api.mainAgree, {}, res => {
				let data = res.data;
				if (data.code == 1) {
					this.info = data.data;

				}
			});
		}
	}
</script>

<style>
	page {
		background: white;
	}

	.treaty {
		padding: 10rpx 20rpx;
	}
</style>
