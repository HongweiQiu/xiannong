<template>
	<view class="register">
		<uni-nav-bar left-icon="arrowleft" title="注册" :status-bar="navBar" fixed="true" @clickLeft="leftClick"></uni-nav-bar>

		<view class="get_info">
			<view>
				<text>单位名称</text>
				<input type="text" v-model="nickname" placeholder="请输入单位名称" placeholder-class="place_style" />
			</view>
			<view>
				<text>手机号</text>
				<input type="number" v-model="mobile" placeholder="请输入手机" placeholder-class="place_style" />
			</view>
			<view>
				<text>密码</text>
				<input v-model="password" placeholder="请输入六位及以上的密码" placeholder-class="place_style" />
			</view>
			<view>
				<text>确认密码</text>
				<input v-model="confirm_pwd" value="" placeholder="请再次确认登录密码" placeholder-class="place_style" />
			</view>
			<move-verify @result="verifyResult" ref="verifyElement"></move-verify>
			<view class="flex">
				<text>验证码</text>
				<view class="flex_left_right" style="width:79%;">
					<input type="number" v-model="verify_code" placeholder="请输入验证码" placeholder-class="place_style" />
					<my-identifyingcode  @getCode="getCode" ref="code"></my-identifyingcode>
				</view>
			</view>
		</view>
		<view class="submit_button button_style">保存</view>
		<view class="now_login">已有账户？现在登录>></view>
		<view class="agree">注册协议</view>
	</view>
</template>

<script>
import moveVerify from '@/components/helang-moveVerify/helang-moveVerify.vue';
import md5 from '../../static/js/md5.js';
import rs from '../../static/js/request.js';
const app = getApp().globalData;
const { navBar, appid, appsecret } = app;
export default {
	components: {
		moveVerify
	},
	data() {
		return {
			address: '',
			navBar: navBar,
			nickname: '',
			mobile: '',
			password: '',
			confirm_pwd: '',
			number_code: '',
			verify_code: '',
			showcode: false
		};
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 滑动验证
		verifyResult() {
			let timeStamp = Math.round(new Date().getTime() / 1000);
			let obj = {
				appid: appid,
				timeStamp: timeStamp
			};
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			let params = Object.assign(
				{
					sign: sign
				},
				obj
			);
			rs.getRequests('random', params, res => {
				let data = res.data;
				if (data.code == 200) {
					this.number_code = data.data.number;
					console.log(this.number_code);
					uni.setStorageSync('laravel_session', res.header['Set-Cookie']);
				} else {
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					});
				}
			});
		},
		getCode() {
			let timeStamp = Math.round(new Date().getTime() / 1000);
			if (!this.mobile) {
				uni.showToast({
					title: '手机号不能为空',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.number_code) {
				uni.showToast({
					title: '请先拖动滑块',
					duration: 2000,
					icon: 'none'
				});
				return;
			}

			let obj = {
				appid: appid,
				mobile: this.mobile,
			
				timeStamp: timeStamp
			};
			var that = this;
			let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
			  var random_str = md5.hexMD5(appsecret + this.number_code);
			let params = Object.assign(
				{
					sign: sign ,secret_str: random_str, active: 2
				},
				obj
			);
			rs.postRequest('sendCode',params,(res)=>{
				let {data}=res;
			if(data.code==200){
				this.$refs.code.sendCode();
			}else{
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				});
			}
			});
			
		}
	}
};
</script>

<style>
page {
	background: white;
}
.register .get_info {
	background: white;
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.register .get_info > view {
	display: flex;
	height: 80rpx;
	align-items: center;
	border-bottom: 1px solid #f7f6f6;
}
.register .get_info > view > text {
	width: 150rpx;
	color: #808080;
}
.register .button_style {
	font-size: 32rpx;
	width: 384rpx;
	height: 64rpx;
	line-height: 64rpx;
}
.register .now_login {
	color: #a1a1a1;
	text-align: center;
	font-size: 24rpx;
}
.register .agree {
	position: fixed;
	width: 100%;
	bottom: 20rpx;
	text-align: center;
	font-size: 24rpx;
	color: #418d5f;
}
</style>
