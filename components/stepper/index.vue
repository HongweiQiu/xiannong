<template>
	<view class="my_stepper addcart">
		<text class="iconfont" @click="minus">&#xe6fc;</text>

		<view @click="showkey" class="align_center"><input class="input_value" type="number" v-model="value"
				disabled="true" /></view>
		<text class="iconfont plus" @click="plus">&#xe600;</text>
	</view>
</template>

<script>
	export default {
		props: ['val', 'min'],
		data() {
			return {
				value: this.val
			};
		},
		watch: {
			val(newval) {
				this.value = newval;
			}
		},
		methods: {
			minus() {
				this.$emit('minus', parseFloat(this.value));
			},
			plus() {
				this.$emit('plus', parseFloat(this.value));
			},
			showkey() {
				this.$emit('showKey')
			}
		}
	};
</script>

<style scoped>
	.my_stepper {
		display: flex;
		align-items: center;padding: 0 2rpx;
		height: 36rpx;
		line-height: 36rpx;
		width: 140rpx;
		background: #f8f8f8;
		border-radius: 18rpx;
		justify-content:center;
		margin-right:20rpx;
	}

	.my_stepper .input_value {
		width: 60rpx;
		height: initial;
		text-align: center;
	}
	.iconfont{color:#57B127;}
	.plus {font-size: 30rpx;font-weight: bold;}
</style>
