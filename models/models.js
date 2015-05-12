var path = require('path');

//Postgres DATABASE_URL = postgres://rvvecrqfsvnbvd:2Xqbr-i0v1CK4n3fF3zV02uZoX@ec2-184-73-165-195.compute-1.amazonaws.com:5432/d3tgcgphjj8k27
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
						{	dialect: protocol,
							protocol: protocol,
							port: port,
							host: host,
							storage: storage, //Solo SQLite (.env)
							omitNull: true  //Solo Postgres
						}
					);

// Importar la definción de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz')
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //Exportar definición de tabla Quiz

//squelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count === 0){  //La tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						});

			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa'
						})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});