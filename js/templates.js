(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\r\n<div class=\"topcoat-navigation-bar\">\r\n    <div class=\"topcoat-navigation-bar__item center full\">\r\n        <h1 class=\"topcoat-navigation-bar__title\">Futbolistas</h1>\r\n    </div>\r\n</div>\r\n<div class=\"search-bar\">\r\n<input type=\"search\" value=\"\" placeholder=\"buscar\" class=\"topcoat-search-input\" id=\"btnBuscar\">\r\n</div>\r\n<div class=\"topcoat-list\">\r\n     <div class=\"topcoat-list scroller\">\r\n    <ul class=\"topcoat-list__container list\" id=\"lstFutbolistas\">\r\n  </ul>\r\n    </div>\r\n</div>";
},"useData":true});
templates['jugador'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">Futbolistas</h1>\r\n        </div>\r\n    </div>\r\n    <div class='detalles scroller'>\r\n        <img src=\"assets/img/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\" class=\"imagen-futbolista\">\r\n        <h1>"
    + alias3(((helper = (helper = helpers.nombre || (depth0 != null ? depth0.nombre : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nombre","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.apellido || (depth0 != null ? depth0.apellido : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"apellido","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        <p><strong>Equipo:</strong> "
    + alias3(((helper = (helper = helpers.equipo || (depth0 != null ? depth0.equipo : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"equipo","hash":{},"data":data}) : helper)))
    + " </p>\r\n        <p><strong>Posición: </strong>"
    + alias3(((helper = (helper = helpers.posicion || (depth0 != null ? depth0.posicion : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"posicion","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <p><strong>Dorsal:</strong> "
    + alias3(((helper = (helper = helpers.dorsal || (depth0 != null ? depth0.dorsal : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dorsal","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <p><em>"
    + alias3(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"desc","hash":{},"data":data}) : helper)))
    + "</em></p>\r\n        <div class=\"topcoat-list__container clearfix\">\r\n            <ul class=\"topcoat-list list actions\">\r\n                <li class=\"topcoat-list__item\"><a href=\"tel:+34606606606\"><p>Llamar al móvil</p><p>+34606606606</p><div class=\"action-icon icon-call\"/></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"tel:+34606606606\"><p>Llamar al fijo</p><p>+34976414141</p><div class=\"action-icon icon-call\"/></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"sms:+34606606606\"><p>Enviar SMS</p><p>+34606606606</p><div class=\"action-icon icon-sms\"/></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"mailto:micorreo@gmail.com\"><p>Enviar correo electrónico</p><p>micorreo@gmail.com</p><div class=\"action-icon icon-mail\"/></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"#\" class=\"add-location-btn\"><p>Añadir posición</p></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"#\" class=\"add-contact-btn\"><p>Añadir a contactos</p></a></li>\r\n                <li class=\"topcoat-list__item\"><a href=\"#\" class=\"change-pic-btn\"><p>Hacer una foto nueva</p></a></li>\r\n            </ul>\r\n        </div>\r\n    </div>";
},"useData":true});
templates['listaJugadores'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li class=\"topcoat-list__item\">\r\n      <a href=\"#futbolistas/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n            <img src=\"assets/img/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\">\r\n            <p>"
    + alias3(((helper = (helper = helpers.nombre || (depth0 != null ? depth0.nombre : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nombre","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.apellido || (depth0 != null ? depth0.apellido : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"apellido","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <p>"
    + alias3(((helper = (helper = helpers.equipo || (depth0 != null ? depth0.equipo : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"equipo","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <span class=\"chevron\"></span>\r\n        </a>\r\n      </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();