package xyz.app.ider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.app.ider.model.Opciones;
import java.util.List;

public interface OpcionesRepository extends JpaRepository<Opciones, Integer> {
    List<Opciones> findByPreguntaId(int preguntaId); // NUEVO
}
