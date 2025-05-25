package xyz.app.ider.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.app.ider.dto.RespuestaDTO;
import xyz.app.ider.model.*;
import xyz.app.ider.repository.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RespuestaService {

	@Autowired
	private RespuestaRepository respuestaRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private SeccionEncuestaRepository seccionEncuestaRepository;

	@Autowired
	private PreguntaRepository preguntaRepository;

	@Autowired
	private OpcionesRepository opcionesRepository;

	public RespuestaDTO saveRespuesta(Respuesta respuesta) {
		// Guardar primero
		Respuesta saved = respuestaRepository.save(respuesta);

		// Cargar entidades completas por ID
		Usuario usuario = usuarioRepository.findById(saved.getUsuario().getId()).orElse(null);
		SeccionEncuesta seccion = seccionEncuestaRepository.findById(saved.getSeccionEncuesta().getId()).orElse(null);
		Pregunta pregunta = preguntaRepository.findById(saved.getPregunta().getId()).orElse(null);

		// Para cada opción, cargar sus datos y convertir a DTO
		List<RespuestaDTO.OpcionDTO> opcionesDTO = saved.getOpciones().stream()
				.map(o -> opcionesRepository.findById(o.getId()).orElse(null))
				.filter(o -> o != null)
				.map(opcion -> new RespuestaDTO.OpcionDTO(
						opcion.getId(),
						opcion.getTexto(),
						opcion.getTipo()
				))
				.collect(Collectors.toList());

		// Construir el DTO con los datos completos
		return new RespuestaDTO(
				saved.getId(),
				saved.getRespuesta(),
				usuario != null ? usuario.getId() : 0,
				usuario != null ? usuario.getNombre() : null,
				usuario != null ? usuario.getEmail() : null,
				seccion != null ? seccion.getId() : 0,
				seccion != null ? seccion.getTitulo() : null,
				pregunta != null ? pregunta.getId() : 0,
				pregunta != null ? pregunta.getTexto() : null,
				pregunta != null ? pregunta.getTipo() : null,
				opcionesDTO
		);
	}

	@Transactional(readOnly = true)
	public List<RespuestaDTO> obtenerTodasLasRespuestas() {
		List<Respuesta> respuestas = respuestaRepository.findAll();

		return respuestas.stream().map(this::convertirADTO).collect(Collectors.toList());
	}

	private RespuestaDTO convertirADTO(Respuesta saved) {
		Usuario usuario = usuarioRepository.findById(saved.getUsuario().getId()).orElse(null);
		SeccionEncuesta seccion = seccionEncuestaRepository.findById(saved.getSeccionEncuesta().getId()).orElse(null);
		Pregunta pregunta = preguntaRepository.findById(saved.getPregunta().getId()).orElse(null);

		List<RespuestaDTO.OpcionDTO> opcionesDTO = saved.getOpciones().stream()
				.map(o -> opcionesRepository.findById(o.getId()).orElse(null))
				.filter(Objects::nonNull)
				.map(opcion -> new RespuestaDTO.OpcionDTO(
						opcion.getId(),
						opcion.getTexto(),
						opcion.getTipo()
				))
				.collect(Collectors.toList());

		return new RespuestaDTO(
				saved.getId(),
				saved.getRespuesta(),
				usuario != null ? usuario.getId() : 0,
				usuario != null ? usuario.getNombre() : null,
				usuario != null ? usuario.getEmail() : null,
				seccion != null ? seccion.getId() : 0,
				seccion != null ? seccion.getTitulo() : null,
				pregunta != null ? pregunta.getId() : 0,
				pregunta != null ? pregunta.getTexto() : null,
				pregunta != null ? pregunta.getTipo() : null,
				opcionesDTO
		);
	}
}
