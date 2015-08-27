var VerPlatosCategoria = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.flag', this.encontrarPlatos);
        this.el.on('click', '.platoP', this.mostrarPlato);
        this.el.on('change', '.plato2', this.mostrarPrimerPlato);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verPlatosCategoria(platos));
        return this.el;
    };
    this.encontrarPlatos = function() {
        //agregar pagina con cambio de idioma al history del navegador
        var categ = $('#numcateg').html();
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        window.history.pushState({}, null, '#categoria/'+categ+'/'+$('#categ').html());
        var idioma = $(this).attr('id');
        
        adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
            $('body').html(new VerPlatosCategoria(adapter, platos).render());
        });
    };
    this.mostrarPlato = function() {
        $('#fotoplato').attr('src',$(this).attr('src'));
        $('#precioplato').html($(this).next().text());
        $('#textoplato').html($(this).attr('alt'));
        $('#alergenos').attr('src',$(this).next().next().attr('src'));
    };
    this.mostrarPrimerPlato = function() {
        console.log('se produjo evento load');
        $('#fotoplato').attr('src',$(this).first().attr('src'));
        $('#precioplato').html($('.precio3').first().text());
        $('#textoplato').html($('.platoP').first().attr('alt'));
    };
    this.inicializar();
}
/*
<div class="platoG">       
        <img class="platogrande" id="fotoplato"/>
        <span class="precio" id="precioplato"></span>
        <p id="textoplato"></p>
        <span id="ale"><img id="alergenos" /></span>
    </div>*/