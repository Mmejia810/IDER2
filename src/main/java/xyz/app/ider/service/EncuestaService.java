package xyz.app.ider.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import xyz.app.ider.model.Encuesta;
import xyz.app.ider.repository.EncuestaRepository;

@Service
public class EncuestaService {

	@Autowired
	private EncuestaRepository encuestaRepository;

	// Crear una nueva encuesta
	public Encuesta crearEncuesta(Encuesta encuesta) {
		return encuestaRepository.save(encuesta);
	}

	// Obtener todas las encuestas
	public List<Encuesta> obtenerTodasLasEncuestas() {
		return encuestaRepository.findAll();
	}

	// Obtener una encuesta por su ID
	public Optional<Encuesta> obtenerEncuestaPorId(int id) {
		return encuestaRepository.findById(id);
	}

	// Eliminar una encuesta por su ID
	public void eliminarEncuesta(int id) {
		encuestaRepository.deleteById(id);
	}

	// Actualizar una encuesta existente
	public Encuesta actualizarEncuesta(int id, Encuesta encuestaActualizada) {
		Optional<Encuesta> encuestaExistente = encuestaRepository.findById(id);
		if (encuestaExistente.isPresent()) {
			Encuesta encuesta = encuestaExistente.get();
			encuesta.setTitulo(encuestaActualizada.getTitulo());
			encuesta.setDescripcion(encuestaActualizada.getDescripcion());
			encuesta.setFechaCierre(encuestaActualizada.getFechaCierre());
			encuesta.setEstado(encuestaActualizada.getEstado());
			encuesta.setUsuario(encuestaActualizada.getUsuario());
			return encuestaRepository.save(encuesta);
		}
		return null;
	}

	// Obtener encuestas por estado
	public List<Encuesta> obtenerEncuestasPorEstado(String estado) {
		return encuestaRepository.findByEstadoIgnoreCase(estado);
	}

	// Método programado para actualizar automáticamente encuestas vencidas
	@Scheduled(cron = "0 0 0 * * ?") // Todos los días a la medianoche
	public void actualizarEncuestasInactivas() {
		List<Encuesta> todasLasEncuestas = encuestaRepository.findAll();
		Date ahora = new Date();
		for (Encuesta encuesta : todasLasEncuestas) {
			if (encuesta.getFechaCierre() != null &&
					encuesta.getFechaCierre().before(ahora) &&
					!"inactiva".equalsIgnoreCase(encuesta.getEstado())) {

				encuesta.setEstado("inactiva");
				encuestaRepository.save(encuesta);
			}
		}
	}
}
