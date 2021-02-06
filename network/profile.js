import $request from './request.js'


// 保存信息
export const addMembers = (option) => {
	return $request({
		url: 'Login/add_members',
		data: {
			openid: option.openid || '',
			nickname: option.nickname || '',
			face: option.avatar || '',
			sex: option.sex || ''
		}
	})
}

// 获取用户信息
export const getUserInfo = (m_id) => {
	return $request({
		url: 'Personal/members_info',
		data: {
			m_id: m_id || ''
		}
	})
}

// 绑定手机号
export const bindUserPhone = (option) => {
	return $request({
		url: 'Login/getphone',
		data: {
			...option
		}
	})
}

// 年龄选择
export const ageSelect = () => {
	return $request({
		url: 'Personal/members_age',
	})
}


// 修改个人信息
export const updataInfo = (option) => {
	return $request({
		url: 'Personal/members_update',
		data: {
			...option
		}
	})
}

// 地址列表
export const addressList = (id) => {
	return $request({
		url: 'Personal/address_list',
		data: {
			m_id: id || ''
		}
	})
}

// 添加地址
export const addressAdd = (option) => {
	return $request({
		url: '/Personal/address_add',
		data: {
			m_id: option.m_id,
			contacts: option.name,
			mobile: option.phone,
			address: option.detail,
			province_name: option.province,
			city_name: option.city,
			district_name: option.district,
			adcode: option.adcode
		}
	})
}

// 地址详情
export const addressDesc = (option) => {
	return $request({
		url: 'Personal/address_desc',
		data: {
			m_id: option.m_id,
			address_id: option.address_id
		}
	})
}

// 地址修改
export const addressUpdata = (option) => {
	return $request({
		url: 'Personal/address_update',
		data: {
			m_id: option.m_id,
			contacts: option.name,
			mobile: option.phone,
			address: option.detail,
			province_name: option.province,
			city_name: option.city,
			district_name: option.district,
			adcode: option.adcode,
			address_id: option.id
		}
	})
}

// 帮助列表
export const helpList = () => {
	return $request({
		url: 'Personal/help_list'
	})
}

// 帮助详情
export const helpDesc = (id) => {
	return $request({
		url: 'Personal/help_desc',
		data: {
			id
		}
	})
}


// 订单导航
export const orderNav = (type) => {
	return $request({
		url: 'Order/navigation',
		data: {
			type
		}
	})
}

// 寄卖订单列表
export const sellOrderList = (option) => {
	return $request({
		url: 'Order/consignment_orders_list',
		data: {
			m_id: option.m_id,
			state: option.state || 0,
			page: option.page || 1,
			limit: option.limit || 10
		}
	})
}


// 回收订单列表
export const receiveOrderList = (option) => {
	return $request({
		url: 'Order/recycling_orders_list',
		data: {
			m_id: option.m_id,
			state: option.state || 0,
			page: option.page || 1,
			limit: option.limit || 10
		}
	})
}

// 寄件确认取件
export const sellPickup = (option) => {
	return $request({
		url: 'Order/consignment_orders_take',
		data: {
			order_id: option.id,
			order_number: option.number
		}
	})
}


// 回收确认取件
export const receivePickup = (option) => {
	return $request({
		url: 'Order/recycling_orders_take',
		data: {
			order_id: option.id,
			order_number: option.number
		}
	})
}

// 寄卖确认寄出
export const sellSendout = (option) => {
	return $request({
		url: 'Order/consignment_orders_confirm',
		data: {
			order_id: option.id,
			order_number: option.number
		}
	})
}


// 回收确认寄出
export const receiveSendout = (option) => {
	return $request({
		url: 'Order/recycling_orders_confirm',
		data: {
			order_id: option.id,
			order_number: option.number
		}
	})
}

// 修改寄出邮寄方式
export const editSell = (option) => {
	return $request({
		url: 'Order/consignment_orders_update',
		data: {
			order_id: option.order_id,
			address_id: option.address_id,
			address_type: option.address_type,
			m_id: option.m_id,
			time_string: option.time_string || ''
		}
	})
}


// 修改回收邮寄方式
export const editReceive = (option) => {
	return $request({
		url: 'Order/recycling_orders_update',
		data: {
			order_id: option.order_id,
			address_id: option.address_id,
			address_type: option.address_type,
			m_id: option.m_id,
			time_string: option.time_string || ''
		}
	})
}

// 寄卖订单详情
export const sellDesc = (id) => {
	return $request({
		url: 'Order/consignment_orders_desc',
		data: {
			order_id: id
		}
	})
}


// 回收订单详情
export const receiveDesc = (id) => {
	return $request({
		url: 'Order/recycling_orders_desc',
		data: {
			order_id: id
		}
	})
}

// 反馈意见
export const memberOpinion = (option) => {
	return $request({
		url: 'Personal/members_opinion',
		data: {
			m_id: option.m_id,
			content:　option.content,
			contact: option.contact
		}
	})
}


