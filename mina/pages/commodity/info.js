//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var utils = require('../../utils/util.js');
Page({
    data: {
        autoplay: true,
        interval: 3000,
        duration: 1000,
        swiperCurrent: 0,
        hideShopPopup: true,
        buyNumber: 1,
        buyNumMin: 1,
        buyNumMax: 1,
        canSubmit: false, //  选中时候是否允许加入购物车
        good: {},
        shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车,
        id: 0,
        shopCarNum: 4,
        commentCount: 2,
        imagePath: app.globalData.imagePath,
    },
    onLoad: function (e) {
        var that = this;
        that.setData({
            id: e.id
        });
        console.log(e.id)
    },
    onShow: function () {
        this.getInfo();
        this.getComments();
    },
    goShopCar: function () {
        wx.reLaunch({
            url: "/pages/cart/index"
        });
    },
    addShopCar: function () {
        var that = this;
        wx.request({
            url: app.buildUrl("/commodity/cart_add"),
            header: app.getRequestHeader(),
            method: 'GET',
            data: {
                id: that.data.id
            },
            success: function (res) {

                var resp = res.data.msg;

                wx.showToast({
                    title: resp,
                    duration: 1000,
                    mask: true
                })

            }
        });
    },
    // tobuy: function () {
    //     this.setData({
    //         shopType: "tobuy"
    //     });
    //     this.bindGuiGeTap();
    // },

    // buyNow: function () {
    //     wx.navigateTo({
    //         url: "/pages/order/index"
    //     });
    // },
    /**
     * 规格选择弹出框
     */
    // bindGuiGeTap: function () {
    //     this.setData({
    //         hideShopPopup: false
    //     })
    // },
    /**
     * 规格选择弹出框隐藏
     */
    // closePopupTap: function () {
    //     this.setData({
    //         hideShopPopup: true
    //     })
    // },
    // numJianTap: function () {
    //     if (this.data.buyNumber <= this.data.buyNumMin) {
    //         return;
    //     }
    //     var currentNum = this.data.buyNumber;
    //     currentNum--;
    //     this.setData({
    //         buyNumber: currentNum
    //     });
    // },
    // numJiaTap: function () {
    //     if (this.data.buyNumber >= this.data.buyNumMax) {
    //         return;
    //     }
    //     var currentNum = this.data.buyNumber;
    //     currentNum++;
    //     this.setData({
    //         buyNumber: currentNum
    //     });
    // },
    //事件处理函数
    // swiperchange: function (e) {
    //     this.setData({
    //         swiperCurrent: e.detail.current
    //     })
    // },
    getInfo: function () {
        var that = this;
        wx.request({
            url: app.buildUrl("/commodity/commodity_info"),
            header: app.getRequestHeader(),
            data: {
                id: that.data.id
            },
            success: function (res) {
                // console.log(res.data.data)
                var resp = res.data;
                that.setData({
                    good: resp.data[0],
                });
            }
        });
    },

    getComments: function () {
        var that = this;
        console.log(that.data.id)
        wx.request({
            url: app.buildUrl("/commodity/commodity_comments"),
            header: app.getRequestHeader(),
            data: {
                id: that.data.id
            },
            success: function (res) {
                var resp = res.data;
                that.setData({
                    commentList: resp.data,
                    commentCount: resp.data.length,
                });
            }
        });
    },
    // memberComments:function(){}

    onShareAppMessage: function () {
        var that = this;
        console.log("分享")
        return {
            title: that.data.good.title,
            path: '/pages/commodity/info?id=' + that.data.good.id,
            success: function (res) {
                //转发成功
                wx.request({
                    url: app.buildUrl("/member/credit_share"),
                    header: app.getRequestHeader(),
                    method: 'POST',
                    data: {
                        url: utils.getCurrentPageUrlWithArgs(),
                        'csrfmiddlewaretoken': '{{ csrf_token }}'
                    },
                    success: function (res) {
                        console.log(res.data)
                    }
                });
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }

});
