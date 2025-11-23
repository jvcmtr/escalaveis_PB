package edu.infnet.Joao_Ramos_PB_TP1;


import edu.infnet.Joao_Ramos_PB_TP1.baseREST.BaseEntityRESTTest;
import edu.infnet.Joao_Ramos_PB_TP1.models.Issues.Issue;

public class IssuesCRUDTest extends BaseEntityRESTTest<Issue> {

    private final String userQ = "?username=IssuesCRUDTest";

    @Override protected String getBaseUrl(){return "/api/issue";}
    @Override protected String getEntityProperty(Issue entity){ return entity.getTitle(); }
    @Override protected Class<Issue> getEntityClass(){ return Issue.class ; }

    // Pela maneira como o repositorio está montado, um nome de usuario deve ser passado como queryparam
    @Override protected String getCreateUrl() { return getBaseUrl() + userQ; }
    @Override protected String getUpdateUrl(Long id) { return getBaseUrl() + "/" + id + userQ; }
    @Override protected String getDeleteUrl(Long id) { return getBaseUrl() + "/" + id + userQ; }

    @Override 
    protected Issue newEntity(String name){
        Issue i = new Issue();
        i.setTitle(name);
        i.setDescription(name);  
        return i;
    }

    @Override
    protected Issue updateEntity( Issue existing ){
        existing.setTitle("UPDATED");
        return existing;
    }
}
