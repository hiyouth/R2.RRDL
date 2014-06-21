//这是一个通用类型，用于表示一个项目的属性和内容 ZHAOs 2014年4月11日14:48:46
R2.Business.Project = OpenLayers.Class({
    projName: "",
    projNO: "",
    projYear: "",
    projMonth: "",
    projMember: null,
    projUrl: "",
    projXQdocUrl:"",    
    projYSSJDocUrl:"",    
    projZJGCFXDocUrl:"",    
    projGNFXDocUrl:"",
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
    },

    CLASS_NAME:"R2.BUSINESS.Project"
});


window.projList = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
projList[0] = {
    projName: "海南抗震监管备案设防平台",
    projUrl: "http://192.168.83.236/DLDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO:"XM11097",
    projYear:"2012",
    projMonth: "04",
    projMember:["崔   艺","雷   磊","王少波","柯   文","李   夏","李剑萍","孟   荣","帅   磊","刘艳杰"]
};
projList[1] = {
    projName: "云南地质灾害信息管理系统",
    projUrl: "http://192.168.83.236/DLDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "XM11097",
    projYear: "2012",
    projMonth: "04",
    projMember: ["崔   艺","雷   磊","孟   荣","帅   磊","李亚斌","曹晓敏"]
};
projList[2] = {
    projName: "大连地质灾害信息管理系统",
    projUrl: "http://192.168.83.236/DLDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "DLXM20120027",
    projYear: "2012",
    projMonth: "10",
    projMember: ["崔   艺","雷   磊","王少波","曹晓敏","李亚斌","帅   磊","李剑萍","梁   旭","李   夏","刘艳杰","蒋建明"]
};
projList[3] = {
    projName: "地质灾害产品行业开发SDK",
    projUrl: "http://192.168.83.236/FJDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "XM11028",
    projYear: "2013",
    projMonth: "04",
    projMember: ["雷   磊" ,"李亚斌"]
};
projList[4] = {
    projName: "福建地质灾害信息管理系统",
    projUrl: "http://192.168.83.236/fjdz",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "XM11089",
    projYear: "2013",
    projMonth: "04",
    projMember: ["崔   艺","雷   磊","王少波","曹晓敏","孟   荣","帅   磊","李剑萍","梁   旭","李   夏","蒋建明"]
};
projList[5] = {
    projName: "江西省地质灾害预警预报系统",
    projUrl: "http://192.168.83.236/DLDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "XM11028",
    projYear: "2013",
    projMonth: "06",
    projMember: ["雷   磊","李亚斌","帅   磊","李剑萍","曹晓敏"]
};
projList[6] = {
    projName: "龙岩地质灾害信息管理系统",
    projUrl: "http://192.168.83.236/DLDZ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0001",
    projYear: "2013",
    projMonth: "08",
    projMember: ["雷   磊","王少波","帅   磊","曹晓敏","宁   楠","李   雄","张振强","赵森森","熊燕萍"]
};
projList[7] = {
    projName: "win8地灾系统APP",
    projUrl: "http://192.168.83.236/VGInfoSys",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0002",
    projYear: "2013",
    projMonth: "09",
    projMember: ["雷   磊","帅   磊","曹晓敏","蒋建明","宁   楠","李   雄"]
};
projList[8] = {
    projName: "农村村庄地理信息系统",
    projUrl: "http://192.168.83.236/VGInfoSys",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","曹晓敏","张振强","赵森森","李   雄"]
};
projList[9] = {
    projName: "R2Team Develpoer Library",
    projUrl: "http://192.168.83.122/R2",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","曹晓敏","张振强","赵森森","宁   楠","蒋建明","郭   毅"]
};
projList[10] = {
    projName: "丽江世界文化遗产保护系统",
    projUrl: "http://192.168.83.236/LiJiang",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","王少波","宁   楠","蒋建明","李   雄"]
};
projList[11] = {
    projName: "中国地下水资源数据库管理系统（平板）",
    projUrl: "http://192.168.83.122/R2",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","蒋建明"]
};
projList[12] = {
    projName: "中国地下水资源数据库管理系统（平板）",
    projUrl: "http://192.168.83.122/R2",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","蒋建明"]
};
projList[13] = {
    projName: "地质灾害产品三维演示系统",
    projUrl: "http://192.168.83.122/R2",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","王少波","帅   磊","宁   楠","张振强","李   雄","郭   毅","赵森森","蒋建明"]
};
projList[14] = {
    projName: "海南民居工程",
    projUrl: "http://192.168.83.236/HNMJ",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","李   雄","张振强","熊燕萍","曹四文","蒋建明"]
};
projList[15] = {
    projName: "济南地质灾害气象预警预报系统",
    projUrl: "http://192.168.83.122/R2",
    projXQdocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projYSSJDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projZJGCFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projGNFXDocUrl: "../../ProjectFiles/JN/ZD-济南地质灾害气象预警预报系统-R2.mht",
    projNO: "InteralProject-0003",
    projYear: "2013",
    projMonth: "10",
    projMember: ["雷   磊","帅   磊","王少波","曹晓敏","李   雄","张振强","赵森森","郭   毅","熊燕萍","曹四文"]
};