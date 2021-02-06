import $request from './request.js'

// 寄卖信息
export const consignment = () => {
	return $request({
		url: 'Index/consignment_index'
	})
}

// 回收信息
export const recycling = () => {
	return $request({
		url: 'Index/recycling_index'
	})
}

// 协议接口
export const agreement = (option = { id: '', type: '' }) => {
	return $request({
		url: 'Index/agreement',
		data: {
			order_id: option.id || '',
			type: option.type || ''
		}
	})
}

// 分类列表
export const categoryList = () => {
	return $request({
		url: 'Index/category_list'
	})
}

// 分类对应品牌
export const brandList = (option) => {
	return $request({
		url: 'Index/brand_list',
		data: {
			type: option.type,
			name: option.name
		}
	})
}

// 购买渠道
export const channelList = () => {
	return $request({
		url: 'Index/channel_list'
	})
}


// 地址详情
export const saveAddress = (option) => {
	return $request({
		url: 'Index/address_desc',
		data: {
			address_id: option.id || '',
			type: option.type,
			m_id: option.m_id,
			time_string: option.time || ''
		}
	})
}


// 地址列表
export const addressInfo = (option) => {
	return $request({
		url: 'Index/address_list',
		data: {
			type: option.type || 1,
			m_id: option.m_id || '',
			address_id: option.id || ''
		}
	})
}

// 获取预约时间
export const serviceTime = () => {
	return $request({
		url: 'Index/service_time'
	})
}


// 寄卖提交订单
export const sellOrder = (option) => {
	return $request({
		url: 'Order/consignment_orders_add',
		data: {
			...option
		}
	})
}

// 回收提交订单
export const recycleOrder = (option) => {
	return $request({
		url: 'Order/recycling_orders_add',
		data: {
			...option
		}
	})
}

// 获取微信账号图
export const wxImage = (id) => {
	return $request({
		url: 'Index/wx_image',
		data: {
			m_id: id || ''
		}
	})
}