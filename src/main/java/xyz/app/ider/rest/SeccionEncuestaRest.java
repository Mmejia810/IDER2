package xyz.app.ider.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import xyz.app.ider.model.SeccionEncuesta;
import xyz.app.ider.service.SeccionEncuestaService;

@RestController
@RequestMapping("/secciones")
@CrossOrigin(origins = "http://localhost:4200")
public class SeccionEncuestaRest {

	@Autowired
	private SeccionEncuestaService seccionEncuestaService;

	@PostMapping
	public ResponseEntity<SeccionEncuesta> crearSeccion(@RequestBody SeccionEncuesta seccionEncuesta) {
		SeccionEncuesta nuevaSeccion = seccionEncuestaService.crearSeccion(seccionEncuesta);
		return ResponseEntity.ok(nuevaSeccion);
	}

	// 🔁 Listar secciones (todas o filtradas por encuestaId)
	@GetMapping
	public ResponseEntity<List<SeccionEncuesta>> listarSecciones(
			@RequestParam(required = false) Integer encuestaId) {
		if (encuestaId != null) {
			List<SeccionEncuesta> seccionesFiltradas = seccionEncuestaService.listarSeccionesPorEncuesta(encuestaId);
			return ResponseEntity.ok(seccionesFiltradas);
		} else {
			List<SeccionEncuesta> todasLasSecciones = seccionEncuestaService.listarSecciones();
			return ResponseEntity.ok(todasLasSecciones);
		}
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<Void> eliminarSeccion(@PathVariable int id) {
		seccionEncuestaService.eliminarSeccion(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/actualizar/{id}")
	public ResponseEntity<SeccionEncuesta> actualizarSeccion(@PathVariable int id,
															 @RequestBody SeccionEncuesta seccionEncuesta) {
		seccionEncuesta.setId(id);
		SeccionEncuesta seccionActualizada = seccionEncuestaService.actualizarSeccion(seccionEncuesta);
		return ResponseEntity.ok(seccionActualizada);
	}

	@GetMapping("/obtener/{id}")
	public ResponseEntity<SeccionEncuesta> obtenerSeccionPorId(@PathVariable int id) {
		Optional<SeccionEncuesta> seccion = seccionEncuestaService.obtenerSeccionPorId(id);
		return seccion.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	// 🔁 Este ya no lo necesitas si usas el endpoint con @RequestParam, pero lo dejo si lo quieres usar
	@GetMapping("/obtenerporEncuesta/{encuestaId}")
	public ResponseEntity<List<SeccionEncuesta>> listarSeccionesPorEncuesta(@PathVariable int encuestaId) {
		List<SeccionEncuesta> secciones = seccionEncuestaService.listarSeccionesPorEncuesta(encuestaId);
		return ResponseEntity.ok(secciones);
	}
}
