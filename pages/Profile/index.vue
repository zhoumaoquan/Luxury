<template>
	<view class="container">
		<view class="app-head">
			<view class="app-head-bg">
				<image src="@/static/image/bg.png"></image>
			</view>

			<view class="app-head-box">
				<view class="app-head-noLogin" v-if="Object.keys(userInfo).length === 0" @click="goLogin">
					<image src="@/static/image/defaultavatar.png" class="avatar"></image>
					<view class="app-head-text">
						<text>注册/登录</text>
					</view>
					<u-icon name="arrow-right" top="0" color="#666" size="30"></u-icon>
				</view>
				<view class="app-head-Login" v-else>
					<u-image :src="userInfo.face[0].abs_url" width="110" height="110" border-radius="50%" @click="jumpUserInfo"></u-image>
					<view class="app-head-info">
						<view class="app-head-name">
							<text>{{userInfo.nickname}}</text>
						</view>
						<button open-type="getPhoneNumber" @getphonenumber="getPhone" class="app-head-phone" v-if="userInfo.phone === ''">
							<u-icon name="arrow-right" label="绑定手机号" label-pos="left" label-size="22" color="#DAB866" top="-1" size="22"
							 label-color="#DAB866"></u-icon>
						</button>
						<view class="app-head-text" v-else>
							<text>{{userInfo.phone}}</text>
						</view>
					</view>
					<view class="app-head-icon">
						<u-icon name="arrow-right" top="0" color="#666" size="30" @click="jumpUserInfo"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="app-box">
			<view class="app-box-title">
				<image src="@/static/icon/yewu.png"></image>
				<text>我的业务</text>
			</view>

			<view class="app-menu">
				<view class="app-menu-item1" @click="current = 1"></view>
				<view class="app-menu-item2" @click="current = 2"></view>
				<view class="app-menu-bg">
					<image src="@/static/image/menu1.png" v-if="current == 1"></image>
					<image src="@/static/image/menu2.png" v-else></image>
				</view>
				<view class="app-menu-box">
					<!-- 寄卖订单 -->
					<view class="app-menu-content" v-if="current == 1">
						<view class="app-menu-item" @click="jumpSell">
							<image src="@/static/icon/jichu.png"></image>
							<text>待寄出</text>
						</view>
						<view class="app-menu-item" @click="jumpSell">
							<image src="@/static/icon/shouhuo.png"></image>
							<text>待收货</text>
						</view>
						<view class="app-menu-item" @click="jumpSell">
							<image src="@/static/icon/yishouhuo.png"></image>
							<text>已收货</text>
						</view>
						<view class="app-menu-item" @click="jumpSell">
							<image src="@/static/icon/weishoudao.png"></image>
							<text>未收到货品</text>
						</view>
						<view class="app-menu-item" @click="jumpSell">
							<image src="@/static/icon/tuihuo.png"></image>
							<text>退货货品</text>
						</view>
					</view>

					<!-- 回收订单 -->
					<view class="app-menu-content" v-else>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/yuyue.png"></image>
							<text>待预约</text>
						</view>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/qujian.png"></image>
							<text>待取件</text>
						</view>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/shouhuo.png"></image>
							<text>待收货</text>
						</view>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/yishouhuo.png"></image>
							<text>已收货</text>
						</view>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/weishoudao.png"></image>
							<text>未收到商品</text>
						</view>
						<view class="app-menu-item" @click="jumpReceive">
							<image src="@/static/icon/tuihuo.png"></image>
							<text>退货商品</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<button open-type="contact" class="app-box-item mg-20">
			<image class="app-box-item-icon" src="@/static/icon/kefu.png"></image>
			<view class="app-box-item-text">
				<text>专属客服</text>
			</view>
			<u-icon name="arrow-right" size="28" color="#666" top="0"></u-icon>
		</button>


		<view class="app-box-item mg-20" @click="jumpHelpList">
			<image class="app-box-item-icon" src="@/static/icon/bangzhu.png"></image>
			<view class="app-box-item-text">
				<text>帮助文档</text>
			</view>
			<u-icon name="arrow-right" size="28" color="#666" top="0"></u-icon>
		</view>
		<view class="app-box-item" @click="jumpFeedBack">
			<image class="app-box-item-icon" src="@/static/icon/yijian.png"></image>
			<view class="app-box-item-text">
				<text>意见反馈</text>
			</view>
			<u-icon name="arrow-right" size="28" color="#666" top="0"></u-icon>
		</view>

		<u-popup v-model="isLogin" safe-area-inset-bottom :mask-close-able="false" ref="loginBy" height="472" mode="bottom"
		 border-radius="20">
			<view class="popup-closes">
				<view class="popup-closes-title">
					<text>您还未登录，请先登录</text>
				</view>
				<view class="popup-closes-box">
					<view class="popup-closes-btn active" @click="onLogin">
						<text>去登录</text>
					</view>
					<view class="popup-closes-btn" @click="closeLogin">
						<text>取消</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getUserInfo,
		bindUserPhone
	} from '@/network/profile.js'
	export default {
		data() {
			return {
				isLogin: false,
				current: 1,
				userInfo: {},
				m_id: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
		},
		onShow() {
			this.m_id = uni.getStorageSync('m_id')
			if (this.m_id !== '' && this.m_id !== undefined) {
				this._getUserInfo()
			} else {
				uni.hideLoading()
			}
		},
		methods: {
			// 登陆提示弹窗 打开
			goLogin() {
				uni.hideTabBar({
					animation: true
				})
				this.isLogin = true
			},
			// 登陆提示弹窗 关闭
			closeLogin() {
				this.isLogin = false
				uni.showTabBar({
					animation: true
				})
			},
			// 跳转登陆页
			onLogin() {
				this.closeLogin()

				uni.navigateTo({
					url: '/pages/Profile/Login'
				})
			},
			// 获取用户信息
			async _getUserInfo() {
				try {
					let res = await getUserInfo(this.m_id)

					this.userInfo = res
					uni.hideLoading()
				} catch (e) {
					let _this = this
					uni.hideLoading()
					uni.showToast({
						title: '获取用户信息失败',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.removeStorageSync('m_id')
								
								_this.userInfo = {}
							}, 1500)
						}
					})
				}
			},
			// 绑定微信手机号
			async getPhone(e) {
				let _this = this
				const session_key = uni.getStorageSync('session_key')
				bindUserPhone({
					m_id: this.m_id,
					session_key: session_key,
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData
				}).then(res => {
					
					uni.showToast({
						title: '绑定手机成功',
						icon: 'none',
						success() {
							setTimeout(() => {
								_this._getUserInfo()
							}, 1500)
						}
					})
					
				}).catch(err => {
					uni.showToast({
						title: '绑定手机号失败',
						icon: 'none'
					})
				})
			},

			// 跳转个人信息页
			jumpUserInfo() {
				uni.navigateTo({
					url: '/pages/Profile/userdata/myData?m_id=' + this.m_id
				})
			},
			// 跳转帮助列表页
			jumpHelpList() {
				uni.navigateTo({
					url: '/pages/Profile/help/helpList'
				})
			},
			// 跳转意见反馈页
			jumpFeedBack() {
				if (this.m_id !== '' && this.m_id !== undefined) {
					uni.navigateTo({
						url: '/pages/Profile/feedback?m_id=' + this.m_id
					})
				} else {
					this.goLogin()
				}
			},
			jumpSell(index) {
				if (this.m_id === '' || this.m_id == undefined) {
					return this.goLogin()
				} 
				
				uni.navigateTo({
					url: '/pages/Profile/order/orderList?type=1&m_id=' + this.m_id
				})
			},
			jumpReceive(index) {
				if (this.m_id === '' || this.m_id == undefined) {
					return this.goLogin()
				} 
				
				uni.navigateTo({
					url: '/pages/Profile/order/orderList?type=2&m_id=' + this.m_id
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
		padding-bottom: 100rpx;
	}

	.app-head {
		width: 100%;
		height: 226rpx;
		position: relative;
		background-color: #FFFFFF;

		&-bg {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-box {
			width: 100%;
			height: 120rpx;
			@include box(0 30rpx);

			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			transform: translateY(-50%);

			.app-head-noLogin {
				width: 100%;
				height: 100%;
				@include flex-al();

				.avatar {
					width: 110rpx;
					height: 110rpx;
					margin-right: 24rpx;
				}

				.app-head-text {
					flex: 1;
					font-size: 34rpx;
					color: #39425A;
					font-weight: bold;
				}
			}

			.app-head-Login {
				width: 100%;
				height: 100%;
				@include flex-al();

				.app-head-info {
					margin-left: 24rpx;
					flex: 1;

					.app-head-name {
						font-size: 34rpx;
						color: #39425A;
						line-height: 70rpx;
						font-weight: 400;
						@include ellipsis();
					}

					.app-head-phone {
						width: 160rpx;
						height: 36rpx;
						border-radius: 18rpx;
						background-color: #F9EED3;
						@include flex-center();
					}

					button {
						padding: 0;
						background-color: #FFFFFF;
						font-size: 28rpx;
						line-height: 1;
						text-align: left;
						margin-left: 0;
					}

					button:after {
						border: none;
					}

					.app-head-text {
						font-size: 30rpx;
						color: #39425A;
						font-weight: 400;
					}

					.app-head-icon {
						padding: 30rpx 0 30rpx 30rpx;
					}
				}
			}
		}
	}
	button {
		padding: 0;
		background-color: transparent;
		line-height: 1;
		text-align: left;
	}
	button::after {
		border: none;
	}
	.app-box {
		@include box(40rpx 0 20rpx 0);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-title {
			width: 100%;
			height: 86rpx;
			@include flex-al();
			@include box(0 30rpx);
			font-size: 30rpx;
			color: #343434;
			font-weight: 600;
			background-color: #FFFFFF;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-right: 15rpx;
			}
		}
	}

	.app-menu {
		width: 722rpx;
		height: 301rpx;
		display: flex;
		justify-content: center;
		position: relative;

		&-item1 {
			width: 350rpx;
			height: 110rpx;
			position: absolute;
			top: 10rpx;
			left: 16rpx;
			z-index: 999;
		}

		&-item2 {
			width: 350rpx;
			height: 110rpx;
			position: absolute;
			top: 10rpx;
			right: 16rpx;
			z-index: 999;
		}

		&-bg {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-box {
			width: 690rpx;
			height: 172rpx;
			position: absolute;
			left: 16rpx;
			right: 16rpx;
			top: 110rpx;


			.app-menu-content {
				width: 690rpx;
				height: 100%;
				@include flex-al();

				justify-content: space-around;
			}

			.app-menu-item {
				flex: 1;
				display: flex;
				align-items: center;
				flex-direction: column;

				image {
					width: 48rpx;
					height: 48rpx;
				}

				text {
					font-size: 22rpx;
					color: #666;
					margin-top: 15rpx;
					font-weight: 400;
				}
			}
		}
	}

	.app-box-item {
		width: 100%;
		height: 104rpx;
		@include flex-al();
		@include box(0 30rpx);
		background-color: #FFFFFF;

		&-icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 19rpx;
		}

		&-text {
			flex: 1;
			font-size: 30rpx;
			color: #343434;
			font-weight: 400;
		}
	}

	.mg-20 {
		margin-top: 20rpx;
	}

	.popup-closes {
		width: 100%;
		height: 472rpx;
		background-color: #FFFFFF;

		&-title {
			font-size: 34rpx;
			color: #333333;
			margin-top: 65rpx;
			text-align: center;
		}

		&-box {
			margin-top: 74rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.popup-closes-btn {
				width: 524rpx;
				height: 94rpx;
				box-sizing: border-box;
				border-radius: 47rpx;
				@include flex-center();
				font-size: 38rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}

			.popup-closes-btn.active {
				border: 2rpx solid rgba(245, 204, 80, 1);
				color: #F5CC50;
			}
		}
	}
</style>
