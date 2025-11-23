package edu.infnet.Joao_Ramos_PB_TP1.baseREST;


import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;


@SpringBootTest
@ActiveProfiles("test") // Para usar a db em memoria
@AutoConfigureMockMvc
@Transactional
@Rollback
public abstract class RESTControllerTest<T, Tid> {


    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @Test 
    protected void create_createAndReturnId(){
        T entity = newEntity("create_createAndReturnId");
        var id = assertDoesNotThrow(() -> createEntityOnDb(entity));
        assertNotNull(id);
    }

    @Test
    protected void read_readCreatedEntity() throws Exception {
        String value = "read_readEntity";

        // Cria a entidade
        T entity = newEntity(value);
        var prop = getEntityProperty(entity);
        var id = createEntityOnDb(entity);

        // GET Entiadade
        var request = get(getReadUrl(id));
        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
        T found = getEntityFromRequest(result);
        
        // Valida retorno do GET
        assertEquals(id, getEntityId(found));
        assertEquals(prop, getEntityProperty(found));
    }

    @Test
    protected void read_readAllEntities() throws Exception {
    
        int count = 3;
        String baseName = "read_readAllEntities_";

        // Cria N Entidades
        for (int i = 1; i <= count; i++) {
            String value = baseName + i;
            T entity = newEntity(value);
            createEntityOnDb(entity);
        }

        // GET ALL Entiadades
        var request = get(getReadAllUrl());
        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
        
        var entities = getEntityListFromRequest(result);
        
        // Valida retorno do GET
        assertEquals(count, entities.size());
    }

    @Test
    protected void update_modifyProp() throws Exception {
        String name = "update_modifyProp";

        // Cria a entidade
        T entity = newEntity(name);
        var prop = getEntityProperty(entity);
        var id = createEntityOnDb(entity);
        
        // Atualiza entidade
        T entity2 = updateEntity(entity);
        var prop2 = getEntityProperty(entity2);
        assertNotEquals(prop2, prop);
        
        // UPDATE Entidade
        var request = put(getUpdateUrl(id))
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(entity2));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        // GET Entiadade
        var request2 = get(getReadUrl(id));
        MvcResult result = mvc.perform(request2)
                .andExpect(status().isOk())
                .andReturn();
        T found = getEntityFromRequest(result);
        
        // Valida retorno do GET
        assertEquals(id, getEntityId(found));
        assertEquals(prop2, getEntityProperty(found));
    }

    @Test
    protected void deleteEntity_cantGet() throws Exception {
        String value = "deleteEntity_cantGet";

        // Cria a entidade
        T entity = newEntity(value);
        var id = createEntityOnDb(entity);

        // DELETE
        var request = delete(getDeleteUrl(id));
        mvc.perform(request)
            .andExpect(status().isNoContent());
        
        // GET Entiadade
        var request2 = get(getReadUrl(id));
        mvc.perform(request2)
                .andExpect(status().isNotFound());
    }

    protected abstract String getBaseUrl();
    protected String getReadAllUrl() { return getBaseUrl(); }
    protected String getCreateUrl() { return getBaseUrl(); }
    protected String getReadUrl(Tid id) { return getBaseUrl() + "/" + id; }
    protected String getUpdateUrl(Tid id) { return getBaseUrl() + "/" + id; }
    protected String getDeleteUrl(Tid id) { return getBaseUrl() + "/" + id; }

    protected abstract T newEntity(String name);
    protected abstract T updateEntity(T existing );

    protected abstract Tid getEntityId(T entity);
    protected abstract String getEntityProperty(T entity);
    protected abstract Class<T> getEntityClass();


    protected T getEntityFromRequest(MvcResult response) throws Exception{
        String jsonResponse = response.getResponse().getContentAsString();
        T e = mapper.readValue(jsonResponse, getEntityClass());
        return e;
    }

    protected List<T> getEntityListFromRequest(MvcResult response) throws Exception{
        String jsonResponse = response.getResponse().getContentAsString();
    
        T[] arr =  (T[]) mapper.readValue(jsonResponse, getEntityClass().arrayType() );
        
        return Arrays.asList(arr);
    }

    protected Tid createEntityOnDb(T entity ) throws Exception{
        var request = post(getCreateUrl());
        request.contentType(MediaType.APPLICATION_JSON);
        request.content(mapper.writeValueAsBytes(entity));
            
        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        T e = getEntityFromRequest(result);
        return getEntityId(e);
    }

}
