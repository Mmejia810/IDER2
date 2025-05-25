package xyz.app.ider.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.app.ider.model.Pregunta;
import xyz.app.ider.repository.PreguntaRepository;

@Service
public class PreguntaService {

	@Autowired
	private PreguntaRepository preguntaRepository;

	public Pregunta savePregunta(Pregunta pregunta) {
		return preguntaRepository.save(pregunta);
	}

	public List<Pregunta> getAllPreguntas() {
		return preguntaRepository.findAll();
	}

	public Optional<Pregunta> getPreguntaById(int id) {
		return preguntaRepository.findById(id);
	}

	public void deletePregunta(int id) {
		preguntaRepository.deleteById(id);
	}

	public List<Pregunta> getPreguntasByEncuestaId(int encuestaId) {
		return preguntaRepository.findAll().stream()
				.filter(p -> p.getSeccionEncuesta() != null &&
						p.getSeccionEncuesta().getEncuesta().getId() == encuestaId)
				.toList();
	}

	public List<Pregunta> getPreguntasBySeccionId(int seccionId) {
		return preguntaRepository.findBySeccionEncuesta_Id(seccionId);
	}

	public Pregunta actualizarPregunta(int id, Pregunta preguntaActualizada) {
		return preguntaRepository.findById(id)
				.map(p -> {
					p.setTexto(preguntaActualizada.getTexto());
					p.setTipo(preguntaActualizada.getTipo());
					p.setSeccionEncuesta(preguntaActualizada.getSeccionEncuesta());
					return preguntaRepository.save(p);
				})
				.orElseThrow(() -> new RuntimeException("Pregunta no encontrada con el id " + id));
	}
}
