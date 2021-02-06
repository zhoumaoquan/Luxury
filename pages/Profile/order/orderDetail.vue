<template>
	<view class="container  u-skeleton">
		<view class="app-head">
			<view class="app-head-bg">
				<image v-if="detail.type == 1" src="@/static/image/bg3.png"></image>
				<image v-if="detail.type == 2" src="@/static/image/bg4.png"></image>
			</view>

			<view class="app-head-title u-skeleton-fillet">
				<!-- 寄卖类型订单 -->

				<block v-if="detail.type == 1">
					<text v-if="detail.state == 1">待寄出</text>
					<text v-if="detail.state == 2">待预约</text>
					<text v-if="detail.state == 3">待取件</text>
					<text v-if="detail.state == 4">待收货</text>
					<text v-if="detail.state == 5">已收货</text>
					<text v-if="detail.state == 6">售卖中</text>
					<text v-if="detail.state == 7">已售出</text>
					<text v-if="detail.state == 8">未收到货品</text>
					<text v-if="detail.state == 9">退货货品</text>
				</block>
				<!-- 收类型订单 -->
				<block v-else>
					<text v-if="detail.state == 1">待寄出</text>
					<text v-if="detail.state == 2">待预约</text>
					<text v-if="detail.state == 3">待取件</text>
					<text v-if="detail.state == 4">待收货</text>
					<text v-if="detail.state == 5">已收货</text>
					<text v-if="detail.state == 8">未收到商品</text>
					<text v-if="detail.state == 9">退货商品</text>
				</block>
			</view>
		</view>

		<view class="app-box u-skeleton-fillet">
			<!-- 自行寄出 -->
			<view class="app-box-send" v-if="detail.address_type == 1">
				<view class="app-box-item bottom-line">
					<view class="app-box-item_icon">
						<image src="@/static/icon/che.png"></image>
					</view>
					<view class="app-box-item_title">
						<text>自行寄出</text>
					</view>

					<view class="app-box-item_text" v-if="detail.state != 1 && detail.state != 2">
						<text>快递单号：{{detail.order_number}}</text>
					</view>
				</view>

				<view class="app-box-content">
					<view class="app-box-item">
						<view class="app-box-item_icon">
							<image src="@/static/icon/fang.png"></image>
						</view>
						<view class="app-box-item_title">
							<text>{{detail.address.name}}</text>
						</view>

						<view class="app-box-item_phone">
							<text>{{detail.address.phone}}</text>
						</view>
					</view>
					<view class="app-box-address">
						<text>{{detail.address.address}}</text>
					</view>
				</view>
			</view>
			<!-- 自行寄出 end -->

			<!-- 预约顺丰 -->
			<view class="app-box-reserve" v-else>
				<view class="app-box-item bottom-line">
					<view class="app-box-item_icon">
						<image src="@/static/icon/yue.png"></image>
					</view>
					<view class="app-box-item_title">
						<text>预约顺丰</text>
					</view>
				</view>

				<view class="app-box-content bottom-line">
					<view class="app-box-item">
						<view class="app-box-item_icon">
							<image src="@/static/icon/jia.png"></image>
						</view>
						<view class="app-box-item_title">
							<text>{{detail.address.name}}</text>
						</view>

						<view class="app-box-item_phone">
							<text>{{detail.address.phone}}</text>
						</view>
					</view>
					<view class="app-box-address">
						<text>{{detail.address.province_name}} {{detail.address.city_name}} {{detail.address.district_name}} {{detail.address.address}}</text>
					</view>
				</view>

				<view class="app-box-item">
					<view class="app-box-item_icon">
						<image src="@/static/icon/shij.png"></image>
					</view>
					<view class="app-box-item_title">
						<text>取件时间</text>
					</view>

					<view class="app-box-item_text">
						<text>{{detail.time_string}}</text>
					</view>
				</view>
			</view>
			<!-- 预约顺丰 end -->
		</view>

		<view class="app-wrap">
			<view class="app-wrap-title">
				<view class="_icon">
					<image src="@/static/icon/shang.png"></image>
				</view>
				<view class="_title u-skeleton-fillet">
					<text>商品信息</text>
				</view>
			</view>

			<view class="app-wrap-item u-skeleton-fillet">
				<text class="_label">品类</text>
				<text class="_value">{{detail.category_name}}</text>
			</view>

			<view class="app-wrap-item u-skeleton-fillet">
				<text class="_label">品牌</text>
				<text class="_value">{{detail.brand_name}}</text>
			</view>

			<view class="app-wrap-item u-skeleton-fillet">
				<text class="_label">购买渠道</text>
				<text class="_value">{{detail.channel_name}}</text>
			</view>

			<view class="app-wrap-item u-skeleton-fillet">
				<text class="_label">商品图片</text>
			</view>
			<!-- 商品图片 -->
			<view class="app-wrap-image">
				<view class="app-wrap-image__item u-skeleton-fillet" @click="preview(detail.positive_image[0].abs_url)">
					<u-image mode="scaleToFill" :src="detail.positive_image[0].abs_url" border-radius="20" width="196" height="196"></u-image>

					<view class="app-wrap-image__text">
						<text>正面图</text>
					</view>
				</view>
				<view class="app-wrap-image__item u-skeleton-fillet" @click="preview(detail.side_image[0].abs_url)">
					<u-image mode="scaleToFill" :src="detail.side_image[0].abs_url" border-radius="20" width="196" height="196"></u-image>

					<view class="app-wrap-image__text">
						<text>侧视图</text>
					</view>
				</view>
				<view class="app-wrap-image__item u-skeleton-fillet" @click="preview(detail.details_image[0].abs_url)">
					<u-image mode="scaleToFill" :src="detail.details_image[0].abs_url" border-radius="20" width="196" height="196"></u-image>

					<view class="app-wrap-image__text">
						<text>细节图</text>
					</view>
				</view>
				<view class="app-wrap-image__item u-skeleton-fillet" @click="preview(detail.buy_image[0].abs_url)">
					<u-image mode="scaleToFill" :src="detail.buy_image[0].abs_url" border-radius="20" width="196" height="196"></u-image>

					<view class="app-wrap-image__text">
						<text>购买凭证</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="app-alone u-skeleton-fillet" @click="jumpTreaty">
			<text>签约合同</text>

			<u-icon name="arrow-right" size="28" color="#666"></u-icon>
		</view> -->

		<view class="app-info u-skeleton-fillet">
			<view class="app-info-title">
				<text>订单信息</text>
			</view>
			<view class="app-info-item">
				<text class="_label">订单编号</text>
				<text class="_value">{{detail.sn}}</text>
			</view>
			<view class="app-info-item">
				<text class="_label">订单状态</text>
				<view class="_value active">
					<block v-if="detail.type == 1">
						<text v-if="detail.state == 1">待寄出</text>
						<text v-if="detail.state == 2">待预约</text>
						<text v-if="detail.state == 3">待取件</text>
						<text v-if="detail.state == 4">待收货</text>
						<text v-if="detail.state == 5">已收货</text>
						<text v-if="detail.state == 6">售卖中</text>
						<text v-if="detail.state == 7">已售出</text>
						<text v-if="detail.state == 8">未收到货品</text>
						<text v-if="detail.state == 9">退货货品</text>
					</block>
					<!-- 收类型订单 -->
					<block v-else>
						<text v-if="detail.state == 1">待寄出</text>
						<text v-if="detail.state == 2">待预约</text>
						<text v-if="detail.state == 3">待取件</text>
						<text v-if="detail.state == 4">待收货</text>
						<text v-if="detail.state == 5">已收货</text>
						<text v-if="detail.state == 8">未收到商品</text>
						<text v-if="detail.state == 9">退货商品</text>
					</block>
				</view>
			</view>
			<view class="app-info-item">
				<text class="_label">下单时间</text>
				<text class="_value">{{detail.add_time}}</text>
			</view>
		</view>
		<view class="app-btn" v-if="detail.state == 1 || detail.state == 2 || detail.state == 3">
			<block v-if="detail.state == 1">
				<view class="app-btn-item" @click.stop="modify(detail.id, detail.address_id, detail.address_type)">
					<text>修改邮寄</text>
				</view>
				<view class="app-btn-item active" @click.stop="isSend = true">
					<text>确认寄出</text>
				</view>
			</block>

			<block v-if="detail.state == 2">
				<view class="app-btn-item active" @click.stop="modify(detail.id, detail.address_id, detail.address_type)">
					<text>修改邮寄</text>
				</view>
			</block>

			<block v-if="detail.state == 3">
				<view class="app-btn-item active" @click.stop="isSend = true">
					<text>确认取件</text>
				</view>
			</block>
		</view>
		
		<u-popup v-model="isSend" mode="center" :negative-top="mgtop" border-radius="10">
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
		
		<u-skeleton :loading="loading" :animation="true" bgColor="#F7F7F7" el-color="#ffffff"></u-skeleton>
	</view>
</template>

<script>
	import {
		sellDesc,
		receiveDesc,
		sellPickup,
		receivePickup,
		sellSendout,
		receiveSendout
	} from '@/network/profile'
	export default {
		data() {
			return {
				type: 1,
				id: '',
				loading: true,
				detail: {},
				mgtop: 0,
				isSend: false,
				isPickup: false,
				number: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...',
				
			})
			if (option.type == 1) {
				uni.setNavigationBarTitle({
					title: '寄卖订单详情'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '回收订单详情'
				})
			}

			this.type = option.type
			this.id = option.id

		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				if (this.type == 1) {
					this._sellDesc()
				} else {
					this._receiveDesc()
				}
			},
			_sellDesc() {
				sellDesc(this.id).then(res => {

					this.detail = res

					setTimeout(() => {
						uni.hideLoading()
						this.loading = false
					}, 800)

				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				})
			},
			_receiveDesc() {
				receiveDesc(this.id).then(res => {
					this.detail = res


					setTimeout(() => {
						uni.hideLoading()
						this.loading = false
					}, 800)

				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				})
			},
			modify(oid, aid,type) {
				let _this = this
				let types = type - 1
				uni.showModal({
					title: '提示',
					content: '您确定需要修改邮寄吗？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/Main/Mail?type=' + types + '&m_id=' + _this.detail.m_id + '&id=' + aid + '&oid=' + oid +
									'&order=' + _this.type + '&isEdit=true'
							})
						}
					}
				})
			},
			pickup() {
				if (this.type == 1) {
					this._sellPickup()
				} else {
					this._receivePickup()
				}
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
			
				if (this.type == 1) {
					this._sellSendout()
				} else {
					this._receiveSendout()
				}
			},
			_sellPickup() {
				sellPickup(this.id).then(res => {
					uni.showToast({
						title: '操作成功',
						mask: true
					})
					this._sellDesc()
					this.isPickup = false
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_receivePickup(){
				receivePickup(this.id).then(res => {
					uni.showToast({
						title: '操作成功',
						mask: true
					})
					this._receiveDesc()
					this.isPickup = false
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_sellSendout() {
				sellSendout({
					id: this.id,
					number: this.number
				}).then(res => {
			
					uni.showToast({
						title: '确认成功',
						mask: true
					})
					this.isSend = false
					this._sellDesc()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			_receiveSendout() {
				receiveSendout({
					id: this.id,
					number: this.number
				}).then(res => {
			
					uni.showToast({
						title: '确认成功',
						mask: true
					})
					this.isSend = false
					this._receiveDesc()
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			inputfocus() {
				this.mgtop = 350
			},
			inputblur() {
				this.mgtop = 0
			},
			jumpTreaty() {
				uni.navigateTo({
					url: '/pages/Main/protocol?type=2&id=' + this.id + '&types=' + this.type
				})
			},
			preview(img) {
				let res = [img]
				uni.previewImage({
					urls: res
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
		background-color: #F7F7F7;
		padding-bottom: 210rpx;
	}

	.container {
		align-items: center;
	}

	.app-head {
		width: 100%;
		height: 226rpx;
		position: relative;
		z-index: 998;

		&-bg {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-title {
			position: absolute;
			top: 35rpx;
			left: 49rpx;

			text {
				font-size: 44rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
	}

	.app-box {
		position: relative;
		width: 690rpx;
		margin-top: -90rpx;
		z-index: 999;
		background-color: #FFFFFF;
		border-radius: 20rpx;

		&-content {
			@include box(0 0 20rpx 0);
		}

		&-item {
			width: 100%;
			height: 110rpx;
			@include flex-al();
			@include box(0 30rpx);

			&_icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 19rpx;
				margin-top: 4rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			&_title {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
				margin-right: 19rpx;
			}

			&_text {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				font-size: 26rpx;
				color: #666666;
				font-weight: 400;
			}

			&_phone {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
			}
		}

		&-address {
			width: 100%;

			@include box(0 35rpx 0 84rpx);
			display: flex;
			flex-wrap: wrap;
			font-size: 28rpx;
			color: #666666;
			font-weight: 400;
			line-height: 40rpx;
		}
	}

	.app-box-send {
		width: 100%;
		height: 323rpx;
	}

	.app-wrap {
		width: 690rpx;
		height: 947rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 20rpx;
		@include box(0 30rpx);

		&-title {
			width: 100%;
			height: 110rpx;
			@include flex-al();

			._icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 19rpx;
				margin-top: 4rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			._title {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
			}
		}

		&-item {
			width: 100%;
			height: 70rpx;
			@include flex-al-ju(space-between);

			._label {
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
			}

			._value {
				font-size: 28rpx;
				color: #666666;
				font-weight: 400;
			}
		}

		&-image {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;

			&__item {
				width: 196rpx;
				margin-bottom: 30rpx;
				margin-right: 20rpx;

				.app-wrap-image__text {
					font-size: 24rpx;
					color: #666666;
					font-weight: 400;
					margin-top: 20rpx;
					text-align: center;
				}
			}
		}
	}

	.app-wrap-image__item:nth-of-type(3n+3) {
		margin-right: 0rpx;
	}

	.app-alone {
		margin-top: 20rpx;
		@include box(0 30rpx);
		width: 690rpx;
		height: 108rpx;
		@include flex-al-ju(space-between);
		font-size: 32rpx;
		color: #333333;
		font-weight: 600;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.app-info {
		width: 690rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		@include box(20rpx 30rpx);
		margin-top: 20rpx;

		&-title {
			width: 100%;
			height: 80rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
			@include flex-al();
		}

		&-item {
			width: 100%;
			height: 70rpx;
			@include flex-al-ju(space-between);

			._label {
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
				margin-right: 20rpx;
			}

			._value {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				font-size: 28rpx;
				color: #666666;
				font-weight: 400;
			}

			.active {
				color: #D9261C;
				font-weight: 500;
			}
		}
	}

	.app-btn {
		width: 100%;
		height: 110rpx;

		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;

		z-index: 999;
		@include flex-al();
		@include box(0 30rpx);
		justify-content: flex-end;

		&-item {
			box-sizing: border-box;
			width: 140rpx;
			height: 50rpx;
			border-radius: 10rpx;
			border: 1rpx solid #EAEAEA;
			@include flex-center();
			font-size: 24rpx;
			color: #666666;
			font-weight: bold;
			background-color: #FFFFFF;
			margin-left: 18rpx;
		}
	}

	.app-btn-item.active {
		background-color: #39425A;
		color: #FFFFFF;

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
