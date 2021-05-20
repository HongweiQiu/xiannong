<template>
	<view class="modifypwd">
		<view class="get_info">
			<view>
				<text>商品名称</text>
				<input v-model="form.name" placeholder="请输入你想要的商品名称（必填）" placeholder-class="place_style" />
			</view>
			<view @click="visible=true">
				<text>商品类别</text>
				<input v-model="form.cate" disabled placeholder="请选择商品分类" placeholder-class="place_style" />
				<text class="iconfont iconfanhui t-180 gray_font"></text>
			</view>
			<view>
				<text>商品品牌</text>
				<input v-model="form.brand" placeholder="请输入你想要的商品品牌" placeholder-class="place_style" />
			</view>
			<view>
				<text>商品规格</text>
				<input v-model="form.sku" placeholder="请输入你想要的商品的包装规格" placeholder-class="place_style" />
			</view>
			<view>
				<text>供应商</text>
				<input v-model="form.supplier" placeholder="如果你有一直购买的地方，请留给我们" placeholder-class="place_style" />
			</view>
			<view>
				<text class="reference">参考价格</text>

				￥<input type="number" v-model="form.price" placeholder-class="place_style" />
			</view>
			<view>
				<text>商品描述</text>
				<input v-model="form.desc" placeholder="尽可能描述商品，方便我们更准确找到" placeholder-class="place_style" />
			</view>
		</view>
		<view class="submit_button button_style" @click="$doubleClick(formSubmit)">保存</view>
		<w-picker :visible.sync="visible" mode="selector" @confirm="confirmCate" ref="picker" :options="options"
			:default-props="defaultProps" />
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
				options: [],
				defaultProps: {
					"label": "name",
					"value": "id"
				},
				form: {
					name: '',
					cate: '',
					brand: '',
					sku: '',
					supplier: '',
					price: '',
					desc: '',
					token: uni.getStorageSync('userToken')
				}
			};
		},
		methods: {
			confirmCate(e) {
				this.form.cate = e.result;
			},
			formSubmit() {
				let params = this.form;
			for(let i in this.form){
				if(!this.form[i]){
					return this.$Toast('请填写相关信息');
				}
			}
				this.$get(this.$api.userXuqiu, params, res => {
					let data = res.data;
					if (data.code == 1) {
						this.$Toast('提交新品需求成功');
						setTimeout(() => {
						uni.navigateBack()
						}, 1000)
					} else {
						this.$Toast(data.msg);
					}
				});
			}
		},
		onLoad() {
			this.$get(this.$api.goodCate, {}, (res) => {
				let {
					data
				} = res;
				if (data.code == 1) {
					this.options = data.data;
				}
			})
		}
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

	input {
		flex: 1;
	}

	.modifypwd .button_style {
		font-size: 36rpx;
		margin: 60rpx 30rpx 0;
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #57B127;
	}

	.reference::after {
		content: '(元)';
		color: #999;
		font-size: 26rpx;
	}
</style>
