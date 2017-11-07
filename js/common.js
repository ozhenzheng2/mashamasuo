$(function() {
	nav(); //头部导航栏
	//changePic() //轮播图
	//notice() //无限滚动广告
	//accor() //手风琴效果
	//recommend(); //热销推荐滚动
	//activeHot() //活动推荐
	cart();
	foot()
	loadCookie()
})

function loadCookie() {
	var _logined = $.cookie("loginedUsers")
	if (_logined) {
		$("._top_box_right").html("<a href='javascript:;'>" + _logined + "</a><i>|</i><a href='javascript:;'>我的订单</a><i>|</i><a href='javascript:;'>我的消息(0)</a><i>|</i><a class='logined_cart' href='cart.html'>购物车(<span></span>)</a><i></i><a class='tuichu' href='javascript:;'>退出</a>")

	}
	$(".tuichu").click(function() {
			$.removeCookie('loginedUsers', {
					path: '/'
				})
			window.location.reload()
		})
	var _str = ""
	var _num = 0
	var _cart = JSON.parse(getCookie("cart"));
	var _total = 0;
	$("#cart_product").html("")
	$.ajax({
		url: "json/cart.json",
		success: function(date) {
			var _len = date.length
			for (var i = 0; i < _len; i++) {
				if (_cart[date[i].id]) {
					_num = parseInt(_cart[date[i].id])
					_total += _num;
					_str = ""
					_str += "<div class='cart_product clearfix'><div class='list_pic'><a href='javascript:;'><img src='" + date[i].list.src[0] + "'/></a></div><div class='list_text'><div class='list_txt'>" + date[i].list.name + "</div><p class='id_size'>NO." + date[i].id + "</p></div><div class='list_price'><div class='price_txt'>￥" + date[i].list.newprice + "x" + _num + "</div><a class='del_the' good_id='" + date[i].id + "' href='javascript:;'>删除</a></div></div>"
					$("#cart_product").prepend(_str)
					$(".shop_btn").html("去购物车结算")

				}
			}
			$(".del_the").click(function() {
				var _goodid = $(this).attr("good_id");
				var _cart = JSON.parse(getCookie("cart"));
				var _cookie = "cart="
				delete _cart[_goodid]; //删除cookie中对应商品id的商品，并更新购物车
				_cookie += JSON.stringify(_cart); //将json转换为字符串

				document.cookie = _cookie;

				loadCookie(); //更新购物车
			})
			$("#cartnum").html(_total)
			if ($("#cart_product").html() == "") {
				$(".shop_btn").html("您还没有购买任何商品")
			}
			$("#cart_num").html($("#cartnum").html())
			$(".logined_cart span").html(_total)
		}
	});
}
//加载侧边购物车
function cart() {

	var _flag = true;
	$(".close").click(function() {
		setTimeout(function() {
			$("#container").css("display", "none")
		}, 600)
		$(".cart_container").css("animation", "front 0.6s ease both");
		_flag = true;
	})
	$(".cart").click(function() {

		if (_flag) {
			$("#container").css("display", "block")
			$(".cart_container").css("animation", "behin 0.6s ease both");
			_flag = !_flag;
		} else {

			$(".cart_container").css("animation", "front 0.6s ease both");
			setTimeout(function() {
				$("#container").css("display", "none")
			}, 600)
			_flag = !_flag;
		}

	})
	$(".back_top").click(function() {
		$('body,html').animate({'scrollTop':'0'},500) ;
	})
	$("#cart_list li").mouseenter(function() {
		var _index = $(this).index();
		var _num = 0
		$(this).css("background", "#990000")
		$(this).find(".change_color").css({
			"background": "white",
			"color": "black"
		})

		if (_index == 5) {
			_num = "-134px"
		} else if (_index == 6) {
			_num = "-137px"
		} else {
			_num = "-129px"
		}
		$(this).find(".sec").css({
			"display": "block",
			"opacity": "0.3"
		}).stop().animate({
			"opacity": "1",
			"left": _num
		}, 300)
	})
	$("#cart_list li").mouseleave(function() {
		var _index = $(this).index();
		var _num = 0
		$(this).css("background", "rgb(30,30,30)")
		$(this).find(".change_color").css({
			"background": "#990000",
			"color": "white"
		})
		if (_index == 5) {
			_num = "-151px"
		} else if (_index == 6) {
			_num = "-155px"
		} else {
			_num = "-149px"
		}
		$(this).find(".sec").stop().animate({
			"opacity": "0.3",
			"left": _num
		}, 300, function() {
			$(this).css("display", "none")
		})
	})
}

function foot() {
	$(".foot_maso_transclass").mouseenter(function() {
		$(this).find("img").addClass("exp");
		$(this).find(".foot_maso_text").css("background", "rgb(153,0,0)")
		$(this).find(".hot_title,.hot_content").css("color", "white")
	})
	$(".foot_maso_transclass").mouseleave(function() {
		$(this).find("img").removeClass("exp");
		$(this).find(".foot_maso_text").css("background", "rgba(255,255,255,0.5)")
		$(this).find(".hot_title,.hot_content").css("color", "black")
	})
}

function nav() {

	$(".info_inner").mouseenter(function() {
		$(".nav_menu").css({
			"background": "black",
		})
		$(".info_sec").css("display", "block");
		$(".info_inner_1 span").css({
			"color": "white"
		})
		$(".arrow").css("background-position", "center -9px")
	})
	$(".info_inner").mouseleave(function() {
		$(".nav_menu").css({
			"background": "white"
		})
		$(".info_inner_1 span").css({
			"color": "black"
		})
		$(".info_sec").css("display", "none");
		$(".arrow").css("background-position", "center 0px")
	})
	$(".info_inner_1 li").hover(function() {
			$(this).css({
				"background": "#333333"
			})
		}, function() {
			$(this).css("background", "transparent")
		})
		//加载头部二级菜单
	$.ajax({
		url: "json/index_sec.json",
		success: function(date) {
			for (var i = 1; i < 11; i++) {
				var _str = "goodslist" + i;
				var str = ".goodslist" + i;
				var len = date[_str].length
				for (var j = 0; j < len; j++) {
					$(str).append("<li><a href='#'>" + date[_str][j] + "</a></li>")
				}
			}
		}
	});
	$(".info_sec ul").mouseenter(function() {
		var index = $(this).index() - 1;
		$(this).css("background", "#ebebec");
		$(".info_inner_1 li").eq(index).css("background", "#333333")
	})
	$(".info_sec ul").mouseleave(function() {
		var index = $(this).index() - 1;
		$(this).css("background", "white");
		$(".info_inner_1 li").eq(index).css("background", "transparent")
	})
}

function plus(identify, num) {
	//要考虑cookie为空
	var _temp = getCookie("cart");
	if (_temp) {
		var _cart = JSON.parse(_temp);
		var _cookie = "cart={";
		if (!_cart[identify]) {
			for (var k in _cart) {
				_cookie += "\"" + k + "\":" + _cart[k] + ",";
			}
			_cookie += "\"" + identify + "\":1,";
		} else {
			for (var k in _cart) {
				if (k == identify) {
					_cookie += "\"" + k + "\":" + (_cart[k] + num) + ",";
				} else {
					_cookie += "\"" + k + "\":" + _cart[k] + ",";
				}
			}
		}
		_cookie = _cookie.substring(0, _cookie.lastIndexOf(","));
		_cookie += "}";
		document.cookie = _cookie;
	} else {
		document.cookie = "cart={\"" + identify + "\":" + num + "}";
	}
}