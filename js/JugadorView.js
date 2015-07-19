var JugadorView = function(adapter, futbolista) {
    this.inicializar = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.cambiarFoto);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.jugador(futbolista));
        return this.el;
    };
    this.addLocation = function(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function(position) {
                alert(position.coords.latitude + ',' + position.coords.longitude);
        },
        function() {
            alert('Error obteniendo localización');
        });
    return false;
  };
  this.addToContacts = function(event) {
      event.preventDefault();
      console.log('Añadiendo a Contactos');
      if (!navigator.contacts) {
          alert("El API de contactos no está soportada", "Error");
          return;
      }
      /*Según doc de Cordova: https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md: */

      // create a new contact object
      var contact = navigator.contacts.create();
      contact.displayName = "Futbolista";
      contact.nickname = "Futbolista";            // specify both to support all devices

      // populate some fields
      var name = new ContactName();
      name.givenName = futbolista.nombre;
      name.familyName = futbolista.apellido;
      contact.name = name;

     // save to device
     contact.save(
        function () {
           alert ("Futbolista guardado en los contactos del teléfono");
        },
        function () {
           alert("uppps, no ha ido bien: " + contactError.code)
        }
     );
   };
  this.cambiarFoto = function(event) {
    event.preventDefault();
    if (!navigator.camera) {
        alert("Camera API no soportada", "Error");
        return;
    }
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };
 
    navigator.camera.getPicture(
        function(imageData) {
            $('.imagen-futbolista', this.el).attr('src', "data:image/jpeg;base64," + imageData);
        },
        function() {
            alert('Error al obtener la foto', 'Error');
        },
        options);
 
    return false;
};
    this.inicializar();
    
}