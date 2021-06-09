<template>
	<view class="fixed-key" v-if="show">
		<view class="hide-arrow" @click="close">
			<image src="../../static/img/hide.png" mode="" style="width: 100rpx;height: 50rpx;"></image>
		</view>
		<view class="key">
			<view v-for="(item,index) in 9" :key="index">
				<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
			</view>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
			<view class="keyboard-item delte hide" @tap="del()">
				<image class="img" src="../../static/del.png" mode="aspectFit" :lazy-load="true"
					style="width: 100%;height: 99rpx"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			show: {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				val: ''
			}
		},
		methods: {

			clear() {
				this.val = '';
			},
			close() {
				this.val = '';
				this.trantision = false;
				this.$emit('close', false);
			},
			key(num) {
				this.val += num;
				this.$emit('complete', this.val);
				if (this.val.length == 6) {

					this.close()
				}
			},
			del() {
				if (this.val.length > 0) {
					this.val = this.val.substring(0, this.val.length - 1);
				}
				this.$emit('complete', this.val)
			}
		},
		mounted() {
			if (this.show) {
				this.val = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hide-arrow {
		background: rgba(0, 0, 0, 0.06);
		text-align: center;
	}

	.fixed-key {
		width: 100%;
		bottom: 0;
		position: fixed;
		left: 0;
	}

	.key {
		display: flex;
		flex-wrap: wrap;
	}

	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.06);
		font-size: 40rpx;
		color: #333;
		height: 99rpx;

	}

	.hide {
		background: rgba(0, 0, 0, 0.1);
	}
</style>
