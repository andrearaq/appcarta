// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
   var adapter = new WebSqlAdapter();
    
    adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
        renderHomeView();
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
  

    /* ---------------------------------- Funciones locales ---------------------------------- */
    /* funciona para handlebars */
    function renderHomeView() {
      $('body').html(Handlebars.templates.home());
      $('#btnBuscar').on('keyup', encontrarPorNombre);
    }
    function encontrarPorNombre() {     adapter.encontrarPorNombre($('#btnBuscar').val()).done(function (futbolistas) {
           $("#lstFutbolistas").html(Handlebars.templates.listaJugadores(futbolistas)); 
	});
}
    

}());
