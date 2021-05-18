<script>
	export default {
		//全局共享数据
		globalData: {
			rootUrl: 'https://xntcps.jxsxkeji.com/api.php',
			imgRemote: 'https://xntcps.jxsxkeji.com',
			classId: '',
			isReload: true,
			onoff: true
		}
	};
</script>

<style lang="scss">
	@import url("static/icon/iconfont.css");

	page {
		background: #f8f6f9;
		font-size: 30rpx;
	}

	button {
		border: none;
		background: none;
		line-height: initial;
		padding: 0;
	}

	button::after {
		border: none;
	}

	.t-180 {
		transform: rotate(180deg);
		display: inline-block;
	}

	.white_b {
		background: white;
	}

	.padding-15 {
		padding: 0 30rpx;
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



	.red_font {
		color: #F01D1D;
	}

	.gray_font {
		color: #999;
	}

	.white-font {
		color: white;
	}

	.flex {
		display: flex;
	}

	.flex_left_right {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex-space-between {
		display: flex;
		justify-content: space-between;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.flex-j-c {
		display: flex;
		justify-content: center;
	}

	.flex-end {
		display: flex;
		justify-content: flex-end;
	}

	.align_center {
		display: flex;
		align-items: center;
	}

	.flex-full {
		flex: 1;
	}

	.center {
		text-align: center;
	}

	.line_through {
		color: #999;
		text-decoration: line-through;
	}

	.recomend .title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 104rpx;
		}

	.recomend .title .name {
		margin: 0 4rpx;
		font-size: 36rpx;
		font-weight: 600;
	}

	.recomend .body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.body .myc_recomend:nth-child(n+3) {
		margin-top: 30rpx;
	}

	.place_style {
		font-size: 26rpx;
		color: #999;
	}

	.center {
		text-align: center;
	}

	.right {
		text-align: right;
	}

	.submit_button {
		background: #57B127;
		color: white;
		text-align: center;
		margin: 60rpx auto;
	}

	.red-font {
		color: #F01D1D;
	}

	.fs-11 {
		font-size: 22rpx;
	}

	.fs-12 {
		font-size: 24rpx;
	}

	.fs-13 {
		font-size: 26rpx;
	}

	.fs-15 {
		font-size: 30rpx;
	}

	.fs-18 {
		font-size: 36rpx;
	}

	.fs-23 {
		font-size: 46rpx;
	}

	.fs-24 {
		font-size: 48rpx;
	}

	.r-5 {
		border-radius: 10rpx;
	}

	.r-10 {
		border-radius: 20rpx;
	}

	.r-15 {
		border-radius: 30rpx;
	}

	.bold {
		font-weight: bold;
	}

	.width {
		width: 100%;
	}

	input {
		font-size: 28rpx !important;
		line-height: initial !important;
		min-height: initial !important;
	}


	.gray_b {
		background: gray !important;
	}


	.pay-button {
		height: 78rpx;
		width: 184rpx;
		display: inline-block;
		text-align: center;
		line-height: 78rpx;
		border-radius: 39rpx;
	}

	.border {
		border-bottom: 1px solid #eee;
	}

	.two-line {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
