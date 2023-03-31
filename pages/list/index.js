// pages/list/index.js
// import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前弹窗标题
    currentTitle: "",
    // 弹出层显隐
    isDetailShow: false,
    // todo名称
    todoName: "",
    // 校验提示
    errorMsg: "TODO名称未填写1",
    // todo周期
    todoCycle: "1",
    // todo打卡类型
    todoType: "0",
    // 健康管理List
    healthList: [
      //   {
      //   todoName: "运动运动",
      //   todoCycle: "2",
      //   todoCycleName: "每周一次",
      //   todoType: '1',
      //   todoTypeName: "进度条",
      // },
      // {
      //   todoName: "早睡早睡",
      //   todoCycle: "1",
      //   todoType: '2'
      // }
    ],
  },
  // 打开弹出层
  showPopup(e) {
    console.log("名称", e.currentTarget.dataset.name)
    this.setData({
      currentTitle: e.currentTarget.dataset.name,
      isDetailShow: true
    });
  },
  // 关闭弹出层
  onClose() {
    this.setData({ isDetailShow: false });
  },
  // 获取输入TODO名称
  onInputChange(e) {
    if (e.detail) {
      this.setData({ todoName: e.detail, errorMsg: "" });
    }
  },
  // onInputBlur(e) {
  //   console.log('ddd', this.data)
  // },
  // 切换周期
  changeCycle(e) {
    this.setData({
      todoCycle: e.detail,
    });
  },
  // 选择周期
  clickCycle(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      todoCycle: name,
    });
  },
  // 选择打卡方式
  changeType(e) {
    console.log('打卡打卡', e);
    this.setData({
      todoType: e.detail,
    });
  },
  // 提交弹窗内容
  clickSubmit() {
    // 周期名称映射
    let todoCycleName = "";
    switch (this.data.todoCycle) {
      case "1": todoCycleName = "每日一次"; break;
      case "2": todoCycleName = "每周一次"; break;
      case "3": todoCycleName = "每月一次"; break
    };
    console.log("1111", this.data.todoName)
    // 如果项目名称为空，则不做任何操作
    if (!this.data.todoName) {
      return;
    }
    // 新增项目
    let arr = this.data.healthList;
    arr.push({
      todoName: this.data.todoName,
      todoCycle: this.data.todoCycle,
      todoCycleName: todoCycleName,
      todoType: this.data.todoType,
      todoTypeName: this.data.todoType === "0" ? "勾选" : "进度条"
    });
    console.log("打印arr", arr)

    // 关闭弹窗
    this.setData({
      healthList: arr,
      isDetailShow: false,
      todoName: "",
      todoCycle: "1",
      todoType: "0"
    });
  },

  // 选择打卡类型
  clickType(e) {
    console.log('打卡打卡', e.detail);
    this.setData({
      todoType: e.detail,
    });
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },
});
