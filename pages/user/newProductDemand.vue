<template>
	<view class="modifypwd">
		<view class="get_info">
			<view>
				<text>商品名称</text>
				<input type="password" v-model="old_pwd" placeholder="请输入你想要的商品名称（必填）"
					placeholder-class="place_style" />
			</view>
			<view @click="$refs.picker.show()">
				<text>商品类别</text>
				<input password v-model="password" disabled placeholder="请选择商品分类" placeholder-class="place_style" />
				<!-- <uni-icons type="arrowright" size="18" color="black"></uni-icons> -->
			</view>
			<view>
				<text>商品品牌</text>
				<input password v-model="password_confirmation" placeholder="请输入你想要的商品品牌"
					placeholder-class="place_style" />
			</view>
			<view>
				<text>商品规格</text>
				<input password v-model="password_confirmation" placeholder="请输入你想要的商品的包装规格"
					placeholder-class="place_style" />
			</view>
			<view>
				<text>供应商</text>
				<input password v-model="password_confirmation" placeholder="如果你有一直购买的地方，请留给我们"
					placeholder-class="place_style" />
			</view>
			<view>
				<text class="reference">参考价格</text>
			
				￥<input password v-model="password_confirmation" 
					placeholder-class="place_style" />
			</view>
			<view>
				<text>商品描述</text>
				<input password v-model="password_confirmation" placeholder="尽可能描述商品，方便我们更准确找到"
					placeholder-class="place_style" />
			</view>
		</view>
		<view class="submit_button button_style" @click="formSubmit">保存</view>
			<w-picker :visible.sync="visible" mode="selector" @confirm="onConfirm" ref="picker" />
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	const app = getApp().globalData;
	import wPicker from "@/components/w-picker/w-picker.vue";
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				old_pwd: '', //旧密码
				password: '', //旧密码
				password_confirmation: '', //旧密码
				navBar: navBar,
				count: 0
			};
		},
		methods: {
			leftClick() {
				// #ifdef H5
				window.history.back(-1);
				// #endif 
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif	
			},

			formSubmit() {
				var old_pwd = this.old_pwd;
				var password = this.password;
				var password_confirmation = this.password_confirmation;
				var timeStamp = Math.round(new Date().getTime() / 1000);
				var obj = {
					appid: appid,
					old_pwd: old_pwd,
					password: password,
					password_confirmation: password_confirmation,
					timeStamp: timeStamp,
				}
				var sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				if (old_pwd == "") {
					rs.Toast("原始密码不能为空")
					return false;
				}
				if (password.length < 6) {
					rs.Toast("密码不能小于六位数")
					return false;
				}
				if (password_confirmation != password) {
					rs.Toast("密码不一致")
					return false;
				}
				this.count++;
				if (this.count != 1) return;
				setTimeout(() => {
					this.count = 0
				}, 500)
				var data = {
					appid: appid,
					old_pwd: old_pwd,
					password: password,
					password_confirmation: password_confirmation,
					timeStamp: timeStamp,
					sign: sign,
				}
				rs.postRequests("modifyPassword", data, (res) => {
					if (res.data.code == 200) {
						rs.Toast('修改成功');
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/account/login"
							})
						}, 1000);
					}
					if (res.data.code == 400) {
						rs.Toast(res.data.msg)
					}
				})
			}
		},

	};
</script>

<style>
	.modifypwd .get_info {
		background: white;
		padding: 0 30rpx;

	}

	.modifypwd .get_info>view {
		display: flex;
		height: 89rpx;
		align-items: center;
		border-bottom: 1px solid #f7f6f6;
	}

	.modifypwd .get_info>view>text {
		width: 220rpx;
		color: #333;
	}
     input {flex:1;}
	.modifypwd .button_style {
		font-size: 36rpx;
		margin: 60rpx 30rpx 0;
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #57B127;
	}
	.reference::after{content: '(元)';color:#999;font-size: 26rpx;}
</style>
