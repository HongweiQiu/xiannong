var rootDocment = 'https://xntcps.jxsxkeji.com/api.php'; //主接口;
var globalUrl = ["login"]
if (uni.getStorageSync("cdj_token")) {
	var header = {
		'Accept': 'application/json',
		'content-type': 'application/json', //
		'token': uni.getStorageSync("userToken"),
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
			'token': uni.getStorageSync("userToken"),
		},
		data: datas,
		success: res => {
			success(res)
			if (res.data.code == 401) {
				uni.removeStorageSync('userToken');
				// 	uni.reLaunch({
				// 		url:'/pages/account/login'
				// 	})
			}
			// if (res.header.token != undefined) {
			// 	uni.setStorageSync("cdj_token", res.header.authorization)
			// }
			if (loading) {
				uni.hideLoading();
			}
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
			'token': uni.getStorageSync("userToken"),
		},
		data: datas,
		success: res => {
			success(res)
			console.log(res)
			if (res.data.code == 401) {
				uni.removeStorageSync('userToken');

				// uni.reLaunch({
				// 	url:'/pages/account/login'
				// })
			}
			// if (res.header.authorization != undefined) {
			// 	uni.setStorageSync("cdj_token", res.header.authorization)
			// }
			if (loading) {
				uni.hideLoading();
			}
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
//判断该操作是否需要登录
function needLogin(success) {
	if (uni.getStorageSync('userToken')) {
		success()
	} else {
		uni.showModal({
			title: '温馨提醒',
			content: '是否登录',
			cancelColor: '#999',
			confirmColor: "#59B727",
			success: function(res) {
				if (res.confirm) {
					getApp().globalData.isReload = true;
					uni.reLaunch({
						url: '/pages/account/login'
					})
				}
			}
		})
	}
}

function Toast(message) {
	uni.showToast({
		title: message,
		icon: 'none',
		duration: 2000
	})
}

function showModal(message, res) {
	uni.showModal({
		title: '温馨提示',
		content: message,
		confirmColor: '#57B127',
		success: (result) => {
			if (result.confirm) {
				res()
			}
		}


	})
}

export {
	get,
	post,
	Toast,
	needLogin,
	showModal
}
