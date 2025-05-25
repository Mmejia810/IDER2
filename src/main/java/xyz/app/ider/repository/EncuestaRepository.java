package xyz.app.ider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import xyz.app.ider.model.Encuesta;

public interface EncuestaRepository extends JpaRepository<Encuesta, Integer> {
    List<Encuesta> findByEstadoIgnoreCase(String estado);  // ✅ nuevo método
}
