<template>
	<view class="identifying_code" :class="count == true ? 'greencode' : 'graycode'" @click="getCode">{{str}}</view>
</template>

<script>
export default {
	props:['showcode'],
	data() {
		return {
			count:this.showcode,
			str:'获取验证码'
		};
	},
	methods: {
		getCode() {
			this.$emit('getCode')
			console.log(this.showcode)
			if(!this.count){return}
	this.count=false;
	
			let seconds=10;
			let clear=setInterval(()=>{
				seconds--;
				this.str=seconds+'s';
				if(seconds<=0){
					clearInterval(clear);
					this.str='获取验证码';
					this.count=true;
				}
			},1000)
				
		}
		
	}
};
</script>

<style>
.identifying_code {
	width: 150rpx;
	height: 38rpx;
	color: white;
	border-radius: 6px;
	text-align: center;
	padding:0 4rpx;
}
.greencode {
	background: #009a44;
}
.graycode {
	background: #808080;
}
</style>
