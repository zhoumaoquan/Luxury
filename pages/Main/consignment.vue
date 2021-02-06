<template>
	<view class="container">
		<!-- 品类 -->
		<view class="app-title">
			<text class="title">品类</text>
		</view>

		<view class="app-box">
			<view class="app-class-item" @click="classChange(item.id)" :class="{ active: item.id === activeClass }" v-for="(item) in categoryList"
			 :key="item.id">
				<image v-if="item.id !== activeClass" class="app-class-item-img" :src="item.icon_active[0].abs_url"></image>
				<image v-else class="app-class-item-img" :src="item.icon[0].abs_url"></image>
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 品牌 -->
		<view class="app-title">
			<text class="title">品牌</text>
			<text class="text">如未找到对应品牌，则在下方输入</text>
		</view>

		<view class="app-brand">
			<view class="app-box">
				<scroll-view enable-flex :scroll-y="true" class="app-box-warp">
					<block v-if="brandsList.length > 0">
						<view class="app-class-item" @click="brandChange(item.name)" :class="{ active: item.name === activeBrand }" v-for="(item) in brandsList"
						 :key="item.id">
							<text>{{item.name}}</text>
						</view>
					</block>
					<view class="app-box-empty" v-else>
						<u-empty icon-size="60" font-size="24" color="#999" mode="search" text="没有对应的品牌" icon-color="#ccc">
						</u-empty>
					</view>
				</scroll-view>
				

				<view class="app-box-load" v-if="loading">
					<u-loading mode="circle" color="#DAB866" size="60"></u-loading>
				</view>
			</view>

			<view class="app-search">
				<u-search v-model="params.name" action-text="确定" @custom="custom" @clear="searchClear" placeholder="请输入品牌名" input-align="center"
				 bg-color="#F6F6F6" shape="square" animation></u-search>
			</view>
		</view>

		<!-- 购买渠道 -->
		<view class="app-title">
			<text class="title">购买渠道</text>
		</view>

		<view class="app-box">
			<view class="app-box-item" :class="{ active: item.id === activeChannel }" @click="channelChange(item.id)" v-for="(item) in channelsList"
			 :key="item.id">
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 商品图片 -->
		<view class="app-title">
			<text class="title">商品图片</text>
			<text class="text">详细清晰的拍摄图片</text>
		</view>

		<view class="app-box">

			<!-- 正面图 -->
			<view class="app-upload" @click="uploadImage(1)">
				<view class="app-upload-box">
					<view class="app-upload-icon" v-if="positive.image === ''">
						<image class="img-bg" src="@/static/image/img1.png"></image>
						<u-icon name="plus" size="44" color="#fff"></u-icon>
					</view>
					<view class="app-upload-img" v-else>
						<u-image mode="scaleToFill" :src="positive.image" width="216" height="216" border-radius="20"></u-image>

						<view class="app-upload-close" @click.stop="closeImage(1)">
							<u-icon top="-1" name="close" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-upload-text">
					<text>正面图</text>
				</view>
			</view>

			<!-- 侧视图 -->
			<view class="app-upload" @click="uploadImage(2)">
				<view class="app-upload-box">
					<view class="app-upload-icon" v-if="side.image === ''">
						<image class="img-bg" src="@/static/image/img2.png"></image>
						<u-icon name="plus" size="44" color="#fff"></u-icon>
					</view>
					<view class="app-upload-img" v-else>
						<u-image mode="scaleToFill" :src="side.image" width="216" height="216" border-radius="20"></u-image>

						<view class="app-upload-close" @click.stop="closeImage(2)">
							<u-icon top="-1" name="close" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-upload-text">
					<text>侧视图</text>
				</view>
			</view>

			<!-- 细节图 -->
			<view class="app-upload" @click="uploadImage(3)">
				<view class="app-upload-box">
					<view class="app-upload-icon" v-if="details.image === ''">
						<image class="img-bg" src="@/static/image/img3.png"></image>
						<u-icon name="plus" size="44" color="#fff"></u-icon>
					</view>
					<view class="app-upload-img" v-else>
						<u-image mode="scaleToFill" :src="details.image" width="216" height="216" border-radius="20"></u-image>

						<view class="app-upload-close" @click.stop="closeImage(3)">
							<u-icon top="-1" name="close" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-upload-text">
					<text>细节图</text>
				</view>
			</view>

			<!-- 购买凭证 -->
			<view class="app-upload" @click="uploadImage(4)">
				<view class="app-upload-box">
					<view class="app-upload-icon" v-if="buy.image === ''">
						<image class="img-bg" src="@/static/image/img4.png"></image>
						<u-icon name="plus" size="44" color="#fff"></u-icon>
					</view>
					<view class="app-upload-img" v-else>
						<u-image mode="scaleToFill" :src="buy.image" width="216" height="216" border-radius="20"></u-image>

						<view class="app-upload-close" @click.stop="closeImage(4)">
							<u-icon top="-1" name="close" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-upload-text">
					<text>购买凭证</text>
				</view>
			</view>
		</view>

		<!-- 微信账号图 -->
		<view class="app-title">
			<text class="title">微信账号图</text>
			<text class="text">请务必提供您的个人微信号截图页面</text>
		</view>

		<view class="app-box">
			<!-- 微信账号图 -->
			<view class="app-upload" @click="uploadImage(5)">
				<view class="app-upload-box">
					<view class="app-upload-icon" v-if="wxImages.image === ''">
						<image class="img-bg" src="@/static/image/img5.png"></image>
						<u-icon name="plus" size="44" color="#fff"></u-icon>
					</view>
					<view class="app-upload-img" v-else>
						<u-image mode="scaleToFill" :src="wxImages.image" width="216" height="216" border-radius="20"></u-image>

						<view class="app-upload-close" @click.stop="closeImage(5)">
							<u-icon top="-1" name="close" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-upload-text">
					<text>微信账号图</text>
				</view>
			</view>
		</view>

		<view class="app-title" @click="jumpAddress">
			<text class="title">邮寄方式</text>
			<u-icon name="arrow-right" :label="title" top="0" label-color="#666666" label-pos="left" color="#666666" size="22"
			 label-size="26"></u-icon>
		</view>

		<!-- 自行寄出 -->
		<view class="app-content" v-if="addressType == 0">
			<view class="app-content-title">
				<text>自行寄出</text>
			</view>

			<view class="app-content-box">
				<view class="app-content-item">
					<text class="_label">商家名称：</text>
					<text class="_value">{{addressInfos.name}}</text>
				</view>
				<view class="app-content-item">
					<text class="_label">联系电话：</text>
					<text class="_value">{{addressInfos.phone}}</text>
				</view>
				<view class="app-content-item">
					<text class="_label">联系地址：</text>
					<text class="_value">{{addressInfos.address}}</text>
				</view>
			</view>
		</view>

		<!-- 预约顺丰 -->
		<view class="app-content" v-else>
			<view class="app-content-title">
				<text>预约顺丰</text>
			</view>

			<view class="app-content-box">
				<view class="app-content-item">
					<text space="ensp" class="_label">联 系 人：</text>
					<text class="_value">{{addressInfos.name}}</text>
				</view>
				<view class="app-content-item">
					<text class="_label">联系方式：</text>
					<text class="_value">{{addressInfos.phone}}</text>
				</view>
				<view class="app-content-item">
					<text class="_label">联系地址：</text>
					<text class="_value" space="ensp">{{addressInfos.province_name}} {{addressInfos.city_name}} {{addressInfos.district_name}} {{addressInfos.address}}</text>
				</view>
				<view class="app-content-item">
					<text class="_label">取件时间：</text>
					<text class="_value" space="ensp">{{addressInfos.time_string}}</text>
				</view>
			</view>
		</view>

		<!-- 签约 -->
		<!-- <view class="app-title" @click="jumpReserve">
			<text class="title">去签约</text>
			<u-icon name="arrow-right" :label="signup ? '已签约' : '去签约' " top="0" label-color="#666666" label-pos="left" color="#666666" size="22"
			 label-size="26"></u-icon>
		</view> -->

		<view class="default-btn" @click="submitOrder">
			<text>提交订单</text>
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
					<view class="popup-closes-btn" @click="isLogin = false">
						<text>取消</text>
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- <u-modal v-model="isModal" @confirm="jumpReserve" confirm-text="去签约" content="系统检测到您还未签约">
			
		</u-modal> -->
	</view>
</template>

<script>
	import {
		categoryList,
		brandList,
		channelList,
		addressInfo,
		sellOrder,
		recycleOrder,
		wxImage
	} from '@/network/main'
	import Upload from '@/libs/upload/Multiple'
	export default {
		data() {
			return {
				type: '',
				categoryList: [],
				brandsList: [],
				channelsList: [],
				addressInfos: {},
				activeClass: '',
				activeBrand: '',
				activeChannel: '',
				isLogin: false,
				isModal: false,
				signup: false,
				params: {
					type: '',
					name: ''
				},
				addressParams: {
					type: 1,
					m_id: ''
				},
				loading: false,
				addressType: 0,
				// 正面图
				positive: {
					image: '',
					id: ''
				},
				// 侧视图
				side: {
					image: '',
					id: ''
				},
				// 细节图
				details: {
					image: '',
					id: ''
				},
				// 购买凭证
				buy: {
					image: '',
					id: ''
				},
				// 微信账号图
				wxImages: {
					image: '',
					id: ''
				}
			};
		},
		onLoad(option) {
			this.type = option.type
			if (option.type == 0) {
				uni.setNavigationBarTitle({
					title: '寄卖商品'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '回收商品'
				})
			}

			this._getCategoryList()
			this._getChannelList()
			this._getAddressInfo()
		},
		onUnload() {
			uni.removeStorageSync('signID')
		},
		computed: {
			title() {
				if (this.addressType == 0) {
					return '自行寄出'
				} else {
					return '预约顺丰'
				}
			}
		},
		onShow() {
			this._getWxImage()
		},
		methods: {
			async _getCategoryList() {
				try {
					let res = await categoryList()

					if (res.length > 0 || res !== '') {
						this.activeClass = res[0].id
						this.params.type = res[0].id
					}
					this.categoryList = res

					this._getBrandList()
				} catch (e) {
					uni.showToast({
						title: '品类数据获取失败',
						icon: 'none'
					})
				}
			},
			_getBrandList() {
				brandList(this.params).then(res => {
					if (res.length === 0) {
						this.brandsList = []
					} else {
						this.activeBrand = res[0].name
						this.brandsList = res
					}

					setTimeout(() => {
						this.loading = false
					}, 700)
				}).catch(err => {
					uni.showToast({
						title: '品牌数据获取失败',
						icon: 'none'
					})
				})
			},
			_getChannelList() {
				channelList().then(res => {
					this.channelsList = res
				}).catch(err => {
					uni.showToast({
						title: '购买渠道数据获取失败',
						icon: 'none'
					})
				})
			},
			_getAddressInfo() {
				addressInfo(this.addressParams).then(res => {

					this.addressInfos = res[0]

				}).catch(err => {
					uni.showToast({
						title: '获取地址信息失败',
						icon: 'none'
					})
				})
			},
			// 获取 微信账号图
			_getWxImage() {
				const m_id = uni.getStorageSync('m_id')
				const imgID = uni.getStorageSync('signID')
				wxImage(m_id).then(res => {
					if(imgID !== '' && imgID !== undefined) {
						this.signup = true
					}
					if(res.wx_image.length > 0) {
						this.wxImages.id = res.wx_image[0].id || ''
						this.wxImages.image = res.wx_image[0].abs_url || ''
					}
				})
				
			},
			classChange(id) {
				this.loading = true
				this.activeClass = id
				this.params.type = id
				this.params.name = ''

				this._getBrandList()
			},
			brandChange(name) {
				this.activeBrand = name
			},
			channelChange(id) {
				this.activeChannel = id
			},
			// 搜索品牌
			custom() {
				this.activeBrand = this.params.name
			},
			searchClear() {
				this.activeBrand = ''
				this.params.name = ''
			},
			async uploadImage(index) {
				try {
					let result = await new Upload({
						count: 1,
						url: 'Personal/upload'
					}).uploadPic();
					let params = {
						image: result[0].data.list[0].abs_url,
						id: result[0].data.list[0].id
					}


					switch (index) {
						case 1:
							this.positive = params
							break;
						case 2:
							this.side = params
							break;
						case 3:
							this.details = params
							break;
						case 4:
							this.buy = params
							break;
						case 5:
							this.wxImages = params
							break;
					}
				} catch (e) {
					uni.showToast({
						title: '上传图片失败，请重试',
						icon: 'none'
					})
				}
			},
			closeImage(index) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定需要删除该图片吗？',
					success(res) {
						if (res.confirm) {

							let params = {
								image: '',
								id: ''
							}

							switch (index) {
								case 1:
									_this.positive = params
									break;
								case 2:
									_this.side = params
									break;
								case 3:
									_this.details = params
									break;
								case 4:
									_this.buy = params
									break;
								case 5:
									_this.wxImages = params
									break;
							}
						}
					}
				})
			},
			onLogin() {
				
				this.isLogin = false
				
				uni.navigateTo({
					url: '/pages/Profile/Login'
				})
			},
			jumpAddress() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id == undefined) {
					return this.isLogin = true
				}


				uni.navigateTo({
					url: '/pages/Main/Mail?type=' + this.addressType + '&m_id=' + m_id + '&id=' + this.addressInfos.id
				})
			},
			jumpReserve() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id == undefined) {
					return this.isLogin = true
				}
				
				uni.navigateTo({
					url: '/pages/Main/protocol?type=1&m_id=' + m_id + '&id=0'
				})
			},
			_sellOrder(params) {
				sellOrder(params).then(res => {
					uni.showToast({
						title: '订单提交成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/Main/success?type=1'
								})
							},1500)
						}
					})
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			_recycleOrder(params) {
				recycleOrder(params).then(res => {
					uni.showToast({
						title: '订单提交成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/Main/success?type=2'
								})
							},1500)
						}
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			submitOrder() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id == undefined) {
					return this.isLogin = true
				}
				if(this.activeBrand === '') {
					return uni.showToast({
						title: '请选择对应品牌',
						icon: 'none'
					})
				}
				
				if(this.activeChannel === '') {
					return uni.showToast({
						title: '请选择购买渠道',
						icon: 'none'
					})
				}
				
				if(this.positive.id === '' && this.side.id === '' && this.details.id === '' && this.buy.id === '') {
					return uni.showToast({
						title: '请至少上传一张商品图片',
						icon: 'none'
					})
				}
				
				if(this.wxImages.id === '') {
					return uni.showToast({
						title: '请上传微信账号图',
						icon: 'none'
					})
				}
				
				
				uni.showLoading({
					title: '订单提交中...',
					mask: true
				})
				
				
				let params = {
					m_id: m_id,
					category_id: this.activeClass,
					brand_id: this.activeBrand,
					channel: this.activeChannel,
					positive_image: this.positive.id || '',
					side_image: this.side.id || '',
					details_image: this.details.id || '',
					buy_image: this.buy.id || '',
					wx_image: this.wxImages.id,
					address_type: this.addressType - 0 + 1,
					address_id: this.addressInfos.id,
					time_string: this.addressInfos.time_string || ''
				}
				
				
				if(this.type == 0) {
					this._sellOrder(params)
				} else {
					this._recycleOrder(params)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 49rpx;
	}

	.container {
		@include box(0 30rpx);
	}

	.app-title {
		margin-top: 60rpx;
		@include flex-al-ju(space-between);

		.title {
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
		}

		.text {
			font-size: 26rpx;
			color: #666;
			font-weight: 400;
			line-height: 36rpx;
		}
	}

	.app-box {
		margin-top: 47rpx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	.app-box-warp {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.app-box-empty {
		width: 100%;
		height: 120rpx;
		@include flex-center();
	}

	.app-box-load {
		width: 100%;
		height: 150rpx;
		@include flex-center();
		background-color: rgba($color: #ffffff, $alpha: .5);
		position: absolute;
		left: 0;
		right: 0;
	}

	.app-class-item {
		width: 158rpx;
		height: 58rpx;
		border-radius: 10rpx;
		@include flex-center();
		font-size: 26rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #666;
		background-color: #F6F6F6;
		margin-right: 19rpx;
		margin-bottom: 20rpx;

		&-img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 18rpx;
		}
	}

	.app-class-item.active {
		background-color: #DAB866;
		color: #FFFFFF;
	}

	.app-class-item:nth-of-type(4n+4) {
		margin-right: 0;
	}

	.app-search {
		padding-top: 30rpx;
	}

	.app-box-item {
		width: 216rpx;
		height: 58rpx;
		border-radius: 10rpx;
		@include flex-center();
		font-size: 26rpx;
		font-weight: 400;
		line-height: 30rpx;
		color: #666;
		background-color: #F6F6F6;
		margin-right: 21rpx;
	}

	.app-box-item.active {
		background-color: #DAB866;
		color: #FFFFFF;
	}

	.app-box-item:nth-of-type(3n+3) {
		margin-right: 0;
	}

	.app-upload {
		width: 216rpx;
		@include flex-center();
		flex-direction: column;
		margin-right: 20rpx;
		margin-bottom: 40rpx;

		&-box {
			width: 216rpx;
			height: 216rpx;
			overflow: hidden;
			border-radius: 20rpx;
		}

		&-icon {
			width: 100%;
			height: 100%;
			@include flex-center();
			background-color: rgba($color: #000000, $alpha: 0.3);
			position: relative;
			.img-bg {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				right: 0;
				opacity:0.7;
			}
		}

		&-img {
			position: relative;
			width: 100%;
			height: 100%;

			.app-upload-close {
				position: absolute;
				top: 0;
				right: 0;
				width: 44rpx;
				height: 44rpx;

				border-radius: 0 20rpx 0 20rpx;

				@include flex-center();
				background-color: rgba($color: #000000, $alpha: 0.3);
			}
		}

		&-text {
			font-size: 26rpx;
			color: #666;
			margin-top: 20rpx;
		}
	}

	.app-upload:nth-of-type(3n+3) {
		margin-right: 0;
	}

	.app-content {
		&-title {
			margin-top: 47rpx;
			font-size: 32rpx;
			color: #DAB866;
			font-weight: 600;
		}

		&-box {
			margin-top: 35rpx;
			width: 690rpx;
			background-color: #F6F6F6;
			border-radius: 20rpx;
			@include box(35rpx 30rpx 35rpx 30rpx);
		}

		&-item {
			line-height: 40rpx;
			font-size: 28rpx;
			margin-bottom: 25rpx;

			._label {
				color: #666666;
			}

			._value {
				color: #333333;
				font-weight: bold;
			}
		}
	}

	.app-content-item:last-child {
		margin-bottom: 0;
	}

	.default-btn {
		margin-top: 80rpx;
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
