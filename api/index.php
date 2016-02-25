<?php
require '../Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->get('/articles', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $rs = $db->query('SELECT * FROM articles ORDER BY date DESC;');
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    echo json_encode($data);
});

$app->get('/articles/:index', function ($index) use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $sql = "SELECT * FROM articles WHERE `id`=$index";
    $rs = $db->query($sql);
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    echo json_encode($data);
});

$app->post('/articles/author', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $author_email =$data_array['email'];
    $sql = "SELECT * FROM articles WHERE `author`='$author_email'";
    $rs = $db->query($sql);
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    echo  json_encode($data);
//    echo $sql;
});

$app->post('/articles', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $title = $data_array["title"];
    $author = $data_array["author"];
    $content = $data_array["content"];
    $date = $data_array["date"];
    $sql = "INSERT INTO `articles` (`id`, `title`, `author`,`content`, `date`)
	VALUES (NULL, '$title', '$author','$content', '$date')";
    $db->query($sql);
    echo $sql;
});

$app->delete('/articles/:index', function ($index) use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $sql = "DELETE FROM `articles` WHERE `id`=$index";
    $sql_ = "DELETE FROM `comments` WHERE `article_id`=$index";
    $db->query($sql);
    $db->query($sql_);
    echo $sql;
});

$app->put('/articles', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $title = $data_array["title"];
    $author = $data_array["author"];
    $content = $data_array["content"];
    $date = $data_array["date"];
    $id = $data_array["id"];
    $sql = "UPDATE `articles` SET
`title`='$title', `author`='$author',`content`='$content', `date` = '$date'
WHERE `id` = '$id'";
    $db->query($sql);
    echo $sql;
});

$app->get('/comments/:id', function ($id) use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $sql = "SELECT * FROM `comments` WHERE `article_id`=$id ";
    $rs = $db->query($sql);
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    echo json_encode($data);
});

$app->post('/comments', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $article_id = $data_array["article_id"];
    $comment = $data_array["comment"];
    $author = $data_array["author"];
    $date = $data_array["date"];
    $sql = "INSERT INTO `comments` (`id`, `article_id`, `comment`, `author`,`date`)
	VALUES (NULL, '$article_id','$comment', '$author', '$date')";
    $db->query($sql);
    echo $sql;
});


$app->post('/users', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);

    $email = $data_array["email"];
    $sql_email = "SELECT * FROM `users` WHERE `email`='$email'";
    $rs = $db->query($sql_email);
    if ($rs->num_rows != 0) {
        $app->response->setStatus(409);
//        http_response_code(409);
        echo " User with email: $email already exist!";
    } else {
        $password = $data_array["password"];
        $name = $data_array["name"];
        $sql = "INSERT INTO `users` (`email`, `password`, `name`)
	VALUES ('$email','$password', '$name')";
        $db->query($sql);
        echo "";
    }
});

$app->post('/users/login', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);

    $email = $data_array["email"];
    $password = $data_array["password"];
    $sql_email = "SELECT * FROM `users` WHERE `email`='$email'";
    $rs = $db->query($sql_email);
    $data = $rs->fetch_all(MYSQLI_ASSOC);

    if ($rs->num_rows != 0) {
        $realPass = $data[0]['password'];
        if ($password == $realPass) {
            $unicode = uniqid();
            $sql = "UPDATE `users` SET `unicode` = '$unicode' WHERE `email` = '$email'";
            $db->query($sql);
            echo $unicode;
        } else{
            $app->response->setStatus(400);
            echo "Password does not correct!";
        }
    } else {
        $app->response->setStatus(404);
        echo "User does not exist!";
    }


});


$app->post('/users/login/email', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $email = $data_array["email"];
    $sql_email = "SELECT * FROM `users` WHERE `email`='$email'";
    $rs = $db->query($sql_email);
    if ($rs->num_rows != 0) {
        $app->response->setStatus(409);
        echo "User with email: $email already exist!";
    }
    echo $sql_email;
});
$app->post('/users/login/check', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $user_email = $data_array["email"];
    $user_code = $data_array["code"];
    $sql = "SELECT * FROM `users` WHERE `email`='$user_email' AND `unicode`='$user_code'";
    $rs = $db->query($sql);
    if ($rs->num_rows == 0) {
        $app->response->setStatus(401);
        echo "User is not authorized to access data.".$sql;
    }
});

$app->post('/stuff', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $name = $data_array["name"];
    $num = $data_array["num"];
    $price = $data_array["price"];
    $room = $data_array["room"];
    $link = $data_array["link"];
    $image = $data_array["image"];
    $currency = $data_array["currency"];
    $weight = $data_array["weight"];
    $sql = "INSERT INTO  `stuff` (`id`, `name`, `num`, `price`, `room`,
 `link`,`image`, `currency`, `weight`)
VALUES (NULL, '$name', $num, $price, '$room',
'$link', '$image', '$currency', '$weight')";
    $db->query($sql);
    echo $sql;

});

$app->get('/stuff', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $sql = "SELECT * FROM `stuff`";
    $rs = $db->query($sql);
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
   // error_log("Output json".$json,3, "./server.log");
    echo $json;
});

$app->delete('/stuff/:index', function ($index) use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();
    $sql = "DELETE FROM `stuff` WHERE `id`=$index";
    $db->query($sql);
    $sql_get = "SELECT * FROM `stuff`";
    $rs = $db->query($sql_get);
    $data = $rs->fetch_all(MYSQLI_ASSOC);
    $app->contentType("application/json");
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    // error_log("Output json".$json,3, "./server.log");
    echo $json;
});

$app->put('/stuff', function () use ($app) {
    require_once '../lib/mysql.php';
    $db = connect_db();

    $json = $app->request->getBody();
    $data_array = json_decode($json, true);
    $id = $data_array["id"];
    $name = $data_array["name"];
    $num = $data_array["num"];
    $price = $data_array["price"];
    $room = $data_array["room"];
    $link = $data_array["link"];
    $image = $data_array["image"];
    $currency = $data_array["currency"];
    $weight = $data_array["weight"];
    $sql = "UPDATE `stuff` SET
`name`='$name', `num`='$num',`price`='$price',
`room` = '$room', `link` = '$link',`image` = '$image',
 `currency` = '$currency', `weight` = '$weight'
WHERE `id` = '$id'";
    $db->query($sql);
    echo $sql;
});

$app->run();
?>

