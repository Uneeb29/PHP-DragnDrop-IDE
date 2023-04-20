<?php
$veryObscureVariable = fopen("D:/write.txt","r" );
$x =fread($veryObscureVariable,filesize("D:/write.txt"));
fclose($veryObscureVariable);
echo "$x";
$y = "wtf";
$x = $x . "$y";

echo "$x";
 
?>