$(function() {
	btnNav()
	$(window).scroll(function() {
		if ($(window).scrollTop() >= 673) {
			$("#btn_nav").css({
				"position": "fixed",
				"left": "0",
				"top": "0",
				"z-index": "9999"
			})
		}
		if ($(window).scrollTop() <= 673) {
			$("#btn_nav").css({
				"position": "relative"
			})
		}
	})

	

})
function btnNav() {
		var _ind = $(".btnnav_top_wrap a.active").index()
		var _num = 0;
		$(".btnnav_top_wrap a").hover(function() {
			$(this).addClass("hover");

		}, function() {
			$(this).removeClass("hover");

		})

		$.ajax({
			url: "json/goods_list.json",
			success: function(date) {
				var _len = date.length
				for (var i = 0; i < _len; i++) {
					$($(".btnnav_top_wrap a")[i]).html(date[i].navbtn)
				}
			}
		});
		//加载三级菜单
		$.ajax({
			url: "json/goods_list.json",
			success: function(date) {
				//				alert(1)
				for (var j = 0; j < date.length; j++) {
					//					console.log(date[j])
					var _num = date[j].list.length
						//					alert(_num)
					for (var i = 0; i < _num; i++) {
						var _str1 = "";
						var _str2 = "";
						//						console.log(date[j].list[i].name)
						if (date[j].list[i].name == "none") {
							var _listnum = date[j].list[i].list.length;
							//							alert(_listnum)
							_str1 = "<div class='part_content'><ul class='clearfix'>"
							for (var p = 0; p < _listnum; p++) {
								_str1 += "<li><a href='javascript:;' date_id = '" + j + i + p + "'><img src = '" + date[j].list[i].list[p].src + "'><div class='in_maso_info'><a href='javascript:;' class='gray'>" + date[j].list[i].list[p].name + "</a><div class='in_price'><span class='new_p'>￥&nbsp;" + date[j].list[i].list[p].newprice + "</span><span class='old_p'>吊牌价：￥" + date[j].list[i].list[p].oldprice + "</span></div></div></li>"
							}
							_str1 += "</ul></div>"
								//							alert(_str1)
							$(".sub_show").each(function() {
								if ($(this).attr("page_num") == j) {
									$(this).append(_str1)
								}
							})
						} else {
							//							alert(date[j].list.name)
							var _listnum = date[j].list[i].list.length;
							//							alert(_listnum)
							_str1 = "<div class='part_content'><ul class='clearfix'>"
							for (var p = 0; p < _listnum; p++) {
								//								_str1+="<li><a href='javascript:;' date_id = '"+j+i+p+"'><img src = '"+date[j].list[i].list[p].src+"'></a></li>"
								_str1 += "<li><a href='javascript:;' date_id = '" + j + i + p + "'><img src = '" + date[j].list[i].list[p].src + "'><div class='in_maso_info'><a href='javascript:;' class='gray'>" + date[j].list[i].list[p].name + "</a><div class='in_price'><span class='new_p'>￥" + date[j].list[i].list[p].newprice + "</span><span class='old_p'>吊牌价￥：" + date[j].list[i].list[p].oldprice + "</span></div></div></li>"
							}
							_str1 += "</ul></div>"
							$(".sub_show").each(function() {
									if ($(this).attr("page_num") == j) {
										$(this).append(_str1)
									}
								})
								//							alert(_listnum)
							_str2 += "<a href = 'javascript:;'>" + date[j].list[i].name + "</a>"
							$(".district_sub_nav_bg").each(function() {
								if ($(this).attr("menu_page_id") == j) {
									$(this).find(".district_sub").append(_str2)
								}
							})
						}
					}
				}
				//初始化
				$(".district_sub_nav_bg").css("display", "none")
				$(".district_sub_nav_bg .district_sub a:first-child").addClass("on")
				$(".sub_show").eq(0).css("display", "block")
				$(".sub_show .part_content").eq(0).addClass("disblo")
				$(".district_sub a").click(function() {
					var _page = $(".btnnav_top_wrap a.active").attr("page_fir_num");
					$(this).addClass("on").attr("flag", "1").siblings().removeClass("on").removeAttr("flag");
					var _on = $(this).index()
						//					_num = _on
						//					alert(_num)
					$(".sub_show").eq(_page).find(".part_content").eq(_on).css("display", "block").siblings().css("display", "none")

				})
			}

		});

		$(".btnnav_top_wrap a").click(function() {
			var _index = $(this).index()
			$(window).scrollTop(673)
			$(".district_sub_nav_bg .district_sub a:first-child").addClass("on").siblings().removeClass("on")
				//			_num = 0;
				//			alert(_num)
				//			 $(".district_sub_nav_bg .district_sub").eq(_index).find("a").each(function(){
				//				if($(this).attr("flag") == 1){
				//					_num = $(this).index()
				//					alert(_num)
				//				}
				//			})
				//			alert(_on)
			$(".sub_show").eq(_index).find(".part_content").eq(0).css("display", "block").siblings().css("display", "none")
			$(this).addClass("active").siblings().removeClass("active")
			if (_index == 0) {
				$(".district_sub_nav_bg").css("display", "none")
			} else {
				$(".district_sub_nav_bg").each(function() {
					if ($(this).attr("menu_page_id") == _index) {
						$(this).css("display", "block").siblings().css("display", "none")
					}
				})
			}
			$(".sub_show").each(function() {
				if ($(this).attr("page_num") == _index) {
					$(this).css("display", "block").siblings().css("display", "none")
				}
			})

		})
	}