JFCustomWidget.subscribe('ready', () => {
  var height = Number(JFCustomWidget.getWidgetSetting('height'));
  JFCustomWidget.requestFrameResize({
      height: height
  });
  window.addEventListener('resize', () => {
      JFCustomWidget.requestFrameResize({
          height: height
      });
  }, false);
});
