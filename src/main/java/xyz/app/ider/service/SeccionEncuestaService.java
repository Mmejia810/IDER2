package xyz.app.ider.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.app.ider.model.SeccionEncuesta;
import xyz.app.ider.repository.SeccionEncuestaRepository;

@Service
public class SeccionEncuestaService {

	@Autowired
	private SeccionEncuestaRepository seccionEncuestaRepository;

	public SeccionEncuesta crearSeccion(SeccionEncuesta seccionEncuesta) {
		return seccionEncuestaRepository.save(seccionEncuesta);
	}

	public List<SeccionEncuesta> listarSecciones() {
		return seccionEncuestaRepository.findAll();
	}

	public void eliminarSeccion(int id) {
		seccionEncuestaRepository.deleteById(id);
	}

	public SeccionEncuesta actualizarSeccion(SeccionEncuesta seccionEncuesta) {
		return seccionEncuestaRepository.save(seccionEncuesta);
	}

	public Optional<SeccionEncuesta> obtenerSeccionPorId(int id) {
		return seccionEncuestaRepository.findById(id);
	}

	public List<SeccionEncuesta> listarSeccionesPorEncuesta(int encuestaId) {
		return seccionEncuestaRepository.findByEncuestaId(encuestaId);
	}

	public boolean existePorId(int id) {
		return seccionEncuestaRepository.existsById(id);
	}
}
