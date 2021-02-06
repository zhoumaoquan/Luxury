<template>
	<view v-if="visibleSync" class="cat-signature" :class="{'visible':show}" @touchmove.stop.prevent>
		<view class="mask" @tap="close" />
		<view class="content">
			<canvas class='firstCanvas' :canvas-id="canvasId" @touchmove='move' @touchstart='start($event)' @touchend='end'
			 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error' />
			<view class="stroke-style">
				<view class="line-color" v-for="(item,index) in strokeList" :key="index" :style="'background:'+item" :class="strokeKey==index?'active':''"
				 @click.stop="onStroke(item,index)"></view>
			</view>
			<view class="slider-style">
				<slider block-size="12" v-model="setLineWidth" max="10" @change="sliderChange" />
			</view>
			<view class="btns">
				<view class="btn" @tap="clear">清除</view>
				<view class="btn active" @tap="save">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = canvasw * 9 / 16;
		},
	})
	export default {
		name: 'cat-signature',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			canvasId: {
				type: String,
				default: 'firstCanvas'
			}
		},
		data() {
			return {
				show: false,
				visibleSync: false,
				signImage: '',
				hasDh: false,
				allDrawWorksPath: [],
				strokeStyle: "#000",
				strokeKey: 0,
				setLineWidth: 1,
				strokeList: ['#000', '#7FFFD4', '#8A2BE2', '#DEB887', '#DC143C', '#FFD700', '#8FBC8F', '#1E90FF']
			}
		},
		watch: {
			visible(val) {
				this.visibleSync = val;
				this.show = val;
				this.getInfo()
			}
		},

		created(options) {
			this.visibleSync = this.visible
			this.getInfo()
			setTimeout(() => {
				this.show = this.visible;
			}, 100)
		},
		methods: {
			getInfo() {
				//获得Canvas的上下文
				content = uni.createCanvasContext(this.canvasId, this)
				//设置线的颜色
				content.setStrokeStyle(this.strokeStyle)
				//设置线的宽度
				content.setLineWidth(this.setLineWidth)
				//设置线两端端点样式更加圆润
				content.setLineCap('round')
				//设置两条线连接处更加圆润
				content.setLineJoin('round')
			},
			onStroke(item, index) {
				if (this.strokeKey == index) return
				this.strokeKey = index
				this.strokeStyle = item
				content.setStrokeStyle(item)
			},
			sliderChange(e) {
				this.setLineWidth = e.detail.value
				content.setLineWidth(this.setLineWidth)
			},
			// 
			close() {
				this.show = false;
				this.hasDh = false;
				this.$emit('close')
			},
			// 画布的触摸移动开始手势响应
			start(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				touchs.push(point);
				this.saveCurrentDrawWorks()
				this.hasDh = true
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				// console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				// console.log("长按手势" + e)
			},

			error: function(e) {
				// console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				// console.log(JSON.stringify(touchs))
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true);
				touchs.shift()

			},
			// 存储历史路径
			saveCurrentDrawWorks() {
				let self = this
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: canvasw,
					height: canvash,
					destWidth: 0,
					destHeight: 0,
					canvasId: self.canvasId,
					success: function(res) {
						var imgPath = res.tempFilePath;
						self.allDrawWorksPath.push(imgPath)
					},
					fail: res => {
						console.log('获取画布图片失败', res);

					}
				})
			},
			//清除操作
			clear: function() {
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
				// this.close()
				this.hasDh = false;
				this.$emit('clear')
			},
			save() {
				var that = this;
				if (!this.hasDh) {
					uni.showToast({
						title: '请先签字',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '生成中...',
					mask: true
				})
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: this.canvasId,
						success: function(res) {
							that.signImage = res.tempFilePath;
							that.$emit('save', res.tempFilePath);
							uni.hideLoading()
							that.hasDh = false;
							that.show = false;
						},
						fail: function(err) {
							console.log(err)
							uni.hideLoading()
						}
					}, this)
				}, 100)
			}
		}
	}
</script>

<style lang="scss">
	.cat-signature.visible {
		visibility: visible
	}
	.cat-signature {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 100;
		height: 100vh;
		visibility: hidden;

		.mask {
			display: block;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .4);
			transition: opacity .3s;
		}

		.content {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 50rpx;
			right: 0;
			margin: auto;
			width: 94%;
			height: 520rpx;
			background: #39425A;
			border-radius: 8rpx;
			box-shadow: 0px 3rpx 3rpx #333;

			// canvas
			.firstCanvas {
				background-color: #fff;
				width: 100%;
				height: 400rpx;
				border-radius: 8rpx 8rpx 0 0;
			}

			// canvas
			.stroke-style {
				display: flex;
				border-top: 1px dashed #eee;
				justify-content: center;
				background: #39425A;

				.line-color {
					width: 30rpx;
					height: 30rpx;
					border-radius: 100%;
					margin: 10rpx;
					border: 2px solid #fff;
				}

				.active {
					border: 2px solid #DAB866;
				}
			}
			.slider-style {
				height: 30rpx;
			}
			.btns {
				padding: 0 15px;
				height: 100upx;
				overflow: hidden;
				position: absolute;
				bottom: -120upx;
				left: 0;
				right: 0;
				margin: auto;
				display: flex;
				justify-content: space-between;

				.btn {
					width: 40%;
					text-align: center;
					font-size: 28upx;
					height: 60upx;
					line-height: 60upx;
					background-color: #FFFFFF;
					color: #39425A;
					font-weight: bold;
					border-radius: 6upx;
				}
				.btn.active {
					background-color: #39425A;
					color: #FFFFFF;
				}
			}
		}
	}

	.visible .mask {
		display: block;
		opacity: 1
	}
</style>
