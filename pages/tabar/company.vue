<template>
	<view class="company">
		<view class="border">
			<my-s-tabs effect slot-title @change="changeSecond" class="mp_tab_width border" activeColor="#57B127"
				v-model="activeTab" color="#999">
				<my-s-tab>公司简介</my-s-tab>
				<my-s-tab>公司资质</my-s-tab>
			</my-s-tabs>
		</view>
		<view v-if="activeTab==0" style="padding: 30rpx;">
			<rich-text :nodes="about"></rich-text>
		</view>
		<view v-else class="flex qualifications">
			<view @click="preImage(item)" v-for="item in honorList" class="flex-column" style="margin-bottom: 30rpx;">
				<image :src="imgRemote+item.image" mode="aspectFit" class="r-5" lazy-load="true"></image>
				<text style="margin-top: 20rpx;" class="two-line">{{item.title}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgRemote: getApp().globalData.imgRemote,
				activeTab: 0,
				about: '',
				honorList: [],
				urls: []
			}
		},
		methods: {
			changeSecond(e) {
				this.activeTab = e;
			},
			preImage(item) {
				this.urls = [];

				this.urls.push(this.imgRemote + item.image);

				uni.previewImage({
					current: 0,
					urls: this.urls
				})
			},
			companyHoner() {
				this.$get(this.$api.mainQualifications, {}, (res) => {
					let {
						data
					} = res;
					if (data.code == 1) {
						this.honorList = data.data;

					}
				})
			},
			formatRichText(html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;border-raidus:10rpx!important;"');
					return newContent;
				},
			companyAbout() {
				this.$get(this.$api.mainAbout, {}, (res) => {
					let {
						data
					} = res;
					
					if (data.code == 1) {
						// data.data = data.data.replace('<img src="',
						// 	'<img style="width:100%;height:auto;object-fit:contain;"');
						this.about = this.formatRichText(data.data);
					}
				})
			},
		},

		onShow() {
			this.companyHoner();
			this.companyAbout();
		}
	}
</script>

<style lang="scss" scoped>
	.company {
		/deep/ .s-tab-nav-view {
			display: flex;
			justify-content: space-around;
		}

		/deep/ .s-tabs .s-tab-line {
			bottom: 0rpx;
		}

		.qualifications {
			margin: 30rpx 30rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&>view {
				border-radius: 10rpx;
				background: white;
				padding: 20rpx;
				width: 48%;
				box-sizing: border-box;
				// flex-basis: 40%;
				display: flex;

				image {
					width: 290rpx;
					height: 290rpx;
				}
			}
		}


	}
</style>
