const Beneficios = {
  Pedidos:[
    "Optimiza tiempo y recursos en la toma de pedidos, evitando posibles errores.",
    "Le permite Generar desde su móvil de manera rápida y segura proformas, pedidos y facturas.",
    "Afianza a sus clientes por brindar un servicio rápido, eficaz y adecuado.",
    "Permite que nuestros usuarios puedan tener una mejor planificación de su Producción.",
    "Le ayuda a mantener sus cuentas al día de pagos, abonos y saldos.",
    "En caso de pérdida del dispositivo la información se encuentra segura en la nube.",
  ],
  Reportes: [
    "Ahorro de tiempo y dinero",
    "Generar informes personalizados",
    "Mejorar la toma de decisiones",
    "Aumentar la eficiencia",
    "Medir resultados por periodos de tiempo",
  ],
  Produccion:[
    "Control de Inventario.",
    "Analiza cada fase del proceso productivo para reducir costos y añadir valor y calidad al producto final.",
    "Automatiza el nivel de producción y aprovisionamiento según la demanda de los clientes.",
    "Ayuda a reducir los tiempos improductivos.",
    "Le permite tener el conocimiento del stock de insumos y materia prima de su bodega."
  ],
  Track: [
    "Nuestra aplicación le facilita un código de seguridad para que usted pueda compartir con su persona de confianza en caso de emergencia.",
    "Usted puede bloquear y desbloquear el motor de se vehiculó cuando considere necesario.",
    "Le permite tener el control de su personal o flota de trasporte evitando pérdidas de tiempo y recursos.",
    "Puede evitar posibles accidentes controlando la velocidad desde su dispositivo celular por medio de la aplicación.",
    "Nuestra aplicación realizará una llamada de alerta a su celular para notificarle la manipulación no autorizada de su vehículo.",
    "Al aplastar el botón de pánico nuestra aplicación realizará una llamada SOS, a tres contactos preestablecidos, para notificar este suceso y le pueden ayudar lo antes posible.",
    "Usted puede escuchar las conversaciones de la cabina en caso de emergencia."
  ],
  Alianza: [
    "Reduce la carga de trabajo considerablemente.",
    "Se libera espacio en su dispositivo móvil, ya que toda la información como documentos, convocatorias, comunicaciones, publicidad se queda guardada en la nube",
    "Se puede enviar de forma masiva mensajes a sus grupos y subgrupos.",
    "En caso de pérdida de su dispositivo la información se encuentra segura en la nube.",
  ]
}

function sortByLength(arr) {
  return arr.sort((a, b) => b.length - a.length);
}

// Ordena los elementos de cada categoría de mayor a menor por la cantidad de caracteres
export const BeneficiosApp = {
  Pedidos: sortByLength(Beneficios.Pedidos),
  Alianza: sortByLength(Beneficios.Alianza),
  Track: sortByLength(Beneficios.Track),
  Reportes: sortByLength(Beneficios.Reportes),
  Produccion: sortByLength(Beneficios.Produccion)
};