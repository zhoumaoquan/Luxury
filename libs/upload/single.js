const BASE_URL = 'https://api.xzzsmp.com/index.php/';
export const uploadHead = function(option) {
	uni.showLoading({
		title: '上传中...',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + option.url,
			filePath: option.imgUrl,
			name: 'image',
			header: {
				'content-type': 'multipart/form-data'
			},
			formData: {
				folder: 1
			},
			success: function(res) {
				let data = JSON.parse(res.data);
				resolve(data);
			},
			complete: function() {
				uni.hideLoading()
			},
			file: function(err) {
				reject(err);
			}
		})
	})
}

export const downloadFile = function(ImgUrl) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: ImgUrl,
			success(res) {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}