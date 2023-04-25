// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    // 默认勾选
    checked: "false",
    // 每日Todo
    dayItemList: [],
    // 展示进度条
    condition: false,
  },
  // 勾选todo项目
  onChange(event) {
    const id = event.currentTarget.dataset.item.id;
    const value = event.detail;
    console.log("newTodoList", id);
    const data = {
      id: id,
      isFinish: value,
    };
    // 刷新list
    this.updateTodoList(data);
  },

  // 获取 TODO list 接口
  getTodoList() {
    wx.request({
      url: "http://192.168.1.104:3007/api/getDayTodo",
      method: "get",
      success: (res) => {
        console.log("SN 获取每日TODO数据", res.data);
        if (res.data.status === 200) {
          this.setData({
            dayItemList: res.data.data,
          });
        }
      },
    });
  },

  // 更新 TODO list 接口
  updateTodoList(data) {
    wx.request({
      url: `http://192.168.1.104:3007/api/updateTodo`,
      method: "post",
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        console.log("SN 更新TODO list数据", res);
        if (res.data.status === 200) {
          // 刷新接口
          this.getTodoList();
        }
      },
    });
  },
  // 路由跳转
  showListDetail() {
    wx.navigateTo({
      url: "/pages/list/index",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTodoList();
  },
});
