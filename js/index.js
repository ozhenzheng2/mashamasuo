$(function() {
	//	nav(); //头部导航栏
	changePic() //轮播图
	notice() //无限滚动广告
	accor() //手风琴效果
	recommend(); //热销推荐滚动
	activeHot() //活动推荐
		//	cart();
	$(window).scroll(function() {
		var _scroll = $(window).scrollTop();
		if (_scroll >= 150) {
			$(".head_bottom").css({
				"position": "fixed",
				"left": 0,
				"top": 0,
				"background": "black"
			})
			$(".head_nav a").css("color", "white")
		} else if (_scroll <= 150) {
			$(".head_bottom").css({
				"position": "relative",
				"left": 0,
				"top": 0,
				"background": "white"
			})
			$(".head_nav a").css("color", "#666")
		}
	})

	function activeHot() {
		$(".hot_active .maso_transclass").mouseenter(function() {
			$(this).find("img").addClass("exp");
			$(this).find("#hot_text").css("background", "rgb(153,0,0)")
			$(this).find("#hot_text .hot_title,#hot_text .hot_content").css("color", "white")
		})
		$(".hot_active .maso_transclass").mouseleave(function() {
			$(this).find("img").removeClass("exp");
			$(this).find("#hot_text").css("background", "rgba(255,255,255,0.8)")
			$(this).find("#hot_text .hot_title,#hot_text .hot_content").css("color", "black")
		})

	}

	function recommend() {
		var _indexNum = 0;
		$(".recommned_info").stop().animate({
			"left": 0
		})
		$(".recommend_li li").mouseenter(function() {
			var _index = $(this).index();
			clearInterval(_timer);
			_indexNum = _index
			$(this).addClass("on").siblings().removeClass("on")
				//						alert(_index)
			$(".recommned_info").stop().animate({
				"left": "-" + 1210 * _index + "px"
			})
		})
		$(".recommend").mouseenter(function() {
			clearInterval(_timer);
		})
		$(".recommend").mouseleave(function() {
			_timer = setInterval(recommendMove, 3000)
		})
		var _timer = setInterval(recommendMove, 3000)

		function recommendMove() {
			_indexNum++;
			if (_indexNum == 7) {
				$(".recommned_info").stop().animate({
					"left": "-" + (1210 * _indexNum) + "px"
				}).animate({
					"left": "0"
				}, 0)
				_indexNum = 0;
			} else {
				$(".recommned_info").stop().animate({
					"left": "-" + 1210 * _indexNum + "px"
				})
			}
			$(".recommend_li li").eq(_indexNum).addClass("on").siblings().removeClass("on")
		}
		var _strclone = ""
			//clothesnew
		$.ajax({
			url: "json/goods.json",
			success: function(date) {
				var _len = date["clothenew"].length
				var _str = "<ul class='clearfix'>"
				for (var i = 0; i < _len; i++) {
					_str += "<li><a href='#'><img src='img/indexImg/clothesnew_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["clothenew"][i].name + "</a><div class='price'><font>￥</font><span>" + date["clothenew"][i].price + "</span></div></div></li>"
				}
				_str += "</ul>";
				$(".recommned_info").append(_str)
				_strclone = _str//加载到最后一个，方便无缝滚动
				//陆续加载
				$.ajax({
					url: "json/goods.json",
					success: function(date) {
						var _len = date["switer"].length
						var _str = "<ul class='clearfix'>"
						for (var i = 0; i < _len; i++) {
							_str += "<li><a href='#'><img src='img/indexImg/switer_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["switer"][i].name + "</a><div class='price'><font>￥</font><span>" + date["switer"][i].price + "</span></div></div></li>"
						}
						_str += "</ul>";
						$(".recommned_info").append(_str)
							//coat
						$.ajax({
							url: "json/goods.json",
							success: function(date) {
								var _len = date["coat"].length
								var _str = "<ul class='clearfix'>"
								for (var i = 0; i < _len; i++) {
									_str += "<li><a href='#'><img src='img/indexImg/coat_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["coat"][i].name + "</a><div class='price'><font>￥</font><span>" + date["coat"][i].price + "</span></div></div></li>"
								}
								_str += "</ul>";
								$(".recommned_info").append(_str)
									//shirt
								$.ajax({
									url: "json/goods.json",
									success: function(date) {
										var _len = date["shirt"].length
										var _str = "<ul class='clearfix'>"
										for (var i = 0; i < _len; i++) {
											_str += "<li><a href='#'><img src='img/indexImg/shirt_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["shirt"][i].name + "</a><div class='price'><font>￥</font><span>" + date["shirt"][i].price + "</span></div></div></li>"
										}
										_str += "</ul>";
										$(".recommned_info").append(_str)
											//tshirt
										$.ajax({
											url: "json/goods.json",
											success: function(date) {
												var _len = date["tshirt"].length
												var _str = "<ul class='clearfix'>"
												for (var i = 0; i < _len; i++) {
													_str += "<li><a href='#'><img src='img/indexImg/tshirt_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["tshirt"][i].name + "</a><div class='price'><font>￥</font><span>" + date["tshirt"][i].price + "</span></div></div></li>"
												}
												_str += "</ul>";
												$(".recommned_info").append(_str)
													//trousers
												$.ajax({
													url: "json/goods.json",
													success: function(date) {
														var _len = date["trousers"].length
														var _str = "<ul class='clearfix'>"
														for (var i = 0; i < _len; i++) {
															_str += "<li><a href='#'><img src='img/indexImg/trousers_" + (i + 1) + ".jpg'/></a><div class='info_text'><a href='#'>" + date["trousers"][i].name + "</a><div class='price'><font>￥</font><span>" + date["trousers"][i].price + "</span></div></div></li>"
														}
														_str += "</ul>";
														$(".recommned_info").append(_str)
														$.ajax({
															url: "json/goods.json",
															success: function(date) {
																var _len = date["shoe"].length
																var _str = "<ul class='shoe clearfix'>"
																for (var i = 0; i < _len; i++) {
																	_str += "<li><a class='imga' href='javascript:;'><img src='img/indexImg/shoe_" + (i + 1) + ".jpg'/></a><div class='info_text'><a class='imgtxt' href='javascript:;'>" + date["shoe"][i].name + "</a><div class='price'><font>￥</font><span>" + date["shoe"][i].price + "</span></div></div></li>"
																}
																_str += "</ul>";
																$(".recommned_info").append(_str)
																$(".recommned_info").append(_strclone)
																$(".shoe li:first").find("a").attr("shoe_id", "20682");
																$(".shoe li").eq(1).find("a").attr("shoe_id", "15557");
																$(".shoe li a").click(function() {
																	var _id = $(this).attr("shoe_id");
																	$.cookie('goodid', _id, {
																		path: '/'
																	});
																	location.href = "gooddetail.html"
																})
															}
														});

													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});


	}

	function accor() {
		//					for(var i = 0;i<4;i++){
		$(".accor_item .accor_text").eq(0).css({
			"opacity": "0.9",
			"width": "378px",
			"height": "160px",
			"bottom": "20px",
			"right": "0px",
			"background": "rgb(240,240,240)"
		})
		$(".accor_item .accor_text").eq(2).css({
			"background": "rgb(240,240,240)"
		})
		$(".accor_small").eq(0).css("left", "-140px");
		$(".accor_small").eq(0).css("background", "url(img/indexImg/smallaccor_1.jpg)")
		$(".accor_small").eq(1).css("background", "url(img/indexImg/smallaccor_2.jpg)")
		$(".accor_small").eq(2).css("background", "url(img/indexImg/smallaccor_3.jpg)")
		$(".accor_small").eq(3).css("background", "url(img/indexImg/smallaccor_4.jpg)")
			//					}
		$(".accor_item").mouseenter(function() {
			var _index = $(this).index()
			$(this).stop().animate({
				"width": "780px"
			}, 500).siblings().stop().animate({
				"width": "140px"
			}, 500)
			$(".accor_item .accor_small").eq(_index).stop().animate({
				"left": "-140px",
				"opacity": "0"
			}, 500)
			$(".accor_item .accor_small").not($(".accor_item .accor_small").eq(_index)).stop().animate({
				"left": "0px",
				"opacity": "1"
			}, 500)
			$(".accor_item .accor_text").eq(_index).stop().animate({
				"width": "378px",
				"height": "160px",
				"bottom": "20px",
				"right": "0",
				"background": "rgb(240,240,240)",
				"opacity": "0.9"
			}, 500)
			$(".accor_item .accor_text").not($(".accor_item .accor_text").eq(_index)).stop().animate({
				"width": "140px",
				"height": "255px",
				"background": "#f9f9f9",
				"right": "0",
				"bottom": "0",
				"opacity": "1"
			})
		})
	}
	//				var _tm = setInterval(notice,1000)
	function notice() {
		$(".notice_poap").animate({
				"left": "-1843px"
			}, 50000, "linear").animate({
				"left": 0
			}, 0, function() {
				notice();
			})
	}

	function changePic() {
		var _ind = 0
		var _timer = null;
		_timer = setInterval(slider, 5000)
		$(".banner_control .control").eq(0).css("border-color", "#9b5251").append("<img src='img/indexImg/banner_" + 1 + ".jpg' style='width: 144px; height: 41px;' />")
		$(".banner_control .control").eq(1).append("<img src='img/indexImg/banner_" + 2 + ".jpg' style='width: 144px; height: 41px;' />")
		$(".banner_control .control").eq(2).append("<img src='img/indexImg/banner_" + 3 + ".jpg' style='width: 144px; height: 41px;' />")
		$(".banner_control .control").mouseenter(function() {
			clearInterval(_timer)
			var _index = $(this).index();
			if (_index != _ind) {
				$(this).css("border-color", "#9b5251").siblings().css("border-color", "white")
				_ind = _index
				$(".banner_wrap").css("opacity","0.5")
				$(".banner_wrap").css({"opacity":"0.5","background":"url(img/indexImg/banner_" + (_index + 1) + ".jpg) no-repeat 50% 0"}).animate({
					"opacity": 1
				}, 1000)
			}
		})
		$(".banner_wrap").mouseenter(function() {
			clearInterval(_timer);
		})
		$(".banner_wrap").mouseleave(function() {
			_timer = setInterval(slider, 5000)
		})

		function slider() {
			_ind++;
			if (_ind == 3) {
				_ind = 0
			}
			$(".banner_wrap").css("opacity","0.5")
			$(".banner_control .control").eq(_ind).css("border-color", "#9b5251").siblings().css("border-color", "white")
			$(".banner_wrap").css({"background": "url(img/indexImg/banner_" + (_ind + 1) + ".jpg) no-repeat 50% 0","opacity":"0.5"}).animate({
				"opacity": 1
			}, 1000)
		}
	}

})