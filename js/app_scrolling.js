// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
   //var adapter = new WebSqlAdapter();
    //var adapter = new MemoryAdapter();
   // var adapter = new JSONPAdapter();
    var adapter = new LocalStorageAdapter();
 
    adapter.inicializar().done(function () {
            $('body').html(new HomeView(adapter).render());
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

}());
