<?php

class MenuController extends BaseController
{
	function renderMain()
	{
		Menu::reset();

		// Init Main
		$main = Menu::handler('main');

		// Add menu items
		$main->add(URL::route('home.index'), 'Home');

		if (Auth::check()) {
			$main->add(URL::route('list.index'), 'Alle lijsten');
			$main->add(URL::route('list.create'), 'Nieuwe lijst');
			$main->add('#', Auth::user()->full_name);
			$main->add(URL::route('user.logout'), 'Uitloggen');
		} else {
			$main->add(URL::route('user.register'), 'Registreren');
			$main->add(URL::route('user.login'), 'Inloggen');
		}

		// Add active class to anchor tags
		Menu::handler('main')->getItemsAtDepth(0)->map(function($item)
		{
			if ($item->isActive()) {
				$item
					->getContent()
					->setAttribute('id', 'current');
			}
		});

		// Render menu
		return $main
			->setAttribute('id', 'nav')
			// ->setAttribute('class', 'nav navbar-nav')
			->render();
	}
}
