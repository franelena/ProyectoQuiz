var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

router.get('/author', function(req, res){
	res.render('author', {title: 'Créditos'});
});

//Definición de rutas de /quizes
router.get('/quizes', quizController.index);

router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
