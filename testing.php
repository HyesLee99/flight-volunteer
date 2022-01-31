<?php

$baseUrl = 'https://www.instagram.com/explore/tags/girls/?__a=1';
$url = $baseUrl;

while(1) {
    $json = json_decode(file_get_contents($url));
    print_r($json->tag->media->nodes);
    if(!$json->tag->media->page_info->has_next_page) break;
    $url = $baseUrl.'&max_id='.$json->tag->media->page_info->end_cursor;
}
?>