$(function() {
	var _id = $.cookie("goodid");
//	$.cookie('cart',"{}" ,{ expires: 7 });
	expend()
	loadGood(_id)
	lt()
	addCart(_id)
//	$("#mycar").html("")

})
//添加到购物车
function addCart(_id) {
	
	$(".add_cart").click(function() {
		var _num = parseInt($("#num").val())
		var cart_num = parseInt($("#cartnum").html())
		if ($(".sizebox").hasClass("active")) {
			//				alert($(".size_box .active span").html())
			var _size = $(".size_box .active span").html()
			
			plus(_id, _num);
			loadCookie()
			$("#container").css("display", "block")
			$(".cart_container").css("animation", "behin 0.6s ease both");
			setTimeout(function() {
				$(".cart_container").css("animation", "front 0.6s ease both");
				setTimeout(function() {
					$("#container").css("display", "none")
				}, 600)
			}, 700)

		} else {
			alert("请选择尺码")
		}	
	})
	$(".sub_num").click(function() {
		var _val = parseInt($("#num").val());
		var _num = _val - 1
		if (_num == 0) {
			_num = 1;
		}
		$("#num").val(_num)
	})
	$(".add_num").click(function() {
		var _val = Number($("#num").val());
		var _num = _val + 1
		$("#num").val(_num)
	})
}
var _flag = true

function lt() {
	$("._con_l a").click(function() {
		var _index = $(this).index()

		if (_index == 0) {
			$('body,html').animate({'scrollTop':'1900'},500) ;
		} else if (_index == 1) {
			$('body,html').animate({'scrollTop':'5205'},500) ;
		} else if (_index == 2) {
			$('body,html').animate({'scrollTop':'6700'},500) ;
		} else if (_index == 3) {
			$('body,html').animate({'scrollTop':'7150'},500) ;
		} else if (_index == 4) {
			$('body,html').animate({'scrollTop':'7361'},500) ;
		} else if (_index == 5) {
			if (_flag) {
				$(".arrow_icon").css("background-position", "0 -7px")
				$(".good_weixin").css({
					"background": "#f8f8f8",
					"border": "1px solid #d0d0d0"
				})
				$(".weixin_img").css("display", "block")
				_flag = !_flag
			} else {
				$(".arrow_icon").css("background-position", "0 0px")
				$(".good_weixin").css({
					"background": "white",
					"border": "1px solid white"
				})
				$(".weixin_img").css("display", "none")
				_flag = !_flag
			}

		}
	})
	$(window).scroll(function() {
		var _len = $(window).scrollTop()
		console.log(_len)
		if (_len >= 1500) {
			$(".lt").css("display", "block")
		} else if (_len <= 1500) {
			$(".lt").css("display", "none")
		}
	})

}

function loadGood(_id) {
	$(".sizebox").click(function() {
		var _index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active")
	})
	$.ajax({
		url: "json/gooddetail.json",
		success: function(date) {
			var _len = date[_id].src.length
			for (var i = 0; i < _len; i++) {
				var _str = "<li><a href='javascript:;'><img src ='" + date[_id].src[i] + "'/></a></li>";
				$("#thump_list").append(_str)
			}
			$("#thump_list li:first").find("a").addClass("active")

			$(".good_pic").prepend("<img class='small_pic' src='img/detail/" + _id + "_ndm_1.jpg' />")
			$(".expend").append("<img src='img/detail/" + _id + "_ndb_1.jpg'/>")
			$(".good_id").html("商品款号:" + _id)
			$(".detail_name").html(date[_id].name)
			$(".info_name_price h3").html(date[_id].name)
			$(".old_newpri strong").html(date[_id].newprice)
			$(".old_newpri .old_price").html("吊牌价：￥" + date[_id].oldprice)
			$("#thump_list li a").click(function() {
				var _index = $(this).closest("li").index() + 1;
				$(this).addClass("active");
				$("#thump_list li a").not($(this)).removeClass("active")
				$(".small_pic").attr("src", "img/detail/" + _id + "_ndm_" + _index + ".jpg");
				$(".expend img").attr("src", "img/detail/" + _id + "_ndb_" + _index + ".jpg")
			})

		}
	});
}

function expend() {

	$(".good_pic").mouseenter(function(e) {
		$(".float").css('display', "block")
		$(".expend").css('display', "block")
		$(".good_pic #zhe").mousemove(function(evt) {
			var e = evt || window.event
			var _disx = e.offsetX
			var _disy = e.offsetY
			var _l = _disx - $(".float").width() / 2;
			var _t = _disy - $(".float").height() / 2
			if (_l < 0) {
				_l = 0;
			} else if (_l > $(".good_pic").width() - $(".float").width() - 2) {
				_l = $(".good_pic").width() - $(".float").width() - 2
			}
			if (_t < 0) {
				_t = 0;
			} else if (_t > $(".good_pic").height() - $(".float").height() - 2) {
				_t = $(".good_pic").height() - $(".float").height() - 2
			}
			$(".float").css({
				"left": _l + "px",
				"top": _t + "px"
			})
			var _perx = _l / ($(".good_pic").width() - $(".float").width() - 2)
			var _pery = _t / ($(".good_pic").height() - $(".float").height() - 2)
			$(".expend img").css({
				"left": -_perx * ($(".expend img").width() - $(".expend").width()) + "px",
				"top": -_pery * ($(".expend img").height() - $(".expend").height()) + "px"
			})
		})
		$(".good_pic #zhe").mouseleave(function() {
			$(".float").css('display', "none")
			$(".expend").css('display', "none")
		})
	})
}

