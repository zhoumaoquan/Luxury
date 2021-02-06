<template>
	<view class="container">
		<view class="app-box" v-if="list.length > 0">
			<view class="app-box-item bottom-line" v-for="item in list" :key="item.id" @click="jumpDetail(item.id)">
				<text>{{item.title}}</text>
				<u-icon name="arrow-right" top="0" size="26" color="#999"></u-icon>
			</view>
		</view>
		<view v-else>
			<u-empty margin-top="150" icon-size="130" text="暂无帮助文档数据~" font-size="28" color="#666" mode="order" icon-color="#ccc">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import { helpList } from '@/network/profile.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			uni.showLoading({
				title: '数据加载中...'
			})
			
			this._getHelpList()
		},
		methods: {
			async _getHelpList() {
				try{
					let res = await helpList()
					
					this.list = res
					
					uni.hideLoading()
				}catch(e){
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
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/Profile/help/helpDetail?id=' + id
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
		width: 100%;
		background-color: #FFFFFF;
		&-item {
			width: 100%;
			height: 104rpx;
			@include box(0 30rpx);
			@include flex-al-ju(space-between);
			font-size: 30rpx;
			color: #333333;
		}
	}
</style>
