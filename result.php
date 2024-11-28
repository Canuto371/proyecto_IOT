<?php
$status = $_GET['status'] ?? '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <?php if ($status === 'success'): ?>
            <h1>Inicio de sesión exitoso</h1>
            <p>¡Bienvenido al sistema! El tiempo de acceso se actualizó correctamente.</p>
            <a href="index.html">Volver al inicio</a>
        <?php elseif ($status === 'error'): ?>
            <h1>Error en el inicio de sesión</h1>
            <p>El nombre de usuario o la contraseña son incorrectos. Inténtalo de nuevo.</p>
            <a href="index.html">Volver al inicio</a>
        <?php else: ?>
            <h1>Acceso no válido</h1>
            <p>No se proporcionaron datos válidos para el inicio de sesión.</p>
            <a href="index.html">Volver al inicio</a>
        <?php endif; ?>
    </main>
</body>
</html>
