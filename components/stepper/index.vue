<template>
	<view class="my_stepper addcart">
		<image src="../../static/img/jian.png" mode="" @click="minus"></image>
		<input type="text" v-model="val" disabled="true" @click="showKey"/>
		<image src="../../static/img/plus.png" mode="" @click="plus"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: 1
		};
	},
	methods: {
		minus() {
			this.val -= 1;
			if (this.val <=0) {
				this.val = 0;
				
			}
		},
		plus(){
			let num=Number(this.val)
			this.val=num+1;
		},
		showKey(){
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
