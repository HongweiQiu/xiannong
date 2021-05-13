var rootDocment = 'https://xntcps.jxsxkeji.com/api.php'; //主接口;
var globalUrl = ["login"]
if (uni.getStorageSync("cdj_token")) {
	var header = {
		'Accept': 'application/json',
		'content-type': 'application/json', //
		'Authorization': uni.getStorageSync("cdj_token"),
	}
}
/***
 * url: 请求地址
 * datas:请求参数
 * success:请求成功的返回值
 * fail:请求失败的返回值
 * loadig:是否含有加载样式,默认false
 */
//get请求
function get(url, datas, success, loading = false) {
	if (loading) {
		uni.showLoading({
			title: '加载中',
			mask: true

		});
	}
	uni.request({
		url: rootDocment + url,
		method: 'GET',
		header: {
			'Accept': 'application/json',
			'content-type': 'application/json', //
			'Authorization': uni.getStorageSync("identityToken"),
		},
		data: datas,
		success: res => {
			success(res)
			if (res.header.authorization != undefined) {
				uni.setStorageSync("cdj_token", res.header.authorization)
			}
			uni.hideLoading();
		},
		fail: res => {
			uni.showModal({
				title: res.data,
				content: '网络出错，请刷新重试',
				showCancel: false
			})
		},

	})
}

/***
 * url: 请求地址
 * datas:请求参数
 * success:请求成功的返回值
 * fail:请求失败的返回值
 * loadig:是否含有加载样式,默认false
 */
//POST请求带加载中
function post(url, datas, success, loading = false) {
	if (loading) {
		uni.showLoading({
			title: '加载中',
			mask: true

		});
	}
	uni.request({
		url: rootDocment + url,
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'content-type': 'application/json', //
			'Authorization': uni.getStorageSync("cdj_token"),
		},
		data: datas,
		success: res => {
			success(res)
			if (res.header.authorization != undefined) {
				uni.setStorageSync("cdj_token", res.header.authorization)
			}
			uni.hideLoading();
		},
		fail: res => {
			uni.showModal({
				title: '网络错误',
				content: '网络出错，请刷新重试',
				showCancel: false
			})
		},

	})

}

function Toast(message) {
	uni.showToast({
		title: message,
		icon: 'none',
		duration: 1000
	})
}
export {
	get,
	post,
	Toast
}
