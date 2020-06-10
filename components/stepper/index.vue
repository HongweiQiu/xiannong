<template>
	<view class="my_stepper addcart">
		<image src="../../static/img/jian.png" mode="" @click="minus"></image>
		<input type="text" v-model="value" disabled="true" @click="showkey"/>
		<image src="../../static/img/plus.png" mode="" @click="plus"></image>
	</view>
</template>

<script>
export default {
	props:['val'],
	data() {
		return {
			 value: this.val
		};
	},
	methods: {
		minus() {
			this.value --;
			if (this.value <=0) {
				this.value = 0;
			}
			this.$emit('minus',this.val)
		},
		plus(){
			let num=Number(this.value)
			this.value++;
		},
		showkey(){
			this.$emit('showKey')
		}
	}
};
</script>

<style>
.my_stepper {
	display: flex;
	align-items: center;
}
.my_stepper input {
	width: 80rpx;
	height: initial;
	text-align: center;
}
</style>
