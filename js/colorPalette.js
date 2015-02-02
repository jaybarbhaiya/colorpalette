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
    var colorSpace = $('#')
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

