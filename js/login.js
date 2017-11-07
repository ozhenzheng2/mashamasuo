$(function() {
	loadLog()
})

function loadLog() {
	$("#login_box").animate({
		"opacity": "1",
		"margin-right": "70px"
	}, 500);

	$("#login").click(function() {
		//获取用户输入的用户名和密码
		var usn = $("#log_username").val();
		var pwd = $("#log_password").val();

		//校验用户名和密码是否正确
		//获取到cookie中的用户信息
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
		//"test1,123:test2,abc:test3,888"
		//方法一：
		console.log(users)
		users = users.split(":");
		//["test1,123","test2,abc","test3,888"]
		for (var i = 0; i < users.length; i++) {
			var data = users[i].split(",");
			//["test1","123"]
			//["test2","abc"]
			//["test3","888"]
			if (data[0] == usn) {
				if (data[1] == pwd) {
					$.cookie("loginedUsers", usn, {
						expires: 7,
						path: "/"
					});
					window.location.href = "index.html";
					return;
				}

			}
		}
		alert("用户名或密码不匹配,请确认后重试。");


	})
}