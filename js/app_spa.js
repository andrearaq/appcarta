// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
   //var adapter = new WebSqlAdapter();
    //var adapter = new MemoryAdapter();
   // var adapter = new JSONPAdapter();
    var adapter = new LocalStorageAdapter();
 /*   adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
    });*/
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
  /*  $('#btnBuscar').on('keyup', encontrarPorNombre);*/
 /*   $('#btnAyuda').on('click', function() {
        alert("Una ayuda nunca viene mal :-)")
    });*/


    /* ---------------------------------- Funciones locales ---------------------------------- */
    /* funciona para usar arquitectura SPA */
    function renderHomeView() {
       var html = "<header>" +
                     "<h1>Futbolistas</h1>" +
                  "</header>" +
                  "<input id='btnBuscar' type='search' placeholder='Introduce futbolista'/>" +
                  "<ul id='lstFutbolistas'></ul>"
      $('body').html(html);
      $('#btnBuscar').on('keyup', encontrarPorNombre);
    }
    
    function encontrarPorNombre() {
        adapter.encontrarPorNombre($('#btnBuscar').val()).done(function (futbolistas) {
            var l = futbolistas.length;
            var e;
            $('#lstFutbolistas').empty();
            for (var i = 0; i < l; i++) {
                e = futbolistas[i];
                $('#lstFutbolistas').append('<li><a href="#futbolistas/' + e.id + '">' + e.nombre + ' ' + e.apellido + '</a></li>');
            }
        });
    }

}());
