SET NAMES UTF8;

DROP DATABASE IF EXISTS 5sing;

CREATE DATABASE 5sing CHARSET=UTF8;

USE 5sing;

CREATE TABLE wx_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	phone VARCHAR(32) NOT NULL UNIQUE,
	uname VARCHAR(32) NOT NULL UNIQUE,
	upwd VARCHAR(16) NOT NULL,
	email VARCHAR(32) UNIQUE,
	avatar VARCHAR(64) DEFAULT "img/userAvt/defaultAvt.jpg",
	gender enum('0','1','2'),
	born VARCHAR(16),
	location VARCHAR(8),
	Qnum INT,
	music_identity VARCHAR(64),
	language VARCHAR(64),
	style VARCHAR(256),
	introduce VARCHAR(4000),
	attention INT DEFAULT 0,		#关注
	fans INT DEFAULT 0,		#粉丝
	hot INT DEFAULT 0  	#人气
);

INSERT INTO wx_user VALUES(
	null,"15818860047","Lin_HR","123abc","1679431550@qq.com",DEFAULT,"0",
	"1995_12_20","中国_广东",1679431550,"听众_乐评人_后期","华语_欧美_日语","纯音乐_流行","超级管理员",0,0,0);
INSERT INTO wx_user VALUES(
	null,"15916484444","LinHR","123abc",null,DEFAULT,null,null,null,null,null,
	null,null,null,0,0,0);
INSERT INTO wx_user VALUES(
	null,"13650722222","银铃","123abc",null,"img/userAvt/01.png","1","1970_12_11","中国_湖南",null,"听众",
	"华语","流行","微博：@银临Rachel 微信公众号：yinlinmusic",203,395296,1652421);
INSERT INTO wx_user VALUES(
	null,"13650721111","午年_ive","123abc",null,"img/userAvt/02.jpg","1","1996_12_12","中国_北京",null,"听众_乐手",
	"华语","流行_古风","我想超越这平凡的生活 微博：http://weibo.com/5iveyrs 群：260934874 敲门砖：五麻麻 接新请戳@李达枸",85,4292,474403);
INSERT INTO wx_user VALUES(
	null,"13650728005","叫ぶ獣","123abc",null,"img/userAvt/03.jpg","0","1990_5_23","中国_四川",243051207,null,
	null,"摇滚_对唱/合唱_搞笑/另类_动漫/游戏","ID:叫ぶ獣，通称“叫兽”|微博：@有个米库的叫兽|交流群：494887859|自认为各种风格都能唱，实际上根本不行|主日语翻唱，也偶尔唱唱华语英语|现场功力进修中",367,11618,62451);
INSERT INTO wx_user VALUES(
	null,"13650728006","双笙","123abc",null,"img/userAvt/04.jpg","1","2000_5_13",null,null,"歌手",
	"华语","古风_对唱/合唱_流行_动漫/游戏_填词","echo、5sing：双笙，bilibili：双笙子，荔枝FM1998256/初心不负 喜欢古风和很多东西",9,197242,85632);
INSERT INTO wx_user VALUES(
	null,"13650728007","Judechiu","123abc",null,"img/userAvt/05.jpg","0","1994_8_9","中国_贵州",315146784,null,
	null,"R&B_民谣_流行","过气的男歌手",59,8401,69650);
INSERT INTO wx_user VALUES(
	null,"13650728008","菅原纱由理(THE SxPLAY)","123abc",null,"img/userAvt/06.jpg","1","1990_6_29","中国_北京",null,null,
	null,"R&B_RAP/说唱_对唱/合唱_流行_动漫/游戏","这家伙很懒，什么也没有留下",0,485,4162);
INSERT INTO wx_user VALUES(
	null,"13650728009","西瓜JUN","123abc",null,"img/userAvt/07.jpg","0","1996_1_23","中国_浙江",null,null,
	null,"古风_朗诵_流行","唱歌是因为有爱~自娱自乐顺便给愿意听我唱歌的人听~箜篌引音乐工作室；OTZ家族。新浪微博：@西瓜_JUN",153,423211,176542);
INSERT INTO wx_user VALUES(
	null,"13650728010","走狗","123abc",null,"img/userAvt/08.jpg","0","1985_5_8","中国_浙江",null,null,
	null,"流行","这家伙很懒，什么也没有留下",115,3872,34751);
INSERT INTO wx_user VALUES(
	null,"13650728011","陈鹏杰","123abc",null,"img/userAvt/09.jpg","0","1988_2_6","中国_湖南",2273452249,
	null,null,"古风/纯音乐/流行/民谣/民族","q**:580227897 微博:陈鹏杰",47,3866,32945);
INSERT INTO wx_user VALUES(
	null,"13650728012","小麦芽甘璐","123abc",null,"img/userAvt/10.jpg","0","1997_12_24","中国_江苏",null,null,
	null,"古风","原创音乐人，唱作编，（不接无偿）微博：小麦芽甘璐 芽芽芽芽的秘密基地 群：563773127 来玩呀~~",139,1466,26785);
INSERT INTO wx_user VALUES(
	null,"13650728023","祈inory","123abc",null,"img/userAvt/21.jpg","1","1991_4_1","中国_北京",null,"乐手","华语",
	"动漫/游戏",">_<~~各种努力！！ 要是想听以前录的渣渣的话，请到http://www.tudou.com/home/inoryAOI 歌比较全~~不过分贝时代的好多歌，我自己都木有存档了。。。",23,132956,8413541);

INSERT INTO wx_user VALUES(
	null,"13650728013","Maurice`Gissing","123abc",null,"img/userAvt/11.jpg","0","1995_5_23","中国_四川",null,"欧美",
	null,"流行","欧美翻唱，搅基企鹅706632442 三星堆可指定后期",226,6075,31854);
INSERT INTO wx_user VALUES(
	null,"13650728014","山tothe大","123abc",null,"img/userAvt/12.png","0","1991_4_18","中国_香港",null,null,
	null,null,"just for fun 微博:山tothe大/**：551630572，敲门砖：鸭梨不山大",42,1110,12664);
INSERT INTO wx_user VALUES(
	null,"13650728015","时砂.","123abc",null,"img/userAvt/13.jpg","1","1996_4_18","中国_广东",null,null,
	null,null,"这个人很懒，只留下了微博：@时砂",68,5862,44792);
INSERT INTO wx_user VALUES(
	null,"13650728016","夏喘喘丶","123abc",null,"img/userAvt/14.jpg","1","1996_10_8","中国_江苏",null,null,
	null,"古风_电子_流行_动漫/游戏_对唱/合唱","谢谢小天使来听我的歌ヾ(｡･ω･｡)网易云/微博：@夏喘喘丶/助理：1287241779（池啾啾）/平纱落雁原创音乐团队歌手",252,6314,32100);
INSERT INTO wx_user VALUES(
	null,"13650728017","册二点的蛋壳","123abc",null,"img/userAvt/15.jpg","0","1989_12_30","中国_安徽",null,null,
	null,null,"=苏陌丹。还不太会唱歌，修炼中。 头像by 回轉叉叉 随心唱唱XD不喜欢听的宝宝们请点右上角哟【苦逼社】 weibo：@册二点的蛋壳 ask:http://ask.fm/sumodan",467,1116,3894);
INSERT INTO wx_user VALUES(
	null,"13650728018","郑乐成","123abc",null,"img/userAvt/16.jpg","0","1987_10_7","中国_北京",null,null,
	null,null,"想当歌手的录音师，哈哈哈哈。新浪微博：http://weibo.com/u/3898091537",37,543,7500);
INSERT INTO wx_user VALUES(
	null,"13650728019","纸杯君","123abc",null,"img/userAvt/17.jpg","0","1994_10_9","中国_广东",null,null,
	null,null,"VOCALOID系翻唱为主。",81,44686,154651);
INSERT INTO wx_user VALUES(
	null,"13650728020","嗨的国风音乐","123abc",null,"img/userAvt/18.jpg","2","2016_11_18","中国_浙江",2480405335,null,
	null,"古风_纯音乐_民族_戏曲/曲艺_动漫/游戏","让国乐嗨起来~ 微博/微信：嗨的国风音乐 B站：https://space.bilibili.com/65795914#!/",4,307,3748);
INSERT INTO wx_user VALUES(
	null,"13650728021","Firework瑾","123abc",null,"img/userAvt/19.png","0",null,"中国_云南",null,null,
	null,null,"〖搅基群：517060227〗 就俩本命，竹桑和猫大可。高二狗不接新啦！ 新浪微博：http://weibo.com/1945691623/profile?rightmod=1",295,1107,5994);
INSERT INTO wx_user VALUES(
	null,"13650728022","蜜瓜大爷","123abc",null,"img/userAvt/20.jpg","0",null,null,null,null,
	null,null,"微博：蜜瓜大爷 感谢收听m(_ _)m",93,2756,19252);
INSERT INTO wx_user VALUES(
	null,"13650728024","简弘亦","123abc",null,"img/userAvt/22.jpg","0","1986_10_6","中国_广东",null,null,null,
	"流行_摇滚_影视_古风","原名：蹇红。 “火山音”唱法创始人。师从台湾金牌音乐制作人涂惠源，个人代表作：《树先生》、《群居动物》等歌曲；创作代表作：电影《匹夫》片尾曲《风归云》、陈慧琳《爱的学校》等。 简红全球后援会官方Q**：21100473",1,3975,41063);
INSERT INTO wx_user VALUES(
	null,"13650728025","无锡肖斯塔录音棚","123abc",null,"img/userAvt/23.jpg","0","1990_10_1","中国_江苏",544472031,"歌手",
	"华语","古风_R&B_RAP/说唱_新世纪_电子","工作联系电话：15312481440 从小不爱与人交往的我，因为音乐而变得更加自信，也因此而改变了我的人生！ 肖斯塔（原名：肖佳），大学期间因演唱海豚音王子维塔斯（Vitas)的经典歌曲《Opera 2》而成为校园红人，又因为电脑Vista系统，前苏联作曲家肖斯塔科维奇三个名字傻傻分不清便被朋友叫做肖斯塔，肖斯塔谐音“笑死他”，与本人逗逼的气质十分吻合，所以以此为艺名。 肖斯塔是一位全能型唱作歌手、音乐人。 朋友眼中的我低调、随和、务实。",4,467,6827);
INSERT INTO wx_user VALUES(
	null,"13650728026","殇小谨。","123abc",null,"img/userAvt/24.jpg","0",null,null,null,null,null,null,"混音师，也是Boom音乐课堂的老师~除了接单还带学生哦~有需要请联系qq553768204 O(∩_∩)O~
	",5,1820,13780);
INSERT INTO wx_user VALUES(
	null,"13650728027","令梵Eva","123abc",null,"img/userAvt/25.jpg","1","1994_11_5","中国_湖北",416996117,"歌手",
	null,null,"微博ID：令梵Eva，三个糙汉一个软妹组成员。",46,1562,5342);
INSERT INTO wx_user VALUES(
	null,"13650728028","琳大侠","123abc",null,"img/userAvt/26.jpg","1","1992_12_1","中国_上海",null,"歌手",
	null,"民谣","酒对知己饮，诗向会人吟。",4,1413,13246);
INSERT INTO wx_user VALUES(
	null,"13650728029","小葵ひまわり","123abc",null,"img/userAvt/27.jpg","0","1992_12_1","中国",null,"歌手",
	null,null,"勾搭请到渣浪微博 http://weibo.com/himawarinosekai，歌曲同步更新B站：http://space.bilibili.com/7825",192,39447,65210);
INSERT INTO wx_user VALUES(
	null,"13650728030","Huela拉拉","123abc",null,"img/userAvt/28.jpg","1","1992_12_1","中国_上海",null,"歌手",
	null,null,"weibo&唱吧&美拍：Huela周静",117,4156,38942);
INSERT INTO wx_user VALUES(
	null,"13650728031","伦桑.[平纱落雁]","123abc",null,"img/userAvt/29.jpg","0","1992_12_1","中国_深圳",null,"歌手",
	null,null,"这家伙很懒，什么也没有留下",38,351944,102105);
INSERT INTO wx_user VALUES(
	null,"13650728032","明語Can","123abc",null,"img/userAvt/30.jpg","0","1999_8_15","中国_福建",550663484,"歌手",
	null,null,"微博/b站:明語Can 一个易勾搭的逗逼hhh欢迎大家来找我玩QWQ",67,91,534);


CREATE TABLE index_banner(
	bid TINYINT PRIMARY KEY AUTO_INCREMENT,
	src VARCHAR(128),
	href VARCHAR(128),
	background VARCHAR(8)
);

INSERT INTO index_banner VALUES(
	null,"img/index/banner1.jpg","lookforward.html","#F7F7F9");
INSERT INTO index_banner VALUES(
	null,"img/index/banner2.jpg","lookforward.html","#0B1517");
INSERT INTO index_banner VALUES(
	null,"img/index/banner3.jpg","lookforward.html","#111C3A");
INSERT INTO index_banner VALUES(
	null,"img/index/banner4.jpg","lookforward.html","#E4F6FF");
INSERT INTO index_banner VALUES(
	null,"img/index/banner5.jpg","lookforward.html","#D4BDB5");
INSERT INTO index_banner VALUES(
	null,"img/index/banner6.jpg","lookforward.html","#141414");
INSERT INTO index_banner VALUES(
	null,"img/index/banner7.jpg","lookforward.html","#24A68C");
INSERT INTO index_banner VALUES(
	null,"img/index/banner8.jpg","lookforward.html","#24A68C");
INSERT INTO index_banner VALUES(
	null,"img/index/banner9.jpg","lookforward.html","#24A68C");
INSERT INTO index_banner VALUES(
	null,"img/index/banner10.jpg","lookforward.html","#24A68C");

CREATE TABLE songlist(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname VARCHAR(32),
	href VARCHAR(64) UNIQUE,
	singer VARCHAR(32),
		FOREIGN KEY(singer) REFERENCES wx_user(uname),
	afflatus VARCHAR(256),
	style VARCHAR(16),
	type VARCHAR(16),
	lang VARCHAR(8),
	ctime DATETIME,
	src VARCHAR(64),
	degree INT 			#热度
);

INSERT INTO songlist VALUES(
	null,"是风动 Feat.河图","origin_detail.html?sid=1","银铃","第一次跟图老师的正式合唱！有人老问我说为啥到副歌的地方都听不见银临的声音，哈哈哈 因为这首歌是给图老师写的呀~当绿叶当得超开心的！","古风/流行","原创","华语",now(),null,25256
);
INSERT INTO songlist VALUES(
	null,"留给明天的答案【《那年那兔那些事儿》第四季ED】","origin_detail.html?sid=2","午年_ive","《那年那兔那些事儿》第四季ED “我是种花家的兔子，那些历史教会我们的事儿，都是先辈留给明天的答案！","流行","原创","华语",now(),null,2612
);
INSERT INTO songlist VALUES(
	null,"《狐妖小红娘 日语版 OP2》——万水依山","origin_detail.html?sid=3","叫ぶ獣","《狐妖小红娘》日语版 月红篇 新OP 《万水依山》 完整版终于解禁！5sing也上传以便大家收听！","动漫/游戏","原创","华语",now(),null,2648
);
INSERT INTO songlist VALUES(
	null,"扬州姑娘【人声本家】","origin_detail.html?sid=4","双笙","扬州姑娘【人声本家】","古风","原创","华语",now(),null,16483
);
INSERT INTO songlist VALUES(
	null,"大反派","origin_detail.html?sid=5","Judechiu","这首歌写给Joker 看出来了吗？","搞笑/另类 流行","原创","华语",now(),null,7846
);
INSERT INTO songlist VALUES(
	null,"我爱着机器人那一方的你","origin_detail.html?sid=6","菅原纱由理(THE SxPLAY)","没有填写灵感","R&B HIP-HOP","原创","华语",now(),null,2543
);
INSERT INTO songlist VALUES(
	null,"【大荒神域录】","origin_detail.html?sid=7","西瓜JUN","“以生魂养亡魂，是违逆天道之举，对道行有损，恐怕不能飞升...”
	“我不在乎！”
	“即使她能够复活，也不会再记得你。你不后悔？”
	“我意已决，请前辈成全！”","古风","原创","华语",now(),null,10421
);
INSERT INTO songlist VALUES(
	null,"浮城旧梦","origin_detail.html?sid=8","走狗","最好不相见,如此便可不相恋。
	最好不相知，如此便可不相思。","流行","原创","华语",now(),null,4613
);
INSERT INTO songlist VALUES(
	null,"妳","origin_detail.html?sid=9","陈鹏杰","送给你们嫂子的","流行","原创","华语",now(),null,4396
);
INSERT INTO songlist VALUES(
	null,"【曲/唱】眉心妆","origin_detail.html?sid=10","小麦芽甘璐","感谢全体","古风","原创","华语",now(),null,321
);

INSERT INTO songlist VALUES(
	null,"No promises","origin_detail.html?sid=11","Maurice`Gissing","嗯，黛阿姨的歌，好久没发歌了，估计这电子得加了10几个效果器。。2333","R&B","翻唱","欧美",now(),null,4521
);
INSERT INTO songlist VALUES(
	null,"【山大】说散就散","origin_detail.html?sid=12","山tothe大","
翻唱：山大 后期：子杨 pv：阿宝 美工：Mr.情 pv背景：阿瑟","流行","翻唱","华语",now(),null,789
);
INSERT INTO songlist VALUES(
	null,"『ACCA』苍月摇曳","origin_detail.html?sid=13","时砂.","
今天我过生日，这个生日对我来说意义有点重要，但是具体几岁这就不重要了。
ACCA这个ED，不知道大家注意到没有，片尾的歌曲和动画描述的是另一个故事，感兴趣的朋友可以重新去看看。
吉恩的妹妹萝塔在某一集透露过，在被问到喜欢的人的时候，她说：比起喜欢，更多的是仰慕。
这种仰慕对我来说应该算是最纯粹的喜欢了，不知道大家有没有暗恋的人呢？
无关欲望，只是不知不觉中悄无声息的心动，光想象就能若有似无地闻到他的气息，只要他站在那里，你就干什么都不是了。
( ͡° ͜ʖ ͡°)","动漫/游戏","翻唱","华语",now(),null,12031
);
INSERT INTO songlist VALUES(
	null,"叙世 w.晴愔/Firework瑾","origin_detail.html?sid=14","夏喘喘丶","
敲开心又和晴愔小姐姐唱歌啦！！谢谢我瑾的完美戏腔！！之前后期也辛苦了！！！！
感谢绯戈的超稳后期！！超棒！！！日常赞美我夏的海报哈哈哈哈哈哈哈哈！！
希望你们喜欢！！！","古风","翻唱","华语",now(),null,19652
);
INSERT INTO songlist VALUES(
	null,"【苏陌丹】Almost Lover HB2村乙","origin_detail.html?sid=15","册二点的蛋壳","我滴宝！！！！！！今年也生日快乐！！！！
我又唱了虐歌嘻嘻嘻我知道你不会打我的！！！
我觉得词曲很好啊，完全贴合现在信缘成佛的我俩哈哈哈哈你会爱上的！","流行","翻唱","华语",now(),null,12306
);
INSERT INTO songlist VALUES(
	null,"杀死那个石家庄人","origin_detail.html?sid=16","郑乐成","这首歌实际上描述了北方重工业城市在经历过了时代变迁，从计划经济到市场经济的的变轨所经历的阵痛，和那些被遗忘或者是被抛弃的群体的失落和愤怒的感受。","摇滚","翻唱","华语",now(),null,123
);
INSERT INTO songlist VALUES(
	null,"メーベル","origin_detail.html?sid=17","纸杯君","","摇滚","翻唱","日语",now(),null,4687
);
INSERT INTO songlist VALUES(
	null,"【国风/电音】超燃《月光》秦时明月十周年特别改编","origin_detail.html?sid=18","嗨的国风音乐","秦时明月主题曲《月光》乐器演奏版","古风","翻唱","华语",now(),null,6512
);
INSERT INTO songlist VALUES(
	null,"Clean","origin_detail.html?sid=19","Firework瑾","感谢混音师小添~","流行","翻唱","欧美",now(),null,7864
);
INSERT INTO songlist VALUES(
	null,"我害怕【宝贝瓜】","origin_detail.html?sid=20","蜜瓜大爷","歌很好听","流行","翻唱","欧美",now(),null,10354
);
INSERT INTO songlist VALUES(
	null,"一剪梅 舟过吴江（诗词歌赋作品集）","origin_detail.html?sid=21","简弘亦","唱作人简弘亦发起“诗词歌赋”活动 
古汉语和新音乐的一场恋爱 
用音乐向汉语致敬 
用音乐传播经典 
这些歌词美得让你颤栗，原来我们这么熟悉 
这些歌词美得让你颤栗，她们来自我们的祖先","流行","原创","华语",now(),null,1246
);
INSERT INTO songlist VALUES(
	null,"我在黄灯下走过","origin_detail.html?sid=22","无锡肖斯塔录音棚","哈咯大家好！我的第二张全新原创音乐专辑《1990》终于发布预售咯！
专辑分为《1990》和《一九九零》两部分，汇集民谣、流行、摇滚、电子.民族等风格的20首原创音乐作品。专辑乐童预售众筹地址
http://www.musikid.com/new/project/3348?from=groupmessage&isappinstalled=0
希望大家多多支持！","流行","原创","华语",now(),null,4153
);
INSERT INTO songlist VALUES(
	null,"欧皇 - 薛明媛/朱贺","origin_detail.html?sid=23","殇小谨。","欧皇 - 薛明媛/朱贺","流行","原创","华语",now(),null,6153
);
INSERT INTO songlist VALUES(
	null,"【谪仙录】落花逐尘（漫画《谪仙录》主题曲）","origin_detail.html?sid=24","令梵Eva","落花逐尘这首歌是漫画《谪仙录之太平青领书》的主题曲，风君的画风特别好看，我个人特别喜欢，有幸得到可以演唱这首歌的机会，非常的开心~每一个环节中我们每一个人都有很努力的去做到最好~PV非常美，完整版在B站我的主页可以看到，希望大家喜欢~","古风","原创","华语",now(),null,6453
);
INSERT INTO songlist VALUES(
	null,"昨天一整晚梦见的都是你","origin_detail.html?sid=25","琳大侠","根绝粉丝讲述的故事而写的歌。首次尝试了Bossa Nova风格。","流行","原创","华语",now(),null,5353
);

INSERT INTO songlist VALUES(
	null,"【葵x东也】世界に一つだけの花","origin_detail.html?sid=26","小葵ひまわり","啊，终于跟小东子合唱了一首，了却了我们过气游戏主播的心愿（x

这首歌是小东子找我唱的，我也一直很喜欢这首超级治愈的曲子，arrange借鉴了优十版的，先生的改编还是一如既往的优美！

哎，东也唱歌真的太骚了，骚断腿，听着他的干音都无法保持我纯洁的内心了【

啊，说句题外话，这次真的恢复录歌了，最近陆续在填老坑，独唱的话可能会稍后，也可能哪天打鸡血说不定就发了呢是吧→ →

好了，最后感谢小螃蟹耐心的后期，做的贼舒♂服，改了很多遍实在辛苦了！

然后期待一下东葵的下次合作嗯！","流行","翻唱","日语",now(),null,5853
);
INSERT INTO songlist VALUES(
	null,"时一现耳三千岁","origin_detail.html?sid=27","双笙","本家av:4240376
已获本家授权


作编曲 : MeLo 
作词 : 绿邪 
曲绘:零届0rz
PV：冰镇甜豆浆  
原唱：星尘  
翻唱：双笙
后期：良良木  
PV压制:稚青   ","古风","翻唱","华语",now(),null,5953
);
INSERT INTO songlist VALUES(
	null,"Never Be Like you","origin_detail.html?sid=28","Huela拉拉","略略略","电子","翻唱","欧美",now(),null,4353
);
INSERT INTO songlist VALUES(
	null,"像风一样","origin_detail.html?sid=29","伦桑.[平纱落雁]","
作词：薛之谦
作曲：薛之谦
编曲：张宝宇&郑伟
原唱：薛之谦
翻唱：伦桑
后期：小吴太太
画师：承冽
 PV ：戒戒
题字：阿琳","流行","翻唱","华语",now(),null,8953
);
INSERT INTO songlist VALUES(
	null,"【六人王子！】未来地図","origin_detail.html?sid=30","明語Can","Music: ST☆RISH
Vocal: 愈雨Amekyun、安さん、冠冠kun、抽抽、明語 、涼君
Mix：賊恩
Illust：桃子、弥生
Movie：吐♂槽
Spcial Thanks：NoII
  我：大家好！我们来做传说中的乙女游戏了（bushi）x 喜欢的话点个赞，投个币，点个收藏好不好！！顺便发发弹幕呜呜呜！
  冠冠：感谢老残不嫌弃呜呜呜呜呜呜，策划虽然贼托但是还是很稳哈哈哈哈哈哈哈。贼爱您！（我：呜呜呜谢谢我冠冠爱您！）
  愈雨：感谢明总带我玩这么帅的合唱！（我：感谢鱼鱼呜呜呜！！）
  抽抽：完全ONM彩虹蛇皮JBK.jpg！
  安桑：完全ONM彩虹蛇皮JBK.jpg！（其实他们什么都没说只是发的一个表情包！）
  凉君：（这个人失踪了！！！怎么办！）
  弥生太太：终于产出来了！不容易！（我：是的x暴风哭泣 ）
  我微博会转发抽3个人1箱旺仔牛奶！！！转发不过60就黑箱了x！！（我才不会告诉你们原本是5箱被我喝了两箱！！理直气壮.jpg）
  从6月份的坑到现在终于出来了！！！！！真的超级超级谢谢大家！！！！！你们都超级棒！！！好听爆炸！疯狂哭泣555555 期待以后和小哥哥们继续肝游戏！！！（bushi
  感谢恩姐的后期！！！恩姐超棒！！！！！
  谢谢桃子太太超好看的立绘！！！！还有弥生太太的美炸的曲绘！！！！！（其实我想吐槽为什么我是最矮的！！！！而且最像女孩子的emmm 哇！！！！爆哭）请大家一定要约她们！真的超好看！
  然后谢谢吐槽老师带着我们一起做游戏！！！！wbxl NOgay ！按吐槽老师来说这是个攻略游戏需要一个一个攻略x 然后冠冠是个隐藏角色（因为他是个Gay最难攻略了hhhh）最后吐槽老师牛逼！！！！PV超好看！！！！疯狂打call！！！
  谢谢我noi宝宝！帮我们唱了和声示范！！最后啦啦啦竟然是三种x完全听不出来x
  最后！预告下次的男团6人合唱！大概是在明年5月份吧！！","对唱","翻唱","日语",now(),null,10553
);
INSERT INTO songlist VALUES(
	null,"命运之镰（龙之谷CG）","origin_detail.html?sid=31","祈inory","当你与我签订契约的那一刻起，你就是我。
	我们的宿命与彼此相镰，无法逃脱。","流行","原创","华语",now(),"media/祈inory - 命运之镰（龙之谷CG）.mp3",30354
);

CREATE TABLE user_comment(
	ucid INT PRIMARY KEY AUTO_INCREMENT,
	sid INT,
		FOREIGN KEY(sid) REFERENCES songlist(sid),
	comment VARCHAR(512) NOT NULL,
	cuser VARCHAR(32),
		FOREIGN KEY(cuser) REFERENCES wx_user(uname),
	time DATETIME
);

CREATE TABLE rec_msg(
	mid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64) NOT NULL DEFAULT '',
	href VARCHAR(64),
		FOREIGN KEY(href) REFERENCES songlist(href)
);

INSERT INTO rec_msg VALUES(
	NULL,"【推荐】龙之谷 —— 黑暗死神版本主题曲","origin_detail.html?sid=31"
);
INSERT INTO rec_msg VALUES(
	NULL,"【推荐】双笙姑娘原创新歌——人生本家","origin_detail.html?sid=4"
);
INSERT INTO rec_msg VALUES(
	NULL,"【推荐】我欠你一个promise","origin_detail.html?sid=11"
);
INSERT INTO rec_msg VALUES(
	NULL,"【歌单】超燃国风电音歌单，不听后悔","origin_detail.html?sid=18"
);
INSERT INTO rec_msg VALUES(
	NULL,"【歌单】银铃河图合作倾情演绎！","origin_detail.html?sid=1"
);


CREATE TABLE detail_visitor(
	vid INT PRIMARY KEY AUTO_INCREMENT,
	sid INT,
		FOREIGN KEY(sid) REFERENCES songlist(sid),
	vname VARCHAR(32),
		FOREIGN KEY(vname) REFERENCES wx_user(uname),
	time DATETIME
);

