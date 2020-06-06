package com.api.servicios;

import com.api.dto.TipoPlanDTO;
import com.api.modelos.TipoPlan;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface TipoPlanServicio {

	TipoPlan getTipoPlanById(String id);
	TipoPlan getTipoPlanByNombre(String nombre);
    List<TipoPlan> getAllTypePlans();
    TipoPlan addTipoPlan(TipoPlanDTO tipoPlanDTO);

}
