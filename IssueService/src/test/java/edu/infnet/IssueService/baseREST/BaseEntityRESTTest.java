package edu.infnet.IssueService.baseREST;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import edu.infnet.IssueService.models.base.BaseEntity;


public abstract class BaseEntityRESTTest<T extends BaseEntity> extends RESTControllerTest<T, Long> {

    @Override
    protected Long getEntityId(T entity){
        return entity.getId();
    }

    @Override
    @Test
    protected void deleteEntity_cantGet() throws Exception {
        String value = "deleteEntity_cantGet";

        // Cria a entidade
        T entity = newEntity(value);
        var id = super.createEntityOnDb(entity);

        // DELETE
        var dtMin = LocalDateTime.now();
        var request = delete(getDeleteUrl(id));
        mvc.perform(request)
            .andExpect(status().isNoContent());
        var dtMax = LocalDateTime.now();
        
        // GET Entiadade
        var request2 = get(getReadUrl(id));
        MvcResult result = mvc.perform(request2)
            .andExpect(status().isOk())
            .andReturn();
        T found = getEntityFromRequest(result);

        var validDate = found.getDeletedAt().isAfter(dtMin) && found.getDeletedAt().isBefore(dtMax);  
        assertTrue(validDate);
    }
}