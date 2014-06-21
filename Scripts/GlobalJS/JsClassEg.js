/*
*描述：openlayers样式的类定义示例
*create by cxm 2013-10-11 11:02:31
*/

/*******************************************************************************
*Class: R2.Business.Login
*登录业务对象类
******************************************************************************/
R2.Business.Login = OpenLayers.Class({   
    sth1: "",
    sth2: "",
    sth3: "",  
    initialize: function (sth1, option) {
        this.sth1 = sth1;
        OpenLayers.Util.extend(this, option);
        //this.dosth1();
    },   
    dosth1: function () {
        alert("sth1:" + this.sth1 + ";sth2:" + this.sth2 + ";sth3:" + this.sth3);       
    },

    dosth2: function () {
        alert("sth1:" + this.sth1 + ";sth2:" + this.sth2 + ";sth3:" + this.sth3);        
    },
    CLASS_NAME: "R2.Business.Login"
});


