$(function() {
	boundEvent()
})

function boundEvent() {
	emailTest()
	var test = null;
	$.ajax({
		url: "json/test.json",
		success: function(date) {
			test = date;
		}
	})

	function phoneTest() {
		var num = 0;
		var _str = "";

		var flag = false;
		var check = false;
		var passWord = "" //记录第一次输入的密码
		ranstr()

		function ranstr() {
			var ranNum = Math.floor(Math.random() * (9 - 0 + 1) + 0);
			_str = test.test[ranNum].id;
			//		console.log(test.test[ranNum].src)
			$(".phone_reg .write_pwd img")[0].src = test.test[ranNum].src;
		}
		$(".phone_reg .write_pwd a").click(ranstr)
		$(".phone_reg #phone").blur(function() {
			if ($("this").val() == "") {
				$(".phone_reg .user_sec").html("请输入正确的手机号").css("display", "block");
				flag = false;
			} else if (!/^1[34578]\d{9}$/.test($(".phone_reg #phone").val())) {
				$(".phone_reg .user_sec").css("display", "block");
				$(".phone_reg .user_sec").html("请输入正确的手机号")
				flag = false;
			} else {
				flag = true;
				$(".phone_reg .user_sec").css("display", "none");
			}
		})
		$("#phonepwd").blur(function() {
			if ($("#phonepwd").val() == "") {
				$(".phone_reg .pwd_sec").html("密码不能为空").css("display", "block");
				flag = false;
			} else if (!/((?=.*[0-9])(?=.*[A-z]))|((?=.*[A-z])(?=.*[^A-z0-9]))|((?=.*[0-9])(?=.*[^A-z0-9]))^.{6,16}$/.test($("#phonepwd").val())) {
				$(".phone_reg .pwd_sec").css("display", "block");
				$(".phone_reg .pwd_sec").html("最少六位不全为数字,字母,符号")
				flag = false;
			} else {
				flag = true;
				passWord = $("#phonepwd").val();
				//			alert(passWord.length)
				if (passWord.length == 6) {
					$(".phone_reg  .strong_1").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				} else if (passWord.length > 6 && passWord.length <= 10) {
					$(".phone_reg.strong_2").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				} else {
					$(".phone_reg .strong_3").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				}
				$(".phone_reg .pwd_sec").css("display", "none");
			}
		})
		$("#phoneagin").blur(function() {
			if ($("#phoneagin").val() == "") {
				$(".phone_reg .agin_sec").css("display", "block");
				$(".phone_reg .agin_sec").html("请重新输入密码")
				flag = false;
			} else if ($("#phoneagin").val() !== passWord) {
				$(".phone_reg .agin_sec").css("display", "block");
				$(".phone_reg .agin_sec").html("两次输入的密码不一致")
				flag = false;
			} else {
				$(".phone_reg .agin_sec").css("display", "none");
				flag = true;
			}
		})
		$("#yzm").blur(function() {
			if ($("#yzm").val() == "") {
				$(".phone_reg .yzm_sec").css("display", "block");
				$(".phone_reg .yzm_sec").html("请填写验证码")
				flag = false;
			} else if ($("#yzm").val() != _str) {
				$(".phone_reg .yzm_sec").css("display", "block");
				$(".phone_reg .yzm_sec").html("验证码输入错误")
				ranstr()
				flag = false;
			} else {
				flag = true;
				$(".phone_reg .yzm_sec").css("display", "none");
			}
		})
		$("#phonecheck").click(function() {
			check = !check;
		})
		$(".phone_reg .now_reg a").click(function() {
			if (!flag || !check) {
				alert("请正确填写以上信息并确认阅读协议");
			} else {
				var _name = $("#phone").val();
				var _pass = $("#phonepwd").val();

				//获取cookie中的用户信息
				var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
				//将字符串转为对象
				users = convertStrToObj(users);

				if (_name in users) {
					alert("用户名已经被注册");
					return;

				} else {

					//注册成功，设置用户信息的cookie
					//test1 123  test2 abc test3 888
					//"test1,123:test2,abc:test3,888"  设置cookie的value值
					//name value expires path
					//registerUsers  设置cookie的name（key)值
					//将用户添加 到已注册用户列表对象中
					users[_name] = _pass;
					//将用户信息对象转化回字符串，以便于设置cookie
					usersStr = convertObjToStr(users);
					console.log(usersStr)
						//设置用户信息cookie
					$.cookie("registerUsers", usersStr, {
						expires: 7,
						path: "/"
					});
					alert("注册成功");
					window.location.href = "login.html"
				}

				//								
			}
		})
	}

	function emailTest() {
		var num = 0;
		var _str = "";
		var flag = false;
		var check = false;
		var passWord = "" //记录第一次输入的密码
		$(".email_reg #username").blur(function() {
			if ($("this").val() == "") {
				$(".email_reg .user_sec").html("请输入正确的邮箱").css("display", "block");
				flag = false;
			} else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email_reg #username").val())) {
				$(".email_reg .user_sec").css("display", "block");
				$(".email_reg .user_sec").html("请输入正确的邮箱")
				flag = false;
			} else {
				flag = true;
				$(".email_reg .user_sec").css("display", "none");
			}
		})
		$("#pwd").blur(function() {
			if ($("#pwd").val() == "") {
				$(".email_reg .pwd_sec").html("密码不能为空").css("display", "block");
				flag = false;
			} else if (!/((?=.*[0-9])(?=.*[A-z]))|((?=.*[A-z])(?=.*[^A-z0-9]))|((?=.*[0-9])(?=.*[^A-z0-9]))^.{6,16}$/.test($("#pwd").val())) {
				$(".email_reg .pwd_sec").css("display", "block");
				$(".email_reg .pwd_sec").html("最少六位不全为数字,字母,符号")
				flag = false;
			} else {
				flag = true;
				passWord = $("#pwd").val();
				//			alert(passWord.length)
				if (passWord.length == 6) {
					$(".email_reg .strong_1").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				} else if (passWord.length > 6 && passWord.length <= 10) {
					$(".email_reg .strong_2").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				} else {
					$(".email_reg .strong_3").css("border-color", "#CD3333").siblings().css("border-color", "#666666")
				}
				$(".email_reg .pwd_sec").css("display", "none");
			}
		})
		$("#pwdagin").blur(function() {
			if ($("#pwdagin").val() == "") {
				$(".email_reg .agin_sec").css("display", "block");
				$(".email_reg .agin_sec").html("请重新输入密码")
				flag = false;
			} else if ($("#pwdagin").val() !== passWord) {
				$(".email_reg .agin_sec").css("display", "block");
				$(".email_reg .agin_sec").html("两次输入的密码不一致")
				flag = false;
			} else {
				$(".email_reg .agin_sec").css("display", "none");
				flag = true;
			}
		})

		$("#check").click(function() {
			check = !check;
		})
		$(".email_reg .now_reg a").click(function() {
			if (!flag || !check) {
				alert("请正确填写以上信息并确认阅读协议");
			} else {
				var _name = $("#username").val();
				var _pass = $("#pwd").val();

				//获取cookie中的用户信息
				var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
				//将字符串转为对象
				users = convertStrToObj(users);

				if (_name in users) {
					alert("用户名已经被注册");
					return;

				} else {

					//注册成功，设置用户信息的cookie
					//test1 123  test2 abc test3 888
					//"test1,123:test2,abc:test3,888"  设置cookie的value值
					//name value expires path
					//registerUsers  设置cookie的name（key)值
					//将用户添加 到已注册用户列表对象中
					users[_name] = _pass;
					//将用户信息对象转化回字符串，以便于设置cookie
					usersStr = convertObjToStr(users);
					//设置用户信息cookie
					$.cookie("registerUsers", usersStr, {
						expires: 7,
						path: "/"
					});
					alert("注册成功");
				}

				location.href = "login.html"
			}
		})
	}

	$(".choose_sty .icon1").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(".tab_bd").animate({
			"top": "-0px"
		}, 500)
		emailTest()

	})
	$(".choose_sty .icon2").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(".tab_bd").animate({
			"top": "-420px"
		}, 500)
		phoneTest()
	})

	function convertStrToObj(str) {
		if (!str) {
			return {};
		}
		//"test1,123:test2,abc:test3,888"

		var users = str.split(":");
		var res = {};
		for (var i = 0; i < users.length; i++) {
			var userData = users[i].split(",");
			res[userData[0]] = userData[1];
		}
		return res;
	}
	//将对象转为字符串
	function convertObjToStr(obj) {
		var res = "";
		for (var usn in obj) {
			var pwd = obj[usn];
			if (res) {
				//看是否是第一组用户名和密码信息
				//如果不是，先在前面添加一个：
				res += ":";
			}
			res += usn + "," + pwd;
		}
		return res;
	}
}