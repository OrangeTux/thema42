<?php

class MenuController extends BaseController
{
	function renderMain()
	{
		// Menu::reset();
		Menu::setOption('item.active_class', 'active');
		Menu::setOption('item.active_child_class', 'active');
		$main = Menu::handler('main');
		$main->add(URL::route('dashboard.index'), 'Dashboard');
		$main->add(URL::route('demo.ask-question'), trans('demo.labels.ask-question'));
		$main->add(URL::route('user.user-management'), 'Gebruikersmanagement');
		$main->add(URL::route('question.question-overview'), 'Vragen');
		$main->add(URL::route('answer.answer-overview'), 'Antwoorden');
		$main->add(URL::route('feedback.feedbackOverview'), 'Feedback');
		$main->add(URL::route('auth.logout'), trans('auth.labels.logout'));
		return $main
			->setAttribute('id', 'nav')
			->setAttribute('class', 'nav navbar-nav')
			->render();
	}
}
