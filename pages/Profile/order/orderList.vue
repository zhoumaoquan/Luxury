<template>
	<view class="container">
		<u-tabs ref="uTabs" height="70" :current="current" inactive-color="#333333" bar-height="5" bar-width="48" font-size="26"
		 active-color="#D9261C" name="title" :list="list" :is-scroll="true" @change="tabsChange"></u-tabs>
		<view class="app-box">
			<scroll-view class="scroll-box" :refresher-threshold="100" :refresher-enabled="true" :refresher-triggered="triggered"
			 refresher-background="#F5F5F5" :scroll-y="true" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
			 @refresherrestore="onRestore" @scrolltolower="pullloading">


				<view v-if="orderList.length > 0">
					<order-list @modify="orderModify" @send="orderSend" @pickup="orderPickup" v-for="(item) in orderList" :key="item.id"
					 :Data="item"></order-list>

					<u-loadmore @loadmore="loadClick" v-if="orderList.length > 1" margin-bottom="50" bg-color="#f5f5f5" margin-top="30"
					 :status="status" :load-text="loadText" />
				</view>
				<view v-else>
					<u-empty margin-top="150" icon-size="160" text="您还没有相关的订单" font-size="28" color="#999" mode="favor" icon-color="#999">
						<view slot="bottom" class="empty-text">
							<text>看看有没有想寄卖、回收的宝贝</text>
						</view>
					</u-empty>
				</view>


			</scroll-view>
		</view>

		<u-popup v-model="isShow" mode="center" :negative-top="mgtop" @close="number = ''" border-radius="10">
			<view class="popup-box">
				<view class="popup-box-title">
					<text>填写单号</text>
				</view>
				<view class="popup-box-content">
					<input @focus="inputfocus" maxlength="25" v-model="number" @blur="inputblur" placeholder="请输入快递单号" />
					<view class="popup-box-scan">
						<u-icon name="scan" color="#666" top="0" @click="scanCode" size="50rpx"></u-icon>
					</view>
				</view>

				<view class="popup-box-btn" @click="confirm">
					<text>确定</text>
				</view>
			</view>
		</u-popup>

		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import {
		orderNav,
		sellOrderList,
		receiveOrderList,
		sellPickup,
		receivePickup,
		sellSendout,
		receiveSendout
	} from '@/network/profile'
	import OrderList from '@/component/ListItem/orderList.vue'
	export default {
		components: {
			OrderList
		},
		data() {
			return {
				list: [],
				params: {
					page: 1,
					limit: 10,
					state: 0,
					m_id: ''
				},
				current: 0,
				triggered: false,
				isShow: false,
				mgtop: 0,
				orderList: [],
				status: 'loadmore',
				loadText: {
					loadmore: '用力往下拉(点击)',
					loading: '正在加载，请休息下...',
					nomore: '我也是有底线的~'
				},
				flag: true,
				type: '',
				currentId: '',
				number: '',
				state: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.type = option.type
			this.params.m_id = option.m_id
			if (option.type == 1) {
				uni.setNavigationBarTitle({
					title: '寄卖订单'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '回收订单'
				})
			}

		},
		onShow() {
			this._getOrderNav()
		},
		methods: {
			async _getOrderNav() {
				try {
					let res = await orderNav(this.type)

					this.list = res

					if (this.type == 1) {
						this._getSellOrderList()
					} else {
						this._getReceiveOrderList()
					}


				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}
			},
			_getSellOrderList(refresh) {
				sellOrderList(this.params).then(res => {

					this.orderList = res

					uni.hideLoading()

					if (refresh) {
						setTimeout(() => {
							this.triggered = false;
							this._freshing = false;
						}, 1000)
					}

				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_getReceiveOrderList(refresh) {
				receiveOrderList(this.params).then(res => {

					this.orderList = res

					uni.hideLoading()

					if (refresh) {
						setTimeout(() => {
							this.triggered = false;
							this._freshing = false;
						}, 1000)
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			tabsChange(index) {

				uni.showLoading({
					title: 'Loading...'
				})


				this.params.state = this.list[index].state

				this.current = index
				this.flag = true
				this.params.page = 1
				if (this.type == 1) {
					this._getSellOrderList()
				} else {
					this._getReceiveOrderList()
				}
			},
			onPulling() {
				this.triggered = true
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;

				if (this.type == 1) {
					this._getSellOrderList(true)
				} else {
					this._getReceiveOrderList(true)
				}
			},
			// 上拉加载
			pullloading() {
				if (!this.flag) return
				this.status = 'loading'
				this.params.page += 1
				if (this.type == 1) {
					this._loadingSell()
				} else {
					this._loadingReceive()
				}
			},
			_loadingSell() {
				sellOrderList(this.params).then(res => {

					if (res.length === 0 || res === '') {
						this.flag = false
						this.params.page -= 1
						this.status = 'nomore'
						return;
					} else {
						this.orderList = [...this.orderList, ...res]
						this.status = 'loadmore'
					}

				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_loadingReceive() {
				receiveOrderList(this.params).then(res => {
					if (res.length === 0 || res === '') {
						this.flag = false
						this.params.page -= 1
						this.status = 'nomore'
						return;
					} else {
						this.orderList = [...this.orderList, ...res]
						this.status = 'loadmore'
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			onRestore() {
				this.triggered = 'restore';

				this.topTips()
			},
			topTips() {
				this.$refs.uTips.show({
					title: '订单列表已刷新',
					type: 'success'
				})
			},
			inputfocus() {
				this.mgtop = 350
			},
			inputblur() {
				this.mgtop = 0
			},
			loadClick() {
				this.pullloading()
			},
			// 修改邮寄
			orderModify(obj) {
				let _this = this
				let type = obj.type - 1
				uni.showModal({
					title: '提示',
					content: '您确定需要修改该订单邮寄吗？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/Main/Mail?type=' + type + '&m_id=' + _this.params.m_id + '&id=' + obj.aid + '&oid=' + obj.oid +
									'&order=' + _this.type + '&isEdit=true'
							})
						}
					}
				})
			},
			// 确认寄出
			orderSend(option) {
				this.state = option.status
				this.currentId = option.id
				this.isShow = true
			},
			// 确认取件
			orderPickup(option) {
				console.log(option)
				this.state = option.status
				this.currentId = option.id
				this.isShow = true
			},
			
			_sellPickup() {
				sellPickup({
					id: this.currentId,
					number: this.number
				}).then(res => {
					uni.showToast({
						title: '操作成功',
						mask: true
					})
					this.isShow = false
					this.number = ''
					this._getSellOrderList()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_receivePickup(){
				receivePickup({
					id: this.currentId,
					number: this.number
				}).then(res => {
					uni.showToast({
						title: '操作成功',
						mask: true
					})
					this.isShow = false
					this.number = ''
					this._getReceiveOrderList()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			confirm() {
				if (this.number === '') {
					return uni.showToast({
						title: '请输入快递单号',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '保存中...',
					mask: true
				})
				
				if(this.state == 1) {
					if (this.type == 1) {
						this._sellSendout()
					} else {
						this._receiveSendout()
					}
				} else if(this.state == 2) {
					if (this.type == 1) {
						this._sellPickup()
					} else {
						this._receivePickup()
					}
				}
				
				
			},
			_sellSendout() {
				sellSendout({
					id: this.currentId,
					number: this.number
				}).then(res => {

					uni.showToast({
						title: '确认成功',
						mask: true
					})
					this.isShow = false
					this.number = ''
					this._getSellOrderList()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_receiveSendout() {
				receiveSendout({
					id: this.currentId,
					number: this.number
				}).then(res => {

					uni.showToast({
						title: '确认成功',
						mask: true
					})
					this.isShow = false
					this.number = ''
					this._getReceiveOrderList()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			// 扫码
			scanCode() {
				let _this = this
				wx.scanCode({
					success(res) {
						_this.number = res.result
						
						uni.showToast({
							title: '扫描成功',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
		overflow: hidden;
	}

	.app-box {
		width: 100%;
		height: calc(100vh - 80rpx);
	}

	.scroll-box {
		width: 100%;
		height: 100%;
	}

	.empty-text {
		font-size: 22rpx;
		color: #999999;
	}

	.popup-box {
		width: 630rpx;
		height: 430rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-title {
			width: 100%;
			height: 142rpx;
			@include flex-center();
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;
		}

		&-content {
			width: 534rpx;
			height: 106rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			border: 2rpx solid #D4D4D4;
			overflow: hidden;
			@include box(0 25rpx);
			position: relative;
			input {
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				color: #333333;
			}
			
		}
		&-scan {
			width: 106rpx;
			height: 106rpx;
			@include flex-center()
			position: absolute;
			right: 0;
			top: 0px;
			z-index: 10;
		}
		&-btn {
			width: 510rpx;
			height: 82rpx;
			background-color: #39425A;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			@include flex-center();
			margin-top: 60rpx;
		}
	}
</style>
