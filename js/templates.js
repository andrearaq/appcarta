(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['categorias'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li class=\"topcoat-list__item\">\r\n                  <a href=\"#categoria/"
    + alias3(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cid","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.nomcateg || (depth0 != null ? depth0.nomcateg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomcateg","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <p>"
    + alias3(((helper = (helper = helpers.nomcateg || (depth0 != null ? depth0.nomcateg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomcateg","hash":{},"data":data}) : helper)))
    + "</p>\r\n                    <img src=\"img/categorias/"
    + alias3(((helper = (helper = helpers.cimagen || (depth0 != null ? depth0.cimagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cimagen","hash":{},"data":data}) : helper)))
    + "\">   \r\n                    <span class=\"chevron\"></span>\r\n                </a>}}\r\n                </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">Categorías</h1>\r\n        </div>\r\n</div>\r\n\r\n<div class=\"topcoat-list\">\r\n     <div class=\"topcoat-list scroller\">\r\n        <ul class=\"topcoat-list__container list\" id=\"lstCategorias\">\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "         </ul>\r\n    </div>\r\n</div>";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"topcoat-navigation-bar\">\r\n    <span><img src=\"img/logo.png\"/></span>\r\n    <div class=\"topcoat-navigation-bar__item center full\">\r\n        <h1 class=\"topcoat-navigation-bar__title\">Carta de Restaurante Antonio</h1>\r\n    </div>\r\n</div>\r\n<div class=\"inicio\">\r\n   <img class=\"imginicio\" src=\"img/Pared.jpg\"/>\r\n</div>\r\n<div class=\"topcoat-button-bar full\">\r\n   <div class=\"topcoat-button-bar__item\">\r\n     <a href='#categorias/es'><button class=\"topcoat-button-bar__button full\" id=\"es\"><img src=\"img/Spain.png\"/></button></a>\r\n   </div>\r\n   <div class=\"topcoat-button-bar__item\">\r\n     <a href='#categorias/uk'><button class=\"topcoat-button-bar__button full\" id=\"uk\"><img src=\"img/UK.png\"/></button></a>\r\n   </div>\r\n   <div class=\"topcoat-button-bar__item\">\r\n     <a href='#categorias/fr'><button class=\"topcoat-button-bar__button full\" id=\"fr\"><img src=\"img/France.png\"/></button></a>\r\n   </div>\r\n    <div class=\"topcoat-button-bar__item\">\r\n        <a href='#categorias/it'><button class=\"topcoat-button-bar__button full\" id=\"it\"><img src=\"img/Italy.png\"/></button></a>\r\n   </div>\r\n</div>\r\n<footer>\r\n <h3>Copyright @Restaurante Antonio 2015</h3>\r\n</footer>";
},"useData":true});
templates['raciones'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li class=\"topcoat-list__item\">\r\n      <a href=\"#futbolistas/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n            <img src=\"img/categorias/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\">\r\n            <p>"
    + alias3(((helper = (helper = helpers.nombre || (depth0 != null ? depth0.nombre : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nombre","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.precio || (depth0 != null ? depth0.precio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"precio","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <span class=\"chevron\"></span>\r\n        </a>\r\n      </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['verBebidasTerraza'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <li class=\"topcoat-list__item\">\r\n                <p>"
    + alias3(((helper = (helper = helpers.nomplato || (depth0 != null ? depth0.nomplato : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomplato","hash":{},"data":data}) : helper)))
    + " <span>- "
    + alias3(((helper = (helper = helpers.precio || (depth0 != null ? depth0.precio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"precio","hash":{},"data":data}) : helper)))
    + " € -</span></p>\r\n          </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">"
    + this.escapeExpression(((helper = (helper = helpers.nomcateg || (depth0 != null ? depth0.nomcateg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"nomcateg","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        </div>\r\n    </div>\r\n\r\n<div class=\"topcoat-list\">\r\n    <ul class=\"topcoat-list__container list\" >\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\r\n</div>";
},"useData":true});
templates['verOtraCategoria'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <li class=\"topcoat-list__item\">\r\n                <img src=\"img/raciones/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\">\r\n                <p>"
    + alias3(((helper = (helper = helpers.nomplato || (depth0 != null ? depth0.nomplato : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomplato","hash":{},"data":data}) : helper)))
    + " <span>- "
    + alias3(((helper = (helper = helpers.precio || (depth0 != null ? depth0.precio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"precio","hash":{},"data":data}) : helper)))
    + " € -</span></p>\r\n          </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">"
    + this.escapeExpression(((helper = (helper = helpers.nomcateg || (depth0 != null ? depth0.nomcateg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"nomcateg","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        </div>\r\n    </div>\r\n\r\n<div class=\"topcoat-list\">\r\n    <ul class=\"topcoat-list__container list\" >\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\r\n</div>";
},"useData":true});
templates['verPlatosCategoria'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li class=\"topcoat-list__item\">                    \r\n                    <img src=\"img/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\"> \r\n                    <p>"
    + alias3(((helper = (helper = helpers.nomplato || (depth0 != null ? depth0.nomplato : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomplato","hash":{},"data":data}) : helper)))
    + " <span> "
    + alias3(((helper = (helper = helpers.precio || (depth0 != null ? depth0.precio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"precio","hash":{},"data":data}) : helper)))
    + " </span></p>\r\n                </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">"
    + alias3(((helper = (helper = helpers.nomcateg || (depth0 != null ? depth0.nomcateg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomcateg","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        </div>\r\n    </div>\r\n    <div id=\"gallery\">\r\n        <div id=\"panel\">\r\n            <img id=\"largeImage\" src=\"img/"
    + alias3(((helper = (helper = helpers.imagen || (depth0 != null ? depth0.imagen : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imagen","hash":{},"data":data}) : helper)))
    + "\" />\r\n            <div id=\"precio\">"
    + alias3(((helper = (helper = helpers.precio || (depth0 != null ? depth0.precio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"precio","hash":{},"data":data}) : helper)))
    + "</div> \r\n        </div>\r\n        <div id=\"description\">"
    + alias3(((helper = (helper = helpers.nomplato || (depth0 != null ? depth0.nomplato : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nomplato","hash":{},"data":data}) : helper)))
    + "</div>\r\n\r\n        <div id=\"thumbs\">\r\n            <ul>\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(depth0, depth0),{"name":".","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n    </div>\r\n    ";
},"useData":true});
})();