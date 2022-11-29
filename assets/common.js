//
  window.console = {};
  window.console.log = function(i){return;};
  window.console.time = function(i){return;};
  window.console.timeEnd = function(i){return;};
//

var steen = steen || {};

/*スマホのとき*/
var sp = sp || {};

//画像遅延読み込み
window.lazySizesConfig = {
	addClasses: true
};

//imgfitを適用させる
objectFitImages('img.img-ofi');

//スマホかどうか
var isSp;


//DOMがすべて読み込まれたら
$(function() {
  try {

    /* ------------------------------------------------------------ スクロールバー */

    steen.scr = {
      init:function() {
        var w = window.innerWidth - $(window).width();
        //console.log(w);
        if(w != 0) {
          $('.grid').css({
            //safariでカラム落ちるため+1
            width:'calc(100% + '+ Number(w + 1) +'px)',
            //transform:'translateX(' + -w  + 'px)' //NG
            //marginLeft: -w //OK
            position:'relative', //OK
            left:-(Math.round(w/2))
          });
          $('.grid').wrap('<div class="grid-wapper"></div>');
          $('.grid-wapper').css({
            overflow:'hidden'
          });
        }
      }
    },

    /* ------------------------------------------------------------ ロゴのFIX処理 */

    steen.fix = {
      init:function() {
        var logo = $('.logo');
        var now = 2;
        var t1 = $('.target1');
        var t2 = $('.target2');
        var t3 = $('.target3');
        var t4 = $('.target4');
        var top;
        var t1Pos;
        var posChange;

        //初期位置
        TweenMax.set(logo, {x:500, y:-500,rotation:8});

        Pace.on('done', function() {
          //読み込みが完了し、ページのトップが表示されていたらオープニングムービー
          top = $(window).scrollTop();
          //hil = t1.offset().top + (t1.height() / 3);
          t1Pos= t1.offset().top;
          if (top <= t1Pos) {
            TweenMax.to(logo, 1.5, {delay:.5, ease:Power3.easeInOut, bezier:{curviness:2, values:[{x:t3.offset().left, y:t3.offset().top},{x:t2.offset().left, y:t2.offset().top},{x:t1.offset().left, y:t1.offset().top}]},onComplete:function() {
              logo.removeClass("start");
            }});
            TweenMax.to(logo, 1.5, {delay:.6,rotation:0, ease:Back.easeInOut.config(10)});
          }
          initFix();
        });

        if(isSp) {
          //ボタンを無効化
          $('.logo h1 a').attr('href','javascript:void(0)');
          $('.logo').on('click',function() {
            $('.logo').toggleClass('active');
            if(logo.hasClass('fixed')) {
              if(logo.hasClass('active')) {
                TweenMax.to(logo, 1, {rotation:24, ease:Back.easeOut.config(3)});
              } else {
                TweenMax.to(logo, 1, {rotation:0, ease:Back.easeOut.config(3)});
              }
            } else {
              TweenMax.fromTo(logo, .5, {scale:.85},{scale:1, ease:Back.easeOut});
            }
          });
          $('.logo nav li a').on('click',function() {
            $('.logo').removeClass('active');
            TweenMax.to(logo, 1, {rotation:0, ease:Back.easeOut.config(3)});
          });
        } else {
          //ロゴのホバー
          $('.logo').hover(function() {
            if($('.logo').hasClass('fixed')) {
              TweenMax.to('.logo', .9, {rotation:16, ease:Back.easeOut});
            }
          },function() {
            if($('.logo').hasClass('fixed')) {
              TweenMax.to('.logo', .9, {rotation:0, ease:Back.easeOut});
            }
          });
        }

        function setHeader(posChange) {
          console.log("ヘッダーにfix");
          //startとスマホ用のactiveを取っておく
          logo.removeClass('active');
          logo.removeClass("start");
          //相対、絶対のポジション変更が必要かどうか
          if(posChange) {
            //相対配置に
            logo.css('position','absolute');
            TweenMax.set(logo, {y:t4.offset().top});
            TweenMax.to(logo, 1, {ease:Power3.easeInOut, bezier:{curviness:2, values:[{x:t3.offset().left, y:t3.offset().top},{x:t2.offset().left, y:t2.offset().top},{x:t1.offset().left, y:t1.offset().top}]},onComplete:function() {
              logo.removeClass("fixed");
            }});
          } else {
            TweenMax.to(logo, .5, {ease:Power3.easeInOut, x:t1.offset().left, y:t1.offset().top ,onComplete:function() {
              logo.removeClass("fixed");
            }});
          }
          TweenMax.to('.logo-mark', .85, {opacity:1, ease:Back.easeOut, onComplete:function() {
            logo.removeClass("fixed");
          }});
          TweenMax.to('.logo-mark', .4, {delay:.5, scaleX:1, ease:Back.easeOut});
					TweenMax.to('.logo-mark', .4, {delay:.6, scaleY:1, ease:Back.easeOut});
          TweenMax.to('.logo-mark', .9, {delay:.1,rotation:0, ease:Back.easeInOut.config(1)});
          TweenMax.to('.logo', .9, {rotation:0, ease:Back.easeOut});
        };

        function setFixed(posChange) {
          console.log("ページにfix");
          //startを取っておく
          logo.removeClass("start");
          logo.addClass("fixed");

          //相対、絶対のポジション変更が必要かどうか
          if(posChange) {
            //絶対配置に
            logo.css('position','fixed');
            TweenMax.set(logo, {y:t1.offset().top - top});
            TweenMax.to(logo, 1.5, {ease:Power3.easeInOut, bezier:{curviness:2, values:[{x:t2.position().left, y:t2.position().top},{x:t3.position().left, y:t3.position().top},{x:t4.position().left, y:t4.position().top}]}});
          } else {
            TweenMax.to(logo, 1.5, {ease:Power3.easeInOut, x:t4.position().left, y:t4.position().top});
          }
          TweenMax.to('.logo-mark', .9, {delay:.5, scaleX:.7, ease:Back.easeOut});
          TweenMax.to('.logo-mark', .9, {delay:.6, scaleY:.7, ease:Back.easeOut});
          TweenMax.to('.logo', .9, {rotation:0, ease:Back.easeOut});
          var tl = new TimelineMax();
          tl.to('.logo-mark', .6, {rotation:-30, ease:Power3.easeIn}).to('.logo-mark', 1.4, {rotation:0, ease:Back.easeOut.config(1)});
        };

        function initFix() {
          var v1 = setInterval(function(){
            top = $(window).scrollTop();
            //hil = t1.offset().top + (t1.height() / 3);
            t1Pos= t1.offset().top;
            console.log(top + ' : ' + t1Pos);
            if (top >= 0) {
              if (top >= t1Pos) {
                //ロゴを過ぎたあたりから追従する
                if(now != 1) {
                  now = 1;
                  setFixed(true);
                }
              } else  {
                //ロゴをヘッダーに戻す
                if(now != 2) {
                  now = 2;
                  setHeader(true);
                }
              }
            }
	        },1000);

          if(!isSp) {
            //リサイズ処理
            var timer = false;
            $(window).resize(function() {
              if (timer !== false) {
                clearTimeout(timer);
              }
              timer = setTimeout(function() {
                if(now == 1) {
                  setFixed(false);
                } else if(now == 2) {
                  setHeader(false);
                }
              }, 200);
            });
          }
        }
      }
    },

    /* ------------------------------------------------------------ ティッカー */

    steen.ticker = {
      init:function() {
        var ticker = $('.ticker ul').slick({
          vertical: true,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 4000,
          infinite: true,
          arrows: false,
          dots: false,
          draggable: false,
          accessibility: false,
          pauseOnHover: false,
          cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        });
      }
    },

    /* ------------------------------------------------------------ シーン */

    steen.scene = {
      init:function() {
        steen.scene.start();
      },
      start:function() {
        //スライドの数
        var num = $('.scene-photo .slide').length;
        var now = Math.ceil(Math.random()*num);
        console.log(now);
        var scene = $('.scene-photo').slick({
          initialSlide:now - 1,
          autoplay:true,
          pauseOnHover:false,
          autoplaySpeed:5000,
          dots:false,
          arrows:false,
          infinite: true,
          speed:1500,
          cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        });

        $('.scene-nav li a').each(function(i) {
          $(this).click(function() {
            $('.scene-photo').slick('slickGoTo',i , false);
          });
        });

        $('.scene-photo').on('setPosition', function(slick){
          //console.log("aaa : " + now);
          //最初のスライドにクラス追加
          //クローンができるので-1しない
          $('.scene-photo .slide').eq(now).addClass('active');
          $('.scene-nav li').eq(now - 1).addClass('active');
        });

        scene.slick('setPosition');

        $('.scene-photo').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          now = nextSlide + 1;
          //console.log("bbb : " + nextSlide);
          if(nextSlide == 0) {
            $('.scene-nav li').eq(0).addClass('active');
            now = 1;
          } else {
            $('.scene-nav li').eq(now - 1).addClass('active');
          }
        });

        //移動する前にクラス消す
        $('.scene-photo').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          //console.log(nextSlide);
          for (var i=0;i<=num;i++) {
            if(i != nextSlide) {
              $('.scene-nav li').eq(i).removeClass('active');
            }
          }
        });

        //移動し終わったらクラス消す
        $('.scene-photo').on('afterChange', function(event, slick, currentSlide){
          for (var i=0;i<=num;i++) {
            //console.log(currentSlide);
            if(i != currentSlide-1) {
              $('.scene-photo .slide').eq(i).removeClass('active');
            }
          }
        });
      }
    },

    /* ------------------------------------------------------------ コンセプト */

    steen.concept = {
      init:function() {
        steen.concept.random();
        steen.concept.start();
      },
      random:function() {
        $('.concept-slider > li').sort(function() {
          return Math.round(Math.random()) - 0.5;
        }).detach().appendTo($('.concept-slider'));
      },
      start:function() {
        //スライドの数
        var concept = $('.concept-slider').slick({
          autoplay:true,
          pauseOnHover:false,
          dots:false,
          arrows:false,
          infinite: true,
          autoplaySpeed: 0,
          cssEase: 'linear',
          speed:10000,
          slidesToShow: 4,
          slidesToScroll: 1,
          swipe:false,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3
              }
            }
          ]
        });
      }
    },

    /* ------------------------------------------------------------ メニュー */

    steen.menu = {
      init:function() {
        var num = $('.menu-photo .slide').length;
        var now = 1;

        var menu = $('.menu-photo').slick({
          fade:true,
          //autoplay:true,
          pauseOnHover:true,
          autoplaySpeed:5000,
          dots:false,
          arrows:false,
          infinite: true,
          speed:1000,
          cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        });

        $('.menu-photo').on('setPosition', function(slick){
          //console.log("aaa : " + now);
          //最初のスライドにクラス追加
          //クローンができないので-1する
          $('.menu-photo .slide').eq(now - 1).addClass('active');
          $('.menu-nav li').eq(now - 1).addClass('active');
          $('.menu-text li').eq(now - 1).addClass('active');
        });

        menu.slick('setPosition');

        $('.menu-photo').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          now = nextSlide + 1;
          //console.log("bbb : " + nextSlide);
          if(nextSlide == 0) {
            $('.menu-nav li').eq(0).addClass('active');
            $('.menu-text li').eq(0).addClass('active');
            now = 1;
          } else {
            $('.menu-nav li').eq(now - 1).addClass('active');
            $('.menu-text li').eq(now - 1).addClass('active');
          }
          for (var i=0;i<=num;i++) {
            if(i != nextSlide) {
              $('.menu-nav li').eq(i).removeClass('active');
              $('.menu-photo .slide').eq(i).removeClass('active');
              $('.menu-text li').eq(i).removeClass('active');
            }
          }
        });

        $('.menu-nav li a').each(function(i) {
          $(this).click(function() {
            $('.menu-photo').slick('slickGoTo',i , false);
          });
        });
      }
    },

    /* ------------------------------------------------------------ ギャラリー */

    steen.gallery = {
      init:function() {
        var num = $('.gallery-photo .slide').length;
        var now = 1;

        var gallery = $('.gallery-photo').slick({
          //vertical:true,
          //verticalSwiping:true,
          //autoplay:true,
          pauseOnHover:true,
          autoplaySpeed:5000,
          dots:false,
          arrows:false,
          infinite: true,
          speed:1000,
          useTransform:false,
          useCSS:true,
          easing:"easeInOutQuad",
          responsive: [
            {
              breakpoint: 767,
              settings: {
                adaptiveHeight: true,
                useTransform:true
              }
            }
          ]
        });

        $('.gallery-photo').on('setPosition', function(slick){
          //console.log("aaa : " + now);
          //最初のスライドにクラス追加
          //クローンができるので-1しない
          $('.gallery-photo .slide').eq(now).addClass('active');
          $('.gallery-nav li').eq(now - 1).addClass('active');
        });

        gallery.slick('setPosition');

        $('.gallery-photo').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          now = nextSlide + 1;
          //console.log("bbb : " + nextSlide);
          if(nextSlide == 0) {
            $('.gallery-photo .slide').eq(num).addClass('active');
            $('.gallery-nav li').eq(0).addClass('active');
            now = 1;
          } else {
            $('.gallery-photo .slide').eq(now).addClass('active');
            $('.gallery-nav li').eq(now - 1).addClass('active');
          }
          for (var i=0;i<=num;i++) {
            if(i != nextSlide) {
              $('.gallery-nav li').eq(i).removeClass('active');
              $('.gallery-photo .slide').eq(i).removeClass('active');
            }
          }
        });

        $('.gallery-nav li a').each(function(i) {
          $(this).click(function() {
            $('.gallery-photo').slick('slickGoTo',i , false);
          });
        });
      }
    },

    /* ------------------------------------------------------------ アクセス */

    steen.access = {
      init:function() {
        //mapクラスが存在していたら
        if($('#gmap')[0]) {
          steen.access.map();
        }
      },
      map:function() {
        // マップオブジェクト
        var stylesArray = [{
          stylers:[{
            /*
              Saturation:-100,
              Lightness:	-10,
              Gamma:	0.6
            */
          }]
        }];
        var mapdiv = document.getElementById('gmap');
        var myOptions = {
          zoom: 15,
          center: new google.maps.LatLng(34.819456, 135.49795),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scaleControl: true
        };
        var map = new google.maps.Map(mapdiv, myOptions);
        map.setOptions({styles:stylesArray});
	      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(34.819456, 135.49795),
          map: map,
          title: ''
	      });
      }
    },

    /* ------------------------------------------------------------ 共通 */

    steen.load = {
      init:function() {
        if($('.load-ticker')[0]) {
          steen.load.ticker();
        }
        if($('.load-event')[0]) {
          steen.load.event();
        }
        if($('.load-news')[0]) {
          steen.load.news();
        }
      },
      //ティッカーが読み込めてから開始
      ticker:function() {
        $('.load-ticker').load('https://cafe-steen.com/archives/ticker/',function() {
          $('.load-ticker ul').unwrap();
          steen.ticker.init();
        });
      },
      event:function() {
        $('.load-event').load('https://cafe-steen.com/archives/event/',function() {
          $('.load-event .event').unwrap();
          steen.sns.topEventSns();
        });
      },
      news:function() {
        $('.load-news').load('https://cafe-steen.com/archives/news/',function() {
          $('.load-news .news').unwrap();
        });
      }
    },

    steen.anker = {
      init:function() {
        $('.smooth a').smoothLink({
          speed:1000,
		      easing:'easeInOutExpo',
          marginTop:0
        });
      },
      initPc:function() {
	      $('#pagetop a').smoothLink({
		      speed:150,
		      easing:'linear',
          marginTop:0
	      });
      },
      initSp:function() {
	      $('#pagetop a').smoothLink({
		      speed:150,
		      easing:'linear',
          marginTop:0
	      });
      }
    },

    steen.sns = {
      topEventSns:function() {
        if ($('.event-cate')[0]) {
          var ttl = $('.event-title h3').text();
          var url = $('.read').attr('href');
          var snsTxt = encodeURIComponent(ttl) +' '+url;
          console.log(url);
          $('.fb').attr('href','https://www.facebook.com/sharer/sharer.php?u=' + url);
          $('.tw').attr('href','https://twitter.com/intent/tweet?text=' + snsTxt);
          $('.line').attr('href','https://social-plugins.line.me/lineit/share?url=' + url);
        }
      },
      newsSns:function() {
        if ($('.news-cate')[0]) {
          var ttl = $('.news-title h3').text();
          var url = location.href;
          var snsTxt = encodeURIComponent(ttl) +' '+url;
          console.log(url);
          $('.fb').attr('href','https://www.facebook.com/sharer/sharer.php?u=' + url);
          $('.tw').attr('href','https://twitter.com/intent/tweet?text=' + snsTxt);
          $('.line').attr('href','https://social-plugins.line.me/lineit/share?url=' + url);
        }
      }
    };

    sp.address = {
      initSp:function() {
        $('#access .sns').insertAfter('.address');
        $('#access address').insertAfter('.address');
      },
      initPc:function() {
        $('#access address').appendTo('.address');
        $('#access .sns').appendTo('.address');
      }
    },
    sp.gnav = {
      init:function() {
        sp.gnav.click();
      },
      click:function() {
        $('#sp-menu a').on('click',function() {
          $(this).parent().toggleClass('action');
          $("nav").toggleClass('action');
        });
      }
    },
    sp.tel = {
      init:function() {
        $('.tel-link img').each(function () {
          var alt = $(this).attr('alt');
          $(this).wrap($('<a>').attr('href', 'tel:' + alt.replace(/-/g, '')));
        });
        $('.tel-linktext').each(function () {
          var str = $(this).text();
          $(this).addClass('sp-tel-linktext');
          $(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
        });
      }
    },
    sp.scroll = {
      init:function() {
        sp.scroll.event();
      },
      event:function() {
        var setTimeoutId = null;
        window.addEventListener("scroll", function(){
	        // setTimeoutIdの内容がある場合はキャンセル
	        if( setTimeoutId ) {
		        return false;
	        }
	        // setTimeoutイベントを実行
	        setTimeoutId = setTimeout(function() {
            sp.scroll.pagetop();
		        setTimeoutId = null ;
	        },50);
        });
      },
      pagetop:function() {
        var t = $(window).scrollTop();
        //console.log(t);
        if (t >= 1) {
          $('#pagetop').show();
        } else {
          $('#pagetop').hide();
        }
      }
    };

  } catch(e) {};
});

//画像もすべて読み込まれたら
$(window).on("load", function(){
  $.ready.then(function(){

    $(window).breakPoint({
      smartPhoneWidth: 767,
      tabletWidth: 0,
      pcMediumWidth: 1600,
      onPcEnter: function() {
        isSp = false;
        steen.scr.init();
        steen.anker.initPc();
        sp.address.initPc();
      },
      onPcLeave: function() {
      },
      onPcMediumEnter:function() {
        isSp = false;
        steen.scr.init();
        steen.anker.initPc();
        sp.address.initPc();
      },
      onSmartPhoneEnter: function() {
        isSp = true;
        steen.anker.initSp();
        sp.gnav.init();
        sp.tel.init();
        sp.scroll.init();
        sp.address.initSp();
      },
      onSmartPhoneLeave: function() {
      }
    });

    steen.load.init();
    steen.anker.init();
    steen.fix.init();
    steen.scene.init();
    steen.concept.init();
    steen.menu.init();
    steen.gallery.init();
    steen.access.init();
    steen.sns.newsSns();

  });
});
