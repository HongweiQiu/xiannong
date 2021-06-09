function dianji(fn) {
	//多次点击的问题
	let {
		onoff
	} = getApp().globalData;

	if (onoff) {
		getApp().globalData.onoff = false;
		fn();
		setTimeout(function() {
			getApp().globalData.onoff = true;
		}, 1500)
	} else {
		//如果一直走else分支可能是你没有在页面的data下面挂载onoff:true,不然一直都会走else
		console.log("请稍后点击")
	}
}

function Covering(num) {
	return num >= 10 ? num : '0' + num
}

function fomartDate(date) {
	let ms = new Date(date * 1000);
	var y = ms.getFullYear()
	var m = ms.getMonth() + 1
	var d = ms.getDate()
	var H = ms.getHours()
	var M = ms.getMinutes()
	var S = ms.getSeconds()

	return y + '-' + Covering(m) + '-' + Covering(d) + ' ' + Covering(H) + ':' + Covering(M) + ':' + Covering(
		S)
}
function fixed(val){
	return Number(val).toFixed(2)
}
export {
	dianji,
	fomartDate,
	fixed
}
