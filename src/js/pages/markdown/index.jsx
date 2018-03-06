
// import '../../../../jquery/jquery.min.js';



import { ipcRenderer } from 'electron';

import React from 'react';
import ReactDOM from 'react-dom';

// import jQuery from 'jquery'
import Editormd from '../../../../jquery/editormd';

// import '../../../style/editormd.css';
// import '../../../style/style.css';
const editormd = Editormd();

class App extends React.Component {
    // initEvent(){
    //     $(body).html()
    //     alert('initEvent1');
    // }
    render() {

       if (editormd) {
           console.log('ok')
           console.log(editormd);
       }else {
           console.log('no')
       }

        editormd("test-editormd", {
            width: "90%",
            height: 740,
            path : '../lib/',
            theme : "dark",
            previewTheme : "dark",
            editorTheme : "pastel-on-dark",
            // markdown : md,
            codeFold : true,
            //syncScrolling : false,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            //watch : false,                // 关闭实时预览
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji : true,
            taskList : true,
            tocm            : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,             // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "./php/upload.php",
            onload : function() {
                console.log('onload', this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();

                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            }
        });

        return (
            <p className="compose-font">
                Little Bitch
                <div id="test-editormd" ref="test-editormd"></div>
            </p>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));