<script>
export default {
	//全局共享数据
	globalData: {
		// #ifdef APP-PLUS
		navBar: true,
		// #endif
		// #ifdef MP-WEIXIN |H5
		navBar: false,
		// #endif
		appid: '1',
		active: '2',
		appsecret: 'StJfzJcXmya6k6Ar',
		// #ifdef APP-PLUS |MP-WEIXIN
		rootUrl: 'https://test.caidj.cn/mobileOrder/', //主接口地址
		imgRemote: 'https://test.caidj.cn',
		// #endif
		// #ifdef H5
		isWeixin:false,
		rootUrl: '/api', //主接口地址
		imgRemote: 'http://test.caidj.cn',
		// #endif
		classId:'',
		isReload:true,
		aData: {
		  show: true
		}
	},
	onLaunch: function() {
	
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style>
/*每个页面公共css */
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1843139_cgbtnk33np.eot?t=1592550060993'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1843139_cgbtnk33np.eot?t=1592550060993#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1843139_cgbtnk33np.woff?t=1592550060993') format('woff'),
  url('//at.alicdn.com/t/font_1843139_cgbtnk33np.ttf?t=1592550060993') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1843139_cgbtnk33np.svg?t=1592550060993#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-buy-fill:before {
  content: "\e64c";
}

.icon-huidaodingbu:before {
  content: "\e6c0";
}

.icon-alreadystar:before {
  content: "\e624";
}

.icon-xing:before {
  content: "\e600";
}

.icon-tianchongxing--:before {
  content: "\e614";
}

.icon-mima:before {
  content: "\e645";
}

.icon-yuyin:before {
  content: "\e631";
}

.icon-08_zizhanghaoguanli:before {
  content: "\e630";
}

.icon-shanchu:before {
  content: "\e663";
}

.icon-qianbao:before {
  content: "\e604";
}

.icon-juan:before {
  content: "\e64b";
}

.icon-huabanfuben:before {
  content: "\e65d";
}

.icon-X:before {
  content: "\e674";
}

.icon-weixin:before {
  content: "\e637";
}

.icon-yonghu:before {
  content: "\e603";
}

.icon-fapiao:before {
  content: "\e720";
}

.icon-tuichu:before {
  content: "\e69e";
}


page {
	background: #f8f6f9;
	font-size: 28rpx;
}
.addcart image {
	width: 32rpx;
	height: 32rpx;
}
.status_bar {
	/* background: white; */

	height: var(--status-bar-height);
	width: 100%;
}
.hidden {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.red_tag {
	background: red;
	color: white;
	border-radius: 6rpx;
	padding: 0 1px;
	font-size: 20rpx;
	margin-right: 5rpx;
}
.red_font {
	color: red !important;
}
.gray_font {
	color: #808080;
}
.flex {
	display: flex;
}
.flex_left_right {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.align_center {
	display: flex;
	align-items: center;
}
.line_through {
	color: #808080;
	text-decoration: line-through;
}
.uni-countdown {
	align-items: center;
}
.line_border {
	width: 4px;
	height: 40rpx;
	background: #009a44;
}
.weight {
	font-weight: 700;
}
.home .uni-countdown__number {
	height: 30rpx !important;

	color: white !important;
	border-radius: 4rpx;
	width: 40rpx !important;
}
.flash_sale .uni-countdown__number {
	height: 30rpx !important;

	color: white !important;
	border-radius: 4rpx;
	width: 35rpx !important;
}
.uni-nav-bar-right-text {
	color: #009a44;
}
.recomend .title {
	display: flex;
	align-items: center;
	height: 80rpx;
	line-height: 80rpx;
	background-image: linear-gradient(180deg, #fff, #f7f7f7);
	padding: 0 20rpx;
	margin-top: 10rpx;
}
.recomend .title .name {
	margin: 0 12rpx;
	font-size: 32rpx;
	font-weight: 600;
}
.recomend .body {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
}
.body .myc_recomend:nth-child(n+3){
	margin-top:40rpx;
}
.order .uni-icons {
	color: #009a44 !important;
}
.place_style {
	font-size: 24rpx;
	color: #c2c2c2;
}
.center{text-align: center;}
.submit_button {
	background: #009a44;
	color: white;
	border-radius: 12rpx;
	text-align: center;
	margin: 30rpx auto;
}
.twelve {
	font-size: 24rpx;
}
.ten {
	font-size: 20rpx;
}

.fiveteen {
	font-size: 50rpx;
}
.width{width:100%;}
.shuiyin{width: 60rpx;height:20rpx;position: absolute;z-index: 1;}
.uni-modal__btn_primary{color:#009a44!important;}
.uni-modal__btn_default{color:#999!important;}
.uni-modal__bd{color:black!important;}
input{font-size: 28rpx!important;
    line-height: initial!important;min-height: initial!important;}
	.green_b{background: #009a44!important;}
	.gray_b{background: gray!important;}
</style>
