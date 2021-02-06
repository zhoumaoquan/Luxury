<template>
	<view class="container u-skeleton">
		<view class="app-box u-skeleton-fillet">
			<input placeholder="请输入您的昵称" focus v-model="nickname" />
		</view>
		
		<view class="app-btn" @click="nameConfirm">
			<text>确定</text>
		</view>
		
		<u-skeleton :loading="loading" bgColor="#F5F5F5" el-color="#ffffff"></u-skeleton>
	</view>
</template>

<script>
	import { getUserInfo, updataInfo } from '@/network/profile.js'
	export default {
		onLoad(option) {
			this.m_id = option.m_id
			
			this._getUserInfo()
		},
		data() {
			return {
				nickname: '',
				loading: true
			};
		},
		methods: {
			async _getUserInfo() {
				try {
					let res = await getUserInfo(this.m_id)
					
					this.nickname = res.nickname
					
					if(this.loading) {
						setTimeout(() => {
							this.loading = false
						}, 1000)
					}
				} catch (e) {
					uni.showToast({
						title: '获取昵称失败',
						icon: 'none'
					})
				}
			},
			nameConfirm() {
				if(this.nickname === ''&& this.nickname.tirm().length === 0) {
					return uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					})
				}
				
				this._updataInfo(this.nickname)
			},
			_updataInfo(value) {
				updataInfo({
					m_id: this.m_id,
					nickname: value
				}).then(res => {
					uni.showToast({
						title: '保存成功',
						icon: 'none',
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
						title: '保存失败',
						icon: 'none'
					})
				})
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
		width: 100%;
		height: 104rpx;
		@include box(0 30rpx);
		@include flex-al();
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
		background-color: #FFFFFF;
	}
	.app-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		
		@include flex-center();
		
		width: 750rpx;
		height: 98rpx;
		background-color: #39425A;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
