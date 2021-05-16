<template>
	<view class="modifypwd">
		<view class="get_info">
			<view>
				<text>发票抬头</text>
				<input v-model="tax_name" placeholder="请输入发票抬头" placeholder-class="place_style" />
			</view>
			<view>
				<text>发票税号</text>
				<input type="number" v-model="tax_num" placeholder="请输入发票税号" placeholder-class="place_style" />
			</view>

		</view>
		<view class="submit_button button_style" @click="$doubleClick(formSubmit)">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tax_name: '',
				tax_num: ''

			};
		},
		methods: {


			formSubmit() {
				let {
					tax_name
				} = this;
				let {
					tax_num
				} = this;

				// if (tax_name == "") {
				// 	return this.$Toast("发票抬头不能为空")
				// }
				// if (tax_num == '') {
				// 	return this.$Toast("发票税号不能为空")
				// }

				let params = {
					token: uni.getStorageSync('userToken'),
					tax_name: tax_name,
					tax_num: tax_num
				}
				this.$get(this.$api.orderSex_tax, params, (res) => {
					if (res.data.code == 1) {
						this.$Toast('修改成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 1000);
					} else {
						this.$Toast(data.msg);
					}

				})
			},
			getUserInfo() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {

						this.tax_name = data.data.tax_name;
						this.tax_num = data.data.tax_num;
					}
				})
			}
		},
		onShow() {
			this.getUserInfo();
		}

	};
</script>

<style>
	.modifypwd .get_info {
		background: white;
		padding: 0 20rpx;

	}

	.modifypwd .get_info>view {
		display: flex;
		height: 89rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;
	}

	.modifypwd .get_info>view>text {
		width: 150rpx;
		color: #333;
	}

	.modifypwd .button_style {
		font-size: 36rpx;
		margin: 60rpx 30rpx 0;
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #57B127;
	}
</style>
