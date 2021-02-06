<template>
	<view class="container">
		<u-tabs-swiper ref="uTabs" height="88" :bar-style="barstyle" active-color="#343434" inactive-color="#9A9A9A"
		 bar-width="63" bar-height="5" fontSize="28" :current="current" :list="tabsList" @change="tabsChange" :is-scroll="false"
		 :active-item-style="navTab"></u-tabs-swiper>

		<view class="app-box">
			<swiper class="swiper-container" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 寄售 -->
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-box" :scroll-y="true">
						<view class="app-page">
							<view class="app-page-img">
								<u-image :src="Consignment.banner.banner_image[0].abs_url" width="690" height="280" border-radius="3">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>服务说明</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>

							<!-- 服务说明 -->

							<view class="app-directions">
								<view class="app-directions-item" v-for="(item) in Consignment.ConsignmentService" :key="item.id">
									<image class="app-directions-item-img" :src="item.image[0].abs_url"></image>
									<text class="app-directions-item-text">{{item.name}}</text>
								</view>
							</view>

							<!-- 服务优势 -->
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>服务优势</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>

							<view class="app-odds">
								<view class="app-odds-item" v-for="(item) in Consignment.ConsignmentAdvantage" :key="item.id">
									<image :src="item.image[0].abs_url" class="app-odds-item-img"></image>
									<view class="app-odds-item-text">
										<view class="title">
											<text>{{item.name}}</text>
										</view>
										<view class="text">
											<text>{{item.title}}</text>
										</view>
									</view>
								</view>
							</view>

							<!-- 寄卖流程 -->
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>寄卖流程</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>

							<view class="app-process">
								<!-- 流程 -->
								<block v-for="(item, index) in Consignment.ConsignmentProcess" :key="item.id">
									<view class="app-process-item">
										<image :src="item.image[0].abs_url" class="app-process-item-img"></image>
										<text class="app-process-item-text">{{item.name}}</text>
									</view>
									<view class="app-process-item-left" v-if="index < Consignment.ConsignmentProcess.length - 1">
										<image class="app-process-item-icon" src="@/static/icon/arrow-left.png"></image>
									</view>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>

				<!-- 回收 -->
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-box" :scroll-y="true">
						<view class="app-page">
							<view class="app-page-img">
								<u-image :src="Recycling.banner.banner_image[0].abs_url" width="690" height="280" border-radius="3">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>服务说明</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>
				
							<!-- 服务说明 -->
				
							<view class="app-directions">
								<view class="app-directions-item" v-for="(item) in Recycling.RecyclingService" :key="item.id">
									<image class="app-directions-item-img" :src="item.image[0].abs_url"></image>
									<text class="app-directions-item-text">{{item.name}}</text>
								</view>
							</view>
				
							<!-- 服务优势 -->
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>服务优势</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>
				
							<view class="app-odds">
								<view class="app-odds-item" v-for="(item) in Recycling.RecyclingAdvantage" :key="item.id">
									<image :src="item.image[0].abs_url" class="app-odds-item-img"></image>
									<view class="app-odds-item-text">
										<view class="title">
											<text>{{item.name}}</text>
										</view>
										<view class="text">
											<text>{{item.title}}</text>
										</view>
									</view>
								</view>
							</view>
				
							<!-- 回收流程 -->
							<view class="app-page-title">
								<image src="@/static/icon/left.png" class="app-page-title-icon"></image>
								<view class="app-page-title-text">
									<text>回收流程</text>
								</view>
								<image src="@/static/icon/right.png" class="app-page-title-icon"></image>
							</view>
				
							<view class="app-process">
								<!-- 流程 -->
								<block v-for="(item, index) in Recycling.RecyclingProcess" :key="item.id">
									<view class="app-process-item">
										<image :src="item.image[0].abs_url" class="app-process-item-img"></image>
										<text class="app-process-item-text">{{item.name}}</text>
									</view>
									<view class="app-process-item-left" v-if="index < Recycling.RecyclingProcess.length - 1">
										<image class="app-process-item-icon" src="@/static/icon/arrow-left.png"></image>
									</view>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

		<button open-type="contact" class="sidebar">
			<image src="@/static/icon/kefu-icon.png"></image>
		</button>
		
		<view class="app-botton">
			<label class="agreement">
				<checkbox-group @change="checkChange">
					<checkbox class="cb" :checked="checked"></checkbox>
				</checkbox-group>
				<text>我已阅读并同意</text>
				<text @click.stop="jumpText" class="active">《用户协议》</text>
			</label>
			<view class="default-btn" @click="jumpGoods">
				<text v-if="swiperCurrent == 0">我要寄卖</text>
				<text v-if="swiperCurrent == 1">我要回收</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { consignment, recycling } from '@/network/main.js'
	export default {
		data() {
			return {
				tabsList: [{
					name: '寄卖'
				}, {
					name: '回收'
				}],
				current: 0,
				swiperCurrent: 0,
				barstyle: {
					backgroundColor: '#DAB866',
				},
				navTab: {
					"font-size": "33rpx",
					"transition": "all .3s"
				},
				Consignment: {},
				Recycling: {},
				checked: false
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			})
			this.init()
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			init() {
				this._getConsignment()
				this._getRecycling()
			},
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			_getConsignment() {
				consignment().then(res => {
					this.Consignment = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			_getRecycling() {
				recycling().then(res => {
					this.Recycling = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 协议勾选
			checkChange(e) {
				this.checked = !this.checked
			},
			jumpText() {
				uni.navigateTo({
					url: '/pages/Main/protocol'
				})
			},
			jumpGoods() {
				if (this.checked === false) {
					return uni.showToast({
						title: "请勾选用户协议!",
						icon: 'none'
					})
				}
				
				uni.navigateTo({
					url: '/pages/Main/consignment?type=' + this.swiperCurrent
				})
			}
		}
	}
</script>

<style lang="scss">
	.app-box {
		width: 100%;
		height: calc(100vh - 88rpx);
		border-top: 1rpx solid #f5f5f5;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.scroll-box {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 99;
	}

	.app-page {
		@include box(24rpx 30rpx 230rpx 30rpx);

		&-img {
			width: 690rpx;
			height: 280rpx;
		}

		&-title {
			width: 100%;
			height: 100rpx;
			margin-top: 30rpx;
			@include flex-al-ju(center);

			&-icon {
				width: 50rpx;
				height: 12rpx;
			}

			&-text {
				margin: 0 29rpx;
				font-size: 32rpx;
				color: #343434;
				font-weight: 600;
			}
		}
	}

	.app-directions {
		margin-top: 20rpx;
		@include flex-al();
		justify-content: space-around;

		&-item {
			width: 120rpx;
			@include flex-center();
			flex-direction: column;

			&-img {
				width: 100rpx;
				height: 100rpx;

			}

			&-text {
				font-size: 26rpx;
				color: #343434;
				font-weight: 600;
				margin-top: 20rpx;
			}
		}
	}

	.app-odds {
		margin-top: 25rpx;
		@include box(0 65rpx);

		&-item {
			width: 100%;
			height: 100rpx;
			@include flex-al();

			&-img {
				width: 97rpx;
				height: 99rpx;
				margin-right: 25rpx;
				flex-shrink: 0;
			}

			&-text {
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #343434;
				}

				.text {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #666666;
					font-weight: 400;
					display: flex;
					flex-wrap: wrap;
				}
			}
		}

		.app-odds-item:last-child {
			margin-top: 70rpx;
		}
	}

	.app-process {
		width: 100%;
		@include box(0 35rpx);
		@include flex-al();
		justify-content: center;
		margin-top: 20rpx;

		&-item {
			width: 70rpx;
			@include flex-center();
			flex-direction: column;
			flex-shrink: 0;

			&-img {
				width: 54rpx;
				height: 54rpx;
			}

			&-text {
				font-size: 16rpx;
				color: #343434;
				margin-top: 7rpx;
			}

			&-left {
				width: 59rpx;
				height: 54rpx;
				@include flex-center();
			}

			&-icon {
				width: 14rpx;
				height: 22rpx;
			}
		}
	}
	.app-botton {
		height: 180rpx;
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: #FFFFFF;
	}
	.agreement {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #666666;
		height: 60rpx;
		
		.cb {
			transform: scale(.7, .7);
		}
		.active {
			color: #F9B346;
		}
	}
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	  width: 28rpx;
	  height: 28rpx;
	  line-height: 32rpx;
	  text-align: center;
	  font-size: 32rpx;
	  background: transparent;
	  transform: translate(-50%, -50%) scale(1.1);
	  -webkit-transform: translate(-50%, -50%) scale(1.1);
	}
	.default-btn {
		margin-bottom: 30rpx;
	}
	button {
		padding: 0;
		background-color: transparent;
		line-height: 1;
	}
	button::after {
		border: none;
	}
	.sidebar {
		position: fixed;
		right: 40rpx;
		bottom: 110rpx;
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		overflow: hidden;

		z-index: 9999;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
