const api = {
	//首页
	mainCate: '/main/cate', //分类
	mainRecommend: '/main/recommend', //精选推荐
	mainNew: '/main/new', //今日上新
	mainAd: '/main/ad', //轮播
	mainNotice: '/main/notice', //公告
	mainHotSearch: "/main/hot_search", //热门搜索
	mainSevice: "/main/service", //服务说明
	mainSend_sms: "/main/send_sms", //发送短信
	mainFreight: "/main/freight", //邮费
	mainAgree: "/main/agree", //个人协议
	mainRegion: "/main/region", //个人协议
	mainUpload: "/main/upload", //上传图片
	

	userRegister: "/user/register", //用户注册
	userLogin: "/user/login", //用户登录
	userLogout: "/user/logout", //用户退出
	userInfo: "/user/user_info", //用户退出
	userProfile: "/user/profile", //修改个人信息

	goodDetail: "/goods/detail", //商品详情
	goodCate: "/goods/cate", //商品分类一级
	goodChild_cate: "/goods/child_cate", //商品分类二级
	goodCateGood: "/goods/cate_goods", //分类下商品
	goodsList: '/goods/goods_list', //搜索商品列表
	goodsJoin_like: '/goods/join_like', //搜索商品列表
	goodsUser_like: '/goods/user_like', //搜索商品列表

	cartAdd_cart: '/cart/add_cart', //加入购物车
	cartIndex: '/cart/index', //购物车列表
	cartdel_cart: '/cart/del_cart', //删除购物车
	cart_count: '/cart/cart_count', //购物车总数
	update_cart_num: '/cart/update_cart_num', //更新购物车数量

	ordershipping_address: '/order/shipping_address', //删除购物车
	orderSex_tax: '/order/set_tax', //设置发票抬头
	orderAdd_order: '/order/add_order', //下单
	orderIndex: '/order/index', //所有订单
	
}
export {
	api
}
