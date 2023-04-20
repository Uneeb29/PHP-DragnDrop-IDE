<!DOCTYPE html>
<html>
<head>
  <title>Server</title>
  <style>
    body {
      background-image: url("pic.jpg");
    }
    div{
        position: absolute;
        left: 20%;
        top: 20%;
        border: 2px solid black;
        width: 50vw;
        height: 50vh;
    }
    h1{
        color: white;
        text-align: center;
    }
    p{
        font-size: 50px;
        color: white;
    }
    
  </style>
</head>
<body>
    <div>
        <h1>Code Output</h1>
        <p>
            <?php
                    // Retrieve the code from the POST request
                $code = $_POST['finalCode'];
                $output = eval($code);
                // Execute the code using the eval() function
                echo " $output";
            ?>
        </p>
    </div>
</body>
</html>

