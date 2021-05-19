<template>
	<view class="delivery">

		<view class="get_info">
			<view>
				<text class="iconfont iconwode11"></text>
				<input type="text" v-model="form.shou_name" placeholder="收货人" placeholder-class="place_style" />
			</view>
			<view>
				<text class="iconfont iconshouji1"></text>
				<input type="number" v-model="form.shou_phone" placeholder="收货人电话" placeholder-class="place_style" />
			</view>
			<view @click="mapPage" class="flex_left_right ">
				<view class="align_center">
					<text class="iconfont iconshouhuodizhi" style="width:70rpx;"></text>
					<input disabled v-model="receiving" placeholder="收货区域" placeholder-class="place_style" />
				</view>
				<text class="iconfont iconfanhui t-180"></text>
			</view>
			<view>
				<text class="iconfont iconxiangxidizhi"></text>
				<input type="text" v-model="form.address" placeholder="详细地址" placeholder-class="place_style" />
			</view>
		</view>
		<view class="submit_button button_style" @click="submit">保存</view>
		<w-picker :visible.sync="visible" mode="linkage" :value="defaultRegion1" :options="option" :level="3"
			default-type="id" :default-props="defaultProps1" @confirm="confirmAddrss($event,'linkage')" ref="linkage">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				visible: false,
				form: {
					shou_name: '',
					province: '',
					city: '',
					area: '',
					shou_phone: '',
					address: '',
				},
				receiving: '',
				defaultProps1: {
					label: "name",
					value: "id",
					children: "child"
				},
				defaultRegion1: [],
				option: []

			};
		},
		methods: {
			mapPage() {
				this.visible = true;
			},
			memberAddressInfo() {
				let params = {
					token: uni.getStorageSync('userToken')
				}
				this.$get(this.$api.userInfo, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.form = {
							shou_name: data.data.shou_name,
							province: data.data.province,
							city: data.data.city,
							area: data.data.area,
							// province: '',
							// city: '',
							// area: '',
							shou_phone: data.data.shou_phone,
							address: data.data.address,

						};
						this.receiving = data.data.province + data.data.city + data.data.area;
						if (this.receiving.match('null')) {
							this.receiving = '';
						}
					}
				})
			},
			submit() {
				let params = Object.assign({
					token: uni.getStorageSync('userToken')
				}, this.form)


				this.$get(this.$api.ordershipping_address, params, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.$Toast('保存成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						this.$Toast(data.msg);
					}
				})
			},
			getAddress() {
				this.$get(this.$api.mainRegion, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						data.data.map((item) => {
							if (item.child.length == 0) {
								item.child = [{
									id: '',
									name: '',
									child: [{
										id: '',
										name: ''
									}]
								}]
							}
							item.child.map((second) => {
								if (second.child.length == 0) {
									second.child = [{
										id: '',
										name: ''
									}]
								}
							})
							return item;
						})
						this.option = data.data;
					}
				})
			},
			confirmAddrss(e) {
				this.receiving = e.result;
				this.form.province = e.obj.col1.name;
				this.form.city = e.obj.col2.name;
				this.form.area = e.obj.col3.name;
			}
		},
		onLoad(option) {
			this.memberAddressInfo();
			this.getAddress();
		},
	};
</script>

<style lang="scss">
	page {
		background-color: white;
	}

	.delivery .get_info {
		background: white;
		padding: 0 20rpx;
		// margin-top: 10rpx;
	}

	.delivery .get_info>view {
		display: flex;
		height: 100rpx;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.delivery .get_info>view>text {
		width: 70rpx;
		// color: #808080;
	}

	.delivery .button_style {
		font-size: 36rpx;
		margin: 60rpx 30rpx 0;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 45rpx;
		background: #57B127;
	}

	.delivery input {
		padding: 0;
	}

	.delivery text-no-space {
		white-space: pre-line;
	}

	.delivery {
		.iconfont {
			font-size: 60rpx;
		}
	}
</style>
