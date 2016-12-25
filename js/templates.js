(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['categorias'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n         <a href='#categoria/";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\r\n             <button class=\"topcoat-button--large--cta\">\r\n                <p><span>";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"chevron\"></span></p>\r\n                <img class=\"imgboton\" src=\"img/categorias/";
  if (helper = helpers.cimagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cimagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">   \r\n             </button>\r\n         </a>\r\n        ";
  return buffer;
  }

  buffer += "<div class=\"topcoat-navigation-bar\">\r\n     <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n        <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n             <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"topcoat-navigation-bar__item center less-half\">\r\n        <h1 class=\"topcoat-navigation-bar__title\" id=\"titcarta\">Carta Restaurante Antonio</h1>\r\n    </div>\r\n    <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n        <img id=\"1\" src=\"img/es.png\"/>\r\n        <img id=\"2\" src=\"img/ukp.png\"/>\r\n        <img id=\"3\" src=\"img/fr.png\"/>\r\n        <img id=\"4\" src=\"img/it.png\"/>\r\n    </div>\r\n    <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n        <img class=\"logo\" src=\"img/logo2.png\"/>\r\n    </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    <div class=\"conjunto\">\r\n        ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <footer>\r\n      <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"topcoat-navigation-bar\">\r\n    <span><img src=\"img/logo2.png\"/></span>\r\n    <div class=\"topcoat-navigation-bar__item center two-thirds\">\r\n        <h1 class=\"topcoat-navigation-bar__title\">Carta de Restaurante Antonio</h1>\r\n    </div>\r\n    <div class=\"topcoat-navigation-bar__item center\">\r\n        <img class=\"direccion\" src=\"img/direccion.png\"/>\r\n    </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    <div class=\"inicio\">\r\n       <img class=\"imginicio\" src=\"img/Pared.jpg\"/>\r\n    </div>\r\n    <div class=\"topcoat-button-bar full\">\r\n       <div class=\"topcoat-button-bar__item\">\r\n         <a href='#categorias/1'><button class=\"topcoat-button-bar__button full\" id=\"es\"><img class=\"flagG\" src=\"img/Spain.png\"/></button></a>\r\n       </div>\r\n       <div class=\"topcoat-button-bar__item\">\r\n         <a href='#categorias/2'><button class=\"topcoat-button-bar__button full\" id=\"uk\"><img class=\"flagG\" src=\"img/UK.png\"/></button></a>\r\n       </div>\r\n       <div class=\"topcoat-button-bar__item\">\r\n         <a href='#categorias/3'><button class=\"topcoat-button-bar__button full\" id=\"fr\"><img class=\"flagG\" src=\"img/France.png\"/></button></a>\r\n       </div>\r\n        <div class=\"topcoat-button-bar__item\">\r\n          <a href='#categorias/4'><button class=\"topcoat-button-bar__button full\" id=\"it\"><img class=\"flagG\" src=\"img/Italy.png\"/></button></a>\r\n       </div>\r\n    </div>\r\n\r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n     <h3 id=\"direcc\" >Plaza San Pedro Nolasco, 5  --  Tf. 976 39 74 74</h3>\r\n    </footer>\r\n</div>";
  });
templates['verBebidas'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <h1 class=\"topcoat-navigation-bar__title\">";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n             <li class=\"topcoat-list__item\">\r\n                    <img class=\"imgbebida\" src=\"img/bebidas/";
  if (helper = helpers.imagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <p><span class=\"nomplato\">";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"precio\"> ";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " € </span> </p> \r\n              </li>\r\n            ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n        <img id=\"1\" src=\"img/es.png\" alt=\"Bebidas\"/>\r\n        <img id=\"2\" src=\"img/ukp.png\" alt=\"Drinks\"/>\r\n        <img id=\"3\" src=\"img/fr.png\" alt=\"Boissons\"/>\r\n        <img id=\"4\" src=\"img/it.png\" alt=\"Bevande\"/>\r\n    </div>\r\n       <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n            <img class=\"logo\" src=\"img/logo2.png\"/>\r\n        </div>\r\n    </div>\r\n<div class=\"scroller\">\r\n    <div class=\"topcoat-list\">\r\n        <ul class=\"topcoat-list__container list\" >\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verBebidasTerraza'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <h1 class=\"topcoat-navigation-bar__title\">";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                <li class=\"topcoat-list__item\">\r\n                    <p><span class=\"nomplato\">";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"precio\">";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " €</span></p>\r\n              </li>\r\n            ";
  return buffer;
  }

  buffer += " <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n        <img id=\"1\" src=\"img/es.png\" alt=\"Bebidas Terraza\"/>\r\n        <img id=\"2\" src=\"img/ukp.png\" alt=\"Terrace drinks\"/>\r\n        <img id=\"3\" src=\"img/fr.png\" alt=\"Boissons terrasse\"/>\r\n        <img id=\"4\" src=\"img/it.png\" alt=\"Bevande terraza\"/>\r\n    </div>\r\n       <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n            <img class=\"logo\" src=\"img/logo2.png\"/>\r\n        </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    <div class=\"topcoat-list\">\r\n        <ul class=\"topcoat-list__container list\" >\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verMenu'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            <h1 class=\"topcoat-navigation-bar__title\">";
  if (helper = helpers.nommenu) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nommenu); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center quarter\">\r\n            <span class=\"precio2\">";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " €</span>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center quarter\">\r\n            <img src=\"img/logo2.png\"/>\r\n        </div>\r\n    </div>\r\n<div>\r\n <div class=\"scroller\">\r\n    <div class=\"vermenu\">\r\n        <img src=\"img/menus/";
  if (helper = helpers.fotomenu) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fotomenu); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div>\r\n\r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verMenus'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <h1 class=\"topcoat-navigation-bar__title\">";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n             <li class=\"topcoat-list__item\">\r\n                 <a href=\"#menu/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                     <img src=\"img/raciones/";
  if (helper = helpers.imagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                     <p><span class=\"nomplato\">";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"precio\"> ";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " € </span>\r\n                         <span class=\"chevron2\"></span></p> \r\n                 </a>\r\n              </li>\r\n            ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n            <img id=\"1\" src=\"img/es.png\" alt=\"Menus\"/>\r\n            <img id=\"2\" src=\"img/ukp.png\" alt=\"Menu\"/>\r\n            <img id=\"3\" src=\"img/fr.png\" alt=\"Menus\"/>\r\n            <img id=\"4\" src=\"img/it.png\" alt=\"Menus\"/>\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n            <img class=\"logo\" src=\"img/logo2.png\"/>\r\n        </div>\r\n    </div>\r\n<div class=\"scroller\">\r\n    <div class=\"topcoat-list\">\r\n        <ul class=\"topcoat-list__container list\" >\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verOtraCategoria'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                <h1 class=\"topcoat-navigation-bar__title\">";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n             <li class=\"topcoat-list__item\">\r\n                    <img src=\"img/raciones/";
  if (helper = helpers.imagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <p><span class=\"nomplato\">";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"precio\"> ";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " € </span> </p>\r\n                    <p><img id=\"alerrac\" src=\"img/";
  if (helper = helpers.alergenos) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.alergenos); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/></p>\r\n              </li>\r\n            ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n            <img id=\"1\" src=\"img/es.png\" alt=\"Raciones\"/>\r\n            <img id=\"2\" src=\"img/ukp.png\" alt=\"Servings\"/>\r\n            <img id=\"3\" src=\"img/fr.png\" alt=\"Portions\"/>\r\n            <img id=\"4\" src=\"img/it.png\" alt=\"Porzioni\"/>\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n            <img class=\"logo\" src=\"img/logo2.png\"/>\r\n        </div>\r\n    </div>\r\n<div class=\"scroller\">\r\n    <div class=\"topcoat-list\">\r\n        <ul class=\"topcoat-list__container list\" >\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n    <footer>\r\n      <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verPlatosCategoria'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <h1 class=\"topcoat-navigation-bar__title\" id=\"categ\">";
  if (helper = helpers.nomcateg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomcateg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1><span id=\"numcateg\">";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                <img class=\"platogrande\" id=\"fotoplato\" src=\"img/";
  if (helper = helpers.imagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n                <span id=\"precioplato\">";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " €</span>\r\n                <p id=\"textoplato\">";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.alergenos), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                    <p id=\"ale\"><img id=\"alergenos\" src=\"img/";
  if (helper = helpers.alergenos) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.alergenos); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/></p>\r\n                ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n              <div class=\"plato2\">\r\n                  <img class=\"platoP\" src=\"img/";
  if (helper = helpers.imagen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imagen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.nomplato) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nomplato); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                  <span class=\"precio3\"> ";
  if (helper = helpers.precio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " €</span>\r\n                 ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.alergenos), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                 <br/>\r\n                <span class=\"nomplato2\">";
  if (helper = helpers.nombre) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nombre); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n              </div>\r\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                    <img id=\"alerg\" src=\"img/";
  if (helper = helpers.alergenos) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.alergenos); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n                 ";
  return buffer;
  }

  buffer += "<div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center third idiomas\">\r\n            <img id=\"1\" src=\"img/es.png\" alt=\"\"/>\r\n            <img id=\"2\" src=\"img/ukp.png\" alt=\"\"/>\r\n            <img id=\"3\" src=\"img/fr.png\" alt=\"\"/>\r\n            <img id=\"4\" src=\"img/it.png\" alt=\"\"/>\r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n            <img class=\"logo\" src=\"img/logo2.png\"/>\r\n        </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    <div class=\"verplatos\">\r\n        <div class=\"platoG\"> \r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        </div>\r\n        <div class=\"listaplatos\">\r\n\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        </div>\r\n    </div>\r\n    \r\n    <footer>\r\n     <h3>Copyright @Restaurante Antonio 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
})();