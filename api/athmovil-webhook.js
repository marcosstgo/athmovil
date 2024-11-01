export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const evento = req.body;

    if (!evento || typeof evento !== 'object') {
      console.error('❌ El evento recibido no contiene datos válidos.');
      return res.status(400).json({ message: 'Evento no válido' });
    }

    console.log('Evento recibido:', evento);

    const {
      referenceNumber,
      status,
      items,
      tax,
      subtotal,
      total,
      fee,
      netAmount,
      transactionType,
      date,
      email,
      phoneNumber,
      name,
      metadata1,
      metadata2,
      message,
    } = evento;

    // Convertir el estado a minúsculas para evitar problemas de coincidencia
    const normalizedStatus = status ? status.toLowerCase() : '';

    // Log detallado de la información recibida
    console.log(`Referencia: ${referenceNumber}`);
    console.log(`Estado: ${status}`);
    console.log(`Total: ${total}`);
    console.log(`Subtotal: ${subtotal}`);
    console.log(`Impuesto: ${tax}`);
    console.log(`Comisión: ${fee}`);
    console.log(`Monto neto: ${netAmount}`);
    console.log(`Transacción: ${transactionType}`);
    console.log(`Fecha: ${date}`);
    console.log(`Cliente: ${name} (${email}, ${phoneNumber})`);
    console.log(`Mensaje: ${message}`);
    console.log(`Metadata1: ${metadata1}, Metadata2: ${metadata2}`);

    // Procesar items recibidos
    if (items && items.length > 0) {
      items.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, item);
      });
    } else {
      console.log('No se recibieron items en este evento.');
    }

    // Verificación del estado del pago
    if (normalizedStatus === 'completed') {
      console.log(`✅ Pago completado con referencia: ${referenceNumber}`);
    } else if (normalizedStatus === 'cancelled') {
      console.log('⚠️ El pago fue cancelado por el usuario.');
    } else if (normalizedStatus === 'expired') {
      console.log('⚠️ El pago ha expirado.');
    } else {
      console.log('⚠️ Estado del pago desconocido:', status);
    }

    res.status(200).json({ message: 'Evento procesado correctamente' });
  } catch (error) {
    console.error('❌ Error procesando el evento:', error);
    res.status(500).json({ message: 'Error procesando el evento' });
  }
}
