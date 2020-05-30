<template>
	
		<view class="my_keyboard" >
			<view class="inputval" ><input type="text" v-model="val" disabled="true" placeholder="请输入..." placeholder-style="font-size:28rpx;" /></view>
			<view class="keyboard">
				<view class="left">
					<view v-for="(item, index) in 9" :key="index" v-bind:id="index"
					@click="changeNum(index+1)">{{ index+1}}</view>
					<view @click="changeNum(0)">0</view>
					<view @click="changeNum('.')">.</view>
					<view class="shanchu" @click="changeNum('delete')"><image src="@/static/img/shanchu.png" mode="aspectFit"></image></view>
				</view>
				<view class="right">
					<view>
						<view @click="clean">清除</view>
						<view @click="cancel">取消</view>
						<view class="determine" @click="toParent">确认</view>
					</view>
				</view>
			</view>
		</view>
	
</template>

<script>
export default {
	props: {
		keyStatu: {
			type: Boolean,
			value: false
		},
		arrObj: {
			type: Object,
			value: false
		}
	},
	data() {
		return {
			val: '',
			id:0
		};
	},
	methods: {
		clean() {
			this.val = '';
		},
		cancel() {
			this.val = '';
			this.$emit('keyBoard');
			uni.showTabBar();
		},
		changeNum(data) {
			let str = String(data);
			if (data == 'delete') {
				this.val = this.val.substring(0, this.val.length - 1);
			} else {
				if (this.val.indexOf('.') >= 0 && data == '.') {
					uni.showToast({
						title: '格式不正确',
						duration: 1000,
						icon: 'none'
					});
					return;
				}
				this.val += str;
			}
		},
		toParent() {
			if (this.val == '') {
				uni.showToast({
					title: '还没有输入',
					duration: 1000,
					icon: 'none'
				});
			} else if (this.val == 0) {
				uni.showToast({
					title: '购买数量不能为零',
					duration: 1000,
					icon: 'none'
				});
			}else if (this.arrObj.is_float == 1 && !Number.isInteger(Number(this.val))) {
				uni.showToast({
					title: '购买数量不能为小数',
					duration: 1000,
					icon: 'none'
				});
			} else {
				var obj = {
					arrObj: this.arrObj,
					val: this.val
				};
				this.$emit('keyBoard', this.keyStatu);
				this.$emit('toParent', obj);
				this.val = '';
			}
		}
	}
};
</script>

<style lang="scss">

.flex {
	display: flex;
}

.small_font {
	font-size: 24rpx;
}

.inputval{background:white;}
.smaller_font {
	font-size: 20rpx;
}

.height {
	height: 80rpx;
	line-height: 80rpx;
}

.green_b {
	background: #009a44;
}



.width {
	width: 100%;
}

.inputval {
	padding: 0 20rpx;
	font-size: 28rpx;
border-radius: 10rpx 10rpx 0 0;
	input {
		height: 120rpx;
		line-height: 120rpx;
	}
}

.my_keyboard {
	font-size: 32rpx;
	
}

.keyboard {
	padding-bottom: 20rpx;
	background: #f7f6f6;
	z-index: 9998;
	@extend .flex;

	.left {
		width: 75%;
		@extend .flex;
		margin: 0 20rpx;
		justify-content: space-between;
		flex-wrap: wrap;

		view {
			margin: 20rpx 0 0;

			width: 165rpx;
			text-align: center;
			@extend .height;
			border-radius: 2px;
		background: white;
		}

		.shanchu {
			@extend .flex;
			justify-content: center;
			align-items: center;

			image {
				width: 50%;
				height: 40rpx;
				line-height: 60rpx;
			}
		}
	}

	.right {
		width: 25%;

		view {
			@extend .green_b;
			width: 80%;
			margin: 20rpx 0 0;
			width: 165rpx;
			text-align: center;
			@extend .height;
			color: white;
		}
	}
}

.determine {
	height: 180rpx !important;
	line-height: 180rpx !important;
}
</style>
