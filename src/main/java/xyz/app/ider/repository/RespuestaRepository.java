package xyz.app.ider.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import xyz.app.ider.model.Respuesta;

import java.util.List;

public interface RespuestaRepository extends JpaRepository<Respuesta, Integer> {

    @Override
    @EntityGraph(attributePaths = {
            "usuario",
            "seccionEncuesta",
            "pregunta",
            "opciones"
    })
    List<Respuesta> findAll();
}
