package xyz.app.ider.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.app.ider.model.Opciones;
import xyz.app.ider.model.Pregunta;
import xyz.app.ider.service.OpcionesService;
import xyz.app.ider.repository.PreguntaRepository;
import xyz.app.ider.dto.OpcionDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/opciones")
@CrossOrigin(origins = "http://localhost:4200")
public class OpcionesRest {

    @Autowired
    private OpcionesService opcionesService;

    @Autowired
    private PreguntaRepository preguntaRepository;

    @PostMapping
    public Opciones crearOpcion(@RequestBody Opciones opcion) {
        return opcionesService.crearOpcion(opcion);
    }

    @PostMapping("/conPregunta")
    public ResponseEntity<?> crearOpcionConPregunta(@RequestBody OpcionDTO opcionDTO) {
        Pregunta pregunta = preguntaRepository.findById(opcionDTO.getPreguntaId())
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));
        Opciones opcion = new Opciones();
        opcion.setPregunta(pregunta);
        opcion.setTexto(opcionDTO.getTexto());
        opcion.setTipo(opcionDTO.getTipo());
        opcion.setSeleccionable(opcionDTO.isSeleccionable());
        opcionesService.crearOpcion(opcion);
        return ResponseEntity.ok("Opción creada con éxito");
    }

    @GetMapping
    public List<Opciones> obtenerOpciones() {
        return opcionesService.obtenerOpciones();
    }

    @GetMapping("/{id}")
    public Optional<Opciones> obtenerOpcionPorId(@PathVariable int id) {
        return opcionesService.obtenerOpcionPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarOpcion(@PathVariable int id) {
        opcionesService.eliminarOpcion(id);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Opciones> actualizarOpcion(@PathVariable int id, @RequestBody Opciones opcionActualizada) {
        Opciones opcion = opcionesService.actualizarOpcion(id, opcionActualizada);
        return ResponseEntity.ok(opcion);
    }

    // NUEVO: Obtener opciones por ID de pregunta
    @GetMapping("/porPregunta/{preguntaId}")
    public ResponseEntity<List<Opciones>> obtenerOpcionesPorPregunta(@PathVariable int preguntaId) {
        List<Opciones> opciones = opcionesService.obtenerOpcionesPorPreguntaId(preguntaId);
        return ResponseEntity.ok(opciones);
    }
}
