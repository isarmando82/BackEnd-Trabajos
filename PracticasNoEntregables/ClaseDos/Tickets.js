class TicketManager {
    constructor() {
      this.eventos = [];
      this.precioBaseDeGanancia = 0.15;
    }
  
    getEventos() {
      return this.eventos;
    }
  
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
      const evento = {
        id: this.eventos.length + 1,
        nombre,
        lugar,
        precio: precio + precio * this.precioBaseDeGanancia,
        capacidad,
        fecha,
        participantes: []
      };
  
      this.eventos.push(evento);
    }
  
    agregarUsuario(eventoId, usuarioId) {
      const evento = this.eventos.find((e) => e.id === eventoId);
  
      if (!evento) {
        console.log('Error: Evento no encontrado.');
        return;
      }
  
      if (evento.participantes.includes(usuarioId)) {
        console.log('Error: El usuario ya está registrado en este evento.');
        return;
      }
  
      evento.participantes.push(usuarioId);
      console.log('Usuario registrado correctamente en el evento.');
    }
  
    ponerEventoEnGira(eventoId, nuevaLocalidad, nuevaFecha) {
      const eventoExistente = this.eventos.find((e) => e.id === eventoId);
  
      if (!eventoExistente) {
        console.log('Error: Evento no encontrado.');
        return;
      }
  
      const eventoGira = {
        ...eventoExistente,
        id: this.eventos.length + 1,
        lugar: nuevaLocalidad,
        fecha: nuevaFecha,
        participantes: []
      };
  
      this.eventos.push(eventoGira);
      console.log('Evento puesto en gira correctamente.');
    }
  }
  
  const ticketManager = new TicketManager();
  
  // Agregar un nuevo evento
  ticketManager.agregarEvento('Concierto', 'Estadio X', 100, 2000, new Date('2023-07-01'));
  
  // Agregar usuario a un evento
  ticketManager.agregarUsuario(1, 'usuario1');
  
  // Poner evento en gira
  ticketManager.ponerEventoEnGira(1, 'Nuevo Lugar', new Date('2023-07-15'));
  
  // Mostrar todos los eventos
  console.log(ticketManager.getEventos());
  