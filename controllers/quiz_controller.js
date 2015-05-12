var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();	
			}else { next( new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){ next(error);});
};

//GET /quizes
exports.index = function(req,res){
	var search = req.query.search;
	
	if(search != undefined){
	//if(search instanceof String){
		search = search.replace(/\s/g, '%');
	}
	
	models.Quiz.findAll({where: ["pregunta like ?", '%' + search + '%']}).then(function(quizes){
		//console.log(typeof(search));
		console.log(search);
		res.render('quizes/index.ejs',{ quizes: quizes});
	}).catch(function(error) { next(error);})
};

//GET /quizes/:id
exports.show = function(req, res){
	
	models.Quiz.find(req.params.quizId).then(function(quiz) {
	res.render('quizes/show', {quiz: quiz})

})
	
};

//GET /quizes/:id/answer
exports.answer = function(req, res){

	models.Quiz.find(req.params.quizId).then(function(quiz) {
	//var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		//resultado = 'Correcto';
		res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
			
	} else {

	res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
	
	}
  })			
};