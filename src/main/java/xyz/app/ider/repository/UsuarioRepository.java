package xyz.app.ider.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.app.ider.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
