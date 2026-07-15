Entrada 1
Herramienta utilizada: Gemini
Fecha: 18 de junio de 2026
Prompt utilizado: ¿Cómo protejo rutas en React Router para que solo un rol específico pueda entrar?
Resultado generado: Crea un componente wrapper (por ejemplo RoleRoute) que reciba los children y un arreglo de roles permitidos. Dentro, verifica si existe sesión activa y si el rol del usuario está en ese arreglo; si no cumple, usa <Navigate to="/unauthorized" /> de react-router-dom para redirigir.
Modificaciones realizadas: Implementé RoleRoute.jsx y lo apliqué en las rutas de admin, coach y user dentro de AppRoutes.jsx.
Justificación: Permite reutilizar la misma lógica de protección para los tres roles sin repetir código en cada ruta.

Entrada 2
Herramienta utilizada: Gemini
Fecha: 19 de junio de 2026
Prompt utilizado: ¿Cuál es una buena forma de estructurar un CRUD con modal en React usando React-Bootstrap?
Resultado generado: Separa la lógica en dos partes: un componente de página que maneja el estado (lista, modal abierto/cerrado, item seleccionado) y llama a los servicios, y un componente modal reutilizable que solo recibe props (show, handleClose, handleSave, selectedItem) y maneja su propio formulario interno con useState.
Modificaciones realizadas: Apliqué este mismo patrón en los CRUD de Deportes, Salas, Asignaciones y Horarios para mantener consistencia entre todos.
Justificación: Mantiene el código organizado y modular, evitando repetir lógica de apertura/cierre de modal en cada página.

Entrada 3
Herramienta utilizada: Gemini
Fecha: 20 de junio de 2026
Prompt utilizado: ¿Cómo muestro confirmaciones de éxito o error después de una petición fetch en React?
Resultado generado: Usa la librería SweetAlert2 dentro de bloques try/catch: en el try muestra Swal.fire con icon "success" tras la respuesta correcta, y en el catch muestra Swal.fire con icon "error" usando el mensaje del error capturado.
Modificaciones realizadas: Integré SweetAlert2 en todas las operaciones de crear, editar y eliminar de los CRUD del proyecto.
Justificación: Cumple con el requisito de la pauta de no usar alert() nativo y da una experiencia de usuario más clara ante errores del backend.

Entrada 4
Herramienta utilizada: Gemini
Fecha: 21 de junio de 2026
Prompt utilizado: Mi API devuelve los datos anidados, por ejemplo el nombre del deporte dentro de un objeto "sport". ¿Cómo leo eso en React sin que truene si no existe?
Resultado generado: Usa optional chaining (?.) y el operador de coalescencia nula (??) para acceder de forma segura, por ejemplo objeto?.sport?.name ?? "—", y considera centralizar esa lógica en una función auxiliar si se repite en varios componentes.
Modificaciones realizadas: Creé un archivo de utilidades (sportRoomHelpers.js) con funciones para resolver el nombre del deporte, sala y coach desde la respuesta anidada real del backend.
Justificación: Evita errores en tiempo de ejecución cuando algún campo viene vacío y centraliza la lógica en un solo lugar en vez de repetirla en cada página.

Entrada 5
Herramienta utilizada: Gemini
Fecha: 2 de julio de 2026
Prompt utilizado: ¿Cómo hago para traer datos de una API cuando se abre un componente en React?
Resultado generado: Usa el hook useEffect con un arreglo de dependencias vacío [] para que se ejecute solo una vez al montar el componente, llamando ahí a la función del servicio y guardando el resultado con useState.
Modificaciones realizadas: Apliqué este patrón en todas las páginas de listado (Deportes, Salas, Horarios, Asignaciones, Mis Clases, Clases Disponibles, etc.), extrayendo la carga de datos a una función "refresh" reutilizable para volver a llamarla después de crear, editar o eliminar.
Justificación: Permite refrescar automáticamente la lista después de cada operación CRUD, cumpliendo el requisito de actualización sin recargar la página.

Entrada 6
Herramienta utilizada: Gemini
Fecha: 2 de julio de 2026
Prompt utilizado: Mi campo day_of_week viene como número desde el backend, ¿cómo lo muestro como texto tipo "Lunes", "Martes"?
Resultado generado: Crea un arreglo o diccionario que mapee cada número al nombre del día correspondiente, y una función que reciba el número y devuelva el texto, con un valor por defecto si el número no coincide con ninguno.
Modificaciones realizadas: Creé dateHelpers.js con un arreglo DAYS y una función getDayLabel() que uso en todas las páginas que muestran horarios.
Justificación: Centraliza la conversión en un solo archivo, así que si la convención de días cambia solo hay que corregir un lugar en vez de todos los componentes.

Entrada 7
Herramienta utilizada: Gemini
Fecha: 4 de julio de 2026
Prompt utilizado: ¿Cómo actualizo el nombre del usuario en el menú lateral sin recargar la página después de editar el perfil?
Resultado generado: Guarda el usuario en el estado del componente padre (useState) en vez de leerlo solo de localStorage, y pasa tanto el valor como una función para actualizarlo (setUser) como props a los componentes hijos que lo necesiten mostrar.
Modificaciones realizadas: Modifiqué los layouts (AdminLayout, CoachLayout, UserLayout) para guardar el usuario en estado y pasar una función onUserUpdated al modal de perfil.
Justificación: Cumple con el requisito de la pauta de reflejar los cambios de forma inmediata en la interfaz sin usar window.location.reload().

Entrada 8
Herramienta utilizada: Gemini
Fecha: 5 de julio de 2026
Prompt utilizado: ¿Cómo evito repetir la URL del backend en cada archivo de servicio?
Resultado generado: Define la URL base como una variable de entorno usando el prefijo VITE_ (por ejemplo VITE_API_URL) en un archivo .env, y accede a ella en el código con import.meta.env.VITE_API_URL.
Modificaciones realizadas: Centralicé la URL base en apiClient.js leyendo la variable de entorno, en vez de escribir "http://localhost:3000/api" repetido en cada servicio.
Justificación: Facilita cambiar la URL del backend al desplegar en AWS sin tener que editar múltiples archivos manualmente.

Entrada 9
Herramienta utilizada: Gemini
Fecha: 10 de julio de 2026
Prompt utilizado: ¿Por qué mi formulario de React no envía nada al hacer click en el botón de enviar?
Resultado generado: Verifica que el botón esté dentro de una etiqueta <form> con el evento onSubmit conectado a tu función; si el botón type="submit" no tiene un <form> ancestro, el navegador no dispara ningún evento de envío.
Modificaciones realizadas: Revisé mi formulario de registro y agregué la etiqueta <form onSubmit={handleSubmit}> que faltaba alrededor de los campos.
Justificación: Sin el elemento <form> conectado, la función de validación y envío nunca se ejecutaba, aunque el botón se viera visualmente correcto.

Entrada 10
Herramienta utilizada: Gemini
Fecha: 10 de julio de 2026
Prompt utilizado: ¿Cómo organizo mis commits de Git cuando hice muchos cambios en un proyecto React a la vez?
Resultado generado: Agrupa los archivos por funcionalidad relacionada usando git add sobre archivos específicos (no todo el proyecto de una vez), y escribe un mensaje de commit corto que explique qué se agregó o corrigió en ese grupo de archivos.
Modificaciones realizadas: Dividí mis cambios en commits separados por flujo (Deportes, Salas, Horarios, Asignaciones, Dashboards, etc.) en vez de hacer un solo commit gigante con todo el proyecto.
Justificación: Deja un historial de commits más claro y ordenado, útil para mostrar el avance del proyecto durante la revisión del docente.
