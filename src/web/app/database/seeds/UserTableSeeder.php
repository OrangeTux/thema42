<?php

class UserTableSeeder extends Seeder {

	public function run() {
		$users = [
			['Jeroen', 'Kruis', 'j.kruis@st.hanze.nl', Hash::make('banaan')],
			['Maurits', 'van Mastrigt', 'm.van.mastrigt@st.hanze.nl', Hash::make('mango')],
			['Auke Willem', 'Oosterhoff', 'a.w.oosterhoff@st.hanze.nl', Hash::make('peer')],
			['Malcolm', 'Kindermans', 'm.s.kindermans@st.hanze.nl', Hash::make('appel')]
		];

		foreach ($users as & $user) {
			User::create([
				'first_name' => $user[0],
				'last_name' => $user[1],
				'email' => $user[2],
				'password' => $user[3]
			]);
		}
	}
}
