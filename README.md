# Planificador Académico

Aplicación móvil diseñada para ayudar a los estudiantes a organizar sus actividades académicas, administrar sus pendientes y planificar mejor su tiempo de estudio.

## Problema

Muchos estudiantes tienen dificultades para organizar su tiempo y cumplir con sus tareas. Un [estudio](https://portal.amelica.org/ameli/journal/443/4432904010/html/) indica que el 47,1 % no siente que controla su tiempo, y otros estudios muestran que la procrastinación es muy común entre los estudiantes. En bachillerato esto se agrava porque varias tareas y exámenes coinciden en los mismos días. Las herramientas existentes permiten registrar actividades, pero no siempre integran la información académica con una planificación personalizada según el tiempo disponible de cada estudiante.

## Solución

El **Planificador Académico** permite registrar materias, tareas y exámenes en un solo lugar, ordenarlos por fecha y prioridad, y mostrar qué conviene hacer cada día. Así, el estudiante evita olvidar entregas y reparte mejor su tiempo de estudio.

## Objetivos

- **Registrar actividades.** Prueba manual: crear "Examen de Física, 20/11, alta" y verificar que aparece con materia, fecha y prioridad.
- **Ordenar actividades.** Prueba manual con las tareas A (18/11, baja), B (18/11, alta) y C (17/11, media). Resultado esperado: C, B, A.
- **Generar un plan de estudio.** Prueba manual con 4 horas y las actividades X (2 h, alta), Y (1 h, media) y Z (2 h, baja). Resultado esperado: plan con X e Y, y Z sin programar.
- **Mostrar el porcentaje de completadas.** Prueba manual con 10 actividades y 4 marcadas como hechas. Resultado esperado: 40 %.

## Funcionalidades principales

- **Gestión de actividades:** agregar tareas y exámenes con materia, fecha y prioridad.
- **Organización:** ver las actividades ordenadas por fecha e importancia.
- **Seguimiento:** marcar actividades como completadas.
- **Progreso:** consultar el porcentaje de actividades completadas y las pendientes.
- **Planificación:** distribuir las actividades según las horas disponibles para estudiar.

## Alcance de la primera versión

La primera versión permite registrar materias, tareas y exámenes con su fecha y prioridad. Muestra una lista ordenada de lo que hay que hacer primero, permite marcar actividades como completadas y muestra el progreso. También genera un plan de estudio sencillo según las horas disponibles del estudiante.

## Restricciones

- Funciona en celular y en web con Expo, sin publicarse en tiendas de aplicaciones.
- No tiene cuentas de usuario ni servidor; los datos se guardan en el mismo dispositivo.
- Los datos no se sincronizan entre dispositivos.
- No usa inteligencia artificial; el plan se genera con reglas simples.
- La reorganización automática del cronograma queda para una versión futura.
- No incluye funciones de comunidad ni chat entre estudiantes.

## Tecnologías utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Plataforma

Aplicación móvil hecha con Expo y React Native. Puede ejecutarse en celular con Expo Go y también en el navegador, con un diseño adaptable a diferentes tamaños de pantalla.

## Almacenamiento

La primera versión guarda los datos en el propio dispositivo con AsyncStorage. No requiere cuentas de usuario ni servidor.

> Si se borran los datos de la aplicación o del navegador, la información guardada podría perderse.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jmatuu/Planificador-Academico.git
```

### 2. Entrar al proyecto

```bash
cd Planificador-Academico
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

En el navegador:

```bash
npm run web
```

En el celular, con la app Expo Go:

```bash
npx expo start
```

## Estado del proyecto

🚧 **En desarrollo.**

El proyecto se encuentra en su etapa inicial de configuración y construcción de su estructura principal.

## Autor

Desarrollado por **Jmatuu**.

---

*Planificador Académico: organiza tus actividades, administra tu tiempo y mejora tu organización estudiantil.*
