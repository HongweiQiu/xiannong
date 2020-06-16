<template>
	<view class="my_stepper addcart">
		<image src="../../static/img/jian.png" mode="" @click="minus"></image>
		<input type="text" v-model="value" disabled="true" @click="showkey"/>
		<image src="../../static/img/plus.png" mode="" @click="plus"></image>
	</view>
</template>

<script>
export default {
	props:['val','min'],
	data() {
		return {
			 value:this.val
		};
	},
  watch:{
	  val(newval){
		  this.value=newval;
	  }
  },
	methods: {
		minus() {
			this.value --;
			if (this.value <=0) {
				this.value = 0;
			}
			if(this.value<=this.min){
				this.value=this.min;
			}
			this.$emit('minus',this.value); this.$emit('change',this.value)
		},
		plus(){
			let num=Number(this.value)
			this.value++;
			this.$emit('plus',this.value);
			 this.$emit('change',this.value)
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
