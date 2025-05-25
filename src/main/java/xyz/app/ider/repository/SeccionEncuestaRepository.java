package xyz.app.ider.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.app.ider.model.SeccionEncuesta;

public interface SeccionEncuestaRepository extends JpaRepository<SeccionEncuesta, Integer> {
    List<SeccionEncuesta> findByEncuestaId(int encuestaId); // <- método para filtrar por encuesta
}
