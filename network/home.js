import $request from './request.js'

// 首页banner
export const bannerList = () => {
	return $request({
		url: 'Index/banner_list'
	})
}

// 品牌介绍
export const brandInfo = () => {
	return $request({
		url: 'Index/brand_introduction'
	})
}

// 资质实力
export const strength = () => {
	return $request({
		url: 'Index/qualification'
	})
}

// 业务介绍
export const business = () => {
	return $request({
		url: 'Index/business'
	})
}

// 线下门店
export const storeList = (option) => {
	return $request({
		url: 'Index/stores_list',
		data: {
			page: option.page || 1,
			limit: option.limit || 10
		}
	})
}

// 图文详情
export const imgtextDesc = (id) => {
	return $request({
		url: 'Index/members_content',
		data: {
			id
		}
	})
}

