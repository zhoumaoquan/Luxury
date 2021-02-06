<template>
	<view class="container">
		<!-- Banner -->
		<u-swiper :list="swiperList" @click="jumpNav" mode="rect" height="280" name="banner_image_img"></u-swiper>

		<!-- 品牌介绍 -->
		<view class="home-title" @click="jumpBrand(1)" v-if="Object.keys(brandInfos).length > 0">
			<view class="home-title-text">
				<view class="vertical"></view>
				<text>品牌介绍</text>
			</view>
			<u-icon name="arrow-right" label="查看详情" top="0" label-color="#9A9A9A" label-pos="left" color="#9A9A9A" size="22"
			 label-size="26"></u-icon>
		</view>

		<view class="app-brand" v-if="Object.keys(brandInfos).length > 0">
			<view class="app-brand-img" @click="jumpBrand(2)">
				<image class="brand-image" :src="brandInfos.image"></image>
				<u-image class="brand-icon" v-if="brandInfos.video !== ''" src="@/static/icon/bofang.png" duration="300" width="100" height="100" border-radius="50%">
					<u-loading slot="loading"></u-loading>
				</u-image>
			</view>

			<view class="app-brand-text">
				<text>{{brandInfos.centent}}</text>
			</view>
		</view>

		<!-- 资质实力 -->
		<view class="home-title" v-if="Object.keys(strengths).length > 0">
			<view class="home-title-text">
				<view class="vertical"></view>
				<text>资质实力</text>
			</view>
		</view>

		<view class="app-strength" v-if="Object.keys(strengths).length > 0">
			<view class="app-strength-text">
				<text>{{strengths.title}}</text>
			</view>

			<scroll-view :scroll-x="true" enable-flex class="app-strength-scroll">
				<view class="app-strength-content">
					<view class="app-strength-item" v-for="(item) in strengths.list" :key="item.id">
						<image class="app-strength-item-image" :src="item.image[0].abs_url"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 业务介绍 -->
		<view class="home-title" v-if="business.length > 0">
			<view class="home-title-text">
				<view class="vertical"></view>
				<text>业务介绍</text>
			</view>
		</view>

		<view class="app-work" v-if="business.length > 0">
			<view class="app-work-item" v-for="(item) in business" :key="item.id">
				<image :src="item.image[0].abs_url" class="app-work-item-image"></image>
				<view class="app-work-item-text">
					<text class="bold">{{item.name}}</text>
					<text class="text">{{item.title}}</text>
				</view>
			</view>
		</view>

		<!-- 线下门店 -->
		<view class="home-title">
			<view class="home-title-text">
				<view class="vertical"></view>
				<text>线下门店</text>
			</view>
		</view>

		<view class="app-box" v-if="storeList.length > 0">
			<view class="app-box-item bottom-line" v-for="(item) in storeList" :key="item.id">
				<u-image :src="item.image[0].abs_url" width="150" height="150" border-radius="10"></u-image>
				<view class="app-box-item-info">
					<view class="title">
						<text>{{item.name}}</text>
					</view>
					<view class="text">
						<text>地址：{{item.address}}</text>
					</view>
					<view class="phone">
						<u-icon name="phone-fill" size="24" color="#39425A"></u-icon>
						<text>{{item.phone}}</text>
					</view>
				</view>
			</view>
			<view class="app-box-loadmore">
				<u-loadmore :status="status" :icon-type="iconType" @loadmore="loadmore" :load-text="loadText" />
			</view>
		</view>
		<view v-else>
			<u-empty margin-top="150" icon-size="130" text="暂无线下门店~" font-size="28" color="#333" mode="favor" icon-color="#ccc">
			</u-empty>
		</view>

	</view>
</template>

<script>
	import {
		bannerList,
		brandInfo,
		strength,
		business,
		storeList
	} from '@/network/home.js'
	export default {
		data() {
			return {
				// banner
				swiperList: [],
				// 品牌介绍
				brandInfos: {},
				// 资质实力
				strengths: {},
				// 业务介绍
				business: [],
				// 线下门店
				storeList: [],
				status: 'loadmore',
				// 门店请求参数
				params: {
					page: 1,
					limit: 10
				},
				// 是否可以分页
				flag: true,
				loadText: {
					loadmore: '用力往上拉(点击)',
					loading: '正在加载，请喝杯茶...',
					nomore: '我也是有底线的'
				}
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			})

			this.init()
		},
		onReachBottom() {
			if(this.storeList.length > 0 && this.flag) {
				this.pageStore()
			}
		},
		methods: {
			init() {
				this._getBannerList()
				this._getBrandInfo()
				this._getStrength()
				this._getBusiness()
				this._getStoreList()

				uni.hideLoading()
			},
			jumpBrand(type) {
				uni.navigateTo({
					url: '/pages/Home/brand?type=' + type
				})
			},
			// Banner数据
			_getBannerList() {
				bannerList().then(res => {
					this.swiperList = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 品牌介绍
			_getBrandInfo() {
				brandInfo().then(res => {
					this.brandInfos = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 资质实力
			_getStrength() {
				strength().then(res => {
					this.strengths = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 业务介绍
			_getBusiness() {
				business().then(res => {
					this.business = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 线下门店
			_getStoreList() {
				storeList(this.params).then(res => {
					this.storeList = res
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			pageStore() {
				this.params.page += 1
				this.status = 'loading'
				
				storeList(this.params).then(res => {
					if(res.length === 0 || res == '') {
						this.params.page -= 1
						this.flag = false
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
						this.storeList = [...this.storeList, ...res]
					}
				})
			},
			loadmore() {
				this.pageStore()
			},
			jumpNav(index) {
				let rule = this.swiperList[index].banner_rule
				let param = this.swiperList[index].banner_parame
				
				switch(rule) {
					case "0": 
						break;
					case "1":
						uni.navigateTo({
							url: '/pages/Home/webview?url=' + encodeURIComponent(JSON.stringify(param))
						})
						break;
					case "2":
						uni.navigateTo({
							url: '/pages/Home/imgtext?id=' + param
						})
						break;
						
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 100rpx;
	}

	.container {
		@include box(24rpx 30rpx 0 30rpx);
	}

	.home-title {
		margin-top: 72rpx;
		@include flex-al-ju(space-between);

		&-text {
			@include flex-al();
			font-size: 34rpx;
			color: #333333;
			font-weight: bold;
			
			.vertical {
				width: 6rpx;
				height: 30rpx;
				background-color: #DAB866;
				border: 3rpx;
				margin-right: 20rpx;
			}
		}
	}

	.app-brand {
		margin-top: 47rpx;

		&-img {
			width: 690rpx;
			height: 388rpx;
			border-radius: 20rpx;
			position: relative;
			overflow: hidden;

			.brand-image {
				width: 100%;
				height: 100%;
			}

			.brand-icon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 99;
			}
		}

		&-text {
			margin-top: 36rpx;
			font-size: 28rpx;
			color: #444;
			font-weight: 400;
			line-height: 44rpx;
			@include multiline();
		}
	}

	.app-strength {

		&-text {
			margin-top: 36rpx;
			font-size: 28rpx;
			color: #444;
			font-weight: 400;
			line-height: 44rpx;
			@include multiline();
		}

		&-scroll {
			margin-top: 24rpx;
			width: 690rpx;
			height: 76rpx;
			background-color: #FAF7FA;
			border-radius: 10rpx;
		}

		&-content {
			@include box(0 20rpx);
			width: 690rpx;
			height: 76rpx;
			@include flex-al();
		}

		&-item {
			@include flex-al();
			flex-shrink: 0;
			font-size: 24rpx;
			color: #343434;
			line-height: 44rpx;
			font-weight: 400;
			margin-right: 45rpx;

			&-image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 7rpx;
			}
		}
	}

	.app-work {
		margin-top: 47rpx;
		@include flex-al-ju(space-between);
		flex-wrap: wrap;

		&-item {
			width: 330rpx;
			height: 140rpx;
			border-radius: 20rpx;
			background-color: #FAF7FA;
			@include box(37rpx 48rpx);
			@include flex-al();
			margin-bottom: 20rpx;

			&-image {
				width: 66rpx;
				height: 66rpx;
				margin-right: 26rpx;
			}

			&-text {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.bold {
					font-size: 32rpx;
					color: #343434;
					font-weight: 600;
				}

				.text {
					font-size: 24rpx;
					color: #9A9A9A;
					font-weight: 400;
				}
			}
		}
	}

	.app-box {
		margin-top: 17rpx;

		&-item {
			width: 100%;
			height: 210rpx;
			@include flex-al();

			&-info {
				margin-left: 23rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				overflow: hidden;

				.title {
					font-weight: 600;
					color: #343434;
					font-size: 32rpx;
					@include ellipsis();
					line-height: 50rpx;
				}

				.text {
					font-size: 24rpx;
					color: #9A9A9A;
					font-weight: 400;
					flex-wrap: wrap;
					line-height: 50rpx;
				}

				.phone {
					@include flex-al();
					font-size: 24rpx;
					color: #3A425A;
					line-height: 50rpx;
					text {
						margin-left: 10rpx;
					}
				}
			}
		}

		&-loadmore {
			width: 100%;
			height: 80rpx;
			margin-top: 30rpx;
		}
	}
</style>
