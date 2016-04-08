<?php 
	
	require_once 'vendor/autoload.php';
	require_once './locals.php';
	
	$loader = new Twig_Loader_Filesystem('./templates');
	$twig = new Twig_Environment($loader, array(
		'cache' => './cache',
	));
	
	$client = new \Contentful\Delivery\Client(CONTENTFUL_TOKEN, CONTENTFUL_SPACE_ID);
	$entry = $client->getEntry('57iPIK5l2gI2M24ICoeEma');
	
	echo $twig->render(
		'home.html', 
		array(
			'fullname' => $entry->getfullname()
		)
	);
?>