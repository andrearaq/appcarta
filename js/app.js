// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
   var adapter = new WebSqlAdapter();
    //var categoriasURL = /^#categorias\/([a-z]{2})/;
    var categoriasURL = /^#categorias\/(\d{1,})/;
    var categoriaURL = /^#categoria\/(\d{1,})\/\D/;
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
        var match = hash.match(categoriasURL);
        var idioma = null;
        if (match) {
            console.log("dentro de match categoriasURL");
            idioma = match[1];
            console.log("idioma "+idioma);
            adapter.encontrarCategoriaIdioma(idioma).done(function(categorias) {
                $('body').html(new Categorias(adapter, categorias).render());
            });
        }
        var match = hash.match(categoriaURL); 
        var categ = null;
        var nomcateg = "";
        if (match) {
            console.log("dentro de match categoriaURL - idioma: "+idioma);
            categ = match[1];
            nomcateg = match[2];
            console.log("categoria id: "+categ+" nombre: "+nomcateg);
            console.log("tipo: "+typeof(categ));
            if (categ=="1" || categ=="2" || categ=="3" || categ=="4" || categ=="5") {
                adapter.encontrarPlatosIdioma(idioma, categ).done(function(platos) {
                    $('body').html(new VerPlatosCategoria(adapter, platos, nomcateg).render());
                });
            }
            if (categ=="6" || categ=="7" || categ=="8") {
                adapter.encontrarPlatosIdioma(idioma, categ).done(function(platos) {
                    $('body').html(new VerOtraCategoria(adapter, platos, nomcateg).render());
                });
            }
            if (categ=="9") {
                adapter.encontrarBebidasIdioma(idioma, categ).done(function(platos) {
                    $('body').html(new VerBebidasTerraza(adapter, platos, nomcateg).render());
                });
            } 
        }  
    }                                        
}());
