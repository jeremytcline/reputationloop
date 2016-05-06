<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Response;
use GuzzleHttp\Client;

class ReviewController extends Controller
{
    public function getReviews($page=0)
    {
        $perPage = 10;
        $url = "http://test.localfeedbackloop.com/api";
        $params = array(
            "apiKey" => "61067f81f8cf7e4a1f673cd230216112",
            "noOfReviews" => $perPage,
            "internal" => "1",
            "yelp" => "1",
            "google" => "1",
            "offset" => $page*$perPage,
            "threshold" => "1"
        );
        $ret = array(
            "perPage" => $perPage,
            "results" => self::getRequest($url, $params)
        );
        return Response::json($ret);
    }
    private function getRequest($url = '', $params = array())
    {
        $client = new \GuzzleHttp\Client();
        $endpoint = $url.'?'.http_build_query($params, '', '&');
        $response = $client->get($endpoint);
        if ($response->getBody())
            return json_decode($response->getBody());
        else
            return array();
   }
}