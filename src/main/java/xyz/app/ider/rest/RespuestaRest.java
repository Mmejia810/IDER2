package xyz.app.ider.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import xyz.app.ider.dto.RespuestaDTO;
import xyz.app.ider.model.Respuesta;
import xyz.app.ider.service.RespuestaService;

@RestController
@RequestMapping("/respuestas")
@CrossOrigin(origins = "http://localhost:4200")
public class RespuestaRest {

	@Autowired
	private RespuestaService respuestaService;

	// Guardar una respuesta (POST)
	@PostMapping
	public RespuestaDTO responderEncuesta(@RequestBody Respuesta respuesta) {
		return respuestaService.saveRespuesta(respuesta);
	}

	// Obtener todas las respuestas (GET)
	@GetMapping
	public List<RespuestaDTO> obtenerRespuestas() {
		return respuestaService.obtenerTodasLasRespuestas();
	}
}
