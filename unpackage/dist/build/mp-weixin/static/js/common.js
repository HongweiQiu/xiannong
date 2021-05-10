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
export {
	dianji
}
