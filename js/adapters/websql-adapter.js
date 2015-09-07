//Base de datos Carta

var WebSqlAdapter = function () {

    this.inicializar = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("Carta", "1.0", "Carta Restaurante", 200000);
        //Database name, Version number, Text description, Estimated size of database
        this.db.transaction(
            function (tx) {
                crearTablaP(tx);
                insertarDatosP(tx);
                crearTablaC(tx);
                insertarDatosC(tx);
                crearTablaM(tx);
                insertarDatosM(tx);
            },
            function (error) {
                console.log('Transacción Error: ' + error);
                deferred.reject('Transacción Error: ' + error);
            },
            function () {
                console.log('Transacción con éxito');
                deferred.resolve();
            }
        );
        //Los tres parámetros son la transacción en sí, la función de tratamiento de error, y la de todo OK.
        return deferred.promise();
    }
    // encontrar categoria segun el idioma
    this.encontrarCategoriaIdioma = function (id) {
        var deferred = $.Deferred();
        localStorage['idioma'] = id;
        this.db.transaction(
            function (tx) {
                var sql="";
                switch (id) {
                    case "1":  // castellano
                        sql = "SELECT cid, ccastellano AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;
                    case "2":  // ingles
                        sql = "SELECT cid, cingles AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;
                    case "3":  // frances
                        sql = "SELECT cid, cfrances AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;                    
                    case "4":  // italiano
                        sql = "SELECT cid, citaliano AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break; 
                }
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        categorias = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        categorias[i] = results.rows.item(i);
                    }
                    deferred.resolve(categorias);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    // encontrar los platos segun el idioma y la categoria
    this.encontrarPlatosIdioma = function (id, cat) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                switch(id) {
                    case "1":  // castellano
                        var sql = "SELECT a.id, a.nombre, a.castellano as nomplato, a.imagen, a.alergenos, a.precio, b.ccastellano"+
                            " AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "2":  // ingles
                        var sql = "SELECT a.id, a.nombre, a.ingles as nomplato, a.imagen, a.alergenos, a.precio, b.cingles AS nomcateg"+
                            ", b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "3":  // frances
                        var sql = "SELECT a.id, a.nombre, a.frances as nomplato, a.imagen, a.alergenos, a.precio, b.cfrances"+
                            " AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;                    
                    case "4":  // italiano
                        var sql = "SELECT a.id, a.nombre, a.italiano as nomplato, a.imagen, a.alergenos, a.precio, b.citaliano"+
                            " AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break; 
                }
                tx.executeSql(sql, [cat], function (tx, results) {
                    var len = results.rows.length,
                        platos = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        platos[i] = results.rows.item(i);
                    }
                    deferred.resolve(platos);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    // encontrar el menu segun el idioma
    this.encontrarMenusIdioma = function (id, menu) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                switch(id) {
                    case "1":  // castellano
                        var sql = "SELECT a.id, a.castellano AS fotomenu, a.precio, b.castellano AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+40)";
                        break;
                    case "2":  // ingles
                        var sql = "SELECT a.id, a.ingles AS fotomenu, a.precio, b.ingles AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+40)";
                        break;
                    case "3":  // frances
                        var sql = "SELECT a.id, a.frances as fotomenu, a.precio, b.frances AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+40)";
                        break;                    
                    case "4":  // igialiano
                        var sql = "SELECT a.id, a.italiano as fotomenu, a.precio, b.italiano AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+40)";
                        break; 
                }
                tx.executeSql(sql, [menu], function (tx, results) {
                    deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    //crear tabla Categorias
    var crearTablaC = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS categorias');
        var sql = "CREATE TABLE IF NOT EXISTS categorias ( " +
            "cid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "ccastellano VARCHAR(50), " +
            "cingles VARCHAR(50), " +
            "cfrances VARCHAR(50), " +
            "citaliano VARCHAR(50), " +            
            "cimagen VARCHAR(50))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla categorias OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    //crear tabla Platos
    var crearTablaP = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS platos');
        var sql = "CREATE TABLE IF NOT EXISTS platos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre VARCHAR(50), " +
            "categoria INTEGER, " +
            "castellano VARCHAR(50), " +
            "ingles VARCHAR(50), " +
            "frances VARCHAR(50), " +
            "italiano VARCHAR(50), " +            
            "imagen VARCHAR(50), " +
            "alergenos VARCHAR(50), " +
            "precio FLOAT)";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla platos OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
     //crear tabla Menus
    var crearTablaM = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS menus');
        var sql = "CREATE TABLE IF NOT EXISTS menus ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "castellano VARCHAR(50), " +
            "ingles VARCHAR(50), " +
            "frances VARCHAR(50), " +
            "italiano VARCHAR(50), " +            
            "precio FLOAT)";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla menus OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    //insertar datos de Categorias
    var insertarDatosC = function (tx, categorias) {

        var categorias = [
        {"cid": 1, "ccastellano": "Entrantes frios", "cingles": "Cold starters", "cfrances": "Entrées froides", "citaliano": "Antipasti freddi",  "cimagen":"entrantesfrios.jpg"},
        {"cid": 2, "ccastellano": "Entrantes calientes", "cingles": "Hot starters", "cfrances": "Entrées chaudes", "citaliano": "Antipasti calde",  "cimagen":"entrantescalientes.jpg"},
        {"cid": 3, "ccastellano": "Carnes", "cingles": "Meat", "cfrances": "Viande", "citaliano": "Carne",  "cimagen":"carnes.jpg"},
        {"cid": 4, "ccastellano": "Pescados", "cingles": "Fish", "cfrances": "Poisson", "citaliano": "Pesce",  "cimagen":"pescados.jpg"},
        {"cid": 5, "ccastellano": "Postres", "cingles": "Desserts", "cfrances": "Desserts", "citaliano": "Dessert",  "cimagen":"postres.jpg"},
        {"cid": 6, "ccastellano": "Raciones", "cingles": "Servings", "cfrances": "Portions", "citaliano": "Porzioni",  "cimagen":"raciones.jpg"},
        {"cid": 7, "ccastellano": "Menus", "cingles": "Menu", "cfrances": "Menus", "citaliano": "Menus",  "cimagen":"menus.jpg"},
        {"cid": 8, "ccastellano": "Bebidas", "cingles": "Drinks", "cfrances": "Boissons", "citaliano": "Bevande",  "cimagen":"bebidas.jpg"},
        {"cid": 9, "ccastellano": "Bebidas Terraza", "cingles": "Terrace drinks", "cfrances": "Boissons terrasse", "citaliano": "Bevande terrazza",  "cimagen":"bebidasterraza.jpg"}
    ];

        var l = categorias.length;
        var sql = "INSERT OR REPLACE INTO categorias " +
            "(cid, ccastellano, cingles, cfrances, citaliano, cimagen) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = categorias[i];
            tx.executeSql(sql, [e.cid, e.ccastellano, e.cingles, e.cfrances, e.citaliano, e.cimagen],
                function () {
                    console.log('INSERT categorias OK');
                },
                function (tx, error) {
                    alert('INSERT  categorias error: ' + error.message);
                });
        }
    }
    //insertar datos de Menus
    var insertarDatosM = function (tx, menus) {

        var menus = [
        {"id": 1, "castellano": "degustacion_es.jpg", "ingles": "degustacion_uk.jpg", "frances": "degustacion_fr.jpg", "italiano": "degustacion_it.jpg",  "precio": 39.00},
        {"id": 2, "castellano": "arroz_es.jpg", "ingles": "arroz_uk.jpg", "frances": "arroz_fr.jpg", "italiano": "arroz_it.jpg",  "precio": 30.00},
        {"id": 3, "castellano": "chuleton_es.jpg", "ingles": "chuleton_uk.jpg", "frances": "chuleton_fr.jpg", "italiano": "chuleton_it.jpg",  "precio": 30.00},
        {"id": 4, "castellano": "gastronomico_es.jpg", "ingles": "gastronomico_uk.jpg", "frances": "gastronomico_fr.jpg", "italiano": "gastronomico_it.jpg",  "precio": 25.00}
    ];

        var l = menus.length;
        var sql = "INSERT OR REPLACE INTO menus " +
            "(id, castellano, ingles, frances, italiano, precio) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = menus[i];
            tx.executeSql(sql, [e.id, e.castellano, e.ingles, e.frances, e.italiano, e.precio],
                function () {
                    console.log('INSERT menus OK');
                },
                function (tx, error) {
                    alert('INSERT menus error: ' + error.message);
                });
        }
    }
    // insertar datos de platos
    var insertarDatosP = function (tx, platos) {

        var platos = [
        {"id": 1, "nombre": "Salmón marinado", "categoria": 1, "castellano": "Salmón marinado a las finas hierbas con mousse de foie", "ingles": "Marinated salmon with herb and mousse de foie", "frances": "Saumon mariné aux herbes et mousse de foie", "italiano":"Salmone marinato con erbe e mousse de foie", "imagen":"salmonmarinado.jpg", "alergenos":"alergenos/alerg1.png", "precio":12.00},
        {"id": 2, "nombre": "Micuit de foie", "categoria": 1, "castellano": "Micuit de foie, confitura de zanahoria y caviar de pétalos de violeta", "ingles": "Micuit gras, carrot confit and caviar violet petals", "frances": "Mi-cuit gras, confit de carottes et de caviar pétales de violettes", "italiano":"Micuit gras, confit carota e suoi petali di viola", "imagen":"micuitfoie.jpg", "alergenos":"alergenos/fondoalerg.png","precio":12.00},
        {"id": 3, "nombre": "Anchoas marinadas", "categoria": 1, "castellano": "Anchoas marinadas sobre compota de manzana y jengibre, y helado de tomate", "ingles": "Marinated anchovies on applesauce and ginger and tomato ice cream", "frances": "Anchois marinés sur la compote de pommes et gingembre et crème glacée à la tomate", "italiano":"Acciughe marinate in salsa di mele e zenzero e pomodoro gelato", "imagen":"anchoas.jpg", "alergenos":"alergenos/alerg1.png", "precio":12.00},  
        {"id": 4, "nombre": "Jamón Ibérico de bellota", "categoria": 1, "castellano": "Jamón Ibérico de bellota (Sánchez Romero Carvajal ) con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":21.00},  
        {"id": 5, "nombre": "Ensalada de bonito", "categoria": 1, "castellano": "Ensalada de bonito fresco en su escabeche artesano", "ingles": "Fresh tuna salad on their artisan pickled", "frances": "Salade de thon frais mariné sur leur artisan", "italiano":"Insalata di tonno fresco su loro salamoia artigianale", "imagen":"ensaladabonito.jpg", "alergenos":"alergenos/pescado1.png", "precio":14.00}, 
        {"id": 6, "nombre": "Gazpacho Andaluz", "categoria": 1, "castellano": "Gazpacho Andaluz y sus guarniciones", "ingles": "Gazpacho Andaluz and fittings", "frances": "Gazpacho Andaluz et raccords", "italiano":"Gazpacho Andaluz e accessori", "imagen":"gazpacho.jpg", "alergenos":"alergenos/gluten1.png", "precio":7.00},
        {"id": 7, "nombre": "Chipirones fritos", "categoria": 2, "castellano": "Chipirones fritos a la andaluza con pimientos de padrón", "ingles": "Andalusian fried squid with peppers of Padron", "frances": "Andalouse calmars frit avec poivrons de Padron", "italiano":"Andaluso calamari fritti con peperoni di Padron", "imagen":"chipirones.jpg", "alergenos":"alergenos/molusco1.png", "precio":12.50},
        {"id": 8, "nombre": "Gambas a la plancha", "categoria": 2, "castellano": "Gamba blanca de Huelva a la plancha (12 unidades)", "ingles": "Grilled Huelva prawns (12 units)", "frances": "Huelva grillé de crevettes (12 unités)", "italiano":"Grigliate di Huelva gamberetti (12 unitá)", "imagen":"gambasplancha.jpg", "alergenos":"alergenos/crustaceo1.png", "precio":12.50},
        {"id": 9, "nombre": "Risotto de boletus", "categoria": 2, "castellano": "Risotto de boletus y crujiente de patamulo", "ingles": "Risotto with mushrooms and crispy Patamulo", "frances": "Risotto aux champignons et croustillant Patamulo", "italiano":"Risotto con funghi e Patamulo croccanti", "imagen":"risottoboletus.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":12.00},
        {"id": 10, "nombre": "Gambas al ajillo", "categoria": 2, "castellano": "Gamba langostinera al ajillo", "ingles": "Prawns with garlic", "frances": "Gambas à l'ail", "italiano":"Gamberi con aglio", "imagen":"gambasajillo.jpg", "alergenos":"alergenos/crustaceo1.png", "precio":14.00},
        {"id": 11, "nombre": "Steak tartar", "categoria": 3, "castellano": "Steak tartar a nuestro estilo y helado de mostaza en grano ", "ingles": "Steak tartar and grain mustard ice cream", "frances": "Steak tartare et le grain de la glace à la moutarde", "italiano":"Steak tartare e grano crema di senape gelato", "imagen":"steaktartar.jpg", "alergenos":"alergenos/mostaza1.png", "precio":20.00},
        {"id": 12, "nombre": "Lechal asado", "categoria": 3, "castellano": "Lechal asado D.O Aranda (previo encargo)", "ingles": "Roast suckling O.D. Aranda", "frances": "De lait rôti O.D. Aranda", "italiano":"Roast lattante O.D. Aranda", "imagen":"lechal.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":19.00},
        {"id": 13, "nombre": "Solomillo de ternera", "categoria": 3, "castellano": "Solomillo de ternera, plancha ó reducción de Pedro Ximenez", "ingles": "Beef tenderloin, grilled or Pedro Ximenez reduction", "frances": "Filet de boeuf, grillé ou la réduction Pedro Ximenez", "italiano":"Filetto di manzo, alla griglia o la riduzione di Pedro Ximenez", "imagen":"solomilloternera.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":21.00},
        {"id": 14, "nombre": "Entrecotte de ternera", "categoria": 3, "castellano": "Entrecotte de ternera plancha ó salsa roquefort", "ingles": "Veal entrecote in roquefort sauce or grilled", "frances": "Entrecôte de veau à la sauce roquefort ou grillé", "italiano":"Entrecote di vitello alla griglia o salsa roquefort", "imagen":"entrecotteternera.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":19.00},
        {"id": 15, "nombre": "Dorada a la sal", "categoria": 4, "castellano": "Dorada de mar a la sal", "ingles": "Salty wild gilthead bream", "frances": "Daurade sauvage au sel", "italiano":"Orata selvaggia salato", "imagen":"doradasal.jpg", "alergenos":"alergenos/pescado1.png", "precio":17.00}, 
        {"id": 16, "nombre": "Merluza plancha o salsa verde", "categoria": 4, "castellano": "Merluza plancha ó con almejas en salsa verde", "ingles": "Grilled hake or with clams in green sauce ", "frances": "Merlu grillé ou aux palourdes à la sauce verte", "italiano":"Nasello alla griglia o con vongole in salsa verde", "imagen":"merluzasalsa.jpg", "alergenos":"alergenos/pescado1.png", "precio":18.00},
        {"id": 17, "nombre": "Paella de bogavante", "categoria": 4, "castellano": "Paella de bogavante (min. 2 personas)", "ingles": "Lobster Paella (min. 2 people)", "frances": "Paella de homard (min. 2 personnes)", "italiano":"Paella di aragosta (min. 2 persone)", "imagen":"paellabogavante.jpg", "alergenos":"alergenos/crustaceo1.png", "precio":17.00},
        {"id": 18, "nombre": "Rape plancha o salsa americana", "categoria": 4, "castellano": "Rape (Coruña) plancha ó con almejas en salsa americana", "ingles": "Grilled monkfish (Coruña) or with clams in American sauce", "frances": "Lotte (Coruña) grillée ou aux palourdes en sauce américaine", "italiano":"Coda di rospo (Coruña) alla griglia o con vongole in salsa americana", "imagen":"rapeplancha.jpg", "alergenos":"alergenos/pescado1.png", "precio":21.00},
        {"id": 19, "nombre": "Mousse de requesón", "categoria": 5, "castellano": "Mousse de requesón y pure de manzana asada", "ingles": "Cottage cheese mousse and baked apple puree", "frances": "Fromage cottage mousse et purée de pommes au four", "italiano":"Ricotta mousse e al forno purè di mele", "imagen":"mousserequeson.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":6.00},
        {"id": 20, "nombre": "Hojaldre con helado", "categoria": 5, "castellano": "Hojaldre con helado de vainilla, bourbón y chocolate caliente", "ingles": "Puff pastry with vanilla ice, bourbon and hot chocolate", "frances": "Pâte feuilletée avec de la glace à la vanille bourbon et de chocolat chaud", "italiano":"Pasta sfoglia con gelato alla vaniglia, bourbon e chocolat caldo", "imagen":"hojaldre.jpg", "alergenos":"alergenos/gluten1.png", "precio":6.00},
        {"id": 21, "nombre": "Sorbete de limón", "categoria": 5, "castellano": "Sorbete de limón a la menta", "ingles": "Lemon sorbet with mint", "frances": "Sorbet au citron à la menthe", "italiano":"Sorbetto al limone con la menta", "imagen":"sorbetelimon.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":5.00},
        {"id": 22, "nombre": "Sorbete de mango", "categoria": 5, "castellano": "Sorbete de mango y jenjibre", "ingles": "Mango sorbet and ginger", "frances": "Sorbet à la mangue et au gingembre", "italiano":"Sorbetto al mango e zenzero", "imagen":"sorbetemango.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":5.00},
        {"id": 23, "nombre": "Brownie de chocolate", "categoria": 5, "castellano": "Brownie de chocolate y almendras, con helado de vainilla y bourbon ", "ingles": "Brownie chocolate and almonds with vanilla ice cream and bourbon", "frances": "Brownie chocolat et amandes avec de la crème glacée à la vanille et bourbon", "italiano":"Brownie cioccolato e mandorle con gelato alla vaniglia e bourbon", "imagen":"brownie.jpg", "alergenos":"alergenos/gluten1.png","precio":6.00},
        {"id": 24, "nombre": "Trufas de chocolate", "categoria": 5, "castellano": "Trufas de chocolate", "ingles": "Chocolate truffles", "frances": "Truffes au chocolat", "italiano":"Tartufi di cioccolato", "imagen":"trufas.jpg", "alergenos":"alergenos/gluten1.png", "precio":5.00},
        {"id": 25, "nombre": "Carpaccio de piña", "categoria": 5, "castellano": "Carpaccio de piña al azafrán con helado de coco", "ingles": "Pineapple carpaccio with saffron with coconut ice cream", "frances": "Carpaccio d'ananas avec du safran avec de la crème glacée à la noix de coco", "italiano":"Carpaccio di ananas con zafferano con gelato al cocco", "imagen":"pina.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":6.00},
        {"id": 26, "nombre": "Pan con tomate", "categoria": 6, "castellano": "Ración de pan con tomate", "ingles": "Ration of bread with tomato", "frances": "Ration de pain à la tomate", "italiano":"Razione di pane con pomodoro", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 27, "nombre": "Ración de olivas", "categoria": 6, "castellano": "Ración de olivas", "ingles": "Serving of olives", "frances": "Ration d'olives", "italiano":"Razione di olive", "imagen":"olivas.jpg", "alergenos":"", "precio":2.00},
        {"id": 28, "nombre": "Surtido de quesos", "categoria": 6, "castellano": "Surtido de quesos", "ingles": "Assortment of cheeses", "frances": "Assortiment de fromages", "italiano":"Assortimento di formaggi", "imagen":"quesos.jpg", "alergenos":"", "precio":10.00},
        {"id": 29, "nombre": "Ensalada ilustrada", "categoria": 6, "castellano": "Ensalada ilustrada", "ingles": "mixed salad", "frances": "Salade composée", "italiano":"Insalata mista", "imagen":"ensaladailustrada.jpg", "alergenos":"", "precio":10.00},
        {"id": 30, "nombre": "Jamón ibérico", "categoria": 6, "castellano": "Jamón ibérico con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "alergenos":"", "precio":12.00},
        {"id": 31, "nombre": "Ensaladilla rusa", "categoria": 6, "castellano": "Ensaladilla rusa", "ingles": "Russian salad", "frances": "Salade russe", "italiano":"Insalata russa", "imagen":"ensaladillarusa.jpg", "alergenos":"", "precio":6.00},
        {"id": 32, "nombre": "Croquetas de queso", "categoria": 6, "castellano": "Croquetas ligeras de queso (8 unidades)", "ingles": "Light cheese croquettes (8 units)", "frances": "Croquettes de fromage légers (8 unités)", "italiano":"Crocchette di formaggio luce (8 unità)", "imagen":"croquetasqueso.jpg", "alergenos":"", "precio":5.00},
        {"id": 33, "nombre": "Tortitas de camarón", "categoria": 6, "castellano": "Tortitas de camarón (4 unidades)", "ingles": "Shrimp pancakes (4 units)", "frances": "Crêpes aux crevettes (4 unités)", "italiano":"Frittelle di gamberetti (4 unitá)", "imagen":"tortitascamaron.jpg", "alergenos":"", "precio":8.00},
        {"id": 34, "nombre": "Chipirones a la andaluza", "categoria": 6, "castellano": "Chipirones a la andaluza", "ingles": "Andalusian fried squid", "frances": "Andalouse calmars frit", "italiano":"Andaluso calamari fritti", "imagen":"chipirones.jpg", "alergenos":"", "precio":10.00},
        {"id": 35, "nombre": "Gambas a la plancha", "categoria": 6, "castellano": "Gambas de Huelva a la plancha (6 unidades) ", "ingles": "Grilled Huelva prawns (6 units)", "frances": "Huelva grillé de crevettes (6 unités)", "italiano":"Grigliate di Huelva gamberetti (6 unitá)", "imagen":"gambasplancha.jpg", "alergenos":"", "precio":8.00},
        {"id": 36, "nombre": "Anchoas marinadas", "categoria": 6, "castellano": "Anchoas marinadas (6 unidades)", "ingles": "Marinated anchovies (6 units)", "frances": "Anchois marinés (6 unités)", "italiano":"Acciughe marinate (6 unitá)", "imagen":"anchoasmarinadas.jpg", "alergenos":"", "precio":8.00},
        {"id": 37, "nombre": "Pulpo a la gallega", "categoria": 6, "castellano": "Pulpo a la gallega", "ingles": "Galician octopus", "frances": "Poulpe galicien", "italiano":"Polpo gallego", "imagen":"pulpogallega.jpg", "alergenos":"", "precio":12.00},
        {"id": 38, "nombre": "Sorbetes de fruta natural", "categoria": 6, "castellano": "Sorbetes de fruta natural", "ingles": "Natural fruit sorbets", "frances": "Sorbets de fruits naturels", "italiano":"Sorbetti alla frutta naturale", "imagen":"sorbetelimon.jpg", "alergenos":"", "precio":5.00},
        {"id": 39, "nombre": "Brownie de chocolate", "categoria": 6, "castellano": "Brownie de chocolate con helado de vainilla", "ingles": "Chocolate brownie with vanilla ice", "frances": "Brownie au chocolat avec glace à la vanille", "italiano":"Brownie al cioccolato con gelato alla vaniglia", "imagen":"brownie.jpg", "alergenos":"", "precio":5.00},
        {"id": 40, "nombre": "Trufas de chocolate", "categoria": 6, "castellano": "Trufas de chocolate (5 unidades)", "ingles": "Chocolate truffles (5 units)", "frances": "Truffes au chocolat (5 unités)", "italiano":"Tartufi di cioccolato (5 unitá)", "imagen":"trufas.jpg", "alergenos":"", "precio":5.00},
        {"id": 41, "nombre": "Menú Desgustación", "categoria": 7, "castellano": "Menú Degustación", "ingles": "Tasting menu", "frances": "Menu dégustation", "italiano":"Menu degustazione", "imagen":"menudegustacion.jpg", "alergenos":"", "precio":39.00},
        {"id": 42, "nombre": "Menú del Arroz", "categoria": 7, "castellano": "Menú del Arroz", "ingles": "Rice Menu", "frances": "Menu riz", "italiano":"Rice Menu", "imagen":"menuarroz.jpg", "alergenos":"", "precio":30.00},
        {"id": 43, "nombre": "Menú del Chuletón", "categoria": 7, "castellano": "Menú del Chuletón", "ingles": "Steak menu", "frances": "Menu steak", "italiano":"Menu bistecca", "imagen":"menuchuleton.jpg", "alergenos":"", "precio":30.00},
        {"id": 44, "nombre": "Menú Gastronómico", "categoria": 7, "castellano": "Menú Gastronómico", "ingles": "Gourmet menu", "frances": "Menu gastronomique", "italiano":"Menú gourmet", "imagen":"menugastronomico.jpg", "alergenos":"", "precio":25.00},
        {"id": 45, "nombre": "Cava Reyes de Aragón", "categoria": 8, "castellano": "Cava Reyes de Aragón", "ingles": "Cava Reyes de Aragón", "frances": "Cava Reyes de Aragón", "italiano":"Cava Reyes de Aragón", "imagen":"reyesaragon.jpg", "alergenos":"", "precio":20.00},  
        {"id": 46, "nombre": "Cava Recaredo", "categoria": 8, "castellano": "Cava Recaredo", "ingles": "Cava Recaredo", "frances": "Cava Recaredo", "italiano":"Cava Recaredo", "imagen":"recaredo.jpg", "alergenos":"", "precio":25.00},
        {"id": 47, "nombre": "Cava Juve y Camps", "categoria": 8, "castellano": "Cava Juve y Camps", "ingles": "Cava Juve y Camps", "frances": "Cava Juve y Camps", "italiano":"Cava Juve y Camps", "imagen":"juveycamps.jpg", "alergenos":"", "precio":23.00},
        {"id": 48, "nombre": "Champagne Moet &  Chandon Brut imperial", "categoria": 8, "castellano": "Champagne Moet &  Chandon Brut imperial", "ingles": "Champagne Moet &  Chandon Brut imperial", "frances": "Champagne Moet &  Chandon Brut imperial", "italiano":"Champagne Moet &  Chandon Brut imperial", "imagen":"moetchandon.jpg", "alergenos":"", "precio":45.00},
        {"id": 49, "nombre": "Champagne Moet &  Chandon Rosé imperial", "categoria": 8, "castellano": "Champagne Moet &  Chandon Rosé imperial", "ingles": "Champagne Moet &  Chandon Rosé imperial", "frances": "Champagne Moet &  Chandon Rosé imperial", "italiano":"Champagne Moet &  Chandon Rosé imperial", "imagen":"moetchandonrose.jpg", "alergenos":"", "precio":55.00},
        {"id": 50, "nombre": "Champagne Veuve Cliquot Ponsardin", "categoria": 8, "castellano": "Champagne Veuve Cliquot Ponsardin", "ingles": "Champagne Veuve Cliquot Ponsardin", "frances": "Champagne Veuve Cliquot Ponsardin", "italiano":"Champagne Veuve Cliquot Ponsardin", "imagen":"veuvecliquot.jpg", "alergenos":"", "precio":49.00},
        {"id": 51, "nombre": "Vino blanco Marqués de Vizhoja", "categoria": 8, "castellano": "Vino blanco Marqués de Vizhoja", "ingles": "White wine Marqués de Vizhoja", "frances": "Vin blanc Marqués de Vizhoja", "italiano":"Vino bianco Marqués de Vizhoja", "imagen":"marquesvizhoja.jpg", "alergenos":"", "precio":16.00},
        {"id": 52, "nombre": "Vino blanco Pescador", "categoria": 8, "castellano": "Vino blanco Pescador", "ingles": "White wine Pescador", "frances": "Vin blanc Pescador", "italiano":"Vino bianco Pescador", "imagen":"pescador.jpg", "alergenos":"", "precio":14.00},
        {"id": 53, "nombre": "Vino blanco Protos", "categoria": 8, "castellano": "Vino blanco Protos", "ingles": "White wine Protos", "frances": "Vin blanc Protos", "italiano":"Vino bianco Protos", "imagen":"protos.jpg", "alergenos":"", "precio":17.00},
        {"id": 54, "nombre": "Vino blanco Mingua", "categoria": 8, "castellano": "Vino blanco Mingua", "ingles": "White wine Mingua", "frances": "Vin blanc Mingua", "italiano":"Vino bianco Mingua", "imagen":"mingua.jpg", "alergenos":"", "precio":13.00},
        {"id": 55, "nombre": "Vino blanco Viñas del Vero", "categoria": 8, "castellano": "Vino blanco Viñas del Vero", "ingles": "White wine Viñas del Vero", "frances": "Vin blanc Viñas del Vero", "italiano":"Vino bianco Viñas del Vero", "imagen":"vinasvero.jpg", "alergenos":"", "precio":19.00},
        {"id": 56, "nombre": "Vino blanco Ramón Bilbao", "categoria": 8, "castellano": "Vino blanco Ramón Bilbao", "ingles": "White wine Ramón Bilbao", "frances": "Vin blanc Ramón Bilbao", "italiano":"Vino bianco Ramón Bilbao", "imagen":"ramonbilbao.jpg", "alergenos":"", "precio":16.00},
        {"id": 57, "nombre": "Vino rosado Enate", "categoria": 8, "castellano": "Vino rosado Enate", "ingles": "Pink wine Enate", "frances": "Vin rosé Enate", "italiano":"Vino rosé Enate", "imagen":"enate.jpg", "alergenos":"", "precio":16.00},
        {"id": 58, "nombre": "Vino rosado Gran Feudo", "categoria": 8, "castellano": "Vino rosado Gran Feudo", "ingles": "Pink wine Gran Feudo", "frances": "Vin rosé Gran Feudo", "italiano":"Vino rosé Gran Feudo", "imagen":"granfeudo.jpg", "alergenos":"", "precio":16.00},
        {"id": 59, "nombre": "Vino rosado Cresta Rosa", "categoria": 8, "castellano": "Vino rosado Cresta Rosa", "ingles": "Pink wine Cresta Rosa", "frances": "Vin rosé Cresta Rosa", "italiano":"Vino rosé Cresta Rosa", "imagen":"crestarosa.jpg", "alergenos":"", "precio":14.00},
        {"id": 60, "nombre": "Vino rosado Viña Miedes", "categoria": 8, "castellano": "Vino rosado Viña Miedes", "ingles": "Pink wine Viña Miedes", "frances": "Vin rosé Viña Miedes", "italiano":"Vino rosé Viña Miedes", "imagen":"vinamiedes.jpg", "alergenos":"", "precio":13.00},
        {"id": 61, "nombre": "Vino tinto Marboré", "categoria": 8, "castellano": "Vino tinto Marboré", "ingles": "Red wine Marboré", "frances": "Vin rouge Marboré", "italiano":"Vino rosso Marboré", "imagen":"marbore.jpg", "alergenos":"", "precio":25.00},
        {"id": 62, "nombre": "Vino tinto Baltazar Gracián", "categoria": 8, "castellano": "Vino tinto Baltazar Gracián", "ingles": "Red wine Baltazar Gracián", "frances": "Vin rouge Baltazar Gracián", "italiano":"Vino rosso Baltazar Gracián", "imagen":"baltazargracian.jpg", "alergenos":"", "precio":18.00},
        {"id": 63, "nombre": "Vino tinto Tres Picos", "categoria": 8, "castellano": "Vino tinto Tres Picos", "ingles": "Red wine Tres Picos", "frances": "Vin rouge Tres Picos", "italiano":"Vino rosso Tres Picos", "imagen":"trespicos.jpg", "alergenos":"", "precio":22.00},
        {"id": 64, "nombre": "Vino tinto Fagus Coto de Hayas", "categoria": 8, "castellano": "Vino tinto Fagus Coto de Hayas", "ingles": "Red wine Fagus Coto de Hayas", "frances": "Vin rouge Fagus Coto de Hayas", "italiano":"Vino rosso Fagus Coto de Hayas", "imagen":"fagus.jpg", "alergenos":"", "precio":27.00},
        {"id": 65, "nombre": "Vino tinto Enate", "categoria": 8, "castellano": "Vino tinto Enate", "ingles": "Red wine Enate", "frances": "Vin rouge Enate", "italiano":"Vino rosso Enate", "imagen":"enatetinto.jpg", "alergenos":"", "precio":16.00},
        {"id": 66, "nombre": "Vino tinto Enate", "categoria": 8, "castellano": "Vino tinto Enate", "ingles": "Red wine Enate", "frances": "Vin rouge Enate", "italiano":"Vino rosso Enate", "imagen":"enatetinto2.jpg", "alergenos":"", "precio":12.00},
        {"id": 67, "nombre": "Vino tinto Enate", "categoria": 8, "castellano": "Vino tinto Enate", "ingles": "Red wine Enate", "frances": "Vin rouge Enate", "italiano":"Vino rosso Enate", "imagen":"enatetinto3.jpg", "alergenos":"", "precio":17.00},
        {"id": 68, "nombre": "Vino tinto Señorío de Lazán", "categoria": 8, "castellano": "Vino tinto Señorío de Lazán", "ingles": "Red wine Señorío de Lazán", "frances": "Vin rouge Señorío de Lazán", "italiano":"Vino rosso Señorío de Lazán", "imagen":"lazan.jpg", "alergenos":"", "precio":17.00},
        {"id": 69, "nombre": "Vino tinto Coto de Hayas", "categoria": 8, "castellano": "Vino tinto Coto de Hayas", "ingles": "Red wine Coto de Hayas", "frances": "Vin rouge Coto de Hayas", "italiano":"Vino rosso Coto de Hayas", "imagen":"cotohayas.jpg", "alergenos":"", "precio":16.00},
        {"id": 70, "nombre": "Vino tinto 8.0.1", "categoria": 8, "castellano": "Vino tinto 8.0.1", "ingles": "Red wine 8.0.1", "frances": "Vin rouge 8.0.1", "italiano":"Vino rosso 8.0.1", "imagen":"801.jpg", "alergenos":"", "precio":18.00},
        {"id": 71, "nombre": "Vino tinto Beronia", "categoria": 8, "castellano": "Vino tinto Beronia", "ingles": "Red wine Beronia", "frances": "Vin rouge Beronia", "italiano":"Vino rosso Beronia", "imagen":"beronia.jpg", "alergenos":"", "precio":16.00},
        {"id": 72, "nombre": "Vino tinto Viña Alberdi", "categoria": 8, "castellano": "Vino tinto Viña Alberdi", "ingles": "Red wine Viña Alberdi", "frances": "Vin rouge Viña Alberdi", "italiano":"Vino rosso Viña Alberdi", "imagen":"alberdi.jpg", "alergenos":"", "precio":19.00},
        {"id": 73, "nombre": "Vino tinto Viña Muga", "categoria": 8, "castellano": "Vino tinto Viña Muga", "ingles": "Red wine Viña Muga", "frances": "Vin rouge Viña Muga", "italiano":"Vino rosso Viña Muga", "imagen":"muga.jpg", "alergenos":"", "precio":20.00},
        {"id": 74, "nombre": "Vino tinto Ramón Bilbao", "categoria": 8, "castellano": "Vino tinto Ramón Bilbao", "ingles": "Red wine Ramón Bilbao", "frances": "Vin rouge Ramón Bilbao", "italiano":"Vino rosso Ramón Bilbao", "imagen":"ramonbilbaotinto.jpg", "alergenos":"", "precio":29.00},
        {"id": 75, "nombre": "Vino tinto Ramón Bilbao", "categoria": 8, "castellano": "Vino tinto Ramón Bilbao", "ingles": "Red wine Ramón Bilbao", "frances": "Vin rouge Ramón Bilbao", "italiano":"Vino rosso Ramón Bilbao", "imagen":"ramonbilbaotinto2.jpg", "alergenos":"", "precio":17.00},
        {"id": 76, "nombre": "Vino tinto Marqués de Riscal", "categoria": 8, "castellano": "Vino tinto Marqués de Riscal", "ingles": "Red wine Marqués de Riscal", "frances": "Vin rouge Marqués de Riscal", "italiano":"Vino rosso Marqués de Riscal", "imagen":"marquesriscal.jpg", "alergenos":"", "precio":24.00},
        {"id": 77, "nombre": "Vino tinto Viña Tondonia", "categoria": 8, "castellano": "Vino tinto Viña Tondonia", "ingles": "Red wine Viña Tondonia", "frances": "Vin rouge Viña Tondonia", "italiano":"Vino rosso Viña Tondonia", "imagen":"tondonia.jpg", "alergenos":"", "precio":29.00},
        {"id": 78, "nombre": "Vino tinto Viña Ardanza", "categoria": 8, "castellano": "Vino tinto Viña Ardanza", "ingles": "Red wine Viña Ardanza", "frances": "Vin rouge Viña Ardanza", "italiano":"Vino rosso Viña Ardanza", "imagen":"ardanza.jpg", "alergenos":"", "precio":27.00},
        {"id": 79, "nombre": "Vino tinto Imperial", "categoria": 8, "castellano": "Vino tinto Imperial", "ingles": "Red wine Imperial", "frances": "Vin rouge Imperial", "italiano":"Vino rosso Imperial", "imagen":"imperial.jpg", "alergenos":"", "precio":27.00},
        {"id": 80, "nombre": "Vino tinto Remelluri", "categoria": 8, "castellano": "Vino tinto Remelluri", "ingles": "Red wine Remelluri", "frances": "Vin rouge Remelluri", "italiano":"Vino rosso Remelluri", "imagen":"remelluri.jpg", "alergenos":"", "precio":24.00},
        {"id": 81, "nombre": "Vino tinto Marqués de Vitoria", "categoria": 8, "castellano": "Vino tinto Marqués de Vitoria", "ingles": "Red wine Marqués de Vitoria", "frances": "Vin rouge Marqués de Vitoria", "italiano":"Vino rosso Marqués de Vitoria", "imagen":"marquesvitoria.jpg", "alergenos":"", "precio":12.00},
        {"id": 82, "nombre": "Vino tinto Protos", "categoria": 8, "castellano": "Vino tinto Protos", "ingles": "Red wine Protos", "frances": "Vin rouge Protos", "italiano":"Vino rosso Protos", "imagen":"protostinto.jpg", "alergenos":"", "precio":23.00},
        {"id": 83, "nombre": "Vino tinto Pago de Carraovejas", "categoria": 8, "castellano": "Vino tinto Pago de Carraovejas", "ingles": "Red wine Pago de Carraovejas", "frances": "Vin rouge Pago de Carraovejas", "italiano":"Vino rosso Pago de Carraovejas", "imagen":"pago.jpg", "alergenos":"", "precio":30.00},
        {"id": 84, "nombre": "Vino tinto Mauro", "categoria": 8, "castellano": "Vino tinto Mauro", "ingles": "Red wine Mauro", "frances": "Vin rouge Mauro", "italiano":"Vino rosso Mauro", "imagen":"mauro.jpg", "alergenos":"", "precio":32.00},
        {"id": 85, "nombre": "Vino tinto Pesquera", "categoria": 8, "castellano": "Vino tinto Pesquera", "ingles": "Red wine Pesquera", "frances": "Vin rouge Pesquera", "italiano":"Vino rosso Pesquera", "imagen":"pesquera.jpg", "alergenos":"", "precio":24.00},
        {"id": 86, "nombre": "Agua 1l.", "categoria": 9, "castellano": "Agua 1l.", "ingles": "Water 1l.", "frances": "Eau 1l.", "italiano":"Acqua 1l.", "imagen":"", "alergenos":"", "precio":3.00},  
        {"id": 87, "nombre": "Agua pequeña", "categoria": 9, "castellano": "Agua pequeña", "ingles": "Water little", "frances": "Eau petit", "italiano":"Acqua picolo", "imagen":"", "alergenos":"", "precio":1.20},
        {"id": 88, "nombre": "Agua con gas", "categoria": 9, "castellano": "Agua con gas", "ingles": "Gas water", "frances": "Eau gazeuse", "italiano":"Acqua gassata", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 89, "nombre": "Zumos (piña, melocotón, naranja, uva)", "categoria": 9, "castellano": "Zumos (piña, melocotón, naranja, uva)", "ingles": "Juices (pineapple, peach, orange, grape)", "frances": "Jus (ananas, pêche, orange, grain de raisin", "italiano":"Succhi di frutta (ananas, pesca, arancione, uva", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 90, "nombre": "Horchata y batido de chocolate", "categoria": 9, "castellano": "Horchata y batido de chocolate", "ingles": "Horchata and chocolate milkshake", "frances": "Horchata et milk-shake de chocolat", "italiano":"Horchata et frappè al cioccolato", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 91, "nombre": "Refrescos con gas", "categoria": 9, "castellano": "Refrescos con gas (Bitter, Coca-cola, Fanta, Tónica)", "ingles": "Carbonated drinks (Bitter, Coca-cola, Fanta, Tónica)", "frances": "Boissons gazeuses (Bitter, Coca-cola, Fanta, Tónica)", "italiano":"Bevande gassate (Bitter, Coca-cola, Fanta, Tónica)", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 92, "nombre": "Refrescos sin gas", "categoria": 9, "castellano": "Refrescos sin gas (Aquarius, Nestea)", "ingles": "Soft drinks (Aquarius, Nestea)", "frances": "Boissons sans gazeuse (Aquarius, Nestea)", "italiano":"Bevande senza gassata (Aquarius, Nestea)", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 93, "nombre": "Tinto de verano", "categoria": 9, "castellano": "Tinto de verano", "ingles": "Red cold wine", "frances": "Vin rouge froid", "italiano":"Vino rosso freddo", "imagen":"", "alergenos":"", "precio":3.00},
        {"id": 94, "nombre": "Copa de vino", "categoria": 9, "castellano": "Copa de vino", "ingles": "Glass of wine", "frances": "Verre á vin", "italiano":"Bicchiere da vino", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 95, "nombre": "Cervezas", "categoria": 9, "castellano": "Cervezas", "ingles": "Beers", "frances": "Bières", "italiano":"Birras", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 96, "nombre": "Orujos", "categoria": 9, "castellano": "Orujos hierbas, blanco o crema", "ingles": "Orujos hierbas, blanco o crema", "frances": "Orujos hierbas, blanco o crema", "italiano":"Orujos hierbas, blanco o crema", "imagen":"", "alergenos":"", "precio":3.50},
        {"id": 97, "nombre": "Licores", "categoria": 9, "castellano": "Licores melocotón, manzana, etc.", "ingles": "Spirits peach, apple, etc.", "frances": "Spiritueux pêche, pomme, etc.", "italiano":"Spiriti pesca, mela, etc.", "imagen":"", "alergenos":"", "precio":3.50},
        {"id": 98, "nombre": "Martini", "categoria": 9, "castellano": "Martini", "ingles": "Martini", "frances": "Martini", "italiano":"Martini", "imagen":"", "alergenos":"", "precio":4.50},
        {"id": 99, "nombre": "Vermut casero", "categoria": 9, "castellano": "Vermut casero", "ingles": "Vermouth home", "frances": "Vermouth maison", "italiano":"Vermut casa", "imagen":"", "alergenos":"", "precio":4.00},
        {"id": 100, "nombre": "Combinaciones Ron", "categoria": 9, "castellano": "Licores melocotón, manzana, etc.", "ingles": "Combinations rum", "frances": "Combinaisons rhum", "italiano":"Combinazioni di rum", "imagen":"", "alergenos":"", "precio":7.00},
        {"id": 101, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Seagrams Beefetear)", "ingles": "Gintonic (Seagrams Beefetear) ", "frances": "Gintonic (Seagrams Beefetear)", "italiano":"Gintonic (Seagrams Beefetear)", "imagen":"", "alergenos":"", "precio":6.00},
        {"id": 102, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "ingles": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "frances": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "italiano":"Gintonic (Bombay azul, Bulldog, Tanqueray)", "imagen":"", "alergenos":"", "precio":8.00},
        {"id": 103, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Hendricks, London, Martín m. Bombasa)", "ingles": "Gintonic (Hendricks, London, Martín m. Bombasa)", "frances": "Gintonic (Hendricks, London, Martín m. Bombasa)", "italiano":"Gintonic (Hendricks, London, Martín m. Bombasa)", "imagen":"", "alergenos":"", "precio":10.00},
        {"id": 104, "nombre": "Carajillos", "categoria": 9, "castellano": "Carajillos", "ingles": "Coffe with alcohol", "frances": "Café avec de l'alcool", "italiano":"Caffè con l'alcol", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 105, "nombre": "Cafés e infusiones", "categoria": 9, "castellano": "Cafés e infusiones", "ingles": "Coffe and infusion", "frances": "Café et infusions", "italiano":"Caffè et infusi", "imagen":"", "alergenos":"", "precio":2.00}
    ];
        var l = platos.length;
        var sql = "INSERT OR REPLACE INTO platos " + 
            "(id, nombre, categoria, castellano, ingles, frances, italiano, imagen, alergenos, precio) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = platos[i];
            tx.executeSql(sql, [e.id, e.nombre, e.categoria, e.castellano, e.ingles, e.frances, e.italiano, e.imagen, e.alergenos, e.precio],
                function () {
                    console.log('INSERT platos OK');
                },
                function (tx, error) {
                    alert('INSERT platos error: ' + error.message);
                });
        }
    }
}