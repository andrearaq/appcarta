// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. 
(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
    var adapter = new WebSqlAdapter();
    var categoriasURL = /^#categorias\/(\d{1,})/;
    var categoriaURL = /^#categoria\/(\d{1,})\/\w+/;
    var menuURL = /^#menu\/(\d{2,})/;
    adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
    route();
    });
    
    /* --------------------------------- Registro de eventos -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        if (navigator.notification) { // Si disponemos de notificaciones nativas, sobreescribimos el alert del navegador:
            window.alert = function (message) {
                    navigator.notification.alert(
                    message,    // mensaje
                    null,       // función de callback
                    "Workshop", // título
                    'OK'        // Nombre botón
            );
          };
        }
    }, false);
  
    $(window).on('hashchange', route);
    /* ---------------------------------- Funciones locales ---------------------------------- */    
      function route() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(adapter).render());
            return;
        }
        // comprobar si queremos ir a ver la lista de categorias
        var match = hash.match(categoriasURL);
        var idioma = null;
        if (match) {
            idioma = match[1];
            adapter.encontrarCategoriaIdioma(idioma).done(function(categorias) {
                $('body').html(new Categorias(adapter, categorias).render());
            });
        }
        // comprobar si queremos ir a ver platos de una categoria
        var match = hash.match(categoriaURL); 
        var categ = null;
        var idioma=null;
        if (match) {
            idioma = localStorage['idioma'];
            categ = match[1];
            // Categorias: entrantes frios, entrantes calientes, carnes, pescados y postres
            if (categ=="1" || categ=="2" || categ=="3" || categ=="4" || categ=="5") {
                adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
                    $('body').html(new VerPlatosCategoria(adapter, platos).render());
                });
            }
            // Categoria: raciones
            if (categ=="6") {
                adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
                    $('body').html(new VerOtraCategoria(adapter, platos).render());
                });
            }
            // Categoria: menus
            if (categ=="7") {
                adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
                    $('body').html(new VerMenusTodos(adapter, platos).render());
                });
            }
            // Categoria: bebidas
            if (categ=="8") {
                adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
                    $('body').html(new VerBebidas(adapter, platos).render());
                });
            }
            // Categoria: bebidas terraza
            if (categ=="9") {
                adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
                    $('body').html(new VerBebidasTerraza(adapter, platos).render());
                });
            } 
        }
          // comprobar si queremos ir a ver un menu en concreto
        var match = hash.match(menuURL);
        var menu = null;
        if (match) {
            idioma = localStorage['idioma'];
            menu = match[1];
            var m = parseInt(menu)-50;
            adapter.encontrarMenusIdioma(idioma, parseInt(m)).done(function(menus) {
                $('body').html(new VerMenu(adapter, menus).render());
            });
        }
    }                                        
}());
