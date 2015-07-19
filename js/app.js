// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
   var adapter = new WebSqlAdapter();
    //var adapter = new MemoryAdapter();
   // var adapter = new JSONPAdapter();
    //var adapter = new LocalStorageAdapter();
    var futbolistaURL = /^#futbolistas\/(\d{1,})/;
    adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
        //$('body').html(new HomeView(adapter).render());
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
        var match = hash.match(futbolistaURL);
        if (match) {
            adapter.encontrarPorId(Number(match[1])).done(function(futbolista) {
                $('body').html(new JugadorView(adapter, futbolista).render());
            });
    }
}
}());
