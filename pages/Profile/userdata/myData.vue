<template>
	<view class="container u-skeleton">
		<view class="app-head">
			<view class="app-head-item u-skeleton-circle" @click="headChange">
				<u-image :src="headimg" width="120" height="120" border-radius="50%"></u-image>
				<image class="app-head-item-icon" src="@/static/icon/xiangji.png"></image>
			</view>
		</view>
		
		<view class="app-title bottom-line u-skeleton-fillet">
			<text class="title">昵称</text>
			<view class="app-title-box" @click="jumpName">
				<view class="app-title-text" v-if="userInfo.nickname === ''">
					<text>请输入您的昵称</text>
				</view>
				<view class="app-title-text active" v-else>
					<text>{{userInfo.nickname}}</text>
				</view>
				<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
			</view>
		</view>
		<view class="app-title bottom-line u-skeleton-fillet">
			<text class="title">性别</text>
			<view class="app-title-box" @click="isSex = true">
				<view class="app-title-text" v-if="userInfo.sex === ''">
					<text>请设置您的性别</text>
				</view>
				<view class="app-title-text active" v-else>
					<text>{{sex}}</text>
				</view>
				<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
			</view>
		</view>
		<view class="app-title u-skeleton-fillet">
			<text class="title">年龄</text>
			<view class="app-title-box" @click="isAge = true">
				<view class="app-title-text" v-if="userInfo.age === ''">
					<text>请设置您的年龄</text>
				</view>
				<view class="app-title-text active" v-else>
					<text>{{userInfo.age_name}}</text>
				</view>
				<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
			</view>
		</view>
		
		<view class="app-title mg-20" u-skeleton-fillet @click="jumpAddress">
			<text class="title">常用地址</text>
			<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
		</view>
		
		<u-skeleton :loading="loading" :animation="true" bgColor="#F5F5F5" el-color="#ffffff"></u-skeleton>
		
		<u-popup v-model="isSex" mode="bottom" :safe-area-inset-bottom="true" border-radius="20" :closeable="true">
			<view class="popup-container">
				<view class="popup-title">
					<text>性别</text>
				</view>
				<view class="popup-content">
					<view class="popup-content-item bottom-line" :class="{ active: currentSex === 1 }" @click="currentSex = 1">
						<text>男</text>
					</view>
					<view class="popup-content-item bottom-line" :class="{ active: currentSex === 0 }" @click="currentSex = 0">
						<text>女</text>
					</view>
				</view>
				<view class="popup-btn" @click="defineSex">
					<text>确定</text>
				</view>
			</view>
		</u-popup>
		
		
		<u-popup v-model="isAge" mode="bottom" :safe-area-inset-bottom="true" border-radius="20" :closeable="true">
			<view class="popup-container">
				<view class="popup-title">
					<text>年龄</text>
				</view>
				<view class="popup-picker">
					<picker-view :value="[0]" @pickend="pickend" @pickstart="pickstart" class="popup-picker-view" @change="ageChange">
						<picker-view-column>
							<view class="picker-view-item" v-for="(item, index) in ageList" :key="item.id">
								<view class="u-line-1">{{item.name}}</view>
							</view>
						</picker-view-column>
					</picker-view>
				</view>
				<view class="popup-btn" @click="ageConfirm">
					<text>确定</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { ageSelect, getUserInfo, updataInfo } from '@/network/profile.js'
	import Upload from '@/libs/upload/Multiple'
	export default {
		data() {
			return {
				isSex: false,
				currentSex: 1,
				isAge: false,
				ageList: [],
				m_id: '',
				sex: '',
				ageID: '',
				more: false,
				userInfo: {},
				loading: true,
				headimg: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.m_id = option.m_id
			
			this._getAgeList()
		},
		onShow() {
			this._getUserInfo()
		},
		
		methods: {
			_getAgeList() {
				ageSelect().then(res => {
					this.ageList = res
				})
			},
			async headChange() {
				try{
					let result = await new Upload({
						count: 1,
						url: 'Personal/upload'
					}).uploadPic();
					this.headimg = result[0].data.list[0].abs_url
					let id = result[0].data.list[0].id
					this._headUpdata(id)
				}catch(e){
					uni.showToast({
						title: '上传头像失败，请重试',
						icon: 'none'
					})
				}
			},
			defineSex() {
				if(this.currentSex == 0) {
					this.sex = '女'
					this.userInfo.sex = 0
					
					this._updataInfo(0)
					this.isSex = false
				} else {
					this.sex = '男'
					this.userInfo.sex = 1
					
					this._updataInfo(1)
					
					this.isSex = false
				}
			},
			_headUpdata(id) {
				updataInfo({
					m_id: this.m_id,
					face: id
				}).then(res => {
					uni.showToast({
						title: '上传头像成功',
						icon: 'none'
					})
				}).catch(err => {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				})
			},
			_updataInfo(value) {
				updataInfo({
					m_id: this.m_id,
					sex: value
				}).then(res => {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					})
				}).catch(err => {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				})
			},
			async _getUserInfo() {
				try {
					let res = await getUserInfo(this.m_id)
				
					this.userInfo = res
					this.sex = res.sex == 1 ? '男' : '女'
					this.headimg = res.face[0].abs_url
					if(this.loading) {
						setTimeout(() => {
							uni.hideLoading()
							this.loading = false
						}, 1500)
					}
				} catch (e) {
					uni.showToast({
						title: '获取用户信息失败',
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
			jumpName() {
				uni.navigateTo({
					url: '/pages/Profile/userdata/nickname?m_id=' + this.m_id
				})
			},
			ageChange(e) {
				this.ageID = this.ageList[e.detail.value[0]].id;
			},
			// 滚动开始
			pickstart() {
				this.more = true
			},
			// 滚动结束
			pickend() {
				this.more = false
			},
			ageConfirm() {
				
				if(this.more) return
				
				updataInfo({
					m_id: this.m_id,
					age: this.ageID
				}).then(res => {
					this.isAge = false
					this._getUserInfo()
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					})
					
					
				}).catch(err => {
					this.isAge = false
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				})
			},
			jumpAddress() {
				uni.navigateTo({
					url: '/pages/Profile/userdata/address?m_id=' + this.m_id
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
	.app-head {
		width: 100%;
		height: 256rpx;
		@include flex-center();
		&-item {
			width: 120rpx;
			height: 120rpx;
			position: relative;
			&-icon {
				width: 68rpx;
				height: 68rpx;
				position: absolute;
				right: -15rpx;
				bottom: -15rpx;
				
				z-index: 99;
			}
		}
	}
	
	.app-title {
		width: 100%;
		height: 104rpx;
		@include flex-al-ju(space-between);
		background-color: #FFFFFF;
		@include box(0 30rpx);
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
				font-size: 30rpx;
				color: #999999;
				text-align: right;
				@include ellipsis();
			}
			.app-title-text.active {
				font-size: 32rpx;
				color: #333333;
			}
			.app-title-icon {
				flex-shrink: 0;
			}
		}
	}
	
	.mg-20 {
		margin-top: 20rpx;
	}
	
	.popup-content {
		width: 100%;
		height: 212rpx;
		overflow: hidden;
		background-color: #fff;
		&-item {
			height: 105rpx;
			width: 100%;
			@include flex-center();
			font-size: 28rpx;
			color: #9E9E9E;
			font-weight: 400;
		}
		.popup-content-item.active {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}
	}
	
	.popup-picker {
		width: 100%;
		height: 312rpx;
		overflow: hidden;
		background-color: #fff;
	}
	.popup-picker-view {
		width: 100%;
		height: 100%;
		
	}
	.picker-view-item {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		padding: 0 8rpx;
		height: 105rpx;
	}
</style>
