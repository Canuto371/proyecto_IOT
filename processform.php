<?php
// Recibir datos del formulario
$input_username = $_POST["username"] ?? '';
$input_password = $_POST["password"] ?? '';

// Datos de conexión a la base de datos
$host = "localhost";
$dbname = "iot-data";
$db_username = "root";
$db_password = "";

// Conectar a la base de datos
$conn = mysqli_connect($host, $db_username, $db_password, $dbname);

// Verificar conexión
if (!$conn) {
    die("Connection error: " . mysqli_connect_error());
}

// Configurar la zona horaria
date_default_timezone_set('America/Hermosillo');

// Obtener tiempo de acceso actual
$access_time = date("Y-m-d H:i:s");

// Consulta SQL preparada
$sql = "UPDATE usuario SET access_time = ? WHERE username = ? AND password = ?";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sql)) {
    die("Error en la preparación de la consulta: " . mysqli_error($conn));
}

// Vincular parámetros
mysqli_stmt_bind_param($stmt, "sss", $access_time, $input_username, $input_password);
mysqli_stmt_execute($stmt);

// Redirigir según el resultado
if (mysqli_stmt_affected_rows($stmt) > 0) {
    header("Location: contenedores.html");
    exit;
} else {
    echo "<script>
        alert('Usuario o contraseña incorrectos.');
        window.location.href = 'index.html';
    </script>";
    exit;
}

// Cerrar conexiones
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>