<?php

include("conexao.php");



$obterDados = file_get_contents("php://input");

$extrair = json_decode($obterDados);

$idCurso = $extrair->cursos->idCurso;
$nomeCurso = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;


$sql= "UPDATE cursos SET nomeCurso='$nomeCurso', valorCurso=$valorCurso WHERE idCurso=$idCurso";
mysqli_query($conexao, $sql);



$cursos = [

    'idCurso' => $idCurso,
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];


 json_encode(['cursos' => $cursos]);



?>