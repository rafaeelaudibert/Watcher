(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['championCard'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"card col "
    + alias4(((helper = (helper = helpers.cardColor || (depth0 != null ? depth0.cardColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardColor","hash":{},"data":data}) : helper)))
    + "\">\r\n  <div class=\"card-image waves-effect waves-block waves-light card-ownimage\"> <!-- CardImage -->\r\n    <img class=\"activator\" src=\""
    + alias4(((helper = (helper = helpers.championImage || (depth0 != null ? depth0.championImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championImage","hash":{},"data":data}) : helper)))
    + "\">\r\n  </div>\r\n  <div class=\"card-content\"> <!-- CardContent -->\r\n    <div class=\"row\"> <!-- CardTitle -->\r\n      <span class=\"card-title grey-text text-darken-4\">\r\n        <div class=\"col s8 padding-0\"><strong>"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + "</strong></div>\r\n        <div class=\"col s2 padding-0\"><img class=\"mastery-img tooltipped\" src=\"assets/champmastery/"
    + alias4(((helper = (helper = helpers.championMasteryImage || (depth0 != null ? depth0.championMasteryImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championMasteryImage","hash":{},"data":data}) : helper)))
    + ".png\" data-position=\"top\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.championMasteryPoints || (depth0 != null ? depth0.championMasteryPoints : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championMasteryPoints","hash":{},"data":data}) : helper)))
    + " points\"></div>\r\n      </span>\r\n    </div>\r\n    <div class=\"row\"> <!-- PersonIfo -->\r\n      <div class=\"col s6 padding-0\"><span>"
    + alias4(((helper = (helper = helpers.summonerName || (depth0 != null ? depth0.summonerName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerName","hash":{},"data":data}) : helper)))
    + "<br>"
    + alias4(((helper = (helper = helpers.summonerElo || (depth0 != null ? depth0.summonerElo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerElo","hash":{},"data":data}) : helper)))
    + "</span></div>\r\n      <div class=\"col s2 offset-s2 padding-0\"><img class=\"elo-img tooltipped\" src=\"assets/elos/"
    + alias4(((helper = (helper = helpers.eloImage || (depth0 != null ? depth0.eloImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"eloImage","hash":{},"data":data}) : helper)))
    + ".png\" data-position=\"bottom\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.pdl || (depth0 != null ? depth0.pdl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pdl","hash":{},"data":data}) : helper)))
    + " LP\"></div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card-reveal overflow-hidden "
    + alias4(((helper = (helper = helpers.cardColor || (depth0 != null ? depth0.cardColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardColor","hash":{},"data":data}) : helper)))
    + "\"> <!-- CardReveal -->\r\n    <div class=\"row margin-right-0\"> <!-- RevealTitle -->\r\n      <div class=\"col s11 offset-s1 padding-0\"><span class=\"card-title grey-text text-darken-4\">"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + "<i class=\"material-icons right\">close</i></span></div>\r\n    </div>\r\n    <div class=\"row margin-right-0\"> <!-- RevealContent -->\r\n       <!-- Runes -->\r\n      <div class=\"col s1 padding-0\" style=\"padding-left: 0.3rem !important\">\r\n        <img class=\"keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["0"] : stack1), depth0))
    + ".png\">\r\n      </div>\r\n      <div class=\"col s10 offset-s2 padding-0\">\r\n        <img class=\"non-keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["1"] : stack1), depth0))
    + ".png\">\r\n        <img class=\"non-keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["2"] : stack1), depth0))
    + ".png\">\r\n        <img class=\"non-keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["3"] : stack1), depth0))
    + ".png\">\r\n      </div>\r\n      <div class=\"col s6 offset-s3 padding-0\" style=\"padding-left: 0.2rem !important\">\r\n        <img class=\"non-keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["4"] : stack1), depth0))
    + ".png\">\r\n        <img class=\"non-keystone\" src=\"assets/runes/perk/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.runes : depth0)) != null ? stack1["5"] : stack1), depth0))
    + ".png\">\r\n      </div>\r\n    </div>\r\n    <div class=\"row white-text statistic-row\">\r\n      <div class=\"col s5 padding-0 outerspace-transparent z-depth-3 statistic-col\">\r\n        <strong style=\"font-size: 14px !important\">"
    + alias4(((helper = (helper = helpers.championWinrate || (depth0 != null ? depth0.championWinrate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championWinrate","hash":{},"data":data}) : helper)))
    + "</strong> WinRate<br>"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + "<br>"
    + alias4(((helper = (helper = helpers.championWinLost || (depth0 != null ? depth0.championWinLost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championWinLost","hash":{},"data":data}) : helper)))
    + "\r\n      </div>\r\n      <div class=\"col s5 offset-s2 padding-0 outerspace-transparent z-depth-3 statistic-col\">\r\n        <strong style=\"font-size: 14px !important\">"
    + alias4(((helper = (helper = helpers.rankedWinrate || (depth0 != null ? depth0.rankedWinrate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rankedWinrate","hash":{},"data":data}) : helper)))
    + "</strong> WinRate<br>@ Ranked<br>"
    + alias4(((helper = (helper = helpers.rankedWinLost || (depth0 != null ? depth0.rankedWinLost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rankedWinLost","hash":{},"data":data}) : helper)))
    + "\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div> <!-- End Cartão !-->\r\n";
},"useData":true});
templates['fullFile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "    "
    + ((stack1 = ((helper = (helper = helpers.championCard || (depth0 != null ? depth0.championCard : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"championCard","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<nav style=\"-webkit-app-region: drag\">\r\n  <div class=\"nav-wrapper rich-black\">\r\n    <a class=\"brand-logo right\" id=\"logo\" style=\"margin-right: 1rem\">LiveTracker App</a>\r\n  </div>\r\n</nav>\r\n\r\n<div class=\"container\">\r\n\r\n  "
    + ((stack1 = ((helper = (helper = helpers.topRow || (depth0 != null ? depth0.topRow : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"topRow","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n  <div id=\"team-1\" class=\"row\"> <!-- Time 1 !-->\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.team1 : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n  <div id=\"team-2\" class=\"row\"> <!-- Time 1 !-->\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.team2 : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n  <!-- Botão no canto inferior esquerdo !-->\r\n  <!--<div class=\"fixed-action-btn horizontal\">\r\n    <a class=\"btn-floating btn-large outerspace\">\r\n      <i class=\"large material-icons\">mode_edit</i>\r\n    </a>\r\n    <ul>\r\n      <li><a class=\"btn-floating red\"><i class=\"material-icons\">insert_chart</i></a></li>\r\n      <li><a class=\"btn-floating yellow darken-1\"><i class=\"material-icons\">format_quote</i></a></li>\r\n      <li><a class=\"btn-floating green\"><i class=\"material-icons\">publish</i></a></li>\r\n      <li><a class=\"btn-floating blue\"><i class=\"material-icons\">attach_file</i></a></li>\r\n    </ul>\r\n  </div>-->\r\n\r\n  "
    + ((stack1 = ((helper = (helper = helpers.sidebar || (depth0 != null ? depth0.sidebar : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sidebar","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n  <!-- MODAL STRUCTURES -->\r\n\r\n  <!-- SearchModal -->\r\n  "
    + ((stack1 = ((helper = (helper = helpers.searchModal || (depth0 != null ? depth0.searchModal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"searchModal","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n  <!-- ProfileModal -->\r\n  "
    + ((stack1 = ((helper = (helper = helpers.profileModal || (depth0 != null ? depth0.profileModal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileModal","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n  <!-- SettingsModal -->\r\n  "
    + ((stack1 = ((helper = (helper = helpers.settingsModal || (depth0 != null ? depth0.settingsModal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"settingsModal","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n</div>\r\n";
},"useData":true});
templates['profileModal'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <span class=\"flow-text\">Mastery 7</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m7 : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/7.png\">\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 6</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m6 : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 5</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m5 : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/5.png\">\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 4</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m4 : stack1),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/4.png\">\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 3</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m3 : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/3.png\">\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 2</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m2 : stack1),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/2.png\">\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <br><span class=\"flow-text\">Mastery 1</span><br>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m1 : stack1),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/champion/"
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + ".png\">\r\n            <img class=\"profile-mastery-img\" src=\"assets/champmastery/1.png\">\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id=\"profile-modal\" class=\"modal modal-fixed-footer rich-black outerspace-lighten-text profile-modal center-align\">\r\n  <div class=\"modal-content profile-modal-content modal-background left-align\">\r\n    <h3 style=\"margin-bottom: 0rem\"><strong>PROFILE</strong></h3><br>\r\n\r\n    <!-- Profile Information -->\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m3 profile-inner center-align\">\r\n        <img class=\"circle responsive-img perfil-icon\" src=\"http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2077.png\"><br>\r\n        <span class=\"center-align\"style=\"font-size: 2.5rem\">TyG Yeux</span>\r\n        <img src=\"assets/profile/belownick/master.png\" style=\"max-width: 100%\" alt=\"\">\r\n        <span style=\"font-size: 1.5rem\">Level 50</span>\r\n      </div>\r\n      <div class=\"col s12 m3 profile-inner profile-runes center-align\">\r\n        <span class=\"flow-text\">Solo/Duo 5x5</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\"Gold V<br>Mensageiros de Lucian<br>15LP\" src=\"assets/elos/diamond/1.png\">\r\n        <br><span class=\"flow-text\">Flex 5x5</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\"Gold V<br>Mensageiros de Lucian<br>15LP\" src=\"assets/elos/diamond/2.png\">\r\n        <br><span class=\"flow-text\">Flex 3x3</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\"Gold V<br>Mensageiros de Lucian<br>15LP\" src=\"assets/elos/diamond/3.png\">\r\n      </div>\r\n      <div class=\"col s12 m5 profile-inner profile-mastery left-align\">\r\n        <span class=\"flow-text\">Mastery 7</span><br>\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/7.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/7.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/7.png\">\r\n        <br><span class=\"flow-text\">Mastery 6</span><br>\r\n        <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\"I am a tooltip\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <img class=\"circle responsive-img tooltipped\" data-position=\"bottom\" data-delay=\"0\" data-tooltip=\"I am a tooltip\" data-background-color=\"red lighten-3\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"profile-mastery-img\" src=\"assets/champmastery/6.png\">\r\n        <br><span class=\"flow-text\">Mastery 5</span><br>\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n        <img class=\"circle responsive-img\" style=\"max-height: 4rem\" src=\"http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/TwistedFate.png\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"modal-footer rich-black\">\r\n    <a href=\"#!\" class=\"modal-action modal-close waves-effect waves-blue outerspace white-text btn\">Close</a>\r\n    <!-- Need to change it dinamically to Apply if something has changed-->\r\n  </div>\r\n</div>\r\n\r\n<div id=\"profile-modal\" class=\"modal modal-fixed-footer rich-black outerspace-lighten-text profile-modal center-align\">\r\n  <div class=\"modal-content profile-modal-content modal-background left-align\">\r\n    <h3 style=\"margin-bottom: 0rem\"><strong>PROFILE</strong></h3><br>\r\n\r\n    <!-- Profile Information -->\r\n    <div class=\"row\" style=\"margin-top: 0.4rem\">\r\n      <div class=\"col s12 m3 profile-inner center-align\">\r\n        <img class=\"circle responsive-img perfil-icon\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/profileicon/"
    + alias4(((helper = (helper = helpers.summonerIcon || (depth0 != null ? depth0.summonerIcon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerIcon","hash":{},"data":data}) : helper)))
    + ".png\">\r\n        <span class=\"center-align\" style=\"font-size: 2.5rem\">"
    + alias4(((helper = (helper = helpers.summonerName || (depth0 != null ? depth0.summonerName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerName","hash":{},"data":data}) : helper)))
    + "</span><br>\r\n        <img src=\"assets/profile/belownick/"
    + alias4(((helper = (helper = helpers.higherElo || (depth0 != null ? depth0.higherElo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"higherElo","hash":{},"data":data}) : helper)))
    + ".png\" style=\"max-width: 100%\" alt=\"\">\r\n        <span style=\"font-size: 1.5rem\">Level "
    + alias4(((helper = (helper = helpers.summonerLevel || (depth0 != null ? depth0.summonerLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerLevel","hash":{},"data":data}) : helper)))
    + "</span>\r\n      </div>\r\n      <div class=\"col s12 m3 profile-inner profile-runes center-align\">\r\n        <span class=\"flow-text\">Solo/Duo 5x5</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.soloDuo : stack1)) != null ? stack1.elo : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.soloDuo : stack1)) != null ? stack1.league : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.soloDuo : stack1)) != null ? stack1.pdl : stack1), depth0))
    + "LP\" src=\"assets/elos/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.elo : depth0)) != null ? stack1.soloDuo : stack1), depth0))
    + ".png\">\r\n        <br><span class=\"flow-text\">Flex 5x5</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.flex : stack1)) != null ? stack1.elo : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.flex : stack1)) != null ? stack1.league : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.flex : stack1)) != null ? stack1.pdl : stack1), depth0))
    + "LP\" src=\"assets/elos/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.elo : depth0)) != null ? stack1.Flex : stack1), depth0))
    + ".png\">\r\n        <br><span class=\"flow-text\">Flex 3x3</span><br>\r\n        <img class=\"profile-runes-images tooltipped\" data-position=\"right\" data-delay=\"100\" data-tooltip=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.tt : stack1)) != null ? stack1.elo : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.tt : stack1)) != null ? stack1.league : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.eloRaw : depth0)) != null ? stack1.tt : stack1)) != null ? stack1.pdl : stack1), depth0))
    + "LP\" src=\"assets/elos/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.elo : depth0)) != null ? stack1.tt : stack1), depth0))
    + ".png\">\r\n      </div>\r\n      <div class=\"col s12 m5 profile-inner profile-mastery left-align\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m7 : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m6 : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m5 : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m4 : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m3 : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m2 : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.mastery : depth0)) != null ? stack1.m1 : stack1),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"modal-footer rich-black\">\r\n    <a href=\"#!\" class=\"modal-action modal-close waves-effect waves-blue outerspace white-text btn\">Close</a>\r\n    <!-- Need to change it dinamically to Apply if something has changed-->\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['searchModal'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"search-modal\" class=\"modal modal-fixed-footer rich-black outerspace-lighten-text search-modal\">\r\n  <div class=\"modal-content modal-owncontent modal-background\">\r\n    <h3><strong>NEW SUMMONER SEARCH</strong></h3>\r\n\r\n    <!-- Search Information -->\r\n    <div class=\"row\" style=\"margin-top: 1rem\">\r\n      <form id=\"searchForm\">\r\n        <div class=\"input-field col s8\">\r\n          <i class=\"material-icons prefix\">account_circle</i>\r\n          <input id=\"summoner_name\" type=\"text\">\r\n          <label for=\"search_summoner_name\">Summoner Name</label>\r\n        </div>\r\n\r\n        <div class=\"input-field col s3\" style=\"margin-left: 2rem\">\r\n          <select class=\"icons\" size=\"2\" id=\"search_server\">\r\n            <option value=\"\" disabled selected>Your region</option>\r\n            <option value=\"br\" data-icon=\"assets/servers/brazil.png\" class=\"circle\">BR</option>\r\n            <option value=\"eune\" data-icon=\"assets/servers/eune.png\" class=\"circle\">EUNE</option>\r\n            <option value=\"euw\" data-icon=\"assets/servers/euw.png\" class=\"circle\">EUW</option>\r\n            <option value=\"jp\" data-icon=\"assets/servers/japan.png\" class=\"circle\">JP</option>\r\n            <option value=\"kr\" data-icon=\"assets/servers/korea.png\" class=\"circle\">KR</option>\r\n            <option value=\"lan\" data-icon=\"assets/servers/lan.png\" class=\"circle\">LAN</option>\r\n            <option value=\"las\" data-icon=\"assets/servers/las.png\" class=\"circle\">LAS</option>\r\n            <option value=\"na\" data-icon=\"assets/servers/na.png\" class=\"circle\">NA</option>\r\n            <option value=\"oce\" data-icon=\"assets/servers/oceania.png\" class=\"circle\">OCE</option>\r\n            <option value=\"ru\" data-icon=\"assets/servers/russia.png\" class=\"circle\">RU</option>\r\n            <option value=\"tr\" data-icon=\"assets/servers/turkey.png\" class=\"circle\">TR</option>\r\n          </select>\r\n          <label>Region</label>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n  <div class=\"modal-footer rich-black\">\r\n    <a id = \"search-modal-close\" href=\"#!\" class=\"modal-action waves-effect waves-blue outerspace white-text btn\">Search</a>\r\n    <a  href=\"#!\" class=\"modal-action modal-close waves-effect waves-blue outerspace white-text btn\" style=\"margin-right: 0.8rem\">Close</a>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['settingsModal'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"settings-modal\" class=\"modal modal-fixed-footer rich-black outerspace-lighten-text settings-modal\">\r\n  <div id=\"settings-modal-content\" class=\"modal-content modal-owncontent modal-background\">\r\n    <h3><strong>SETTINGS</strong></h3>\r\n\r\n    <!-- Default Information -->\r\n    <div class=\"row\" style=\"margin-top: 1rem\">\r\n      <span class=\"flow-text\">Default Values<br></span>\r\n      <form id=\"stg-form1\">\r\n        <div class=\"input-field col s8\">\r\n          <i class=\"material-icons prefix\">account_circle</i>\r\n          <input id=\"settings_summoner_name\" type=\"text\">\r\n          <label for=\"settings_summoner_name\" class=\"\">Default Summoner Name</label>\r\n        </div>\r\n\r\n        <div class=\"input-field col s3\" style=\"margin-left: 2rem\">\r\n          <i class=\"material-icons prefix\">home</i>\r\n          <select class=\"icons\" size=\"2\" id=\"settings_server\">\r\n            <option value=\"\" disabled selected>Your region</option>\r\n            <option value=\"br\" data-icon=\"assets/servers/brazil.png\" class=\"circle\">BR</option>\r\n            <option value=\"eune\" data-icon=\"assets/servers/eune.png\" class=\"circle\">EUNE</option>\r\n            <option value=\"euw\" data-icon=\"assets/servers/euw.png\" class=\"circle\">EUW</option>\r\n            <option value=\"jp\" data-icon=\"assets/servers/japan.png\" class=\"circle\">JP</option>\r\n            <option value=\"kr\" data-icon=\"assets/servers/korea.png\" class=\"circle\">KR</option>\r\n            <option value=\"lan\" data-icon=\"assets/servers/lan.png\" class=\"circle\">LAN</option>\r\n            <option value=\"las\" data-icon=\"assets/servers/las.png\" class=\"circle\">LAS</option>\r\n            <option value=\"na\" data-icon=\"assets/servers/na.png\" class=\"circle\">NA</option>\r\n            <option value=\"oce\" data-icon=\"assets/servers/oceania.png\" class=\"circle\">OCE</option>\r\n            <option value=\"ru\" data-icon=\"assets/servers/russia.png\" class=\"circle\">RU</option>\r\n            <option value=\"tk\" data-icon=\"assets/servers/turkey.png\" class=\"circle\">TK</option>\r\n          </select>\r\n          <label>Region</label>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"class s8\">\r\n        <form id=\"stg-form2\">\r\n          <div class=\"input-field col s8\">\r\n            <i class=\"material-icons prefix\">flag</i>\r\n            <select class=\"icons\" size=\"2\" id=\"settings_language\">\r\n              <option value=\"\" disabled selected>Your language</option>\r\n              <option value=\"en\" data-icon=\"assets/servers/english.jpg\" class=\"circle\">English</option>\r\n              <option value=\"pt\" data-icon=\"assets/servers/brazil.png\" class=\"circle\">Portuguese (Brazilian)</option>\r\n            </select>\r\n            <label>Default Language</label>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Switches -->\r\n    <div class=\"row\" style=\"line-height: 1.6rem !important\">\r\n      <div class=\"col s6\">\r\n        <span class=\"flow-text\"><br>Finish app at Exit button (Else minimize)<br></span>\r\n        <div class=\"switch ownswitch\">\r\n          <label>\r\n            Off\r\n            <input type=\"checkbox\" id=\"stg-switch1\">\r\n            <span class=\"lever\"></span>\r\n            On\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s6\">\r\n        <span class=\"flow-text\"><br>Windows Notifications<br></span>\r\n        <div class=\"switch ownswitch\">\r\n          <label>\r\n            Off\r\n            <input type=\"checkbox\"  id=\"stg-switch2\">\r\n            <span class=\"lever\"></span>\r\n            On\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col s4\">\r\n        <span class=\"flow-text\"><br>Show tooltips in Runes<br></span>\r\n        <div class=\"switch ownswitch\">\r\n          <label>\r\n            Off\r\n            <input type=\"checkbox\" id=\"stg-switch3\">\r\n            <span class=\"lever\"></span>\r\n            On\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s4\">\r\n        <span class=\"flow-text\"><br>Show tooltips in Masteries<br></span>\r\n        <div class=\"switch ownswitch\">\r\n          <label>\r\n            Off\r\n            <input type=\"checkbox\" id=\"stg-switch4\">\r\n            <span class=\"lever\"></span>\r\n            On\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s4\">\r\n        <span class=\"flow-text\"><br>Show tooltips in Elos<br></\r\n          span>\r\n        <div class=\"switch ownswitch\">\r\n          <label>\r\n            Off\r\n            <input type=\"checkbox\" id=\"stg-switch5\">\r\n            <span class=\"lever\"></span>\r\n            On\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer rich-black\">\r\n    <a  href=\"#!\" id=\"settings-modal-close\" class=\"modal-action modal-close waves-effect waves-blue outerspace white-text btn\">Close</a>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['sidebar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<ul id=\"slide-out\" class=\"side-nav fixed outerspace white-text\">\r\n  <li>\r\n    <div class=\"user-view\">\r\n      <div class=\"background\">\r\n        <img src=\"assets/splashs/4.png\">\r\n      </div>\r\n      <img class=\"circle responsive-img left perfil-icon\" src=\"http://ddragon.leagueoflegends.com/cdn/"
    + alias4(((helper = (helper = helpers.patch || (depth0 != null ? depth0.patch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"patch","hash":{},"data":data}) : helper)))
    + "/img/profileicon/"
    + alias4(((helper = (helper = helpers.summonerIcon || (depth0 != null ? depth0.summonerIcon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerIcon","hash":{},"data":data}) : helper)))
    + ".png\">\r\n      <br><br><br>\r\n      <span class=\"white-text flow-text perfil-name\">"
    + alias4(((helper = (helper = helpers.summonerName || (depth0 != null ? depth0.summonerName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerName","hash":{},"data":data}) : helper)))
    + "</span>\r\n      <span class=\"white-text flow-text email perfil-level\">Level "
    + alias4(((helper = (helper = helpers.summonerLevel || (depth0 != null ? depth0.summonerLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summonerLevel","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n  </li>\r\n  <li><a class=\"waves-effect modal-trigger white-text sidenav-li\" href=\"#profile-modal\"><i class=\"material-icons white-text sidenav-icon\">person</i>Profile</a></li>\r\n  <li><a class=\"waves-effect modal-trigger white-text  sidenav-li\" href=\"#settings-modal\"><i class=\"material-icons white-text sidenav-icon\">settings</i>Settings</a></li>\r\n  <div class=\"divider white\"></div>\r\n  <div style=\"margin-top: 20rem\">\r\n    <a class=\"right white-text\" href=\"#!\" style=\"padding-right: 0.4rem\">Donate</a><br>\r\n    <a class=\"right white-text\" href=\"#!\" style=\"padding-right: 0.4rem\">About</a>\r\n  </div>\r\n</ul>\r\n";
},"useData":true});
templates['topRow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row\"> <!-- Top Information !-->\r\n  <div class=\"col s6\">\r\n    <a class=\"waves-effect waves-light outerspace btn modal-trigger search-summoner\" href=\"#search-modal\"><i class=\"material-icons right\">edit</i>Search Another Summoner</a>\r\n  </div> <!--Modal Trigger !-->\r\n  <div class=\"col s5 outerspace z-depth-1 match-info\"><a class=\"white-text\"><span class=\"flow-text\"><strong>"
    + alias4(((helper = (helper = helpers.matchMap || (depth0 != null ? depth0.matchMap : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"matchMap","hash":{},"data":data}) : helper)))
    + "</strong></span><br>"
    + alias4(((helper = (helper = helpers.matchQueue || (depth0 != null ? depth0.matchQueue : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"matchQueue","hash":{},"data":data}) : helper)))
    + "</a></div>\r\n</div>\r\n";
},"useData":true});
})();