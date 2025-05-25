package xyz.app.ider.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.app.ider.model.Opciones;
import xyz.app.ider.repository.OpcionesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OpcionesService {

    @Autowired
    private OpcionesRepository opcionesRepository;

    public Opciones crearOpcion(Opciones opcion) {
        return opcionesRepository.save(opcion);
    }

    public List<Opciones> obtenerOpciones() {
        return opcionesRepository.findAll();
    }

    public Optional<Opciones> obtenerOpcionPorId(int id) {
        return opcionesRepository.findById(id);
    }

    public void eliminarOpcion(int id) {
        opcionesRepository.deleteById(id);
    }

    public Opciones actualizarOpcion(int id, Opciones opcionActualizada) {
        return opcionesRepository.findById(id)
                .map(opcion -> {
                    opcion.setTipo(opcionActualizada.getTipo());
                    opcion.setTexto(opcionActualizada.getTexto());
                    opcion.setSeleccionable(opcionActualizada.isSeleccionable());
                    opcion.setPregunta(opcionActualizada.getPregunta());
                    return opcionesRepository.save(opcion);
                })
                .orElseThrow(() -> new RuntimeException("Opción no encontrada con ID: " + id));
    }

    // NUEVO: Obtener opciones por id de pregunta
    public List<Opciones> obtenerOpcionesPorPreguntaId(int preguntaId) {
        return opcionesRepository.findByPreguntaId(preguntaId);
    }
}
