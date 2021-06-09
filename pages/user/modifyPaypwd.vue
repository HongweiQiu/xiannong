<template>
	<view class="modifypwd">
		<view class="get_info">
			<view>
				<text>原密码</text>
				<input type="password" v-model="form.old_pay" placeholder="请输入原密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>新密码</text>
				<input password v-model="form.new_pay" placeholder="请填写六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input password v-model="form.re_new_pay" placeholder="请再次确认密码" placeholder-class="place_style" />

			</view>
		</view>
		<view class="submit_button button_style" @click="formSubmit">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					token: uni.getStorageSync('userToken'),
					old_pay: '',
					new_pay: '',
					re_new_pay: ''
				}
			};
		},
		methods: {
			formSubmit() {
				this.$get(this.$api.userSet_new_pay, this.form, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('修改支付密码成功');
						setTimeout(()=>{
							uni.navigateBack();
						},1000)
					} else {
						this.$Toast(data.msg)
					}

				})
			}
		},

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
