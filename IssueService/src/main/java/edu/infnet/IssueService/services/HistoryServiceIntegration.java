package edu.infnet.IssueService.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.infnet.IssueService.models.base.BaseEntity;

@Service
public class HistoryServiceIntegration {

    @Autowired private WebClient webClient;

    public <T extends BaseEntity> void recordAction(String action, String username, T entity ) {

        var body = new DTO<T>();
        body.entityName = entity.getClass().getName();
        body.entityId = entity.getId().toString();
        body.username = username;
        body.action = action;
        body.state = entity;

        webClient.post()
            .uri("http://history-service/history")
            .bodyValue(body)
            .retrieve()
            .bodyToMono(String.class)
            .subscribe();            
    }
}

class DTO<T>{
    public final String source = "Joao_Ramos_PB_IssueService App";
    public String action;
    public String username;
    public String entityName;
    public String entityId;
    public T state;
}