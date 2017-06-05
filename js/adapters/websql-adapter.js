//Base de datos Carta

var WebSqlAdapter = function () {

    this.inicializar = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("Carta", "2.0", "Carta Restaurante", 200000);
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
                        var sql = "SELECT a.id, a.nombre, a.castellano as nomplato, a.imagen, a.alergenos, a.precio, b.ccastellano"+ " AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "2":  // ingles
                        var sql = "SELECT a.id, a.nombre, a.ingles as nomplato, a.imagen, a.alergenos, a.precio, b.cingles AS nomcateg"+", b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "3":  // frances
                        var sql = "SELECT a.id, a.nombre, a.frances as nomplato, a.imagen, a.alergenos, a.precio, b.cfrances"+
                            " AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;                    
                    case "4":  // italiano
                        var sql = "SELECT a.id, a.nombre, a.italiano as nomplato, a.imagen, a.alergenos, a.precio, b.citaliano"+" AS nomcateg, b.cid FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
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
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+50)";
                        break;
                    case "2":  // ingles
                        var sql = "SELECT a.id, a.ingles AS fotomenu, a.precio, b.ingles AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+50)";
                        break;
                    case "3":  // frances
                        var sql = "SELECT a.id, a.frances as fotomenu, a.precio, b.frances AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+50)";
                        break;                    
                    case "4":  // igialiano
                        var sql = "SELECT a.id, a.italiano as fotomenu, a.precio, b.italiano AS nommenu"+
                            " FROM menus as a, platos as b WHERE a.id=? AND b.id = (a.id+50)";
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
        {"cid": 6, "ccastellano": "Raciones Terraza", "cingles": "Terrace Servings", "cfrances": "Portions terrasse", "citaliano": "Porzioni terrazza",  "cimagen":"raciones.jpg"},
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
        {"id": 0, "castellano": "degustacion_es.jpg", "ingles": "degustacion_uk.jpg", "frances": "degustacion_fr.jpg", "italiano": "degustacion_it.jpg",  "precio": 39.00},
        {"id": 1, "castellano": "arroz_es.jpg", "ingles": "arroz_uk.jpg", "frances": "arroz_fr.jpg", "italiano": "arroz_it.jpg",  "precio": 30.00},
        {"id": 2, "castellano": "sorpresa_es.jpg", "ingles": "sorpresa_uk.jpg", "frances": "sorpresa_fr.jpg", "italiano": "sorpresa_it.jpg",  "precio": 30.00},
        {"id": 3, "castellano": "gastronomico_es.jpg", "ingles": "gastronomico_uk.jpg", "frances": "gastronomico_fr.jpg", "italiano": "gastronomico_it.jpg",  "precio": 25.00}
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
        {"id": 1, "nombre": "Salmón marinado", "categoria": 1, "castellano": "Salmón marinado a las finas hierbas con mousse de foie", "ingles": "Marinated salmon with herb and mousse de foie", "frances": "Saumon mariné aux herbes et mousse de foie", "italiano":"Salmone marinato con erbe e mousse de foie", "imagen":"salmonmarinado.jpg", "alergenos":"alergenos/pescado1.png", "precio":13.00},
        {"id": 2, "nombre": "Micuit de foie", "categoria": 1, "castellano": "Micuit de foie, confitura de zanahoria y caviar de pétalos de violeta", "ingles": "Micuit gras, carrot confit and caviar violet petals", "frances": "Mi-cuit gras, confit de carottes et de caviar pétales de violettes", "italiano":"Micuit gras, confit carota e suoi petali di viola", "imagen":"micuitfoie.jpg", "alergenos":"alergenos/fondoalerg.png","precio":13.00},
        {"id": 3, "nombre": "Jamón Ibérico de bellota", "categoria": 1, "castellano": "Jamón Ibérico de bellota (Sánchez Romero Carvajal ) con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":13.00},
        {"id": 4, "nombre": "Ensalada ilustrada", "categoria": 1, "castellano": "Ensalada ilustrada", "ingles": "Mixed salad", "frances": "Salade composée", "italiano":"Insalata mista", "imagen":"ensaladailustrada.jpg", "alergenos":"alergenos/peshue.png", "precio":12.00}, 
        {"id": 5, "nombre": "Anchoas marinadas", "categoria": 1, "castellano": "Anchoas marinadas sobre compota de manzana y jengibre, y helado de tomate (solo en temporada)", "ingles": "Marinated anchovies on applesauce and ginger and tomato ice cream (only in season)", "frances": "Anchois marinés sur la compote de pommes et gingembre et crème glacée à la tomate (seulement en saison)", "italiano":"Acciughe marinate in salsa di mele e zenzero e pomodoro gelato (solo in stagione)", "imagen":"anchoas.jpg", "alergenos":"alergenos/peslac.png", "precio":13.00},
        {"id": 6, "nombre": "Ensalada de perdíz", "categoria": 1, "castellano": "Ensalada de perdíz de caza escabechada (solo en temporada)", "ingles": "Salad of partridge hunting marinated (only in season)", "frances": "Salade de chasse perdrix marinée (seulement en saison)", "italiano":"Insalata di caccia pernice marinata (solo in stagione)", "imagen":"ensaladaperdiz.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":14.00},  
        {"id": 7, "nombre": "Ensalada de bonito", "categoria": 1, "castellano": "Ensalada de bonito fresco en su escabeche artesano (solo en temporada)", "ingles": "Fresh tuna salad on their artisan pickled (only in season)", "frances": "Salade de thon frais mariné sur leur artisan (seulement en saison)", "italiano":"Insalata di tonno fresco su loro salamoia artigianale (solo in stagione)", "imagen":"ensaladabonito.jpg", "alergenos":"alergenos/pescado1.png", "precio":14.00}, 
        {"id": 8, "nombre": "Gazpacho Andaluz", "categoria": 1, "castellano": "Gazpacho Andaluz y sus guarniciones (solo en temporada)", "ingles": "Andalusian gazpacho and fittings (only in season)", "frances": "Gazpacho andalou et raccords (seulement en saison)", "italiano":"Gazpacho andaluso e accessori (solo in stagione)", "imagen":"gazpacho.jpg", "alergenos":"alergenos/gluten1.png", "precio":8.00},
        {"id": 9, "nombre": "Ensalada de tomate rosa de Barbastro", "categoria": 1, "castellano": "Ensalada de tomate rosa de Barbastro (solo en temporada)", "ingles": "Barbastro pink tomato salad (only in season)", "frances": "Salade de tomates rose de Barbastro (seulement en saison)", "italiano":"Insalata di pomodoro Rosa di Barbastro (solo in stagione)", "imagen":"ensaladarosa.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":14.00},   
        {"id": 10, "nombre": "Calamares fritos", "categoria": 2, "castellano": "Calamares fritos a la andaluza con pimientos de padrón", "ingles": "Andalusian fried squid with peppers of Padron", "frances": "Andalouse calmars frit avec poivrons de Padron", "italiano":"Andaluso calamari fritti con peperoni di Padron", "imagen":"calamares.jpg", "alergenos":"alergenos/molglunue.png", "precio":13.00},
        {"id": 11, "nombre": "Gambas a la plancha", "categoria": 2, "castellano": "Gamba blanca de Huelva a la plancha (12 unidades y solo en temporada)", "ingles": "Grilled Huelva prawns (12 units)", "frances": "Huelva grillé de crevettes (12 unités)", "italiano":"Grigliate di Huelva gamberetti (12 unitá)", "imagen":"gambasplancha.jpg", "alergenos":"alergenos/crusulf.png", "precio":20.00},
        {"id": 12, "nombre": "Migas aragonesas", "categoria": 2, "castellano": "Migas aragonesas con pasas y piñones", "ingles": "Aragonese crumbs with raisins and pine nuts", "frances": "Mies aragonaisses aux raisins secs et noix de pin", "italiano":"Aragona briciole con uvetta e pinoli", "imagen":"migasaragonesas.jpg", "alergenos":"alergenos/glunue.png", "precio":12.00},      
        {"id": 13, "nombre": "Risotto de boletus", "categoria": 2, "castellano": "Risotto de boletus y crujiente de patamulo", "ingles": "Risotto with mushrooms and crispy Patamulo", "frances": "Risotto aux champignons et croustillant Patamulo", "italiano":"Risotto con funghi e Patamulo croccanti", "imagen":"risottoboletus.jpg", "alergenos":"alergenos/glulac.png", "precio":12.00},
        {"id": 14, "nombre": "Alcachofas fritas", "categoria": 2, "castellano": "Alcachofas fritas en tempura (solo en temporada)", "ingles": "Tempura fried artichokes (in season only)", "frances": "Artichauts frits en tempura (seulement en saison)", "italiano":"Carciofi fritti in tempura (solo in stagione)", "imagen":"alcachofas.jpg", "alergenos":"alergenos/glunue.png", "precio":13.00},     
        {"id": 15, "nombre": "Gambas al ajillo", "categoria": 2, "castellano": "Gamba langostinera al ajillo (solo en temporada)", "ingles": "Prawns with garlic (in season only)", "frances": "Gambas à l'ail (seulement en saison)", "italiano":"Gamberi con aglio (solo in stagione)", "imagen":"gambasajillo.jpg", "alergenos":"alergenos/crusglusul.png", "precio":14.00},
        {"id": 16, "nombre": "Gamba roja listada plancha", "categoria": 2, "castellano": "Gamba roja listada a la plancha (12 unidades) (solo en temporada)", "ingles": "Red shrimp grilled listed (12 units) (in season only)", "frances": "Crevette rouge grillé (12 unités) (seulement en saison)", "italiano":"Gambero rosso griglia elencati (12 unità) (solo in stagione)", "imagen":"gambaroja.jpg", "alergenos":"alergenos/crusulf.png", "precio":24.00},
        {"id": 17, "nombre": "Sopa de pescado", "categoria": 2, "castellano": "Sopa de pescado al azafrán (solo en temporada)", "ingles": "Fish soup with saffron (in season only)", "frances": "Soupe de poisson au safran (seulement en saison)", "italiano":"Zuppa di pesce allo zafferano (solo in stagione)", "imagen":"sopapescado.jpg", "alergenos":"alergenos/pesmolglusul.png", "precio":10.00},   
        {"id": 18, "nombre": "Steak tartar", "categoria": 3, "castellano": "Steak tartar a nuestro estilo y helado de mostaza en grano ", "ingles": "Steak tartar and grain mustard ice cream", "frances": "Steak tartare et le grain de la glace à la moutarde", "italiano":"Steak tartare e grano crema di senape gelato", "imagen":"steaktartar.jpg", "alergenos":"alergenos/lachuemost.png", "precio":21.00},
        {"id": 19, "nombre": "Lechal asado", "categoria": 3, "castellano": "Lechal asado D.O Aranda (previo encargo)", "ingles": "Roast suckling O.D. Aranda (previous order)", "frances": "De lait rôti O.D. Aranda (demande préalable)", "italiano":"Roast lattante O.D. Aranda (su ordinazione)", "imagen":"lechal.jpg", "alergenos":"alergenos/gluten1.png", "precio":20.00},
        {"id": 20, "nombre": "Solomillo de ternera", "categoria": 3, "castellano": "Solomillo de ternera con reducción de Pedro Ximenez", "ingles": "Beef tenderloin Pedro Ximenez reduction", "frances": "Filet de boeuf a la réduction Pedro Ximenez", "italiano":"Filetto di manzo, alla riduzione di Pedro Ximenez", "imagen":"solomilloternera.jpg", "alergenos":"alergenos/gluten1.png", "precio":22.00},
        {"id": 21, "nombre": "Entrecotte plancha", "categoria": 3, "castellano": "Entrecotte de ternera plancha", "ingles": "Veal entrecote grilled", "frances": "Entrecôte de veau grillé", "italiano":"Entrecote di vitello alla griglia ", "imagen":"entrecotteplancha.jpg", "alergenos":"alergenos/gluten1.png", "precio":19.00},
        {"id": 22, "nombre": "Entrecotte roquefort", "categoria": 3, "castellano": "Entrecotte de ternera en salsa roquefort", "ingles": "Veal entrecote in roquefort sauce", "frances": "Entrecôte de veau à la sauce roquefort", "italiano":"Entrecote di vitello alla salsa roquefort", "imagen":"entrecotteternera.jpg", "alergenos":"alergenos/glulac.png", "precio":19.00},
        {"id": 23, "nombre": "Manitas de cerdo", "categoria": 3, "castellano": "Manitas de cerdo a la parrilla con sus verduritas", "ingles": "Grilled pork trotters with vegetables", "frances": "Trotteurs de porc grillé aux légumes", "italiano":"Zampetti di maiale alla griglia con verdure", "imagen":"manitascerdo.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":16.00},
        {"id": 24, "nombre": "Dorada a la sal", "categoria": 4, "castellano": "Dorada de mar a la sal", "ingles": "Salty wild gilthead bream", "frances": "Daurade sauvage au sel", "italiano":"Orata selvaggia salato", "imagen":"doradasal.jpg", "alergenos":"alergenos/pescado1.png", "precio":18.00}, 
        {"id": 25, "nombre": "Merluza plancha", "categoria": 4, "castellano": "Merluza plancha", "ingles": "Grilled hake", "frances": "Merlu grillé", "italiano":"Nasello alla griglia", "imagen":"merluzaplancha.jpg", "alergenos":"alergenos/pescado1.png", "precio":18.00},
        {"id": 26, "nombre": "Merluza en salsa verde", "categoria": 4, "castellano": "Merluza con almejas en salsa verde", "ingles": "Grilled with clams in green sauce ", "frances": "Merlu aux palourdes à la sauce verte", "italiano":"Nasello con vongole in salsa verde", "imagen":"merluzasalsa.jpg", "alergenos":"alergenos/pesmolgluhue.png", "precio":18.00},
        {"id": 27, "nombre": "Paella de bogavante", "categoria": 4, "castellano": "Paella de bogavante (min. 2 personas)", "ingles": "Lobster Paella (min. 2 people)", "frances": "Paella de homard (min. 2 personnes)", "italiano":"Paella di aragosta (min. 2 persone)", "imagen":"paellabogavante.jpg", "alergenos":"alergenos/pesmolglusulcrus.png", "precio":22.00},
        {"id": 28, "nombre": "Rape plancha", "categoria": 4, "castellano": "Rape a la plancha (solo en temporada)", "ingles": "Grilled monkfish (in season only)", "frances": "Lotte grillée (seulement en saison)", "italiano":"Coda di rospo alla griglia (solo in stagione)", "imagen":"rapeplancha.jpg", "alergenos":"alergenos/pescado1.png", "precio":22.00},
        {"id": 29, "nombre": "Rape en salsa", "categoria": 4, "castellano": "Rape con almejas en salsa americana (solo en temporada)", "ingles": "Monkfish with clams in American sauce (in season only)", "frances": "Lotte aux palourdes en sauce américaine (seulement en saison)", "italiano":"Coda di rospo con vongole in salsa americana (solo in stagione)", "imagen":"rapealmejas.jpg", "alergenos":"alergenos/pesmolglu.png", "precio":22.00},
        {"id": 30, "nombre": "Rodaballo salvaje", "categoria": 4, "castellano": "Rodaballo salvaje con chutney de melocotón (solo en temporada)", "ingles": "Wild turbot with chutney of peach (in season only)", "frances": "Turbot sauvage avec chutney de pêche (seulement en saison)", "italiano":"Rombo selvatico con chutney di pesche (solo in stagione)", "imagen":"rodaballo.jpg", "alergenos":"alergenos/pescado1.png", "precio":22.00},  
        {"id": 31, "nombre": "Lubina salvaje", "categoria": 4, "castellano": "Lubina salvaje de estero a la plancha (solo en temporada)", "ingles": "Grilled wild sea bass (in season only)", "frances": "Loup de mer sauvage grillé (seulement en saison)", "italiano":"Branzino alla griglia selvaggio (solo in stagione)", "imagen":"lubinasalvaje.jpg", "alergenos":"alergenos/pescado1.png", "precio":22.00},    
        {"id": 32, "nombre": "Mousse de requesón", "categoria": 5, "castellano": "Mousse de requesón y pure de manzana asada", "ingles": "Cottage cheese mousse and baked apple puree", "frances": "Fromage cottage mousse et purée de pommes au four", "italiano":"Ricotta mousse e al forno purè di mele", "imagen":"mousserequeson.jpg", "alergenos":"alergenos/lacteos1.png", "precio":6.00},
        {"id": 33, "nombre": "Hojaldre con helado", "categoria": 5, "castellano": "Hojaldre con helado de vainilla, bourbón y chocolate caliente", "ingles": "Puff pastry with vanilla ice, bourbon and hot chocolate", "frances": "Pâte feuilletée avec de la glace à la vanille bourbon et de chocolat chaud", "italiano":"Pasta sfoglia con gelato alla vaniglia, bourbon e chocolat caldo", "imagen":"hojaldre.jpg", "alergenos":"alergenos/glunuelac.png", "precio":6.00},
        {"id": 34, "nombre": "Sorbete de limón", "categoria": 5, "castellano": "Sorbete de limón a la menta", "ingles": "Lemon sorbet with mint", "frances": "Sorbet au citron à la menthe", "italiano":"Sorbetto al limone con la menta", "imagen":"sorbetelimon.jpg", "alergenos":"alergenos/glulac.png", "precio":5.00},
        {"id": 35, "nombre": "Trufas de chocolate", "categoria": 5, "castellano": "Trufas de chocolate", "ingles": "Chocolate truffles", "frances": "Truffes au chocolat", "italiano":"Tartufi di cioccolato", "imagen":"trufas.jpg", "alergenos":"alergenos/lacnue.png", "precio":5.00},
        {"id": 36, "nombre": "Brownie de chocolate", "categoria": 5, "castellano": "Brownie de chocolate (solo en temporada)", "ingles": "Chocolate brownie (in season only)", "frances": "Brownie au chocolat (seulement en saison)", "italiano":"Brownie al cioccolato (solo in stagione)", "imagen":"brownie.jpg", "alergenos":"alergenos/glulachuenue.png", "precio":6.00},   
        {"id": 37, "nombre": "Carpaccio de piña", "categoria": 5, "castellano": "Carpaccio de piña al azafrán (solo en temporada)", "ingles": "Pineapple carpaccio with saffron (in season only)", "frances": "Carpaccio d'ananas au safran (seulement en saison)", "italiano":"Carpaccio di ananas con zafferano (solo in stagione)", "imagen":"carpachopina.jpg", "alergenos":"alergenos/lacteos1.png", "precio":6.00},
        {"id": 38, "nombre": "Pan con tomate", "categoria": 6, "castellano": "Ración de pan con tomate", "ingles": "Ration of bread with tomato", "frances": "Ration de pain à la tomate", "italiano":"Razione di pane con pomodoro", "imagen":"pantomate.jpg", "alergenos":"alergenos/gluten1.png", "precio":2.00},
        {"id": 39, "nombre": "Ración de olivas", "categoria": 6, "castellano": "Ración de olivas", "ingles": "Serving of olives", "frances": "Ration d'olives", "italiano":"Razione di olive", "imagen":"olivas.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":2.00},
        {"id": 40, "nombre": "Tabla de quesos", "categoria": 6, "castellano": "Tabla de quesos de oveja curados", "ingles": "Cured sheep cheese board", "frances": "Tableau de fromage de brebis fumées", "italiano":"Tagliere per formaggi ovini stagionati", "imagen":"quesos.jpg", "alergenos":"alergenos/lacteos1.png", "precio":10.00},
        {"id": 41, "nombre": "Ensalada ilustrada", "categoria": 6, "castellano": "Ensalada ilustrada", "ingles": "Mixed salad", "frances": "Salade composée", "italiano":"Insalata mista", "imagen":"ensaladailustrada.jpg", "alergenos":"alergenos/peshue.png", "precio":10.00},
        {"id": 42, "nombre": "Jamón ibérico", "categoria": 6, "castellano": "Jamón ibérico con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "alergenos":"alergenos/fondoalerg.png", "precio":12.00},
        {"id": 43, "nombre": "Ensaladilla rusa", "categoria": 6, "castellano": "Ensaladilla rusa", "ingles": "Russian salad", "frances": "Salade russe", "italiano":"Insalata russa", "imagen":"ensaladillarusa.jpg", "alergenos":"alergenos/peshue.png", "precio":8.00},
        {"id": 44, "nombre": "Croquetas de queso", "categoria": 6, "castellano": "Croquetas ligeras de queso (8 unidades)", "ingles": "Light cheese croquettes (8 units)", "frances": "Croquettes de fromage légers (8 unités)", "italiano":"Crocchette di formaggio luce (8 unità)", "imagen":"croquetas.jpg", "alergenos":"alergenos/glulac.png", "precio":6.00},
        {"id": 45, "nombre": "Tortitas de camarón", "categoria": 6, "castellano": "Tortitas de camarón (4 unidades)", "ingles": "Shrimp pancakes (4 units)", "frances": "Crêpes aux crevettes (4 unités)", "italiano":"Frittelle di gamberetti (4 unitá)", "imagen":"tortitascamaron.jpg", "alergenos":"alergenos/crusglusul.png", "precio":8.00},
        {"id": 46, "nombre": "Calamares a la andaluza", "categoria": 6, "castellano": "Calamares a la andaluza", "ingles": "Andalusian fried squid", "frances": "Andalouse calmars frit", "italiano":"Andaluso calamari fritti", "imagen":"calamares.jpg", "alergenos":"alergenos/molglunue.png", "precio":10.00},
        {"id": 47, "nombre": "Anchoas marinadas", "categoria": 6, "castellano": "Anchoas marinadas", "ingles": "Marinated anchovies", "frances": "Anchois marinés", "italiano":"Acciughe marinate", "imagen":"anchoasmarinadas.jpg", "alergenos":"alergenos/peslac.png", "precio":8.00},
        {"id": 48, "nombre": "Sorbete de limón a la menta", "categoria": 6, "castellano": "Sorbete de limón a la menta", "ingles": "Lemon sorbet with mint", "frances": "Sorbets au citron à la menthe", "italiano":"Sorbetto al limone con la menta", "imagen":"sorbetelimon.jpg", "alergenos":"alergenos/glulac.png", "precio":5.00},
        {"id": 49, "nombre": "Brownie de chocolate", "categoria": 6, "castellano": "Brownie de chocolate con helado de vainilla", "ingles": "Chocolate brownie with vanilla ice", "frances": "Brownie au chocolat avec glace à la vanille", "italiano":"Brownie al cioccolato con gelato alla vaniglia", "imagen":"brownie.jpg", "alergenos":"alergenos/glulachuenue.png", "precio":6.00},
        {"id": 50, "nombre": "Trufas de chocolate", "categoria": 6, "castellano": "Trufas de chocolate (5 unidades)", "ingles": "Chocolate truffles (5 units)", "frances": "Truffes au chocolat (5 unités)", "italiano":"Tartufi di cioccolato (5 unitá)", "imagen":"trufas.jpg", "alergenos":"alergenos/lacnue.png", "precio":5.00},
        {"id": 51, "nombre": "Menú Degustación", "categoria": 7, "castellano": "Menú Degustación", "ingles": "Tasting Menu", "frances": "Menu Dégustation", "italiano":"Menu Degustazione", "imagen":"menudegustacion.jpg", "alergenos":"", "precio":39.00},
        {"id": 52, "nombre": "Menú del Arroz", "categoria": 7, "castellano": "Menú del Arroz", "ingles": "Rice Menu", "frances": "Menu Riz", "italiano":"Menu di Riso", "imagen":"menuarroz.jpg", "alergenos":"", "precio":30.00},
        {"id": 53, "nombre": "Menú Sorpresa", "categoria": 7, "castellano": "Menú Sorpresa", "ingles": "Surprise Menu", "frances": "Menu Surprise", "italiano":"Menu a Sorpresa", "imagen":"menusorpresa.jpg", "alergenos":"", "precio":30.00},
        {"id": 54, "nombre": "Menú Gastronómico", "categoria": 7, "castellano": "Menú Gastronómico", "ingles": "Gourmet Menu", "frances": "Menu Gastronomique", "italiano":"Menu Gourmet", "imagen":"menugastronomico.jpg", "alergenos":"", "precio":25.00},
        {"id": 55, "nombre": "Cava Reyes de Aragón Brut", "categoria": 8, "castellano": "Cava Reyes de Aragón Brut", "ingles": "Cava Reyes de Aragón Brut", "frances": "Cava Reyes de Aragón Brut", "italiano":"Cava Reyes de Aragón Brut", "imagen":"reyesaragon.jpg", "alergenos":"", "precio":20.00},  
        {"id": 56, "nombre": "Cava Recaredo Brut Nature", "categoria": 8, "castellano": "Cava Recaredo Brut Nature", "ingles": "Cava Recaredo Brut Nature", "frances": "Cava Recaredo Brut Nature", "italiano":"Cava Recaredo Brut Nature", "imagen":"recaredo.jpg", "alergenos":"", "precio":25.00},
        {"id": 57, "nombre": "Cava Juve y Camps Gran Reserva Brut Nature", "categoria": 8, "castellano": "Cava Juve y Camps Gran Reserva Brut Nature", "ingles": "Cava Juve y Camps Gran Reserva Brut Nature", "frances": "Cava Juve y Camps Gran Reserva Brut Nature", "italiano":"Cava Juve y Camps Gran Reserva Brut Nature", "imagen":"juveycamps.jpg", "alergenos":"", "precio":23.00},
        {"id": 58, "nombre": "Champagne Moet &  Chandon Brut imperial", "categoria": 8, "castellano": "Champagne Moet &  Chandon Brut imperial", "ingles": "Champagne Moet &  Chandon Brut imperial", "frances": "Champagne Moet &  Chandon Brut imperial", "italiano":"Champagne Moet &  Chandon Brut imperial", "imagen":"moetchandon.jpg", "alergenos":"", "precio":45.00},
        {"id": 59, "nombre": "Champagne Moet &  Chandon Rosé imperial", "categoria": 8, "castellano": "Champagne Moet &  Chandon Rosé imperial", "ingles": "Champagne Moet &  Chandon Rosé imperial", "frances": "Champagne Moet &  Chandon Rosé imperial", "italiano":"Champagne Moet &  Chandon Rosé imperial", "imagen":"moetchandonrose.jpg", "alergenos":"", "precio":55.00},
        {"id": 60, "nombre": "Champagne Veuve Clicquot Ponsardin", "categoria": 8, "castellano": "Champagne Veuve Clicquot Ponsardin", "ingles": "Champagne Veuve Clicquot Ponsardin", "frances": "Champagne Veuve Clicquot Ponsardin", "italiano":"Champagne Veuve Clicquot Ponsardin", "imagen":"veuveclicquot.jpg", "alergenos":"", "precio":49.00},
        {"id": 61, "nombre": "Vino blanco Marqués de Vizhoja Albariño", "categoria": 8, "castellano": "Vino blanco Marqués de Vizhoja Albariño", "ingles": "White wine Marqués de Vizhoja Albariño", "frances": "Vin blanc Marqués de Vizhoja Albariño", "italiano":"Vino bianco Marqués de Vizhoja Albariño", "imagen":"marquesvizhoja.jpg", "alergenos":"", "precio":16.00},
        {"id": 62, "nombre": "Vino blanco Pescador", "categoria": 8, "castellano": "Vino blanco Pescador", "ingles": "White wine Pescador", "frances": "Vin blanc Pescador", "italiano":"Vino bianco Pescador", "imagen":"pescador.jpg", "alergenos":"", "precio":14.00},
        {"id": 63, "nombre": "Vino blanco Protos Verdejo D.O. Rueda", "categoria": 8, "castellano": "Vino blanco Protos Verdejo D.O. Rueda", "ingles": "White wine Protos Verdejo D.O. Rueda", "frances": "Vin blanc Protos Verdejo D.O. Rueda", "italiano":"Vino bianco Protos Verdejo D.O. Rueda", "imagen":"protos.jpg", "alergenos":"", "precio":17.00},
        {"id": 64, "nombre": "Vino blanco Enate Chardonnay 234", "categoria": 8, "castellano": "Vino blanco Enate Chardonnay 234", "ingles": "White wine Enate Chardonnay 234", "frances": "Vin blanc Enate Chardonnay 234", "italiano":"Vino bianco Enate Chardonnay 234", "imagen":"enate234.jpg", "alergenos":"", "precio":16.00},
        {"id": 65, "nombre": "Vino blanco Viñas del Vero", "categoria": 8, "castellano": "Vino blanco Viñas del Vero", "ingles": "White wine Viñas del Vero", "frances": "Vin blanc Viñas del Vero", "italiano":"Vino bianco Viñas del Vero", "imagen":"vinasvero.jpg", "alergenos":"", "precio":19.00},
        {"id": 66, "nombre": "Vino rosado Enate cabernet sauvignon", "categoria": 8, "castellano": "Vino rosado Enate cabernet sauvignon", "ingles": "Pink wine Enate cabernet sauvignon", "frances": "Vin rosé Enate cabernet sauvignon", "italiano":"Vino rosato Enate cabernet sauvignon", "imagen":"enate.jpg", "alergenos":"", "precio":16.00},
        {"id": 67, "nombre": "Vino rosado Gran Feudo", "categoria": 8, "castellano": "Vino rosado Gran Feudo", "ingles": "Pink wine Gran Feudo", "frances": "Vin rosé Gran Feudo", "italiano":"Vino rosato Gran Feudo", "imagen":"granfeudo.jpg", "alergenos":"", "precio":16.00},
        {"id": 68, "nombre": "Vino rosado Cresta Rosa", "categoria": 8, "castellano": "Vino rosado Cresta Rosa", "ingles": "Pink wine Cresta Rosa", "frances": "Vin rosé Cresta Rosa", "italiano":"Vino rosato Cresta Rosa", "imagen":"crestarosa.jpg", "alergenos":"", "precio":14.00},
        {"id": 69, "nombre": "Vino tinto Baltazar Gracián Garnacha", "categoria": 8, "castellano": "Vino tinto Baltazar Gracián Garnacha (Calatayud)", "ingles": "Red wine Baltazar Gracián Garnacha (Calatayud)", "frances": "Vin rouge Baltazar Gracián Garnacha (Calatayud)", "italiano":"Vino rosso Baltazar Gracián Garnacha (Calatayud)", "imagen":"baltazargracian.jpg", "alergenos":"", "precio":18.00},
        {"id": 70, "nombre": "Vino tinto Tres Picos Borsao Garnacha", "categoria": 8, "castellano": "Vino tinto Tres Picos Borsao Garnacha (Borja)", "ingles": "Red wine Tres Picos Borsao Garnacha (Borja)", "frances": "Vin rouge Tres Picos Borsao Garnacha (Borja)", "italiano":"Vino rosso Tres Picos Borsao Garnacha (Borja)", "imagen":"trespicos.jpg", "alergenos":"", "precio":22.00},
        {"id": 71, "nombre": "Vino tinto Fagus Coto de Hayas Garnacha", "categoria": 8, "castellano": "Vino tinto Fagus Coto de Hayas Garnacha (Borja)", "ingles": "Red wine Fagus Coto de Hayas Garnacha (Borja)", "frances": "Vin rouge Fagus Coto de Hayas Garnacha (Borja)", "italiano":"Vino rosso Fagus Coto de Hayas Garnacha (Borja)", "imagen":"fagus.jpg", "alergenos":"", "precio":27.00},
        {"id": 72, "nombre": "Vino tinto Enate", "categoria": 8, "castellano": "Vino tinto Enate (Somontano)", "ingles": "Red wine Enate (Somontano)", "frances": "Vin rouge Enate (Somontano)", "italiano":"Vino rosso Enate (Somontano)", "imagen":"enatetinto.jpg", "alergenos":"", "precio":16.00},
        {"id": 73, "nombre": "Vino tinto Enate, crianza", "categoria": 8, "castellano": "Vino tinto Enate, crianza (Somontano)", "ingles": "Red wine Enate, crianza (Somontano)", "frances": "Vin rouge Enate, crianza (Somontano)", "italiano":"Vino rosso Enate, crianza (Somontano)", "imagen":"enatetinto3.jpg", "alergenos":"", "precio":17.00},
        {"id": 74, "nombre": "Vino tinto Señorío de Lazán", "categoria": 8, "castellano": "Vino tinto Señorío de Lazán (Somontano)", "ingles": "Red wine Señorío de Lazán (Somontano)", "frances": "Vin rouge Señorío de Lazán (Somontano)", "italiano":"Vino rosso Señorío de Lazán (Somontano)", "imagen":"lazan.jpg", "alergenos":"", "precio":17.00},
        {"id": 75, "nombre": "Vino tinto 8.0.1", "categoria": 8, "castellano": "Vino tinto 8.0.1 (Cariñena)", "ingles": "Red wine 8.0.1 (Cariñena)", "frances": "Vin rouge 8.0.1 (Cariñena)", "italiano":"Vino rosso 8.0.1 (Cariñena)", "imagen":"801.jpg", "alergenos":"", "precio":18.00},
        {"id": 76, "nombre": "Vino tinto Beronia", "categoria": 8, "castellano": "Vino tinto Beronia (Rioja)", "ingles": "Red wine Beronia (Rioja)", "frances": "Vin rouge Beronia (Rioja)", "italiano":"Vino rosso Beronia (Rioja)", "imagen":"beronia.jpg", "alergenos":"", "precio":16.00},
        {"id": 77, "nombre": "Vino tinto Viña Alberdi", "categoria": 8, "castellano": "Vino tinto Viña Alberdi (Rioja)", "ingles": "Red wine Viña Alberdi (Rioja)", "frances": "Vin rouge Viña Alberdi (Rioja)", "italiano":"Vino rosso Viña Alberdi (Rioja)", "imagen":"alberdi.jpg", "alergenos":"", "precio":19.00},
        {"id": 78, "nombre": "Vino tinto Viña Muga", "categoria": 8, "castellano": "Vino tinto Viña Muga (Rioja)", "ingles": "Red wine Viña Muga (Rioja)", "frances": "Vin rouge Viña Muga (Rioja)", "italiano":"Vino rosso Viña Muga (Rioja)", "imagen":"muga.jpg", "alergenos":"", "precio":20.00},
        {"id": 79, "nombre": "Vino tinto Ramón Bilbao", "categoria": 8, "castellano": "Vino tinto Ramón Bilbao (Rioja)", "ingles": "Red wine Ramón Bilbao (Rioja)", "frances": "Vin rouge Ramón Bilbao (Rioja)", "italiano":"Vino rosso Ramón Bilbao (Rioja)", "imagen":"ramonbilbaorioja.jpg", "alergenos":"", "precio":17.00},
        {"id": 80, "nombre": "Vino tinto Marqués de Riscal", "categoria": 8, "castellano": "Vino tinto Marqués de Riscal (Rioja)", "ingles": "Red wine Marqués de Riscal (Rioja)", "frances": "Vin rouge Marqués de Riscal (Rioja)", "italiano":"Vino rosso Marqués de Riscal (Rioja)", "imagen":"marquesriscal.jpg", "alergenos":"", "precio":24.00},
        {"id": 81, "nombre": "Vino tinto Viña Ardanza", "categoria": 8, "castellano": "Vino tinto Viña Ardanza (Rioja)", "ingles": "Red wine Viña Ardanza (Rioja)", "frances": "Vin rouge Viña Ardanza (Rioja)", "italiano":"Vino rosso Viña Ardanza (Rioja)", "imagen":"ardanza.jpg", "alergenos":"", "precio":27.00},
        {"id": 82, "nombre": "Vino tinto Remelluri", "categoria": 8, "castellano": "Vino tinto Remelluri (Rioja)", "ingles": "Red wine Remelluri (Rioja)", "frances": "Vin rouge Remelluri (Rioja)", "italiano":"Vino rosso Remelluri (Rioja)", "imagen":"remelluri.jpg", "alergenos":"", "precio":24.00},
        {"id": 83, "nombre": "Vino tinto Marqués de Vitoria", "categoria": 8, "castellano": "Vino tinto Marqués de Vitoria 50cl. (Rioja)", "ingles": "Red wine Marqués de Vitoria 50cl. (Rioja)", "frances": "Vin rouge Marqués de Vitoria 50cl. (Rioja)", "italiano":"Vino rosso Marqués de Vitoria 50cl. (Rioja)", "imagen":"marquesvitoria.jpg", "alergenos":"", "precio":12.00},
        {"id": 84, "nombre": "Vino tinto Protos", "categoria": 8, "castellano": "Vino tinto Protos (Ribera del Duero)", "ingles": "Red wine Protos (Ribera del Duero)", "frances": "Vin rouge Protos (Ribera del Duero)", "italiano":"Vino rosso Protos (Ribera del Duero)", "imagen":"protostinto.jpg", "alergenos":"", "precio":23.00},
        {"id": 85, "nombre": "Vino tinto Pago de Carraovejas", "categoria": 8, "castellano": "Vino tinto Pago de Carraovejas (Ribera del Duero)", "ingles": "Red wine Pago de Carraovejas (Ribera del Duero)", "frances": "Vin rouge Pago de Carraovejas (Ribera del Duero)", "italiano":"Vino rosso Pago de Carraovejas (Ribera del Duero)", "imagen":"pago.jpg", "alergenos":"", "precio":34.00},
        {"id": 86, "nombre": "Vino tinto Mauro", "categoria": 8, "castellano": "Vino tinto Mauro (Ribera del Duero)", "ingles": "Red wine Mauro (Ribera del Duero)", "frances": "Vin rouge Mauro (Ribera del Duero)", "italiano":"Vino rosso Mauro (Ribera del Duero)", "imagen":"mauro.jpg", "alergenos":"", "precio":32.00},
        {"id": 87, "nombre": "Vino tinto Pesquera", "categoria": 8, "castellano": "Vino tinto Pesquera (Ribera del Duero)", "ingles": "Red wine Pesquera (Ribera del Duero)", "frances": "Vin rouge Pesquera (Ribera del Duero)", "italiano":"Vino rosso Pesquera (Ribera del Duero)", "imagen":"pesquera.jpg", "alergenos":"", "precio":24.00},
        {"id": 88, "nombre": "Agua 1l.", "categoria": 9, "castellano": "Agua 1l.", "ingles": "Water 1l.", "frances": "Eau 1l.", "italiano":"Acqua 1l.", "imagen":"", "alergenos":"", "precio":3.00},  
        {"id": 89, "nombre": "Agua pequeña", "categoria": 9, "castellano": "Agua pequeña", "ingles": "Water little", "frances": "Eau petit", "italiano":"Acqua picolo", "imagen":"", "alergenos":"", "precio":1.50},
        {"id": 90, "nombre": "Agua con gas", "categoria": 9, "castellano": "Agua con gas", "ingles": "Gas water", "frances": "Eau gazeuse", "italiano":"Acqua gassata", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 91, "nombre": "Zumos (piña, naranja, etc.)", "categoria": 9, "castellano": "Zumos (piña, naranja, etc.)", "ingles": "Juices (pineapple, orange, etc.)", "frances": "Jus (ananas, orange, etc.)", "italiano":"Succhi di frutta (ananas, arancione, etc.)", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 92, "nombre": "Refrescos con gas", "categoria": 9, "castellano": "Refrescos con gas (Bitter, Coca-cola, Fanta, Tónica)", "ingles": "Carbonated drinks (Bitter, Coca-cola, Fanta, Tónica)", "frances": "Boissons gazeuses (Bitter, Coca-cola, Fanta, Tónica)", "italiano":"Bevande gassate (Bitter, Coca-cola, Fanta, Tónica)", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 93, "nombre": "Refrescos sin gas", "categoria": 9, "castellano": "Refrescos sin gas (Aquarius, Nestea)", "ingles": "Soft drinks (Aquarius, Nestea)", "frances": "Boissons sans gazeuse (Aquarius, Nestea)", "italiano":"Bevande senza gassata (Aquarius, Nestea)", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 94, "nombre": "Tinto de verano", "categoria": 9, "castellano": "Tinto de verano", "ingles": "Red cold wine", "frances": "Vin rouge froid", "italiano":"Vino rosso freddo", "imagen":"", "alergenos":"", "precio":3.00},
        {"id": 95, "nombre": "Jarra de sangría (litro)", "categoria": 9, "castellano": "Jarra de sangría (litro)", "ingles": "Mug of sangría", "frances": "Une jarre de sangría", "italiano":"Una caraffa de sangría", "imagen":"", "alergenos":"", "precio":14.00},
        {"id": 96, "nombre": "Copa de vino", "categoria": 9, "castellano": "Copa de vino", "ingles": "Glass of wine", "frances": "Verre á vin", "italiano":"Bicchiere da vino", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 97, "nombre": "Cervezas", "categoria": 9, "castellano": "Cervezas", "ingles": "Beers", "frances": "Bières", "italiano":"Birras", "imagen":"", "alergenos":"", "precio":2.00},
        {"id": 98, "nombre": "Chupitos", "categoria": 9, "castellano": "Chupitos hierbas, blanco o crema", "ingles": "Chupitos herbal, white o cream", "frances": "Chupitos des herbes, blanc o crème", "italiano":"Chupitos erbes, bianco o crema", "imagen":"", "alergenos":"", "precio":3.50},
        {"id": 99, "nombre": "Licor", "categoria": 9, "castellano": "Licor hierbas, blanco, crema (con hielo)", "ingles": "Spirit herbal, white o cream (with ice)", "frances": "Spiritueux des herbes, blanc o crème (avec de la glace)", "italiano":"Spiriti erbes, bianco o crema (con ghiaccio)", "imagen":"", "alergenos":"", "precio":5.00},
        {"id": 100, "nombre": "Martini", "categoria": 9, "castellano": "Martini", "ingles": "Martini", "frances": "Martini", "italiano":"Martini", "imagen":"", "alergenos":"", "precio":4.50},
        {"id": 101, "nombre": "Vermut casero", "categoria": 9, "castellano": "Vermut casero", "ingles": "Vermouth home", "frances": "Vermouth maison", "italiano":"Vermut casa", "imagen":"", "alergenos":"", "precio":4.00},
        {"id": 102, "nombre": "Combinaciones Ron", "categoria": 9, "castellano": "Combinaciones de Ron", "ingles": "Combinations rum", "frances": "Combinaisons rhum", "italiano":"Combinazioni di rum", "imagen":"", "alergenos":"", "precio":7.00},
        {"id": 103, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Seagrams Beefetear)", "ingles": "Gintonic (Seagrams Beefetear) ", "frances": "Gintonic (Seagrams Beefetear)", "italiano":"Gintonic (Seagrams Beefetear)", "imagen":"", "alergenos":"", "precio":6.00},
        {"id": 104, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "ingles": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "frances": "Gintonic (Bombay azul, Bulldog, Tanqueray)", "italiano":"Gintonic (Bombay azul, Bulldog, Tanqueray)", "imagen":"", "alergenos":"", "precio":8.00},
        {"id": 105, "nombre": "Gintonic", "categoria": 9, "castellano": "Gintonic (Hendricks, London, Martín m. Bombasa)", "ingles": "Gintonic (Hendricks, London, Martín m. Bombasa)", "frances": "Gintonic (Hendricks, London, Martín m. Bombasa)", "italiano":"Gintonic (Hendricks, London, Martín m. Bombasa)", "imagen":"", "alergenos":"", "precio":10.00},
        {"id": 106, "nombre": "Carajillos", "categoria": 9, "castellano": "Carajillos", "ingles": "Coffe with alcohol", "frances": "Café avec de l'alcool", "italiano":"Caffè con l'alcol", "imagen":"", "alergenos":"", "precio":2.50},
        {"id": 107, "nombre": "Cafés e infusiones", "categoria": 9, "castellano": "Cafés e infusiones", "ingles": "Coffe and infusion", "frances": "Café et infusions", "italiano":"Caffè et infusi", "imagen":"", "alergenos":"", "precio":2.00}
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