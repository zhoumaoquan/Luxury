<template>
	<view class="container">
		<radio-group class="app-box-address" v-if="addressLists.length > 0">
			<label class="app-box-address-item bottom-line" v-for="(item) in addressLists" :key="item.id">
				<radio color="#DAB866" :checked="item.is_default == 1" value="0"></radio>
				<view class="address-info">
					<view class="address-info-top">
						<text class="name">{{item.contacts}}</text>
						<text>{{item.mobile}}</text>
					</view>
					<view class="address-info-bottom">
						<text space="ensp">{{item.province_name}} {{item.city_name}} {{item.district_name}}  {{item.address}}</text>
					</view>
				</view>
				<view class="app-box-address-item-icon" @click.stop="select(item.id)">
					<image src="@/static/icon/edit.png"></image>
				</view>
			</label>
		</radio-group>
		
		<view v-else>
			<u-empty margin-top="150" icon-size="130" text="没有收货地址" font-size="28" color="#999" mode="address" icon-color="#ccc">
			</u-empty>
		</view>
		
		
		<view class="app-btn" @click="jumpAdd">
			<text>添加</text>
		</view>
	</view>
</template>

<script>
	import { addressList } from '@/network/profile.js'
	export default {
		data() {
			return {
				m_id: '',
				addressLists: ['初始数据']
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.m_id = option.m_id
		},
		onShow() {
			this._getAddressList()
		},
		methods: {
			async _getAddressList() {
				try{
					let res = await addressList(this.m_id)
					
					this.addressLists = res
					
					uni.hideLoading()
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			select(id) {
				uni.navigateTo({
					url: '/pages/Profile/userdata/addAddress?type=2&id=' + id
				})
			},
			jumpAdd() {
				uni.navigateTo({
					url: '/pages/Profile/userdata/addAddress?type=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
	.app-box-address {
		width: 100%;

		&-item {
			width: 100%;
			height: 139rpx;
			@include box(0 30rpx);
			@include flex-al();
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			radio {
				transform: scale(.8);
			}
			
			&-icon {
				width: 50rpx;
				height: 50rpx;
				@include flex-al();
				justify-content: flex-end;
				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}

		.address-info {
			flex: 1;
			margin-left: 20rpx;

			.address-info-top {
				font-size: 30rpx;
				color: #333333;
				line-height: 50rpx;
				font-weight: 400;

				.name {
					margin-right: 30rpx;
				}
			}

			.address-info-bottom {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400rpx;
				line-height: 49rpx;
				display: flex;
				flex-wrap: wrap;
			}
		}
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
