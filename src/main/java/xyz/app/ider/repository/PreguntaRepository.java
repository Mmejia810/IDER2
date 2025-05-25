package xyz.app.ider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.app.ider.model.Pregunta;
import java.util.List;

public interface PreguntaRepository extends JpaRepository<Pregunta, Integer> {
    List<Pregunta> findBySeccionEncuesta_Id(int seccionId);
}
