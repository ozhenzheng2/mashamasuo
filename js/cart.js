$(function() {
	loadCart()
	$(".exchange .gift_add").click(function() {
		$(".shopping_box").html("")
		_gift = $(this).attr("gift_id");
		plus(_gift, 1)
		loadCart()
	})
	$("#del_all").click(function(){
//		removeCookie("cart")
		document.cookie = "cart={}";
		loadCart()
	})
})
//var _gift = ""

function loadCart() {
	var _cart = JSON.parse(getCookie("cart"));
	for(var i in _cart){
		console.log(_cart[i])
		console.log(i)
	}
	//	console.log(_cart)
	var _str = JSON.stringify(_cart)
		//	console.log(typeof _str)
		//	alert(_str == "{}")
		//	var _str = ""
	if (!_cart || _str == "{}") {
		$(".shopping_box").html("")
		$(".shopping_box").css("display", "none")
		$(".login_tips").css("display", "block")
		$(".shopping_total").css("display", "none")
		$(".pay_box").css("display", "none")
		$(".exchange").css("display", "none")
			//		$(".shopping_box").attr("asd","asd32r")
	} else {
		$(".shopping_box").css("display", "block")
		$(".login_tips").css("display", "none")
		$(".shopping_total").css("display", "block")
		$(".pay_box").css("display", "block")
			//		alert($)
		$(".shopping_box").html("")
			//		$(".cart_box_has").html("");
		$.ajax({
			url: "json/cart.json",
			success: function(date) {
				var _len = date.length
				var _date_index = 0;
				$(".shopping_box").html("")
				for (var i = 0; i < _len; i++) {
					if (_cart[date[i].id]) {
						_str1 = ""
						var _total = parseInt(_cart[date[i].id]) * parseInt(date[i].list.newprice)
						_str1 = "<div date_index ='" + _date_index + "' class='cart_good clearfix'><div class='cart_code'>" + date[i].id + "</div><div class='cart_name clearfix'><div class='cart_good_img'><a href='javascript:;'><img src='" + date[i].list.src[0] + "'/></a><div class='cart_good_sec'><img src='" + date[i].list.src[0] + "'/></div></div><div class='cart_good_txt'>" + date[i].list.name + "</div></div><div class='cart_oldp'>￥<span>" + date[i].list.oldprice + "</span></div><div class='cart_newp'>￥<span>" + date[i].list.newprice + "</span></div><div class='cart_num'><div class='cart_num_addsub'><span class='sub_btn' date_index = '" + _date_index + "'><img src='img/cart/btn_minus.gif'/></span><input type='text' readonly='readonly' id='cart_good_num' value='" + _cart[date[i].id] + "' /><span class='add_btn' date_index = '" + _date_index + "'><img src='img/cart/btn_plus.gif'/></span></div></div><div class='cart_total'>￥<span>" + _total + "</span></div><div class='cart_del'><a class='del' date_id = '" + date[i].id + "' href='javascript:;'>删除</a></div></div>"
						_date_index++;
						$(".shopping_box").append(_str1)
					}
				}
				boundEvent()

			}
		})

	}
}

function boundEvent() {
	calculate()

	function calculate() {
		var _yuan = 0
		var _youhui = 0
		var _xianjia = 0;
		var _total = 0
		$(".cart_good").each(function() {
			_yuan += parseInt($(this).find(".cart_oldp span").html()) * parseInt($(this).find("#cart_good_num").val())
			_xianjia += parseInt($(this).find(".cart_newp span").html()) * parseInt($(this).find("#cart_good_num").val())
			_total += parseInt($(this).find(".cart_total span").html())
		})
		$(".original ._good_youhui").html(_yuan - _xianjia)
		$(".original ._good_oldpri").html(_yuan);
		$("._good_total").html("￥" + _total)
		if (_total >= 300) {
			$(".exchange").css("display", "block")
		} else {
			$(".exchange").css("display", "none")
		}
	}

	//	var yuan =parseInt($(".cart_oldp span").html())*parseInt($) 
	//	$("._good_oldpri").html()
	$(".sub_btn").click(function() {
		var _dateindex = $(this).attr("date_index")
		$(".cart_good").each(function() {
			if ($(this).attr("date_index") == _dateindex) {
				var _value = $(this).find(".cart_num #cart_good_num").val() - 1;
				var _onepri = parseInt($(this).find(".cart_newp span").html())
				var _good_id = $(this).find(".cart_code").html();
				if (_value < 1) {
					_value = 1
				}
				$(this).find(".cart_num #cart_good_num").val(_value)
				$(this).find(".cart_total span").html(_value * _onepri)
				subs(_good_id)
			}

		})
		calculate()
	})
	$(".add_btn").click(function() {
		var _dateindex = $(this).attr("date_index")
		$(".cart_good").each(function() {
			if ($(this).attr("date_index") == _dateindex) {
				var _value = parseInt($(this).find(".cart_num #cart_good_num").val()) + 1;
				var _onepri = parseInt($(this).find(".cart_newp span").html())
				var _good_id = $(this).find(".cart_code").html();

				$(this).find(".cart_num #cart_good_num").val(_value)
				$(this).find(".cart_total span").html(_value * _onepri)
				plus(_good_id, 1)
			}
		})
		calculate()
	})
	$(".del").click(function() {
		var _goodid = $(this).attr("date_id");
		var _cart = JSON.parse(getCookie("cart"));
		var _cookie = "cart="
		delete _cart[_goodid]; //删除cookie中对应商品id的商品，并更新购物车
		_cookie += JSON.stringify(_cart); //将json转换为字符串

		document.cookie = _cookie;
		loadCart()
		calculate()
	})
}

function subs(identify) {
	var _temp = JSON.parse(getCookie("cart"));
	console.log(_temp)
		//	var _cart = JSON.parse(_temp.split("=")[1]);
	var _cart = _temp;
	var _cookie = "cart={";
	if (!_cart[identify]) {
		for (var k in _cart) {
			_cookie += "\"" + k + "\":" + _cart[k] + ",";
		}
		_cookie += "\"" + identify + "\":1,";
	} else {
		for (var k in _cart) {
			if (k == identify) {
				if (_cart[k] == 1) {
					_cart[k] = 2;
				}
				_cookie += "\"" + k + "\":" + (_cart[k] - 1) + ",";
			} else {
				_cookie += "\"" + k + "\":" + _cart[k] + ",";
			}
		}
	}
	_cookie = _cookie.substring(0, _cookie.lastIndexOf(","));
	_cookie += "}";
	document.cookie = _cookie;
}