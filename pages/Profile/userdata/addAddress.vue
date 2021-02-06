<template>
	<view class="container u-skeleton">
		<view class="app-box">
			<view class="app-box-input bottom-line">
				<view class="app-box-label">
					<text>收货人</text>
				</view>
				<view class="app-box-input-value u-skeleton-fillet">
					<input placeholder="请输入收货人姓名" v-model="address.name" placeholder-class="inputTip"/>
				</view>
			</view>
			<view class="app-box-input bottom-line">
				<view class="app-box-label">
					<text>手机号</text>
				</view>
				<view class="app-box-input-value u-skeleton-fillet">
					<input placeholder="请输入收货人手机号" maxlength="11" v-model="address.phone" placeholder-class="inputTip"/>
				</view>
			</view>
			<view class="app-box-select bottom-line">
				<view class="app-box-label">
					<text>所在地区</text>
				</view>
				<view class="app-box-select_warp u-skeleton-fillet" @click="isRegion = true">
					<view class="app-box-select_text" v-if="address.adcode === ''">
						<text>请选择所在地区</text>
					</view>
					<view class="app-box-select_value active" v-else>
						<text space="ensp">{{address.province}} {{address.city}} {{address.district}}</text>
					</view>
					<u-icon class="app-title-icon"  name="arrow-right" size="28" top="0" color="#666"></u-icon>
				</view>
			</view>
			<view class="app-box-text u-skeleton-fillet">
				<textarea placeholder="详细地址：如街道门牌信息" maxlength="80" v-model="address.detail" placeholder-class="inputTip"></textarea>
			</view>
			
		</view>
		
		<view class="default-btn" @click="saveAddress">
			<text>确认</text>
		</view>
		
		<u-picker v-model="isRegion" safe-area-inset-bottom @confirm="regionClick" mode="region"></u-picker>
		
		<u-skeleton :loading="loading" :animation="true" bgColor="#ffffff" el-color="#F5F5F5"></u-skeleton>
	</view>
</template>

<script>
	import { addressAdd, addressDesc, addressUpdata } from '@/network/profile.js'
	export default {
		data() {
			return {
				isRegion: false,
				address: {
					m_id: '',
					name: '',
					phone: '',
					detail: '',
					province: '',
					city: '',
					district: '',
					adcode: '',
					id: ''
				},
				loading: false,
				type: ''
			};
		},
		onLoad(option) {
			this.type = option.type
			this.address.m_id = uni.getStorageSync('m_id')
			if(option.type == 2) {
				this.loading = true
				this.address.id = option.id
				uni.setNavigationBarTitle({
					title: '编辑地址'
				})
				this._getAddress(this.address.m_id, option.id)
			}
		},
		methods: {
			regionClick(e) {
				this.address.province = e.province.label
				this.address.city = e.city.label
				this.address.district = e.area.label
				this.address.adcode = e.area.value
			},
			async _getAddress(m_id, id) {
				try{
					let res = await addressDesc({ m_id, address_id: id })
					
					this.address.name = res.contacts
					this.address.phone = res.mobile
					this.address.province = res.province_name
					this.address.city = res.city_name
					this.address.district = res.district_name
					this.address.adcode = res.adcode
					this.address.detail = res.address
					
					setTimeout(() => {
						this.loading = false
					}, 1500)
					
				}catch(e){
					//TODO handle the exception
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
			
			async _addAddress() {
				uni.showLoading({
					title: '添加地址中...',
					mask: true
				})
				try{
					let res = await addressAdd(this.address)
					
					uni.hideLoading()
					uni.showToast({
						title: '保存成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async _updataAddress() {
				uni.showLoading({
					title: '修改保存中...',
					mask: true
				})
				try{
					let res = await addressUpdata(this.address)
					
					uni.hideLoading()
					uni.showToast({
						title: '保存成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			saveAddress() {
				if(this.address.name === '') {
					return uni.showToast({
						title: '请输入收货人姓名',
						icon: 'none'
					})
				}
				
				if(this.address.phone === '') {
					return uni.showToast({
						title: '请输入收货人手机号',
						icon: 'none'
					})
				}
				
				if(this.address.adcode === '') {
					return uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					})
				}
				
				if(this.address.detail === '') {
					return uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
				}
				
				if(this.type == 1) {
					this._addAddress()
				} else {
					this._updataAddress()
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.app-box {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		&-input {
			width: 100%;
			height: 104rpx;
			@include box(0 30rpx);
			@include flex-al();
			
			&-value {
				flex: 1;
				input {
					width: 100%;
					height: 100%;
					font-size: 30rpx;
					color: #333333;
				}
			}
		}
		&-label {
			width: 200rpx;
			height: 100%;
			@include flex-al();
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
		}
	}
	.app-box-select {
		width: 100%;
		height: 104rpx;
		@include flex-al-ju(space-between);
		background-color: #FFFFFF;
		@include box(0 30rpx);
		
		&_warp {
			flex: 1;
			@include flex-al-ju(space-between);
			overflow: hidden;
			.app-box-select_text {
				flex: 1;
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #999;
				text-align: left;
				@include ellipsis();
			}
			.app-box-select_text.active {
				font-size: 30rpx;
				color: #333333;
			}
			.app-title-icon {
				flex-shrink: 0;
			}
		}
	}
	.app-box-text {
		width: 100%;
		min-height: 146rpx;
		@include box(30rpx);
		textarea {
			width: 100%;
			height: 86rpx;
			color: #333333;
			font-size: 30rpx;
		}
	}
	.inputTip {
		font-size: 28rpx;
		color: #999999;
	}
	.default-btn {
		margin-top: 80rpx;
	}
</style>
