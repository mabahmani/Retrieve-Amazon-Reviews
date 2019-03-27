'use strict'
const Nightmare = require('nightmare')
const randomUa = require('random-ua')
const evalFunction = require('amazon-reviews-crawler-eval')
const defaultOptions = {
	page: 'https://www.amazon.com/product-reviews/{{asin}}/ref=cm_cr_arp_d_viewopt_srt?reviewerType=all_reviews&pageNumber={{pageNum}}',
	stopAtReviewId: false
}

module.exports = (asin,pageNum, opt) => {
	return new Promise((resolve, reject) => {
		opt = Object.assign({}, defaultOptions, opt)
		opt.page = opt.page.replace('{{asin}}',asin)
		opt.page = opt.page.replace('{{pageNum}}',pageNum)
		new Nightmare({
				//show: true, openDevTools: { mode: 'detach' }
			})
			.useragent(opt.userAgent || randomUa.generate())
			.goto(opt.page)
			.evaluate(evalFunction, opt)
			.end(obj => obj)
			.then(resolve)
			.catch(reject)
			})
}