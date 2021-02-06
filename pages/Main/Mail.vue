<template>
	<view class="container">
		<u-tabs-swiper ref="uTabs" height="88" :bar-style="barstyle" active-color="#343434" inactive-color="#9A9A9A"
		 bar-width="63" bar-height="5" fontSize="28" :current="current" :list="tabsList" @change="tabsChange" :is-scroll="false"
		 :active-item-style="navTab"></u-tabs-swiper>
		 
		 <view class="app-box" v-show="current == 0">
			<scroll-view :scroll-y="true" class="scroll-box">
				<view class="itself-info" @click="selfChange(item.id)" :class="{ active: selfActive === item.id }" v-for="(item) in selfInfo" :key="item.id">
					<view class="info-item">
						<view class="_label">
							<text>商家名称</text>
						</view>
						<view class="_value">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="info-item">
						<view class="_label">
							<text>联系电话</text>
						</view>
						<view class="_value">
							<text>{{item.phone}}</text>
						</view>
					</view>
					<view class="info-item">
						<view class="_label">
							<text>联系地址</text>
						</view>
						<view class="_value">
							<text>{{item.address}}</text>
						</view>
					</view>
				</view>
				
				<view class="app-box-btn" @click="saveSelf">
					<text>确定</text>
				</view>
			</scroll-view>
		 </view>
		 
		 <view class="app-box" v-show="current == 1">
		 	<scroll-view :scroll-y="true" class="scroll-box">
				<view class="app-box-title">
					<text>上门取件地址</text>
				</view>
				<view class="app-box-content">
					<radio-group class="app-box-address" @change="addressChange">
						<label class="app-box-address-item bottom-line" v-for="(item) in mailInfo" :key="item.id">
							<radio color="#DAB866" :checked="item.def == 1" :value="item.id"></radio>
							<view class="address-info">
								<view class="address-info-top">
									<text class="name">{{item.name}}</text>
									<text>{{item.phone}}</text>
								</view>
								<view class="address-info-bottom">
									<text space="ensp">{{item.province_name}} {{item.city_name}} {{item.district_name}} {{item.address}}</text>
								</view>
							</view>
						</label>
					</radio-group>
					<view class="app-box-add" @click="jumpAdd">
						<u-icon name="plus" top="0" margin-right="15"  color="#333" label="新增地址" label-color="#333333" label-pos="right" label-size="28rpx"></u-icon>
					</view>
				</view>
				
				<!-- 预约时间 -->
				<view class="app-title">
					<text class="title">预约时间</text>
					<view class="app-title-box" @click="isTimer = true">
						<view class="app-title-text" v-if="appointment == ''">
							<text>请选择预约时间</text>
						</view>
						<view class="app-title-text active" v-else>
							<text space="emsp">{{appointment}}</text>
						</view>
						<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
					</view>
				</view>
				
				<view class="app-box-btn" @click="saveAddress">
					<text>确定</text>
				</view>
			</scroll-view>
		 </view>
		 
		 <u-popup v-model="isTimer" mode="bottom" border-radius="20" safe-area-inset-bottom :closeable="true">
			 <view class="popup-container">
			 	<view class="popup-title">
			 		<text>预约时间</text>
			 	</view>
				<view class="popup-content">
					<scroll-view :scroll-y="true" enhanced :show-scrollbar="false" class="popup-left">
						<view class="popup-left-item" @click="timeChange(index)" :class="{ active: index === activeTime }" v-for="(item, index) in serviceTime" :key="index">
							<text>{{item.day}}</text>
						</view>
					</scroll-view>
					<scroll-view :scroll-y="true" class="popup-right">
						<view class="popup-right-box">
							<view class="popup-right-item" @click="itemChange(indez)" :class="{ active: indez === itemTime }"  v-for="(itez, indez) in time" :key="indez">
								<text>{{itez}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="popup-btn" @click="saveTime">
					<text>确定</text>
				</view>
			 </view>
		 </u-popup>
	</view>
</template>

<script>
	import { serviceTime, addressInfo, saveAddress } from '@/network/main'
	import { editSell, editReceive } from '@/network/profile'
	export default {
		data() {
			return {
				tabsList: [{
					name: '自行邮寄'
				}, {
					name: '预约顺丰'
				}],
				current: 0,
				barstyle: {
					backgroundColor: '#DAB866'
				},
				navTab: {
					"font-size": "33rpx",
					"transition": "all .3s"
				},
				appointment: '',
				isTimer: false,
				m_id: '',
				selfInfo: [],
				mailInfo: [],
				serviceTime: [],
				time: [],
				activeTime: 0,
				itemTime: 0,
				addressId: '',
				sid: '',
				mid: '',
				selfActive: '',
				isEdit: false,
				orderID: '',
				orderType: 0
			};
		},
		onLoad(option) {
			this.current = option.type
			this.m_id = option.m_id
			if(option.type == 0) {
				this.sid = option.id
			} else {
				this.mid = option.id
			}
			
			option.isEdit === 'true' ? this.isEdit = true : this.isEdit = false,
			this.orderID = option.oid
			this.orderType = option.order
		},
		onShow() {
			this.init() 
		},
		methods: {
			init() {
				this._getSelfInfo()
				this._getMailInfo()
				this._getServiceTime()
			},
			tabsChange(index) {
				this.current = index
			},
			_getSelfInfo() {
				addressInfo({ type: 1, m_id: this.m_id, id: this.sid }).then(res => {
					this.selfInfo = res
					this.selfActive = res[0].id
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_getMailInfo() {
				addressInfo({ type: 2, m_id: this.m_id, id: this.mid }).then(res => {
					this.mailInfo = res
					
					if(this.mid !== '') { this.addressId = this.mid  }
					
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			// 获取预约时间
			_getServiceTime() {
				serviceTime().then(res => {
					this.serviceTime = res
					this.time = res[0].time
				})
			},
			jumpAdd() {
				uni.navigateTo({
					url: '/pages/Profile/userdata/addAddress?type=1&m_id=' + this.m_id
				})
			},
			timeChange(e) {
				this.activeTime = e
				this.time = this.serviceTime[e].time
			},
			itemChange(e) {
				this.itemTime = e
			},
			saveTime() {
				let day = this.serviceTime[this.activeTime].day
				let time = this.time[this.itemTime]
				
				this.appointment =  `${day} ${time}`;
				
				this.isTimer = false
			},
			selfChange(e) {
				this.selfActive = e
			},
			addressChange(e) {
				this.addressId = e.detail.value
			},
			_setSaveAddress() {
				saveAddress({
					id: this.addressId,
					type: 2,
					m_id: this.m_id,
					time: this.appointment
				}).then(res => {
					uni.showToast({
						title: '选择成功',
						mask: true,
						success() {
							setTimeout(() => {
								const pages = getCurrentPages()
								const page = pages[pages.length - 2];
								page.$vm.addressType = 1
								page.$vm.addressInfos = res
								
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			saveAddress() {
				if(this.addressId === '') {
					return uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					})
				}
				
				if(this.appointment === '') {
					return uni.showToast({
						title: '请选择预约时间',
						icon: 'none'
					})
				}
				
				
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				
				
				if(!this.isEdit) {
					this._setSaveAddress()
				} else {
					if(this.orderType == 1) {
						this._editAddress()
					} else {
						this._editReceive()
					}
					
				}
				
				
			},
			_editAddress() {
				editSell({
					order_id: this.orderID,
					address_id: this.addressId,
					address_type: 2,
					m_id: this.m_id,
					time_string: this.appointment
				}).then(res => {
					uni.showToast({
						title: '修改邮寄成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_editReceive() {
				editReceive({
					order_id: this.orderID,
					address_id: this.addressId,
					address_type: 2,
					m_id: this.m_id,
					time_string: this.appointment
				}).then(res => {
					uni.showToast({
						title: '修改邮寄成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_setSaveSelf() {
				saveAddress({
					id: this.selfActive,
					type: 1,
					m_id: this.m_id
				}).then(res => {
					uni.showToast({
						title: '选择成功',
						mask: true,
						success() {
							setTimeout(() => {
								const pages = getCurrentPages()
								const page = pages[pages.length - 2];
								page.$vm.addressType = 0
								page.$vm.addressInfos = res
								
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			saveSelf() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				
				if(!this.isEdit) {
					this._setSaveSelf()
				} else {
					if(this.orderType == 1) {
						this._editSelf()
					} else {
						this._editSelfs()
					}
					
				}
				
			},
			_editSelf() {
				editSell({
					order_id: this.orderID,
					address_id: this.selfActive,
					address_type: 1,
					m_id: this.m_id
				}).then(res => {
					uni.showToast({
						title: '修改邮寄成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_editSelfs() {
				editReceive({
					order_id: this.orderID,
					address_id: this.addressId,
					address_type: 1,
					m_id: this.m_id
				}).then(res => {
					uni.showToast({
						title: '修改邮寄成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url('@/libs/css/popupBox.scss');
	page {
		background-color: #F5F5F5;
	}
	.app-box {
		width: 100%;
		height: calc(100vh - 98rpx);
		position: relative;
	}
	.scroll-box {
		width: 100%;
		height: 100%;
	}
	.itself-info {
		width: 100%;
		height: 360rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		@include box(38rpx 30rpx);
		.info-item {
			display: flex;
			margin-bottom: 35rpx;
			._label {
				font-size: 30rpx;
				color: #333333;
				line-height: 48rpx;
				font-weight: 400;
				margin-right: 70rpx;
				flex-shrink: 0;
			}
			._value {
				font-size: 30rpx;
				color: #333333;
				line-height: 48rpx;
			}
		}
	}
	.itself-info.active {
		background-color: rgba($color: #FFFFFF, $alpha: .8);
	}
	.app-box-btn {
		width: 750rpx;
		height: 98rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #39425A;
		font-size: 32rpx;
		color: #FFFFFF;
		
		@include flex-center();
	}
	.app-box-title {
		height: 106rpx;
		width: 100%;
		@include box(0 30rpx);
		@include flex-al();
		font-size: 30rpx;
		color: #9E9E9E;
		font-weight: 400;
		text {
			margin-top: 10rpx;
		}
	}
	.app-box-content {
		width: 100%;
		background-color: #FFFFFF;
	}
	.app-box-address {
		width: 100%;
		
		&-item {
			width: 100%;
			height: 139rpx;
			@include box(0 30rpx);
			@include flex-al();
			radio {
				transform: scale(.8);
			}
		}
		.address-info {
			margin-left: 20rpx;
			.address-info-top {
				font-size: 30rpx;
				color: #333333;
				line-height: 50rpx;
				font-weight: 400;
				.name {
					margin-right: 30rpx;
				}
			}
			.address-info-bottom {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400rpx;
				line-height: 49rpx;
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
	.app-box-add {
		width: 100%;
		height: 78rpx;
		@include flex-center();
	}
	.app-title {
		width: 100%;
		height: 104rpx;
		@include box(0 30rpx);
		@include flex-al-ju(space-between);
		margin-top: 20rpx;
		background-color: #FFFFFF;
		.title {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
		&-box {
			flex: 1;
			@include flex-al();
			overflow: hidden;
			.app-title-text {
				flex: 1;
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #999999;
				text-align: right;
				@include ellipsis();
				font-weight: 400;
			}
			.app-title-text.active {
				font-size: 30rpx;
				color: #333333;
			}
			.app-title-icon {
				flex-shrink: 0;
			}
		}
		
	}
	.popup-content {
		width: 100%;
		height: 277rpx;
		display: flex;
		.popup-left {
			width: 30%;
			height: 100%;
			background-color: #F6F6F6;
			&-item {
				width: 100%;
				height: 99rpx;
				@include flex-center();
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
			}
		}
		.popup-left-item.active {
			background-color: #FFFFFF;
		}
		.popup-right {
			width: 70%;
			height: 100%;
			background-color: #FFFFFF;
			&-box {
				width: 100%;
				height: 100%;
			}
			&-item {
				width: 100%;
				height: 99rpx;
				@include flex-center();
				font-size: 26rpx;
				color: #666666;
				font-weight: 400;
			}
		}
		.popup-right-item.active {
			color: #D9261C;
		}
	}
</style>
