$(document).load(function() {
});

$(document).ready(function(){
  $('#sequentialParameter').hide();

  disableFirst();

  $('#monotoneDelta').click(function(){
    calMonotoneDelta();
  });

  $('#qualitative').click(function() {
    chooseColorScheme();
  });

  $('#sequential').click(function() {
    chooseColorScheme();
  });

  $('#colorSpace').click(function() {
    setColorSpaceTitle();
  });

  $('#firstRGB').click(function() {
    disableFirst();
  });

  $('#firstColorSpace').click(function() {
    disableFirst();
  });

  $('#generatePalette').click(function() {
    generatePalette();
  });

  function chooseColorScheme() {
    var sequentialParameter = $('#sequentialParameter');
    if($('#qualitative').is(':checked')){
      for (var i = 0; i <= sequentialParameter.length; i++) {
        $('#sequentialParameter').hide();
      }
      $('#pieSlice').val('36');
    } else {
        for (var i = 0; i <= sequentialParameter.length; i++) {
          $('#sequentialParameter').show();
        }
        $('#pieSlice').val('10');
      }
  }

  function setColorSpaceTitle() {
    var selectedColorSpace = $('#colorSpace').val();
    if(selectedColorSpace === "HSL") {
      $('#setLabel').text("1st HSL");
    } else if (selectedColorSpace === "HCY") {
       $('#setLabel').text("1st HCY");
    } else if (selectedColorSpace === "LCh") {
       $('#setLabel').text("1st LCh");
    } else if (selectedColorSpace === "LCh99") {
       $('#setLabel').text("1st LCh99");
    }
  }

  function disableFirst() {
    if($('#firstRGB').is(':checked')) {
      setStartHeader();
      $('#startHue').attr('disabled','disabled');
      $('#startChroma').attr('disabled','disabled');
      $('#startLuma').attr('disabled','disabled');
      $('#r').removeAttr('disabled');
      $('#g').removeAttr('disabled');
      $('#b').removeAttr('disabled');
    } else if ($('#firstColorSpace').is(':checked')) {
      setStartHeader();
      $('#r').attr('disabled','disabled');
      $('#g').attr('disabled','disabled');
      $('#b').attr('disabled','disabled');
      $('#startHue').removeAttr('disabled');
      $('#startChroma').removeAttr('disabled');
      $('#startLuma').removeAttr('disabled');
    }
  }

  function setStartHeader() {
    if($('#firstRGB').is(':checked')) {
      $('#firstHeader').text("R");
      $('#secondHeader').text("G");
      $('#thirdHeader').text("B");
    } else if ($('#firstColorSpace').is(':checked')) {
      $('#firstHeader').text("h");
      $('#secondHeader').text("C/S");
      $('#thirdHeader').text("L/Y");
    }
  }

  function calMonotoneDelta() {
    var index = $('#monotoneDelta').val();
    if(index === "1/36") {
      $('#hueDelta').val(10);
    } else if(index === "1/18") {
        $('#hueDelta').val(20);
    } else if(index === "1/9") {
        $('#hueDelta').val(40);
    } else if(index === "1/8") {
        $('#hueDelta').val(45);
    } else if(index === "1/4") {
        $('#hueDelta').val(90);
    } else if(index === "3/8") {
        $('#hueDelta').val(135);
    } else if(index === "1/2") {
        $('#hueDelta').val(180);
    } else if(index === "1/12") {
        $('#hueDelta').val(30);
    } else if(index === "1/6") {
        $('#hueDelta').val(60);
    } else if(index === "1/3") {
        $('#hueDelta').val(120);
    } else if(index === "GA") {
        $('#hueDelta').val(138);
    } else if(index === "No") {
        $('#hueDelta').val(0);
    }
  }

  function generatePalette() {
    var first_h, first_s, first_l, H, S, L, i, checked;
    var piedata = [];
    var colors = [];
    var delta = new Array();
    var deltaH = new Array();
    var hueDelta = Math.round($('#hueDelta').val());
    var redInput = Math.round($('#r').val());
    var greenInput = Math.round($('#g').val());
    var blueInput = Math.round($('#b').val());
    var hue = $('#startHue');
    var saturation = $('#startChroma');
    var luma = $('#startLuma');
    var colorWhiteBG = $('#colorWhiteBG');
    var leftColumnWhiteBG = $('#leftcolumnWhiteBG');
    var rightColumnWhiteBG = $('#rightcolumnWhiteBG');
    var colorBlackBG = $('#colorBlackBG');
    var leftColumnBlackBG = $('#leftcolumnBlackBG');
    var rightColumnBlackBG = $('#rightcolumnBlackBG');
    var colorSpace = $('#colorSpace').val();
    var chromaDelta = Math.round($('#chromaDelta'));
    var chromaDeltaByHue = Math.round($('#chromaDeltaByHue'));
    var hueOfOriginalChroma = Math.round($('#hueOfOriginalChroma'));
    var alternatingChroma = Math.round($('#alternatingChroma'));
    var lumaDelta = Math.round($('#lumaDelta'));
    var lumaDeltaByHue = Math.round($('#lumaDeltaByHue'));
    var hueOfOriginalLuma = Math.round($('#hueOfOriginalLuma'));
    var alternatingLuma = Math.round($('#alternatingLuma'));
    var pieSlice = Math.round($('#pieSlice'));

    if($('#firstColorSpace').is(':checked') && hue.text() !== "" && saturation.text() !== "" && luma.text() !== "") {
      first_h = Math.round(hue);
      first_s = Math.round(saturation);
      first_l = Math.round(luma);
    } else if ($('#firstColorSpace').is(':checked')) {
      if (colorSpace === "HSL") {
        first_h = 240;
        first_s = 100;
        first_l = 50;
      } else if (colorSpace === "HCY") {
        first_h = 240;
        first_s = 100;
        first_l = 11;
      } else if (colorSpace === "LCh") {
        first_h = 306;
        first_s = 134;
        first_l = 32;
      } else if (colorSpace === "LCh99") {
        first_h = 298;
        first_s = 38;
        first_l = 44;
      }
    } else if ($('#firstRGB').is(':checked')) {
      if (colorSpace === "HSL") {
        var rInit = redInput/255;
        var gInit = greenInput/255;
        var bInit = blueInput/255;
        var M = Math.max(rInit,gInit,bInit);
        var m = Math.min(rInit,gInit,bInit);
        var C = M-m;
        first_l = (M + m) * 0.5 * 100;
        if(C===0) {
            first_s = 0;
        } else {
            first_s = C/(1 - Math.abs(2 * first_l * 0.01 - 1)) * 100;
        }
        if(rInit === gInit && rInit === bInit) {
            first_h = 0;
        } else if(M === gInit) {
            first_h = (((gInit - bInit)/C)%6) * 60;
        } else if(M === gInit) {
            first_h = (2+ ((bInit - rInit) / C)) * 60;
        } else {
            first_h = (4 + ((rInit - gInit)/C)) * 60;
        }
      } else if (colorSpace === "HCY") {
        var rInit = redInput / 255;
        var gInit = greenInput / 255;
        var bInit = blueInput / 255;
        var M = Math.max(rInit, gInit, bInit);
        var C = M - Math.min(rInit, gInit, bInit);
        first_l = (0.3 * rInit + 0.59 * gInit + 0.11 * bInit) * 100;
        first_s = C * 100;
        if (rInit === gInit && rInit === bInit) {
            first_h = 0;
        } else if (M === gInit) {
            first_h = (((gInit - bInit) / C) % 6) * 60;
        } else if (M === gInit) {
            first_h = (2 + ((bInit - rInit) / C)) * 60;
        } else {
            first_h = (4 + ((rInit - gInit) / C)) * 60;
        }
      } else if (colorSpace === "LCh") {
        var rInit = redInput * (100 / 255);
        var gInit = greenInput * (100 / 255);
        var bInit = blueInput * (100 / 255);
        var X = 0.4124564 * rInit + 0.3575761 * gInit + 0.1804375 * bInit;
        var Y = 0.2126729 * rInit + 0.7151522 * gInit + 0.072175 * bInit;
        var Z = 0.0193339 * rInit + 0.119192 * gInit + 0.9503041 * bInit;
        var Xn = X / 95.05;
        var Yn = Y / 100;
        var Zn = Z / 108.9;
        if(Xn > (216/24389)) {
            var x = Math.pow(Xn,(1/3));
        } else {
            var x = (24389/27/116) * Xn + (16/116);
        }
        if(Yn > (216/24389)) {
            var y = Math.pow(Yn,(1/3));
        } else {
            var y = (24389/27/116) * Yn + (16/116);
        }
        if(Zn > (216/24389)) {
            var z = Math.pow(Zn,(1/3));
        } else {
            var z = (24389/27/116) * Zn + (16/116);
        }
        first_l = 116 * y - 16;
        var aa = 500*(x-y);
        var bb = 200*(y-z);
        first_s = Math.sqrt((aa*aa)+(bb*bb));
        if(aa===0) {
            first_h = 0;
        }
        else {
            first_h = (Math.atan(bb/aa)*(180/Math.PI) + 180) % 360;
        }
      } else if (colorSpace === "LCh99") {
        var rInit = redInput * (100 / 255);
        var gInit = greenInput * (100 / 255);
        var bInit = blueInput * (100 / 255);
        var X = 0.4124564 * rInit + 0.3575761 * gInit + 0.1804375 * bInit;
        var Y = 0.2126729 * rInit + 0.7151522 * gInit + 0.072175 * bInit;
        var Z = 0.0193339 * rInit + 0.119192 * gInit + 0.9503041 * bInit;
        var Xn = X / 95.05;
        var Yn = Y / 100;
        var Zn = Z / 108.9;
        if(Xn > (216/24389)) {
            var x = Math.pow(Xn,(1/3));
        } else {
            var x = (24389/27/116) * Xn + (16/116);
        }
        if(Yn > (216/24389)) {
            var y = Math.pow(Yn,(1/3));
        } else {
            var y = (24389/27/116) * Yn + (16/116);
        }
        if(Zn > (216/24389)) {
            var z = Math.pow(Zn,(1/3));
        } else {
            var z = (24389/27/116) * Zn + (16/116);
        }
        var aa = 500*(x-y);
        var bb = 200*(y-z);
        var e = Math.sin(16*0.0175);
        var f = Math.cos(16*0.0175);
        var cal_e = aa*f + bb*e;
        var cal_f = 0.7*(-aa*e + bb*f);
        var G = Math.sqrt(cal_e*cal_e + cal_f*cal_f);
        var g = 0.045 * G;
        if(g===0) {
            var k=0;
        } else {
           var k = Math.log(1+g)/g;
        }
        var a99 = cal_e*k;
        var b99 = cal_f*k;
        first_l = 105.51* Math.log(1 + 0.0158 * (116 * y - 16));
        first_s = Math.sqrt(a99*a99 + b99*b99);
        if(a99===0) {
            first_h = 0;
        }
        else {
            first_h = (Math.atan(b99/a99)*(180/Math.PI) + 180) % 360;
        }
      }
    }

    var toHex = $('#toHex');
    var index = $('#index');

    var hsl_h = $('#hsl_h');
    var hsl_s = $('#hsl_s');
    var hsl_l = $('#hsl_l');

    var rgb8Header = $('#rgb8Header');
    var rgb8_r = $('#rgb8_r');
    var rgb8_g = $('#rgb8_g');
    var rgb8_b = $('#rgb8_b');

    var rgbHeader = $('#rgbHeader');
    var rgb_r = $('#rgb_r');
    var rgb_g = $('#rgb_g');
    var rgb_b = $('#rgb_b');

    var hcyHeader = $('#hcyHeader');
    var hcy_h = $('#hcy_h');
    var hcy_c = $('#hcy_c');
    var hcy_y = $('#hcy_y');

    var labHeader = $('#labHeader');
    var lab_l = $('#lab_l');
    var lab_a = $('#lab_a');
    var lab_b = $('#lab_b');

    var lchABHeader = $('#lchABHeader');
    var lchAB_l = $('#lchAB_l');
    var lchAB_c = $('#lchAB_c');
    var lchAB_h = $('#lchAB_h');

    var lch99Header = $('#lch99Header');
    var lch99_l = $('#lch99_l');
    var lch99_c = $('#lch99_c');
    var lch99_h = $('#lch99_h');

    var luvHeader = $('#luvHeader');
    var luv_l = $('#luv_l');
    var luv_u = $('#luv_u');
    var luv_v = $('#luv_v');

    var lchUVHeader = $('#lchUVHeader');
    var lchUV_l = $('#lchUV_l');
    var lchUV_c = $('#lchUV_c');
    var lchUV_h = $('#lchUV_h');

    var lmsHeader = $('#lmsHeader');
    var lms_l = $('#lms_l');
    var lms_m = $('#lms_m');
    var lms_s = $('#lms_s');

    toHex.text("Hex");
    index.text("Index");

    hsl_h.text("H");
    hsl_s.text("C/S");
    hsl_l.text("L");

    rgb8Header.text("RGB8");
    rgb8_r.text("R8");
    rgb8_g.text("G8");
    rgb8_b.text("B8");

    rgbHeader.text("RGB");
    rgb_r.text("R");
    rgb_g.text("G");
    rgb_b.text("B");

    hcyHeader.text("HCY");
    hcy_h.text("H");
    hcy_c.text("C");
    hcy_y.text("Y");

    labHeader.text("LAB");
    lab_l.text("L");
    lab_a.text("A");
    lab_b.text("B");

    lchABHeader.text("LCh(ab)");
    lchAB_l.text("L");
    lchAB_c.text("C");
    lchAB_h.text("h");

    lch99Header.text("LCh99");
    lch99_l.text("L99");
    lch99_c.text("C99");
    lch99_h.text("h99");

    luvHeader.text("LUV");
    luv_l.text("L");
    luv_u.text("U");
    luv_v.text("V");

    lchUVHeader.text("LCh(uv)");
    lchUV_l.text("L");
    lchUV_c.text("C");
    lchUV_h.text("h");

    lmsHeader.text("LMS");
    lms_l.text("L");
    lms_m.text("M");
    lms_s.text("S");
  }

  function toHex(n) {
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
  }

  function RGBtoXYZ(R, G, B) {
    var var_R = R * (100/255);
    var var_G = G * (100/255);
    var var_B = B * (100/255);

    //Observer. = 2°, Illuminant = D65
    var X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
    var Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
    var Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;
    return [X, Y, Z];
  }

  function XYZtoLMS(X,Y,Z) {
    var L = Math.round(0.7328 * X + (-0.7036) * Y + 0.0030 * Z);
    var M = Math.round(0.4296 * X + 1.6975 * Y + 0.0136 * Z);
    var S = Math.round((-0.1624) * X + 0.0061 * Y + 0.9834 * Z);
    return [L, M, S];
  }

  function XYZtoLAB(x, y, z){
    var ref_X =  95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var_X = x / ref_X;          //ref_X =  95.047   Observer= 2°, Illuminant= D65
    var_Y = y / ref_Y ;         //ref_Y = 100.000
    var_Z = z / ref_Z  ;        //ref_Z = 108.883

    if ( var_X > 0.008856 ) var_X = Math.pow(var_X , ( 1/3 ));
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 );
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, ( 1/3 ));
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
    if ( var_Z > 0.008856 ) var_Z = Math.pow(var_Z, ( 1/3 ));
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );

    CIE_L = ( 116 * var_Y ) - 16;
    CIE_a = 500 * ( var_X - var_Y );
    CIE_b = 200 * ( var_Y - var_Z );

    return [Math.round(CIE_L), Math.round(CIE_a), Math.round(CIE_b)];
  }

  function XYZtoLUV(X,Y,Z) {
    var var_U = ( 4 * X ) / ( X + ( 15 * Y ) + ( 3 * Z ) );
    var var_V = ( 9 * Y ) / ( X + ( 15 * Y ) + ( 3 * Z ) );

    var var_Y = Y / 100;
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y,(1/3));
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );

    var ref_X =  95.047;        //Observer= 2°, Illuminant= D65
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var ref_U = ( 4 * ref_X ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );
    var ref_V = ( 9 * ref_Y ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );

    var luv_l = ( 116 * var_Y ) - 16;
    var luv_u = 13 * luv_l * ( var_U - ref_U );
    var luv_v = 13 * luv_l * ( var_V - ref_V );
    return [Math.round(luv_l),Math.round(luv_u),Math.round(luv_v)];
  }

  function LUVtoLCHuv(l,u,v) {
    var grad = 57.296;
    var L = l;
    var C = Math.sqrt(Math.pow(u,2) + Math.pow(v,2));
    var H = 0;
    if(u===0) {
      H = 0;
    } else {
      if(u<0) {
        H = (Math.atan(v/u) * grad + 180) % 360;
      } else {
        H = (Math.atan(v/u) * grad + 180 * u) % 360;
      }
    }
    return [Math.round(L),Math.round(C),Math.round(H)];
  }

  function LABtoLCHab(l,a,b) {
    var grad = 57.296;
    var L = l;
    var C = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    var H = 0;
    if(a===0) {
      H = 0;
    } else {
      if(a<0) {
        H = (Math.atan(b/a) * grad + 180) % 360;
      } else {
        H = (Math.atan(b/a) * grad + 180 * a) % 360;
      }
    }
    return [Math.round(L),Math.round(C),Math.round(H)];
  }

  function RGBtoHCY(h,r,g,b) {
    var rr = r * (100/255);
    var gg = g * (100/255);
    var bb = b * (100/255);
    var m = Math.min(rr,gg,bb);
    var M = Math.max(rr,gg,bb);
    if(rr === gg && rr === bb) {
      var H = 0;
    } else if(M === rr) {
      var H = (((gg-bb)/(M-m)) % 6) * 60;
    } else if(M === gg) {
      var H = (2 + (bb-rr)/(M-m)) * 60;
    } else {
      var H = (4 + (rr-gg)/(M-m)) * 60;
    }
    var C = M - m;
    var Y = 0.3*rr + 0.59*gg + 0.11*bb;
    return [Math.round(H),Math.round(C),Math.round(Y)];
  }

  function RGB8forHSL(H, S, L) {
    var C, X, m, rr, gg, bb, r8, g8, b8;
    C = (1 - Math.abs(2 * L * 0.01 - 1)) * S * 0.01;
    X = C * (1 - Math.abs(((H / 60) % 2) - 1));
    m = L * 0.01 - C * 0.5;
    if (H < 60) {
        rr = C + m;
        gg = X + m;
        bb = 0 + m;
    } else if (H >= 60 && H < 120) {
        rr = X + m;
        gg = C + m;
        bb = 0 + m;
    } else if (H >= 120 && H < 180) {
        rr = 0 + m;
        gg = C + m;
        bb = X + m;
    } else if (H >= 180 && H < 240) {
        rr = 0 + m;
        gg = X + m;
        bb = C + m;
    } else if (H >= 240 && H < 300) {
        rr = X + m;
        gg = 0 + m;
        bb = C + m;
    } else {
        rr = C + m;
        gg = 0 + m;
        bb = X + m;
    }
    r8 = rr * 255;
    g8 = gg * 255;
    b8 = bb * 255;
    return [Math.min(255, Math.max(0,Math.round(r8))), Math.min(255, Math.max(0, Math.round(g8))), Math.min(255, Math.max(0, Math.round(b8)))];
  }

  function RGB8forHCY(H, S, L) {
    var C, X, m, r, g, b, rr, gg, bb, r8, g8, b8;
    C = S * 0.01;
    X = C * (1 - Math.abs(((H / 60) % 2) - 1));
    if (H < 60) {
        rr = C;
        gg = X;
        bb = 0;
    } else if (H >= 60 && H < 120) {
        rr = X;
        gg = C;
        bb = 0;
    } else if (H >= 120 && H < 180) {
        rr = 0;
        gg = C;
        bb = X;
    } else if (H >= 180 && H < 240) {
        rr = 0;
        gg = X;
        bb = C;
    } else if (H >= 240 && H < 300) {
        rr = X;
        gg = 0;
        bb = C;
    } else {
        rr = C;
        gg = 0;
        bb = X;
    }
    m = L * 0.01 - (0.3 * rr + 0.59 * gg + 0.11 * bb);
    r = rr + m;
    g = gg + m;
    b = bb + m;
    r8 = r * 255;
    g8 = g * 255;
    b8 = b * 255;
    return [Math.min(255, Math.max(0,Math.round(r8))), Math.min(255, Math.max(0, Math.round(g8))), Math.min(255, Math.max(0, Math.round(b8)))];
  }

  function RGB8forLCh(H, S, L) {
    var l = L;
    var a = S * Math.cos(H * 0.0175);
    var b = S * Math.sin(H * 0.0175);
    var ll = (l + 16) / 116;
    var X = 95.05 * Math.pow(ll + a / 500, 3);
    var Y = 100 * Math.pow(ll, 3);
    var Z = 108.9 * Math.pow(ll - b / 200, 3);
    var rr = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
    var gg = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z;
    var bb = 0.0556434 * X - 0.2040259 * Y + 1.057 * Z;
    var r8 = rr * 2.55;
    var g8 = gg * 2.55;
    var b8 = bb * 2.55;
    return [Math.min(255, Math.max(0,Math.round(r8))), Math.min(255, Math.max(0, Math.round(g8))), Math.min(255, Math.max(0, Math.round(b8)))];
  }

  function RGB8forLCh99(H, S, L) {
    var l = L;
    var c = S;
    var h = H;
    var a = c * Math.cos(h * 0.0175);
    var b = c * Math.sin(h * 0.0175);
    var cc = Math.sqrt(a * a + b * b);
    var g = (Math.exp(0.045 * cc) - 1) / 0.045;
    var e = g * Math.cos(h * 0.0175);
    var f = g * Math.sin(h * 0.0175);
    var labl = (Math.exp(l / 105.51) - 1) / 0.0158;
    var laba = e * (Math.cos(16 * 0.0175)) - f / 0.7 * (Math.sin(16 * 0.0175));
    var labb = e * (Math.sin(16 * 0.0175)) + f / 0.7 * (Math.cos(16 * 0.0175));
    var ll = (labl + 16) / 116;
    var X = 95.05 * Math.pow(ll + laba / 500, 3);
    var Y = 100 * Math.pow(ll, 3);
    var Z = 108.9 * Math.pow(ll - labb / 200, 3);
    var rr = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
    var gg = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z;
    var bb = 0.0556434 * X - 0.2040259 * Y + 1.057 * Z;
    var r8 = rr * 2.55;
    var g8 = gg * 2.55;
    var b8 = bb * 2.55;
    return [Math.min(255, Math.max(0,Math.round(r8))), Math.min(255, Math.max(0, Math.round(g8))), Math.min(255, Math.max(0, Math.round(b8)))];
  }
});
