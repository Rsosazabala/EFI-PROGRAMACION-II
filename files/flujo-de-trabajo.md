# Flujo de trabajo y control de calidad — DonaJusto

## Metodología (SDD adaptado)
1. **Explorar:** leer `docs/contexto/` antes de tocar código.
2. **Proponer:** definir qué se va a construir o cambiar y validar que no use tecnología prohibida.
3. **Tareas:** dividir el trabajo en pasos chicos y concretos.
4. **Aplicar:** escribir HTML semántico → estilos con Tailwind → interactividad en JS.
5. **Verificar:** repasar la checklist de abajo y dejar constancia en `REPORTE_VERIFICACION_SDD.md`.

## Checklist de "listo" (Definition of Done)
- [ ] El sitio abre sin errores en el navegador.
- [ ] Se probó en vista móvil (F12 → modo responsive) sin scroll horizontal roto.
- [ ] Los 3 bloques funcionan: Inicio, Catálogo (con modal) y Formulario.
- [ ] El botón de modo claro/oscuro cambia la paleta y el texto se sigue leyendo bien.
- [ ] El formulario muestra un aviso visual al enviarse.
- [ ] Cero errores en la consola (F12 → Console).

## Orden sugerido de construcción
1. Estructura HTML5 de las 3 vistas + navbar + footer.
2. Estilos con TailwindCSS (paleta, tipografía, responsive).
3. Datos de prueba (comedores, necesidades) en `app.js`.
4. Interactividad: navegación SPA, modal, menú móvil, modo claro/oscuro, formulario.
5. Animaciones en los elementos principales (hover en tarjetas, transiciones de vista).
