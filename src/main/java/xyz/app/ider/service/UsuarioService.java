package xyz.app.ider.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import xyz.app.ider.model.Roles;
import xyz.app.ider.model.Usuario;
import xyz.app.ider.repository.UsuarioRepository;

@Service
public class UsuarioService implements UsuarioRepository {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public Optional<Usuario> findById(Integer id) { 	//En uso findById
		return usuarioRepository.findById(id);
	}
	
	@Override
	public List<Usuario> findAll() {		//EN USO findAll()		
		return usuarioRepository.findAll();
	}
	
	// En UsuarioService.java
	public Optional<Usuario> login(String email, String password) {
	    return usuarioRepository.findAll().stream()
	        .filter(usuario -> usuario.getEmail().equals(email) && usuario.getPass().equals(password))
	        .findFirst();  // Devolvemos el usuario si se encuentra
	}

	
	public Usuario registrarUsuario(Usuario nuevoUsuario) {	    
	    Roles rolPorDefecto = new Roles(); 
	    rolPorDefecto.setId_rol(2); 

	    nuevoUsuario.setRol(rolPorDefecto);
	    return usuarioRepository.save(nuevoUsuario); 
	}
	
	public Optional<Usuario> findByEmail(String email) {
	    return usuarioRepository.findAll().stream()
	            .filter(usuario -> usuario.getEmail().equals(email))
	            .findFirst();
	}

	
	public Usuario actualizarUsuario(Integer id, Usuario usuarioActualizado) {
	    // Verificar si el usuario existe
	    Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
	    if (usuarioOpt.isPresent()) {
	        Usuario usuario = usuarioOpt.get();
	        
	        // Actualizar los campos del usuario
	        usuario.setIdentificacion(usuarioActualizado.getIdentificacion());
	        usuario.setNombre(usuarioActualizado.getNombre());
	        usuario.setApellido(usuarioActualizado.getApellido());
	        usuario.setEmail(usuarioActualizado.getEmail());
	        usuario.setPass(usuarioActualizado.getPass());
	        usuario.setEstado(usuarioActualizado.getEstado());
	        usuario.setRol(usuarioActualizado.getRol());  // Si necesitas actualizar el rol también
	        
	        // Guardar el usuario actualizado
	        return usuarioRepository.save(usuario);
	    }
	    return null;  // Retornar null si el usuario no existe
	}

	public List<Usuario> findUsuariosByRolId(Integer rolId) {
	    return usuarioRepository.findAll().stream()
	        .filter(usuario -> usuario.getRol() != null && usuario.getRol().getId_rol() == rolId)
	        .toList();
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends Usuario> S saveAndFlush(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> List<S> saveAllAndFlush(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteAllInBatch(Iterable<Usuario> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllInBatch() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Usuario getOne(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario getById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario getReferenceById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<Usuario> findAllById(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> S save(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	

	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Usuario entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll(Iterable<? extends Usuario> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Usuario> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Usuario> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public <S extends Usuario> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Usuario> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends Usuario> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public <S extends Usuario, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
		// TODO Auto-generated method stub
		return null;
	}

}
