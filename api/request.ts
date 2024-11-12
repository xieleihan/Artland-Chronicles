import mangaUrl from './index'
console.log(mangaUrl)
// 漫画请求
const mangaRequest = (options : any) => {
	console.log(mangaUrl + options.url)
	return new Promise((resolve, reject) => {
		uni.request({
			url: mangaUrl + options.url, // 拼接基础 URL 和接口路径
			method: options.method || 'GET', // 默认 GET 请求
			data: options.data || {}, // 传递的参数
			header: options.header || {
				'Content-Type': 'application/json', // 默认 JSON 格式
			},
			success: (res) => {
				// 判断请求是否成功
				if (res.statusCode === 200) {
					resolve(res.data); // 返回数据
				} else {
					reject(res.data); // 返回错误信息
					uni.showToast({
						title: `请求错误: ${res.statusCode}`,
						icon: 'none',
						duration: 2000,
					});
				}
			},
			fail: (err) => {
				reject(err); // 请求失败
				uni.showToast({
					title: '网络请求失败',
					icon: 'none',
					duration: 2000,
				});
			},
		});
	});
};

// GET 请求封装
export const get = (type : string, url : string, params = {}, header = {}) => {
	switch (type) {
		case 'manga':
			return mangaRequest({
				url,
				method: 'GET',
				data: params,
				header,
			});
	}
};

// POST 请求封装
export const post = (type : string, url : string, data = {}, header = {}) => {
	switch (type) {
		case 'manga':
			return mangaRequest({
				url,
				method: 'POST',
				data,
				header,
			});
	}
};

export default {
	get,
	post,
};