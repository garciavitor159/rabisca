<?php
function limparVal($val)
{
    $val = trim($val);
    $val = htmlspecialchars($val, ENT_QUOTES, "UTF-8");
    return $val;
}
