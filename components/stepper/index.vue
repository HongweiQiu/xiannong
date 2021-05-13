<template>
	<view class="my_stepper addcart">
		<text class="iconfont" @click="minus">&#xe6fc;</text>

		<view @click="showkey" class="align_center">
			<input class="input_value" type="number" v-model="value" @input="input" />
		</view>
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
			input(e) {
				let {
					value
				} = e.detail;
				this.$emit('input', parseFloat(value));
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
		align-items: center;
		padding: 0 2rpx;
		height: 48rpx;
		line-height: 48rpx;
		width: 200rpx;
		background: #f8f8f8;
		border-radius: 24rpx;
		justify-content: space-between;
		margin-right: 20rpx;
		padding: 0 20rpx;
	}

	.my_stepper .input_value {
		width: 60rpx;
		height: initial;
		text-align: center;
	}

	.iconfont {
		color: #57B127;
	}

	.plus {
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
